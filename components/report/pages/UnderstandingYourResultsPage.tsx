import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import PageHeader from '../layout/PageHeader';
import { Brain } from 'lucide-react';

export default function UnderstandingYourResultsPage() {
  return (
    <PageWrapper pageNumber={5}>
      <PageHeader
        title="Understanding Your Results"
        subtitle="How biological age and pace of aging relate to health"
        icon={Brain}
      />

      <div className="two-column-text">
        <div>
          <div className="content-block">
            <h3>What Is Biological Age?</h3>
            <p className="mt-2">
              Your chronological age is the number of years since you were born.
              Your biological age reflects how old your cells, tissues, and organs
              functionally are, which can be younger or older than your calendar age.
            </p>
          </div>

          <div className="content-block">
            <h3>Why Does This Matter?</h3>
            <ul className="bullet-list">
              <li>Predicts future disease risk more accurately than calendar age</li>
              <li>Signals changes in cognitive and physical resilience</li>
              <li>Reflects overall healthspan and longevity potential</li>
              <li>Highlights the impact of lifestyle on long-term outcomes</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="infographic-frame tall">
            <img
              className="infographic-image"
              src="/images/bio-age.jpeg"
              alt="Biological age illustration"
            />
          </div>
        </div>
      </div>

      <div className="content-block">
        <h3>What Is Pace of Aging?</h3>
        <p className="mt-2">
          Biological age shows where you are today. Pace of aging shows how fast you
          are aging right now. A pace of 1.0 means one biological year per calendar
          year. Lower is slower, higher is faster.
        </p>
      </div>

      <div className="callout-box success mb-4">
        <p>
          The good news is that both biological age and pace of aging are modifiable.
          Lifestyle changes can slow or even reverse accelerated aging.
        </p>
      </div>
    </PageWrapper>
  );
}
