import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import PageHeader from '../layout/PageHeader';
import PaceOfAgingGauge from '../charts/PaceOfAgingGauge';
import { Activity } from 'lucide-react';
import { ReportData, CalculatedMetrics } from '@/types/report.types';

interface PaceOfAgingPageProps {
  data: ReportData;
  metrics: CalculatedMetrics;
}

export default function PaceOfAgingPage({ data, metrics }: PaceOfAgingPageProps) {
  const comparisonPercent = Math.abs(metrics.pacePercentDiff).toFixed(1);
  const isLower = metrics.pacePercentDiff > 0;

  const paceDescription = 
    metrics.paceCategory === 'slower' ? 'You are aging slower than average' :
    metrics.paceCategory === 'normal' ? 'You are aging at a normal pace' :
    'You are aging faster than average';

  const calloutClass = 
    metrics.paceCategory === 'slower' ? 'success' :
    metrics.paceCategory === 'normal' ? 'warning' : 'danger';

  return (
    <PageWrapper pageNumber={4}>
      <PageHeader 
        title="Pace of Aging" 
        subtitle="Your Rate of Biological Aging"
        icon={Activity}
      />

      {/* Key metric display */}
      <div style={{ marginTop: '20px' }}>
        <p className="result-label">DunedinPACE Score</p>
      </div>

      {/* Gauge Chart */}
      <div style={{ margin: '28px 0' }}>
        <PaceOfAgingGauge dunedinPACE={data.dunedinPACE} />
      </div>

      {/* Comparison stats */}
      <div className="comparison-block" style={{ margin: '24px 0' }}>
        <div className="comparison-item">
          <p className="result-label">Your Score</p>
          <p className="result-value" style={{ fontSize: '28pt' }}>{data.dunedinPACE.toFixed(3)}</p>
        </div>
        
        <div className="comparison-item">
          <p className="result-label">Expected at Age {data.chronologicalAge.toFixed(0)}</p>
          <p className="result-value" style={{ fontSize: '28pt', color: '#6b6b6b' }}>
            {metrics.expectedPACE.toFixed(3)}
          </p>
        </div>
      </div>

      {/* Key Finding */}
      <div className={`callout-box ${calloutClass}`} style={{ margin: '16px 0 18px' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11pt',
          fontWeight: 500,
          color: '#1a1a1a',
          margin: 0,
          marginBottom: '8px',
          lineHeight: 1.6
        }}>
          Your pace of aging is{' '}
          <span style={{ 
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 600 
          }}>
            {comparisonPercent}% {isLower ? 'lower' : 'higher'}
          </span>
          {' '}than the average person your age
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10pt',
          fontWeight: 400,
          color: '#3d3d3d',
          margin: 0
        }}>
          {paceDescription}
        </p>
      </div>

      {/* Explanation */}
      <div style={{ marginTop: '24px' }}>
        <h4 style={{ marginBottom: '12px' }}>Understanding your score</h4>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10pt',
          fontWeight: 400,
          color: '#3d3d3d',
          lineHeight: 1.7
        }}>
          DunedinPACE measures how fast your body is aging. A score of 1.0 means you're aging at a normal rate. 
          Below 1.0 indicates slower aging, and above 1.0 indicates faster aging. 
          This metric helps predict health risks and longevity. Pay close attention to these numbers as they are indicative of your current health and lifestyle and can be reduced by careful and dedicated efforts on your behalf.
        </p>
      </div>
    </PageWrapper>
  );
}
