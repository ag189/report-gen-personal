export interface ReportData {
  // Personal Information
  name: string;
  dateOfBirth: string;           // ISO date string
  age: number;                   // Calculated from DOB
  gender: 'Male' | 'Female' | 'Other';
  sampleType: string;            // e.g., "EDTA Blood"
  kitId: string;
  
  // Test Results
  chronologicalAge: number;      // e.g., 70.56
  biologicalAge: number;         // e.g., 67.26
  dunedinPACE: number;          // e.g., 1.001
  
  // Metadata
  generatedDate: string;         // ISO date string
  reportId?: string;             // Optional unique ID
}

export interface CalculatedMetrics {
  ageDifference: number;         // chronologicalAge - biologicalAge
  percentDifference: number;     // (ageDiff / chronoAge) * 100
  isYounger: boolean;            // ageDiff > 0
  paceCategory: 'slower' | 'normal' | 'faster';
  pacePercentDiff: number;       // Comparison to expected pace
  expectedPACE: number;          // Expected pace for the age
}
