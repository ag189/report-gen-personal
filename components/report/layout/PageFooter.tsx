import React from 'react';

/** Single source of truth for report footer text – edit here to change it everywhere. */
export const FOOTER_TEXT = '© AgePath | Brought to you by PreventiveHealth.ai | Powered by GenePath Diagnostics';

interface PageFooterProps {
  text?: string;
}

export default function PageFooter({ text = FOOTER_TEXT }: PageFooterProps) {
  return (
    <div className="page-footer">
      <span className="text-muted">{text}</span>
    </div>
  );
}
