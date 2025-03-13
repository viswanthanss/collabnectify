
import React from 'react';
import { Shell } from "@/components/settings/Shell";
import ChatComponent from '@/components/chat/ChatComponent';

const Messaging = () => {
  return (
    <Shell>
      <section className="section-container">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="font-bold mb-2">Connect & Chat</h2>
              <p className="text-muted-foreground text-lg">
                Build your network and chat with professionals in your field
              </p>
            </div>
          </div>
          
          <ChatComponent />
        </div>
      </section>
    </Shell>
  );
};

export default Messaging;
