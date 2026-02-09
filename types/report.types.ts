export interface ReportData {
  // Personal Information
  name: string;
  dateOfBirth: string;           // ISO date string
  age: number;                   // Calculated from DOB
  gender: 'Male' | 'Female' | 'Other';
  sampleType: string;            // e.g., "EDTA Blood"
  kitId: string;

  // Test Results (all manual inputs)
  chronologicalAge: number;      // e.g., 70.56
  biologicalAge: number;         // e.g., 67.26
  dunedinPACE: number;          // e.g., 1.001
  expectedPACE: number;          // Expected DunedinPACE at this age, e.g., 1.092

  // Metadata
  generatedDate: string;         // ISO date string
  reportId?: string;             // Optional unique ID
}
