export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  mode?: string
  timestamp: Date;
  attachments?: Array<(
    {
      file_name: string;
      url: string;
    }

  )>;
} 