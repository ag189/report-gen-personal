import React from 'react';
import { Dna, LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

export default function PageHeader({ title, subtitle, icon: Icon = Dna }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-content">
        <h2>{title}</h2>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      <div className="page-header-icon">
        <Icon size={34} strokeWidth={1.5} />
      </div>
    </div>
  );
}
