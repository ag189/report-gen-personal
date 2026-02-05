'use client';

import { useSearchParams } from 'next/navigation';
import ReportPreview from '@/components/report/ReportPreview';
import { ReportData } from '@/types/report.types';
import { Suspense } from 'react';

function PreviewContent() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  
  if (!dataParam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No Data Found</h1>
          <p className="text-gray-600">Please generate a report from the main page.</p>
        </div>
      </div>
    );
  }
  
  try {
    const data: ReportData = JSON.parse(decodeURIComponent(dataParam));
    return <ReportPreview data={data} />;
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Invalid Data</h1>
          <p className="text-gray-600">Failed to parse report data.</p>
        </div>
      </div>
    );
  }
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
