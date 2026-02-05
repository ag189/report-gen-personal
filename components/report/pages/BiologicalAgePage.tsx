import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import PageHeader from '../layout/PageHeader';
import BioAgeScatterPlot from '../charts/BioAgeScatterPlot';
import { Dna } from 'lucide-react';
import { ReportData, CalculatedMetrics } from '@/types/report.types';
import { formatAge } from '@/lib/calculations';

interface BiologicalAgePageProps {
  data: ReportData;
  metrics: CalculatedMetrics;
}

export default function BiologicalAgePage({ data, metrics }: BiologicalAgePageProps) {
  const comparisonYears = Math.abs(metrics.ageDifference);
  const comparisonPercent = Math.abs(metrics.percentDifference).toFixed(1);

  return (
    <PageWrapper pageNumber={3} className="bio-age-page">
      <PageHeader 
        title="Biological Age" 
        subtitle="Your Biological Age Assessment"
        icon={Dna}
      />

      <div className="bio-age-layout">
        <div className="bio-age-summary">
          <div className="comparison-block">
            <div className="comparison-item">
              <p className="result-label">Chronological Age</p>
              <p className="result-value">{formatAge(data.chronologicalAge)}</p>
              <p className="result-description">Your calendar age</p>
            </div>
            
            <div className="comparison-item">
              <p className="result-label">Biological Age</p>
              <p className={`result-value ${metrics.isYounger ? 'positive' : 'negative'}`}>
                {formatAge(data.biologicalAge)}
              </p>
              <p className="result-description">Based on PCGrimAge</p>
            </div>
          </div>

          <div className={`callout-box ${metrics.isYounger ? 'success' : 'danger'}`}>
            <p className="callout-text">
              You are <strong>{comparisonYears} years ({comparisonPercent}%) {metrics.isYounger ? 'younger' : 'older'}</strong> than your chronological age
            </p>
          </div>
        </div>

        <div className="bio-age-chart">
          <h3 className="bio-age-chart-title">Age Comparison Chart</h3>
          <p className="bio-age-chart-subtitle">Your biological age compared to the reference population</p>
          <BioAgeScatterPlot 
            chronologicalAge={data.chronologicalAge}
            biologicalAge={data.biologicalAge}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
