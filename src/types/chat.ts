export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  mode?: string
  timestamp: Date;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
} 