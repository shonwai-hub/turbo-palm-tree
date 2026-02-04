export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum EmailCategory {
  WORK = 'Work',
  SALES = 'Sales',
  PERSONAL = 'Personal',
  SPAM = 'Spam',
  UNCLASSIFIED = 'Unclassified'
}

export interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  date: string;
  category: EmailCategory;
  summary?: string;
  actionRequired: boolean;
}

export interface Client {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  status: 'Lead' | 'Negotiation' | 'Closed';
  lastContact: string;
}

export interface Quotation {
  id: string;
  clientId: string;
  items: { description: string; cost: number }[];
  marginPercent: number;
  totalPrice: number;
  generatedContent: string;
  createdAt: string;
}

export interface DocumentFile {
  id: string;
  name: string;
  type: 'pdf' | 'pptx' | 'docx' | 'txt';
  source: 'Google Drive' | 'OneDrive' | 'Local';
  contentSnippet: string; // Simulated content for RAG
  tags: string[];
}
