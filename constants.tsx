
import React from 'react';
import { ChecklistItem, Guideline } from './types';

export const COLORS = {
  primary: '#2d5a27', // Earthy Green
  secondary: '#8b5e34', // Wood Brown
  accent: '#f4f1de', // Cream
  danger: '#bc4749',
  success: '#6a994e'
};

export const MOCK_GUIDELINES: Guideline[] = [
  {
    id: '1',
    title: 'Entrance Protocols',
    category: 'General',
    content: 'Ensure all visitors sign the logbook and use designated footbaths before entering any production area.',
    icon: '🚪'
  },
  {
    id: '2',
    title: 'Swine Fever Prevention',
    category: 'Pig',
    content: 'Implement strict "All-in/All-out" protocols and regularly disinfect farrowing pens with approved agents.',
    icon: '🐖'
  },
  {
    id: '3',
    title: 'Avian Flu Awareness',
    category: 'Poultry',
    content: 'Maintain netting to prevent contact with wild birds and monitor water sources for contamination.',
    icon: '🐔'
  },
  {
    id: '4',
    title: 'Waste Management',
    category: 'General',
    content: 'Dispose of carcasses promptly and ensure manure is composted at temperatures that kill pathogens.',
    icon: '♻️'
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', category: 'Entry', task: 'Visitor logbook signed and verified', completed: false },
  { id: 'c2', category: 'Sanitation', task: 'Footbaths refreshed with active disinfectant', completed: true },
  { id: 'c3', category: 'Monitoring', task: 'Morning temperature checks completed', completed: true },
  { id: 'c4', category: 'Vaccination', task: 'Review upcoming scheduled vaccinations', completed: false },
  { id: 'c5', category: 'Sanitation', task: 'Loading bay pressure washed', completed: false },
];
