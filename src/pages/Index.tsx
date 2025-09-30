import { useState } from "react"
import { LoginPage } from "@/components/LoginPage"
import { Navbar } from "@/components/Navbar"
import { ARSection } from "@/components/ARSection"
import { ExploreSection } from "@/components/ExploreSection"
import { CommunitySection } from "@/components/CommunitySection"
import { ProfileSection } from "@/components/ProfileSection"

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeSection, setActiveSection] = useState("ar")

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "ar":
        return <ARSection />
      case "explore":
        return <ExploreSection />
      case "community":
        return <CommunitySection />
      case "profile":
        return <ProfileSection />
      default:
        return <ARSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main>
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;

import * as React from "react";
import { Send, Loader2, MessageSquare, MapPin } from "lucide-react";
import { HeritageButton } from "@/components/ui/heritage-button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// --- Types ---
interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'gemini';
  sources: { uri: string; title: string }[];
}

// --- Constants (Matching the original HTML bot) ---
// Global variables will be available via the window object in a Canvas environment
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${""}`;

// --- Utility Functions (Adapted for React/TSX) ---

/**
 * Retries the API call with exponential backoff.
 */
async function fetchWithBackoff(fn: () => Promise<any>, retries = 5, delay = 1000): Promise<any> {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) {
            throw error;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithBackoff(fn, retries - 1, delay * 2);
    }
}

/**
 * The main Chatbot component.
 */
export const SanskrutiChatbot = () => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  // Initial welcome message effect
  React.useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Namaskar! I am sansकृति AI, your expert on the incredible heritage of Odisha, from the majestic Konark Sun Temple to the ancient history of Kalinga. What would you like to explore today?",
        sender: 'gemini',
        sources: [],
      }
    ]);
  }, []);

  // Auto-scroll to bottom whenever messages change
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const userQuery = input.trim();
    if (!userQuery || isLoading) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      text: userQuery,
      sender: 'user',
      sources: [],
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    const systemPrompt = "You are a dedicated and highly knowledgeable expert on the history and heritage sites of Odisha, India. Your responses must be informative, detailed, and directly relevant to Odisha's culture, monuments, temples (like Konark, Jagannath), archaeological sites, and historical events. Always answer in a conversational and enthusiastic tone. You are assisting a user in exploring this heritage. Use Google Search for up-to-date and accurate information.";

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    try {
        const apiCall = async () => {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`API Request failed with status ${response.status}: ${errorBody.error.message}`);
            }
            return response.json();
        };

        const result = await fetchWithBackoff(apiCall);
        
        const candidate = result.candidates?.[0];
        let generatedText = "Sorry, I couldn't process that request at the moment. Please try again or rephrase your question.";
        let sources: { uri: string; title: string }[] = [];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            generatedText = candidate.content.parts[0].text;
            
            const groundingMetadata = candidate.groundingMetadata;
            if (groundingMetadata && groundingMetadata.groundingAttributions) {
                sources = groundingMetadata.groundingAttributions
                    .map((attribution: any) => ({
                        uri: attribution.web?.uri,
                        title: attribution.web?.title,
                    }))
                    .filter((source: any) => source.uri && source.title);
            }
        } else if (candidate?.finishReason === 'SAFETY') {
            generatedText = "I apologize, but your request violated my safety policy. Please ask a question related to Odisha's heritage.";
        }

        const botMessage: ChatMessage = {
            id: Date.now() + 1,
            text: generatedText,
            sender: 'gemini',
            sources,
        };

        setMessages(prev => [...prev, botMessage]);

    } catch (error) {
        console.error("Gemini API Error:", error);
        const errorMessage: ChatMessage = {
            id: Date.now() + 1,
            text: "Oops! There was an issue connecting to the Gemini AI. Please try again.",
            sender: 'gemini',
            sources: [],
        };
        setMessages(prev => [...prev, errorMessage]);

    } finally {
        setIsLoading(false);
    }
  };

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.sender === 'user';
    const bubbleClasses = isUser 
        ? 'bg-user-bubble text-white rounded-br-lg rounded-tl-lg' 
        : 'bg-gemini-bubble text-foreground rounded-bl-lg rounded-tr-lg border border-heritage-stone';

    return (
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
        <Card className={`max-w-xs sm:max-w-md shadow-md ${bubbleClasses} transition-all duration-300 p-3`}>
          <CardContent className="p-0">
            {!isUser && (
              <p className="font-heritage font-semibold text-primary mb-1">
                sansकृति AI
              </p>
            )}
            <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
            
            {message.sources.length > 0 && (
              <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-muted-foreground">
                <p className="font-semibold mb-1">Source(s):</p>
                {message.sources.slice(0, 3).map((source, index) => (
                  <a 
                    key={index}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate text-primary hover:underline"
                  >
                    {index + 1}. {source.title}
                  </a>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Sheet>
      {/* Floating Trigger Button */}
      <SheetTrigger asChild>
        <HeritageButton 
          variant="heritage" 
          size="lg" 
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-2xl hover:shadow-primary/50"
          title="Open sansकृति AI Chat"
        >
          <MessageSquare className="w-6 h-6" />
        </HeritageButton>
      </SheetTrigger>

      {/* Chat Sheet Content (Modal Drawer) */}
      <SheetContent side="right" className="w-[90vw] sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b border-heritage-stone">
          <SheetTitle className="flex items-center gap-2 text-heritage-bronze font-heritage text-2xl">
            <MessageSquare className="w-6 h-6 text-primary" />
            sansकृति AI Chat
          </SheetTitle>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Odisha Heritage Expert
          </p>
        </SheetHeader>
        
        {/* Chat Messages Area */}
        <ScrollArea className="flex-1 p-4 space-y-4" viewportRef={scrollAreaRef}>
          <div className="flex flex-col space-y-4 pb-4">
            {messages.map(renderMessage)}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="max-w-xs bg-gemini-bubble text-foreground rounded-bl-lg rounded-tr-lg border border-heritage-stone shadow-md p-3">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <Card className="rounded-none border-t border-heritage-stone p-4">
          <CardContent className="p-0 flex items-center">
            <Input 
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  sendMessage();
                }
              }}
              placeholder="Ask about Konark, Puri, or Kalinga history..."
              className="flex-grow p-3 text-base border-heritage-stone focus:ring-primary focus:border-primary"
              disabled={isLoading}
            />
            <HeritageButton 
              onClick={sendMessage} 
              disabled={!input.trim() || isLoading}
              variant="heritage" 
              size="icon"
              className="ml-2 w-10 h-10 p-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </HeritageButton>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

