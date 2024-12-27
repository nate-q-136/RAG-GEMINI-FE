# RAG Gemini Frontend

A frontend application designed for chat systems leveraging Google Gemini Pro with Retrieval Augmented Generation (RAG) capabilities. This application allows users to interact with AI and upload documents for document-based conversations.

![Demo GIF](demo.gif)

## 🌟 Features

- **Real-time Chat Interface**
- **File Upload Support** for:
  - PDF
  - DOCX
  - CSV
- **WebSocket Integration** for real-time communication
- **Responsive Design**
- **Loading States & Animations**

## 🔧 Tech Stack

- **Next.js 14** (React Framework)
- **TypeScript**
- **Tailwind CSS** (Styling)
- **WebSocket** (Real-time Communication)

## 🚀 Installation Guide

### Prerequisites

- Node.js 18+
- npm or yarn
- WebSocket server endpoint

### Setup Steps

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/rag-gemini-frontend.git
cd rag-gemini-frontend
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the Development Server**
```bash
npm run dev
# or
yarn dev
```

## 🔌 WebSocket Integration

### Connection Setup
```javascript
const ws = new WebSocket('ws://your-backend-url/ws/chat/');
```

### Message Format
```json
// Send message
{
  "type": "chat",
  "message": "string",
  "attachments": [
    {
      "name": "file_name.pdf",
      "url": "url_file"
    }
  ]
}

// Receive message
{
  "message": "gemini_answer"
}
```

## 📁 Project Structure
```
rag_gemini_frontend/
├── src/
│   ├── components/        # React components
│   │   ├── chat/         # Chat-related components
│   │   └── ui/           # Common UI components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── public/               # Static files
└── next.config.js        # Next.js configuration
```

## 🔗 Key Components

### ChatContainer
- Main container for the chat interface
- Manages WebSocket connection
- Handles message display and sending

### ChatInput
- Manages user input and file uploads
- Displays loading states

### ChatMessages
- Displays chat history
- Auto-scroll functionality
- Message formatting

## 🎨 Styling

- **Tailwind CSS** for responsive design

## 🔗 Useful Links

- **[Backend Repository](https://github.com/your-username/rag-gemini-backend)**


## 🔒 Security Guidelines

- Never commit sensitive data to version control
- Use environment variables for configuration
- Implement robust error handling
- Validate WebSocket connections to prevent vulnerabilities

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** – [GitHub](https://github.com/your-username)

## 🙏 Acknowledgments

- **Next.js Team**
- **Tailwind CSS Team**
- **Open Source Community**

