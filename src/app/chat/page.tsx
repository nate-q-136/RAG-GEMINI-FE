import ChatContainer from '@/components/chat/ChatContainer';
import Header from '@/components/chat/Header';

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Header />
      <div className="pt-4">
        <ChatContainer />
      </div>
    </main>
  );
} 