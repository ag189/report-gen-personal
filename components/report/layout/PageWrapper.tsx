import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  pageNumber?: number;
  noPadding?: boolean;
}

export default function PageWrapper({ children, className = '', pageNumber, noPadding = false }: PageWrapperProps) {
  return (
    <div className={`page ${className}`}>
      {noPadding ? (
        children
      ) : (
        <div className="page-content">
          {children}
        </div>
      )}
      {pageNumber && (
        <div className="page-footer">
          <span className="text-muted">© AgePath | Brought to you by PreventiveHealth.ai | Powered by GenePath Diagnostics</span>
          <span className="page-number">{pageNumber}</span>
        </div>
      )}
    </div>
  );
}
