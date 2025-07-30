import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const mockMessages = [
  { id: 1, sender: 'Alex Kim', content: 'Hey! Anyone working with TensorFlow lately?', time: '10:30 AM', sent: false },
  { id: 2, sender: 'You', content: 'Yes! Just finished a neural network project', time: '10:32 AM', sent: true },
  { id: 3, sender: 'Alex Kim', content: 'const model = tf.sequential({\n  layers: [\n    tf.layers.dense({units: 128, activation: "relu"})\n  ]\n});', time: '10:33 AM', sent: false },
];

const Chat = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">Chat with Alex Kim 🧑‍💻</h2>
      </div>
      
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {mockMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
            <div className={msg.sent ? 'chat-message-sent' : 'chat-message-received'}>
              {msg.content.includes('const ') ? (
                <pre className="text-sm"><code>{msg.content}</code></pre>
              ) : (
                <p>{msg.content}</p>
              )}
              <p className="text-xs opacity-70 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4 flex gap-2">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1"
        />
        <Button size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;