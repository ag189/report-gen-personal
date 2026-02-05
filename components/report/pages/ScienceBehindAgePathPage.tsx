import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import PageHeader from '../layout/PageHeader';
import { Microscope } from 'lucide-react';

export default function ScienceBehindAgePathPage() {
  return (
    <PageWrapper pageNumber={6}>
      <PageHeader
        title="The Science Behind AgePath"
        subtitle="Epigenetic clocks and population calibration"
        icon={Microscope}
      />

      <div className="content-block">
        <h3>Normalization to Indian Asian Population</h3>
        <p className="mt-2">
          Results are normalized against the LOLIPOP study, which includes
          approximately 2,600 asymptomatic Indian Asian men and women. This
          improves accuracy and relevance for your population background.
        </p>
      </div>

      <div className="section-divider-thin" />

      <div className="two-column-text">
        <div>
          <div className="content-block">
            <h3>How We Measure Biological Age</h3>
            <p className="mt-2">
              Your AgePath results are derived from DNA methylation patterns in
              blood. Methylation is a chemical tag that affects gene expression
              without changing the DNA sequence. These patterns shift in predictable
              ways with aging.
            </p>
          </div>

          <div className="content-block">
            <h3>PCGrimAge Clock</h3>
            <p className="mt-2">
              PCGrimAge analyzes over 70,000 methylation sites. It was trained on
              data from more than 10,000 individuals and is strongly predictive of
              mortality, cardiovascular outcomes, cancer, and healthspan.
            </p>
          </div>

          <div className="content-block">
            <h3>DunedinPACE Algorithm</h3>
            <p className="mt-2">
              DunedinPACE measures how fast you are aging right now by analyzing
              roughly 17,000 methylation markers. It can detect changes over short
              time frames, making it ideal for monitoring lifestyle interventions.
            </p>
          </div>
        </div>

        <div>
          <div className="infographic-frame tall">
            <img
              className="infographic-image"
              src="/images/epigenetic.jpg"
              alt="Epigenetic clock illustration"
            />
          </div>
        </div>
      </div>

      <div className="callout-box info mb-4">
        <p>
          This report is research-grade science and is not a diagnostic test. Use
          it to inform lifestyle choices and discuss significant findings with your
          healthcare provider.
        </p>
      </div>
    </PageWrapper>
  );
}
