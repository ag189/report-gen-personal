'use client';

import React, { useState } from 'react';
import { ReportData } from '@/types/report.types';
import { calculateAgeFromDOB, generateReportId } from '@/lib/formatters';
import { AlertCircle, User, Activity, BarChart3 } from 'lucide-react';

interface DataEntryFormProps {
  onPreview: (data: ReportData) => void;
}

export default function DataEntryForm({ onPreview }: DataEntryFormProps) {
  const [formData, setFormData] = useState<Partial<ReportData>>({
    name: 'John Doe',
    dateOfBirth: '1953-06-15',
    age: 70,
    gender: 'Male',
    sampleType: 'EDTA Blood',
    kitId: 'TEST123456',
    chronologicalAge: 70.56,
    biologicalAge: 67.26,
    dunedinPACE: 1.001,
    ageDifference: 3.30,
    percentDifference: 4.67,
    isYounger: true,
    expectedPACE: 1.092,
    pacePercentDiff: 8.3,
    paceIsLower: true,
    generatedDate: new Date().toISOString(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  const handleChange = (field: keyof ReportData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Auto-calculate age from DOB
    if (field === 'dateOfBirth' && value) {
      const calculatedAge = calculateAgeFromDOB(value);
      setFormData(prev => ({ ...prev, age: calculatedAge }));
      
      // Check if chronological age matches
      if (formData.chronologicalAge && Math.abs(calculatedAge - formData.chronologicalAge) > 0.5) {
        setWarnings(prev => ({ 
          ...prev, 
          chronologicalAge: `Chronological age (${formData.chronologicalAge}) doesn't match calculated age from DOB (${calculatedAge})` 
        }));
      } else {
        setWarnings(prev => {
          const newWarnings = { ...prev };
          delete newWarnings.chronologicalAge;
          return newWarnings;
        });
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.kitId?.trim()) newErrors.kitId = 'Kit ID is required';
    if (!formData.chronologicalAge || formData.chronologicalAge <= 0) {
      newErrors.chronologicalAge = 'Valid chronological age is required';
    }
    if (!formData.biologicalAge || formData.biologicalAge <= 0) {
      newErrors.biologicalAge = 'Valid biological age is required';
    }
    if (!formData.dunedinPACE || formData.dunedinPACE <= 0) {
      newErrors.dunedinPACE = 'Valid DunedinPACE score is required';
    }

    // Warnings
    const newWarnings: Record<string, string> = {};
    if (formData.biologicalAge && (formData.biologicalAge < 0 || formData.biologicalAge > 120)) {
      newWarnings.biologicalAge = 'Biological age seems unusual (expected 0-120)';
    }
    if (formData.dunedinPACE && (formData.dunedinPACE < 0.5 || formData.dunedinPACE > 2.0)) {
      newWarnings.dunedinPACE = 'DunedinPACE outside normal range (0.5-2.0)';
    }

    setErrors(newErrors);
    setWarnings(newWarnings);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const reportData: ReportData = {
        ...formData as ReportData,
        reportId: generateReportId(),
        generatedDate: new Date().toISOString(),
      };
      onPreview(reportData);
    }
  };

  const handleReset = () => {
    setFormData({
      name: 'John Doe',
      dateOfBirth: '1953-06-15',
      age: 70,
      gender: 'Male',
      sampleType: 'EDTA Blood',
      kitId: 'TEST123456',
      chronologicalAge: 70.56,
      biologicalAge: 67.26,
      dunedinPACE: 1.001,
      ageDifference: 3.30,
      percentDifference: 4.67,
      isYounger: true,
      expectedPACE: 1.092,
      pacePercentDiff: 8.3,
      paceIsLower: true,
      generatedDate: new Date().toISOString(),
    });
    setErrors({});
    setWarnings({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {/* Personal Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600" />
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter patient name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          {/* Age (Auto-calculated) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age (Auto-calculated)
            </label>
            <input
              type="number"
              value={formData.age || ''}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              placeholder="Calculated from DOB"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value as 'Male' | 'Female' | 'Other')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Sample Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample Type
            </label>
            <input
              type="text"
              value={formData.sampleType}
              onChange={(e) => handleChange('sampleType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., EDTA Blood"
            />
          </div>

          {/* Kit ID */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kit ID / Sample ID *
            </label>
            <input
              type="text"
              value={formData.kitId}
              onChange={(e) => handleChange('kitId', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.kitId ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter kit or sample ID"
            />
            {errors.kitId && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.kitId}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Test Results Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-green-600" />
          Test Results
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chronological Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chronological Age *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.chronologicalAge || ''}
              onChange={(e) => handleChange('chronologicalAge', parseFloat(e.target.value) || 0)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.chronologicalAge ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 70.56"
            />
            {errors.chronologicalAge && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.chronologicalAge}
              </p>
            )}
            {warnings.chronologicalAge && (
              <p className="mt-1 text-sm text-yellow-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {warnings.chronologicalAge}
              </p>
            )}
          </div>

          {/* Biological Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Biological Age *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.biologicalAge || ''}
              onChange={(e) => handleChange('biologicalAge', parseFloat(e.target.value) || 0)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.biologicalAge ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 67.26"
            />
            {errors.biologicalAge && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.biologicalAge}
              </p>
            )}
            {warnings.biologicalAge && (
              <p className="mt-1 text-sm text-yellow-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {warnings.biologicalAge}
              </p>
            )}
          </div>

          {/* DunedinPACE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DunedinPACE Score *
            </label>
            <input
              type="number"
              step="0.001"
              value={formData.dunedinPACE || ''}
              onChange={(e) => handleChange('dunedinPACE', parseFloat(e.target.value) || 0)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.dunedinPACE ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 1.001"
            />
            {errors.dunedinPACE && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.dunedinPACE}
              </p>
            )}
            {warnings.dunedinPACE && (
              <p className="mt-1 text-sm text-yellow-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {warnings.dunedinPACE}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Biological Age Comparison Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          Biological Age Comparison
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Age Difference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Difference (years) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.ageDifference ?? ''}
              onChange={(e) => handleChange('ageDifference', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 3.30"
            />
          </div>

          {/* Percent Difference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Percent Difference (%) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.percentDifference ?? ''}
              onChange={(e) => handleChange('percentDifference', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 4.67"
            />
          </div>

          {/* Is Younger */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Younger or Older? *
            </label>
            <select
              title="Younger or Older"
              value={formData.isYounger ? 'younger' : 'older'}
              onChange={(e) => handleChange('isYounger', e.target.value === 'younger')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="younger">Younger than chronological age</option>
              <option value="older">Older than chronological age</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pace of Aging Comparison Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-orange-600" />
          Pace of Aging Comparison
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Expected PACE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected DunedinPACE at Age *
            </label>
            <input
              type="number"
              step="0.001"
              value={formData.expectedPACE ?? ''}
              onChange={(e) => handleChange('expectedPACE', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1.092"
            />
          </div>

          {/* Pace Percent Diff */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pace Percent Difference (%) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.pacePercentDiff ?? ''}
              onChange={(e) => handleChange('pacePercentDiff', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 8.3"
            />
          </div>

          {/* Pace Is Lower */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lower or Higher than average? *
            </label>
            <select
              title="Lower or Higher than average"
              value={formData.paceIsLower ? 'lower' : 'higher'}
              onChange={(e) => handleChange('paceIsLower', e.target.value === 'lower')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="lower">Lower than average (aging slower)</option>
              <option value="higher">Higher than average (aging faster)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Reset Form
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          Preview Report
        </button>
      </div>
    </form>
  );
}
