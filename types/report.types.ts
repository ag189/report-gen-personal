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

  // Biological Age Comparison (manually entered)
  ageDifference: number;         // e.g., 3.30 years
  percentDifference: number;     // e.g., 4.67%
  isYounger: boolean;            // true = younger, false = older

  // Pace of Aging Comparison (manually entered)
  expectedPACE: number;          // Expected DunedinPACE at this age
  pacePercentDiff: number;       // e.g., 8.2%
  paceIsLower: boolean;          // true = lower than average, false = higher

  // Metadata
  generatedDate: string;         // ISO date string
  reportId?: string;             // Optional unique ID
}
