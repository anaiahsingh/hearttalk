import { Emotion } from '../navigation/types';

export const emotions: Emotion[] = [
  // Core negative emotions
  {
    id: 'sad',
    label: 'Sad',
    color: '#6B7FD7',
  },
  {
    id: 'disappointed',
    label: 'Disappointed',
    color: '#8E6B8E',
  },
  {
    id: 'angry',
    label: 'Angry',
    color: '#D75A5A',
  },
  {
    id: 'lonely',
    label: 'Lonely',
    color: '#7B8B9A',
  },
  {
    id: 'unmotivated',
    label: 'Unmotivated',
    color: '#9A7B7B',
  },
  {
    id: 'anxious',
    label: 'Anxious',
    color: '#D7A35A',
  },
  // Mental health related
  {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    color: '#8B4513',
  },
  {
    id: 'stressed',
    label: 'Stressed',
    color: '#CD853F',
  },
  {
    id: 'exhausted',
    label: 'Exhausted',
    color: '#696969',
  },
  // Self-perception
  {
    id: 'insecure',
    label: 'Insecure',
    color: '#9370DB',
  },
  {
    id: 'inadequate',
    label: 'Not Good Enough',
    color: '#483D8B',
  },
  {
    id: 'lost',
    label: 'Lost',
    color: '#4682B4',
  },
  // Relationship related
  {
    id: 'heartbroken',
    label: 'Heartbroken',
    color: '#CD5C5C',
  },
  {
    id: 'rejected',
    label: 'Rejected',
    color: '#8B0000',
  },
  {
    id: 'misunderstood',
    label: 'Misunderstood',
    color: '#4B0082',
  },
  // Academic/Career related
  {
    id: 'pressured',
    label: 'Pressured',
    color: '#556B2F',
  },
  {
    id: 'stuck',
    label: 'Stuck',
    color: '#2F4F4F',
  },
  {
    id: 'confused',
    label: 'Confused',
    color: '#5F9EA0',
  },
  // Social anxiety related
  {
    id: 'awkward',
    label: 'Socially Awkward',
    color: '#8FBC8F',
  },
  {
    id: 'excluded',
    label: 'Left Out',
    color: '#BC8F8F',
  },
  // Future related
  {
    id: 'worried',
    label: 'Worried About Future',
    color: '#6B8E23',
  },
  {
    id: 'uncertain',
    label: 'Uncertain',
    color: '#708090',
  },
  // Family related
  {
    id: 'misunderstood_family',
    label: 'Family Issues',
    color: '#B8860B',
  },
  {
    id: 'pressured_family',
    label: 'Family Pressure',
    color: '#DAA520',
  }
];

// Group emotions by category for better organization
export const emotionCategories = {
  core: ['sad', 'disappointed', 'angry', 'lonely', 'unmotivated', 'anxious'],
  mentalHealth: ['overwhelmed', 'stressed', 'exhausted'],
  selfPerception: ['insecure', 'inadequate', 'lost'],
  relationships: ['heartbroken', 'rejected', 'misunderstood'],
  academicCareer: ['pressured', 'stuck', 'confused'],
  social: ['awkward', 'excluded'],
  future: ['worried', 'uncertain'],
  family: ['misunderstood_family', 'pressured_family']
};

// Helper function to get emotions by category
export const getEmotionsByCategory = (category: keyof typeof emotionCategories) => {
  return emotions.filter(emotion => emotionCategories[category].includes(emotion.id));
}; 