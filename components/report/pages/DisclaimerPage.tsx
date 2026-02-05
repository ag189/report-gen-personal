import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import PageHeader from '../layout/PageHeader';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <PageWrapper pageNumber={10}>
      <PageHeader title="Disclaimer" subtitle="Research use and limitations" icon={AlertTriangle} />

      <div className="content-block">
        <h3>Research Use & Limitations</h3>
        <ul className="bullet-list">
          <li>This report is not a diagnostic test</li>
          <li>Results are for informational and research purposes only</li>
          <li>Results do not diagnose or predict specific diseases</li>
          <li>Do not use results for medical decision-making</li>
          <li>Not a substitute for routine medical care</li>
        </ul>
      </div>

      <div className="content-block">
        <h3>Accuracy Considerations</h3>
        <ul className="bullet-list">
          <li>Methylation patterns are influenced by genetics and lifestyle</li>
          <li>Individual variability exists in health outcome prediction</li>
          <li>Algorithms are validated but not perfect predictors</li>
          <li>Population normalization improves relevance, not certainty</li>
        </ul>
      </div>

      <div className="content-block">
        <h3>Professional Consultation</h3>
        <ul className="bullet-list">
          <li>Discuss major dietary changes with your clinician</li>
          <li>Seek guidance before starting new exercise programs</li>
          <li>Review supplements if you take medications</li>
          <li>Consult for concerning results or symptoms</li>
        </ul>
      </div>
    </PageWrapper>
  );
}
