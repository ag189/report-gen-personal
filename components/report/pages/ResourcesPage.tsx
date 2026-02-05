import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import PageHeader from '../layout/PageHeader';
import { Link2 } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <PageWrapper pageNumber={8}>
      <PageHeader
        title="Resources"
        subtitle="Communities, newsletters, and further reading"
        icon={Link2}
      />

      <div className="content-block">
        <p className="lead-text">
          Stay connected and keep learning. Join our community and share the journey!
        </p>
      </div>

      <div className="callout-stack">
        <div className="callout-box callout-box-with-qr info">
          <div className="callout-box-content">
            <div className="callout-box-text">
              <h4>Join the Longevity Lab</h4>
              <p className="callout-text">
                Join our community to get free access to live webinars,
                educational content, and Q/A with experts to make small, daily changes to improve your health. Learn from other member stories and share your journey.
              </p>
              <p className="callout-qr-cta">Scan to join the community</p>
            </div>
            <div className="callout-box-qr">
              <img src="/images/community-qr.gif" alt="Community QR code" className="callout-qr-image" />
            </div>
          </div>
        </div>

        <div className="callout-box callout-box-with-qr info">
          <div className="callout-box-content">
            <div className="callout-box-text">
              <h4>Subscribe to Our Newsletter</h4>
              <p className="callout-text">
                Get bi-weekly insights delivered straight to your inbox where we break down the science behind Longevity and Aging. Learn about
                best practices, health tips, and interpreting science-backed interventions that
                you can implement in daily life.
              </p>
              <p className="callout-qr-cta">Scan to Subscribe</p>
            </div>
            <div className="callout-box-qr">
              <img src="/images/newsletter-qr.gif" alt="Newsletter QR code" className="callout-qr-image" />
            </div>
          </div>
        </div>

        <div className="callout-box callout-box-with-qr info">
          <div className="callout-box-content">
            <div className="callout-box-text">
              <h4> Menopause & Perimenopause Support </h4>
              <p className="callout-text">
                Join our dedicated community focused on menopause and perimenopause care built in partnership with Forum Health (US). Learn from other women and gain access to expert annswers from doctors and nurse practioners, live webinars, and personalized support for every step of your journey.
              </p>
              <p className="callout-qr-cta">Scan to join the community</p>
            </div>
            <div className="callout-box-qr">
              <img src="/images/menopause-qr.gif" alt="Menopause community QR code" className="callout-qr-image" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
