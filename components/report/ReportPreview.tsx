'use client';

import React from 'react';
import { ReportData } from '@/types/report.types';
import { calculateMetrics } from '@/lib/calculations';
import CoverPage from './pages/CoverPage';
import PersonalInformationPage from './pages/PersonalInformationPage';
import BiologicalAgePage from './pages/BiologicalAgePage';
import PaceOfAgingPage from './pages/PaceOfAgingPage';
import UnderstandingYourResultsPage from './pages/UnderstandingYourResultsPage';
import ScienceBehindAgePathPage from './pages/ScienceBehindAgePathPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ResourcesPage from './pages/ResourcesPage';
import FrequentlyAskedQuestionsPage from './pages/FrequentlyAskedQuestionsPage';
import DisclaimerPage from './pages/DisclaimerPage';
import ReferencesPage from './pages/ReferencesPage';
import '@/styles/report.css';

interface ReportPreviewProps {
  data: ReportData;
}

export default function ReportPreview({ data }: ReportPreviewProps) {
  const metrics = calculateMetrics(data);

  return (
    <div className="report-preview-container">
      <div className="report-pages-wrapper">
        <CoverPage data={data} />
        <PersonalInformationPage data={data} />
        <BiologicalAgePage data={data} metrics={metrics} />
        <PaceOfAgingPage data={data} metrics={metrics} />
        <UnderstandingYourResultsPage />
        <ScienceBehindAgePathPage />
        <RecommendationsPage />
        <ResourcesPage />
        <FrequentlyAskedQuestionsPage />
        <DisclaimerPage />
        <ReferencesPage />
      </div>
    </div>
  );
}
