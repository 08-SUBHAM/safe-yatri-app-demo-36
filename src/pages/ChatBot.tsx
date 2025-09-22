import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, MapPin, Clock, Phone, Star, Mic, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const ChatBot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Mock responses for common queries
  const botResponses: { [key: string]: any } = {
    "bus stop": {
      text: "🚌 Here are the nearest bus stops to Police Bazaar:\n\n• **Police Bazaar Bus Stand** - 2 min walk\n• **Khyndai Lad Bus Stop** - 5 min walk\n• **Motphran Bus Stand** - 8 min walk\n\nBuses: Shillong City Bus, MTDC Services",
      isBot: true,
      timestamp: new Date(),
      suggestions: ["Nearest bus stop", "Good restaurants", "Find ATM", "Police station", "Hospital nearby"]
    },
    "restaurant": {
      text: "🍽️ **Popular restaurants near you:**\n\n• **Karim's** (Mughlai) - 4.5⭐ | 15 min\n• **Saravana Bhavan** (South Indian) - 4.3⭐ | 10 min\n• **United Coffee House** (Continental) - 4.2⭐ | 8 min\n\n*All are tourist-friendly with English menus*",
      suggestions: ["Food delivery", "Vegetarian options", "Street food safety"]
    },
    "hospital": {
      text: "🏥 **Nearest medical facilities:**\n\n• **All India Institute of Medical Sciences (AIIMS)** - 20 min\n• **Ram Manohar Lohia Hospital** - 15 min\n• **Apollo Pharmacy** (24/7) - 5 min walk\n\n**Emergency:** Call 102 for ambulance",
      suggestions: ["Emergency numbers", "Pharmacy locations", "Insurance help"]
    },
    "atm": {
      text: "🏧 **ATMs near Police Bazaar:**\n\n• **SBI ATM** - Police Bazaar Main Road (2 min)\n• **HDFC Bank ATM** - Khyndai Lad (3 min)\n• **ICICI Bank ATM** - Laitumkhrah (5 min)\n\n*All accept international cards*",
      suggestions: ["Currency exchange", "Bank branches", "Money transfer"]
    },
    "police": {
      text: "👮 **Police assistance:**\n\n• **Sadar Police Station** - 3 min walk\n• **Tourist Helpline:** 1363\n• **Women's Helpline:** 1091\n• **Emergency:** 100\n\n*Tourist police available 24/7*",
      suggestions: ["Report incident", "Lost passport help", "Safety tips"]
    }
  };

  const initialMessage: Message = {
    id: 1,
    text: "🙏 Namaste! I'm your local enquiry assistant. I can help you find nearby places, transport options, emergency services, and answer questions in your preferred language.\n\nHow can I help you today?",
    isBot: true,
    timestamp: new Date(),
    suggestions: ["Nearest bus stop", "Good restaurants", "Find ATM", "Police station", "Hospital nearby"]
  };

  useEffect(() => {
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Setup speech recognition instance when listening toggles on
  useEffect(() => {
    if (!isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
        recognitionRef.current = null;
      }
      return;
    }

    // @ts-ignore
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: "Voice not supported",
        description: "Your browser does not support speech recognition.",
        variant: "destructive",
      });
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0])
        .map((r: any) => r.transcript)
        .join('');
      setInputText(transcript);
    };

    recognition.onerror = () => {
      toast({ title: "Voice error", description: "Could not process voice input", variant: "destructive" });
      setIsListening(false);
    };

    recognition.onend = () => {
      // Automatically stop listening UI when recognition ends
      setIsListening(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      setIsListening(false);
    }

    return () => {
      try { recognition.stop(); } catch {}
    };
  }, [isListening, toast]);

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  const findBestResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerQuery.includes(key) || 
          lowerQuery.includes(key + "s") ||
          (key === "bus stop" && (lowerQuery.includes("bus") || lowerQuery.includes("transport"))) ||
          (key === "restaurant" && (lowerQuery.includes("food") || lowerQuery.includes("eat"))) ||
          (key === "hospital" && (lowerQuery.includes("medical") || lowerQuery.includes("doctor"))) ||
          (key === "police" && (lowerQuery.includes("help") || lowerQuery.includes("emergency")))) {
        return response;
      }
    }

    // Default response
    return {
      text: "I understand you're looking for local information. Could you please be more specific? I can help you find:\n\n• Transportation (buses, metro, taxis)\n• Food & restaurants\n• Medical facilities\n• Banks & ATMs\n• Police & emergency services\n• Tourist attractions",
      suggestions: ["Nearest bus stop", "Good restaurants", "Find ATM", "Emergency help"]
    };
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const response = findBestResponse(messageText);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Show toast for important responses
      if (messageText.toLowerCase().includes("emergency") || messageText.toLowerCase().includes("help")) {
        toast({
          title: "Emergency Information Provided",
          description: "Important: Save emergency numbers for quick access",
        });
      }
    }, 1500);
  };

  const quickResponses = [
    "Nearest bus stop",
    "Good restaurants", 
    "Find ATM",
    "Police station",
    "Hospital nearby"
  ];

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="bg-gradient-safety text-white p-4 flex-shrink-0">
          <div className="flex items-center mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-white/10 mr-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Local Enquiry ChatBot</h1>
              <p className="text-sm opacity-90">AI assistant for local information</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm opacity-90 gap-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
              <span>Online & Ready to Help</span>
            </div>
            <div className="flex items-center bg-white/15 px-2 py-0.5 rounded-full text-xs">
              <Mic className="w-3 h-3 mr-1" /> Voice Ready
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] ${message.isBot ? 'order-1' : 'order-2'}`}>
                <Card className={`${
                  message.isBot 
                    ? 'bg-muted/50 border-muted' 
                    : 'bg-gradient-safety text-white border-primary'
                }`}>
                  <CardContent className="p-3">
                    <div className="text-sm whitespace-pre-line">{message.text}</div>
                    {message.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleSendMessage(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                <div className={`text-xs text-muted-foreground mt-1 ${
                  message.isBot ? 'text-left' : 'text-right'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <Card className="bg-muted/50 border-muted">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Response Buttons */}
        <div className="p-4 border-t bg-muted/20">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickResponses.map((response) => (
              <Button
                key={response}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSendMessage(response)}
              >
                {response}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-background flex-shrink-0">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about nearby places, transport, help..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={toggleListening}
              variant={isListening ? 'destructive' : 'outline'}
              className={`${isListening ? 'bg-red-600 hover:bg-red-700 text-white' : ''}`}
              disabled={isTyping}
              title={isListening ? 'Stop voice input' : 'Start voice input'}
            >
              {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-safety hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-2">
            <p className="text-xs text-muted-foreground">
              Powered by SafeYatri AI • Available in multiple languages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;