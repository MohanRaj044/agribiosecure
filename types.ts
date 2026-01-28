
export interface FarmStats {
  pigs: number;
  poultry: number;
  healthScore: number;
  complianceRate: number;
  lastInspection: string;
}

export interface ChecklistItem {
  id: string;
  category: 'Entry' | 'Sanitation' | 'Vaccination' | 'Monitoring';
  task: string;
  completed: boolean;
}

export interface Guideline {
  id: string;
  title: string;
  category: 'Pig' | 'Poultry' | 'General';
  content: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface LivestockData {
  pigs: {
    count: number;
    lastVaccination: string;
    healthNote: string;
  };
  hens: {
    count: number;
    lastVaccination: string;
    healthNote: string;
  };
}

export interface AIReport {
  summary: string;
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Critical';
  alerts: string[];
  recommendations: string[];
  overallScore: number;
  dataInsights: {
    category: string;
    observation: string;
    riskLevel: 'Low' | 'Medium' | 'High';
  }[];
}
