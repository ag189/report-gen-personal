import { NextRequest, NextResponse } from 'next/server';
import { ReportData } from '@/types/report.types';
import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';

export async function POST(request: NextRequest) {
  try {
    const data: ReportData = await request.json();
    
    // Validate data
    if (!data.name || !data.biologicalAge) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate the preview URL
    const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https';
    const forwardedHost = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
    const origin = request.headers.get('origin');
    const baseUrl = origin
      ?? (forwardedHost ? `${forwardedProto}://${forwardedHost}` : undefined)
      ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    
    // Create a URL-safe JSON string
    const dataParam = encodeURIComponent(JSON.stringify(data));
    const previewUrl = `${baseUrl}/preview?data=${dataParam}`;
    
    // Launch Puppeteer (Vercel-compatible)
    const isVercel = Boolean(process.env.VERCEL);
    const puppeteer = isVercel ? puppeteerCore : (await import('puppeteer')).default;
    const browser = await puppeteer.launch({
      headless: true,
      args: isVercel
        ? chromium.args
        : [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
          ],
      executablePath: isVercel ? await chromium.executablePath() : undefined,
    });
    
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 794, height: 1123 }); // A4 in pixels at 96 DPI
    
    // Navigate to preview page
    const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    if (bypassSecret) {
      await page.setExtraHTTPHeaders({
        'x-vercel-protection-bypass': bypassSecret,
      });
    }
    await page.goto(previewUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait a bit for charts to render
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add print media CSS to ensure proper rendering
    await page.addStyleTag({
      content: `
        @page {
          size: A4;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
        }
        .report-preview-container {
          background: white !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .report-pages-wrapper {
          max-width: none !important;
          gap: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .page {
          margin: 0 !important;
          box-shadow: none !important;
          page-break-after: always !important;
          break-after: page !important;
        }
        .page:last-child {
          page-break-after: auto !important;
          break-after: auto !important;
        }
      `
    });
    
    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
      omitBackground: false
    });
    
    await browser.close();
    
    // Return PDF
    const filename = `myTrueAge-Report-${data.name.replace(/\s/g, '_')}-${Date.now()}.pdf`;
    const pdfArrayBuffer = Uint8Array.from(pdf).buffer;
    
    return new NextResponse(pdfArrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
    
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Set a longer timeout for this API route
export const maxDuration = 60;
export const runtime = 'nodejs';