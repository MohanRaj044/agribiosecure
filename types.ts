
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
