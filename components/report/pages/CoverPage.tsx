import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import { ReportData } from '@/types/report.types';

interface CoverPageProps {
  data: ReportData;
}

export default function CoverPage({ data }: CoverPageProps) {
  return (
    <PageWrapper className="cover-page" noPadding>
      <div className="cover-content">
        {/* Top Section - Image */}
        <div className="cover-top">
          <div className="cover-hero-image" />
        </div>

        {/* Bottom Section - 2x2 Grid */}
        <div className="cover-grid">
          {/* Q1: Top-Left - White - AgePath + Brought to you by */}
          <div className="cover-grid-q1">
            <img
              src="/images/age-path-logo.png"
              alt="AgePath"
              className="cover-brand-logo"
            />
            <p className="cover-subtitle">
              Scientific Insights to Reverse Your Pace of Aging
            </p>
            <div className="cover-brought-by">
              <p className="cover-powered">Brought to you by</p>
              <img className="cover-logo cover-logo-partner" src="/images/ph-logo.png" alt="Preventive Health" />
            </div>
          </div>

          {/* Q2: Top-Right - Blue - Empty */}
          <div className="cover-grid-q2" />

          {/* Q3: Bottom-Left - Blue - Patient Info */}
          <div className="cover-grid-q3">
            <p className="cover-bottom-name">
              {data.name}{"'"}s Personal Health Report
            </p>
            <div className="cover-bottom-year">2026</div>
          </div>

          {/* Q4: Bottom-Right - White - Powered by */}
          <div className="cover-grid-q4">
            <p className="cover-powered"><span>Powered by</span></p>
            <img className="cover-logo cover-logo-footer" src="/images/gp-logo.png" alt="GenePath Diagnostics" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
