import { ReportData, CalculatedMetrics } from '@/types/report.types';

export function calculateMetrics(data: ReportData): CalculatedMetrics {
  const ageDifference = data.chronologicalAge - data.biologicalAge;
  const percentDifference = (ageDifference / data.chronologicalAge) * 100;
  const isYounger = ageDifference > 0;
  
  // Calculate expected DunedinPACE based on age
  // Simplified formula: expected increases slightly with age
  const expectedPACE = 1.0 + (data.chronologicalAge - 40) * 0.003;
  
  // Determine pace category
  let paceCategory: 'slower' | 'normal' | 'faster';
  if (data.dunedinPACE < 0.90) {
    paceCategory = 'slower';
  } else if (data.dunedinPACE <= 1.10) {
    paceCategory = 'normal';
  } else {
    paceCategory = 'faster';
  }
  
  const pacePercentDiff = ((expectedPACE - data.dunedinPACE) / expectedPACE) * 100;
  
  return {
    ageDifference: Number(ageDifference.toFixed(2)),
    percentDifference: Number(percentDifference.toFixed(2)),
    isYounger,
    paceCategory,
    pacePercentDiff: Number(pacePercentDiff.toFixed(2)),
    expectedPACE: Number(expectedPACE.toFixed(3))
  };
}

export function formatAge(age: number): string {
  return age.toFixed(2);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
