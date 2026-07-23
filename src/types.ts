export interface User {
  email: string;
  tier: 'freemium' | 'general' | 'premium';
}

export interface Report {
  id: number;
  company_name: string;
  industry: string;
  published_date: string;
  summary: string;
  content: string;
  tier_required: 'freemium' | 'general' | 'premium';
}
