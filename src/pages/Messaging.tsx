
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatComponent from '@/components/chat/ChatComponent';

const Messaging = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
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
      </main>
      <Footer />
    </>
  );
};

export default Messaging;
