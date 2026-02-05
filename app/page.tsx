'use client';
import { Agentation } from 'agentation';
import { useState } from 'react';
import DataEntryForm from '@/components/forms/DataEntryForm';
import ReportPreview from '@/components/report/ReportPreview';
import { ReportData } from '@/types/report.types';
import { ArrowLeft, Download, Loader2, Edit } from 'lucide-react';
import { formatDate } from '@/lib/calculations';

// Sample data for design iteration
const SAMPLE_DATA: ReportData = {
  name: "John Doe",
  dateOfBirth: "1953-06-15",
  age: 70,
  gender: "Male",
  sampleType: "EDTA Blood",
  kitId: "TEST123456",
  chronologicalAge: 70.56,
  biologicalAge: 67.26,
  dunedinPACE: 1.001,
  generatedDate: new Date().toISOString(),
  reportId: "TA-SAMPLE-12345"
};

export default function Home() {
  const [isPreviewMode, setIsPreviewMode] = useState(true); // Start in preview mode
  const [reportData, setReportData] = useState<ReportData>(SAMPLE_DATA); // Pre-populated data
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePreview = (data: ReportData) => {
    setReportData(data);
    setIsPreviewMode(true);
  };

  const handleBackToEdit = () => {
    setIsPreviewMode(false);
  };

  const handleDownloadPDF = async () => {
    if (!reportData) return;

    setIsGeneratingPDF(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AgePath-Report-${reportData.name.replace(/\s/g, '_')}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!isPreviewMode ? (
        // Form View
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AgePath Report Generator
            </h1>
            <p className="text-lg text-gray-600">
              Generate professional biological aging reports
            </p>
          </div>

          <DataEntryForm onPreview={handlePreview} />
        </div>
      ) : (
        // Preview View
        <>
          {/* Fixed Top Bar */}
          <div className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <button
                onClick={handleBackToEdit}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit className="w-5 h-5" />
                Edit Data
              </button>

              <div className="text-center">
                <h2 className="font-semibold text-gray-900">
                  {reportData.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Generated: {formatDate(reportData.generatedDate)}
                </p>
              </div>

              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Report Preview */}
          <ReportPreview data={reportData} />
        </>
      )}
      {process.env.NODE_ENV === 'development' && <Agentation />}
    </div>
  );
}
