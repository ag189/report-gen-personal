import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import PageHeader from '../layout/PageHeader';
import { Lightbulb } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <PageWrapper pageNumber={7}>
      <PageHeader
        title="Recommendations"
        subtitle="High-impact actions to slow biological aging"
        icon={Lightbulb}
      />

      <div className="content-block">
        <p className="lead-text">
          The most effective longevity improvements come from consistent daily
          habits. Focus on nutrition quality, targeted supplementation where needed,
          and lifestyle fundamentals like sleep and movement.
        </p>
        <p className="mt-3-tight">
          Small, consistent upgrades across diet, supplements, and lifestyle can
          lower inflammation, improve metabolic resilience, and slow the pace of
          biological aging over time.
        </p>
      </div>

      <div className="three-column-grid">
        <div className="recommendation-card">
          <h4>Diet</h4>
          <div className="infographic-frame short mt-2">
            <img
              className="infographic-image"
              src="/images/diet.webp"
              alt="Healthy diet visual"
            />
          </div>
          <p className="recommendation-text">
            Build meals around whole foods, fiber-rich plants, and healthy fats to
            reduce oxidative stress and support long-term metabolic balance.
          </p>
          <ul className="bullet-list mt-2">
            <li>Choose whole grains over refined carbs</li>
            <li>Prioritize plant proteins and omega-3 fats</li>
            <li>Increase colorful vegetables and fruits</li>
          </ul>
        </div>
        <div className="recommendation-card">
          <h4>Supplements</h4>
          <div className="infographic-frame short mt-2">
            <img
              className="infographic-image"
              src="/images/supplements.jpg"
              alt="Supplements visual"
            />
          </div>
          <p className="recommendation-text">
            Fill nutrient gaps with evidence-based support like vitamin D, omega-3s,
            and B vitamins to optimize recovery and cellular repair.
          </p>
          <ul className="bullet-list mt-2">
            <li>Vitamin D based on lab levels</li>
            <li>Omega-3 for inflammation control</li>
            <li>Magnesium or B vitamins as needed</li>
          </ul>
        </div>
        <div className="recommendation-card">
          <h4>Lifestyle</h4>
          <div className="infographic-frame short mt-2">
            <img
              className="infographic-image lifestyle-image"
              src="/images/workout.jpg"
              alt="Workout visual"
            />
          </div>
          <p className="recommendation-text">
            Prioritize sleep, daily movement, and stress reduction to keep your pace
            of aging low and improve energy, cognition, and resilience.
          </p>
          <ul className="bullet-list mt-2">
            <li>Sleep 7-9 hours with a steady schedule</li>
            <li>Move daily and strength train 2-3 times weekly</li>
            <li>Use stress-reduction practices consistently</li>
          </ul>
        </div>
      </div>

      <div className="callout-box callout-box-with-qr info">
        <div className="callout-box-content">
          <div className="callout-box-text">
            <h4>Next Steps</h4>
            <p className="callout-text">
              Book a one-on-one session with our specialists to build a personalized plan
              to improve your biological age and pace of aging. Schedule your consultation
              by calling <strong>+91 96073 00010</strong> or messaging us on WhatsApp.
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
