import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import PageHeader from '../layout/PageHeader';
import { HelpCircle } from 'lucide-react';

export default function FrequentlyAskedQuestionsPage() {
  return (
    <PageWrapper pageNumber={9} className="faq-page">
      <PageHeader title="Frequently Asked Questions" subtitle="Quick answers to common concerns" icon={HelpCircle} />

      <div className="two-column-grid">
        <div>
          <div className="faq-item">
            <h3>How accurate is AgePath?</h3>
            <p>
              PCGrimAge and DunedinPACE are among the most validated epigenetic
              algorithms. Results are informative estimates, not absolute values.
            </p>
          </div>
          <div className="faq-item">
            <h3>Can my results change?</h3>
            <p>
              Yes. Biological age reflects cumulative history, while pace of aging
              responds within months to meaningful lifestyle changes.
            </p>
          </div>
          <div className="faq-item">
            <h3>How often should I retest?</h3>
            <p>
              Most people retest annually. If you are making major lifestyle shifts,
              consider retesting in 6-12 months.
            </p>
          </div>
          <div className="faq-item">
            <h3>Is this genetic testing?</h3>
            <p>
              No. We analyze epigenetic markers, not your DNA sequence. Epigenetic
              changes are reversible and influenced by lifestyle.
            </p>
          </div>
        </div>

        <div>
          <div className="faq-item">
            <h3>What if my biological age is higher?</h3>
            <p>
              Differences under 5 years are common. Larger gaps suggest room for
              intervention and possibly medical consultation.
            </p>
          </div>
          <div className="faq-item">
            <h3>What if my biological age is lower?</h3>
            <p>
              Great. It indicates your current habits are supportive. Continue them
              and look for small optimizations.
            </p>
          </div>
          <div className="faq-item">
            <h3>Why can biological age and pace differ?</h3>
            <p>
              Biological age is cumulative. Pace is current trajectory. Recent
              lifestyle changes can shift pace before biological age catches up.
            </p>
          </div>
          <div className="faq-item">
            <h3>Which lifestyle change matters most?</h3>
            <p>
              It depends, but quitting smoking, exercise, sleep optimization, and
              stress reduction are typically most impactful.
            </p>
          </div>
        </div>
      </div>


      <div className="callout-box callout-box-with-qr info">
        <div className="callout-box-content">
          <div className="callout-box-text">
            <h4>What should I do next?</h4>
            <p className="callout-text">
            Start by reviewing your results in context, then choose one or two areas
          with the highest impact for you right now. Focus on a single, achievable
          habit change, track how you feel over time, and consider professional
          guidance if needed. Retesting in 6-12 months helps you measure progress
          and refine your plan.
            </p>
            <p className="callout-qr-cta">Scan to schedule a consult</p>
          </div>
          <div className="callout-box-qr">
            <img src="/images/whatsapp-qr.gif" alt="WhatsApp QR code" className="callout-qr-image" />
          </div>
        </div>
      </div>

    </PageWrapper>
  );
}
