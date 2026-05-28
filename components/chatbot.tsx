"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  HelpCircle,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import FocusTrap from "focus-trap-react";
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { siteConfig } from "@/lib/site";

// Personal data that the assistant will use as system prompt
const PERSONAL_DATA = `
You are a chatbot representing Abishek Khadka.
You must answer using the following data:

Name: Abishek Khadka
Role: Full‑Stack Developer from Nepal
GitHub: https://github.com/khadka27
Email: ${siteConfig.email}
LinkedIn: https://www.linkedin.com/in/khadka27
Experience: 1.5 years (including 1 year at Fishtail Infosolutions)
Skills: Next.js, Node.js, Tailwind, MongoDB, PostgreSQL, Socket.io, DevOps, React, TypeScript
Services: Full‑stack development, APIs, dashboards, SaaS, real‑time apps, deployments
`;

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatMessageProps {
  message: Message;
  isLastAssistantMessage: boolean;
  prefersReducedMotion: boolean;
}

const ChatMessage = ({
  message,
  isLastAssistantMessage,
  prefersReducedMotion,
}: ChatMessageProps) => {
  const isUser = message.role === "user";
  const [displayedContent, setDisplayedContent] = useState("");

  useEffect(() => {
    if (
      message.role === "assistant" &&
      isLastAssistantMessage &&
      message.content
    ) {
      if (prefersReducedMotion) {
        setDisplayedContent(message.content);
        return;
      }
      setDisplayedContent("");
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < message.content.length) {
          setDisplayedContent((prev) => prev + message.content.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 10); // Faster typing speed
      return () => clearInterval(typingInterval);
    } else {
      setDisplayedContent(message.content);
    }
  }, [
    message.content,
    message.role,
    isLastAssistantMessage,
    prefersReducedMotion,
  ]);

  return (
    <div className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg max-w-[85%] text-sm break-words ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <div className="flex items-start">
          {isUser ? (
            <User className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          ) : (
            <Bot className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          )}
          <div className="whitespace-pre-wrap">
            {displayedContent}
            {message.role === "assistant" &&
              isLastAssistantMessage &&
              !prefersReducedMotion &&
              displayedContent.length < message.content.length && (
                <span
                  className="inline-block w-1 h-4 bg-foreground animate-pulse ml-0.5"
                  aria-hidden="true"
                ></span>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

const suggestedQuestions = [
  "What are Abishek's skills?",
  "Tell me about his recent projects.",
  "What's his professional experience?",
  "How can I contact Abishek?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [engine, setEngine] = useState<any>(null);
  const [isEngineLoading, setIsEngineLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatToggleButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const initialMessageDisplayed = useRef(false);

  // Initialize WebLLM Engine
  useEffect(() => {
    async function loadEngine() {
      try {
        setIsEngineLoading(true);
        const model = await CreateMLCEngine("Llama-3.2-1B-Instruct-q4f16_1-MLC")
        setEngine(model)
        setIsEngineLoading(false);
      } catch (e) {
        console.error("Failed to load WebLLM engine", e);
        setIsEngineLoading(false);
      }
    }
    // Only load if not already loaded and chat is open
    if (isOpen && !engine && !isEngineLoading) {
      loadEngine();
    }
  }, [isOpen, engine, isEngineLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };
  useEffect(scrollToBottom, [messages, prefersReducedMotion]);

  const displayInitialMessage = () => {
    const initialBotMessage: Message = {
      id: "initial-greeting",
      role: "assistant",
      content: `Hello! I'm Abishek's virtual assistant. I can help you learn more about his skills, projects, and experience.\n\nYou can ask things like:\n${suggestedQuestions
        .map((q) => `• ${q}`)
        .join("\n")}`,
    };
    setMessages([initialBotMessage]);
    initialMessageDisplayed.current = true;
  };

  useEffect(() => {
    if (isOpen && messages.length === 0 && !initialMessageDisplayed.current)
      displayInitialMessage();
    else if (!isOpen) {
      // Don't reset initialMessageDisplayed so it doesn't pop up again if we just close/open
      // initialMessageDisplayed.current = false
      chatToggleButtonRef.current?.focus();
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const generateResponse = async (currentMessages: Message[]) => {
    if (!engine) return;

    setIsLoading(true);
    try {
      // Convert messages to format expected by WebLLM
      const apiMessages = currentMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await engine.chat.completions.create({
        messages: [{ role: "system", content: PERSONAL_DATA }, ...apiMessages],
      });

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: reply.choices[0].message.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat generation error", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "I'm sorry, I encountered an error generating a response. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !engine || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    await generateResponse(newMessages);
  };

  const handleSuggestedQuestionClick = async (question: string) => {
    if (!engine || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    await generateResponse(newMessages);
  };

  const handleClearChat = () => {
    setMessages([]);
    initialMessageDisplayed.current = false;
    displayInitialMessage();
  };

  return (
    <>
      <motion.div
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50"
        initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { delay: 1, duration: 0.5 }
        }
      >
        <Button
          ref={chatToggleButtonRef}
          onClick={toggleChat}
          size="icon"
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          aria-label={isOpen ? "Close chat" : "Open chat"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <FocusTrap
            active={isOpen}
            focusTrapOptions={{
              initialFocus: false,
              allowOutsideClick: true,
              returnFocusOnDeactivate: false,
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="chatbot-header"
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 50, scale: 0.9 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 50, scale: 0.9 }
              }
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { duration: 0.3 }
              }
              className="fixed bottom-44 md:bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm h-[65vh] md:h-[70vh] max-h-[500px] bg-card border border-border shadow-xl rounded-lg flex flex-col overflow-hidden"
            >
              <header className="p-4 border-b border-border flex items-center justify-between bg-background">
                <h3
                  id="chatbot-header"
                  className="font-semibold text-foreground"
                >
                  Chat with Abishek&apos;s Assistant
                </h3>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClearChat}
                    aria-label="Clear chat history"
                  >
                    <Trash2
                      size={18}
                      className="text-muted-foreground hover:text-destructive"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChat}
                    aria-label="Close chat window"
                  >
                    <X size={20} className="text-muted-foreground" />
                  </Button>
                </div>
              </header>
              <div
                className="flex-grow p-4 overflow-y-auto space-y-2 bg-background/50"
                aria-live="polite"
              >
                {isEngineLoading && messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <p className="text-sm">Loading AI Model...</p>
                    <p className="text-xs opacity-70">
                      (This happens only once)
                    </p>
                  </div>
                )}

                {messages.map((m, index) => (
                  <ChatMessage
                    key={m.id}
                    message={m}
                    isLastAssistantMessage={
                      m.role === "assistant" && index === messages.length - 1
                    }
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}

                {isLoading && (
                  <div
                    className="flex mb-3 justify-start"
                    aria-label="Bot is typing"
                  >
                    <div className="p-3 rounded-lg max-w-[85%] text-sm bg-muted text-muted-foreground">
                      <div className="flex items-center">
                        <Bot className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="italic">Bot is typing</span>
                        <Loader2 className="w-3 h-3 ml-1.5 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}

                {messages.length > 0 &&
                  messages[messages.length - 1].id === "initial-greeting" &&
                  messages[messages.length - 1].role === "assistant" &&
                  !isLoading && (
                    <div
                      className="mt-3 space-y-2"
                      role="group"
                      aria-label="Suggested questions"
                    >
                      {suggestedQuestions.map((q, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 text-xs border-primary/30 hover:bg-primary/10 text-primary"
                          onClick={() => handleSuggestedQuestionClick(q)}
                          aria-label={`Ask: ${q}`}
                          disabled={isLoading || isEngineLoading}
                        >
                          <HelpCircle className="w-3 h-3 mr-2 flex-shrink-0" />{" "}
                          {q}
                        </Button>
                      ))}
                    </div>
                  )}
                <div ref={messagesEndRef} />
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-border bg-background"
              >
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder={
                      isEngineLoading
                        ? "Initializing AI..."
                        : "Ask about skills, projects..."
                    }
                    className="flex-grow bg-muted border-border focus:ring-primary focus:border-primary"
                    disabled={isLoading || isEngineLoading}
                    aria-label="Type your message"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || isEngineLoading || !input.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-transparent border-t-current rounded-full"
                        aria-label="Loading"
                      />
                    ) : (
                      <Send size={18} />
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </>
  );
}

function displayedContentFullyTyped(
  message: Message,
  prefersReducedMotion: boolean
): boolean {
  if (prefersReducedMotion) return true;
  if (message.id === "initial-greeting")
    return message.content.includes(
      suggestedQuestions[suggestedQuestions.length - 1]
    );
  return true;
}
