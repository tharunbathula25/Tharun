"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  from: "business" | "customer";
  text: string;
  time: string;
}

interface Option {
  prompt: string;
  reply: string;
}

/**
 * The sales demo, wearing the visitor's brand.
 * They talk to the booking agent for ninety seconds and understand the product.
 */
const OPTIONS: Option[] = [
  {
    prompt: "Table for two at 7pm tonight?",
    reply:
      "7pm works — I have two tables left 👍 Booking under your number now. Want the window seat or the courtyard?",
  },
  {
    prompt: "Are you open on Sunday?",
    reply:
      "Yes — Sunday we're open 8am to 11pm, kitchen closes at 10:30pm. Want me to hold a table?",
  },
  {
    prompt: "Do you have anything vegan?",
    reply:
      "Nine dishes, yes 🌱 The mushroom bowl and the harissa flatbread are what regulars order most. Should I send the full vegan menu?",
  },
  {
    prompt: "How much for a party of 12?",
    reply:
      "Groups of 10+ run ₹850 per head on the set menu, and we hold the mezzanine for you. I'll ask the owner to confirm the date — what day were you thinking?",
  },
];

const OPENING: Message[] = [
  {
    from: "business",
    text: "Hi 👋 This is your business, answering on WhatsApp. Ask it something a customer would ask.",
    time: "10:28",
  },
];

function now() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function DemoChat() {
  const [messages, setMessages] = useState<Message[]>(OPENING);
  const [typing, setTyping] = useState(false);
  const [used, setUsed] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, typing]);

  function ask(option: Option) {
    if (typing) return;

    setUsed((current) => [...current, option.prompt]);
    setMessages((current) => [
      ...current,
      { from: "customer", text: option.prompt, time: now() },
    ]);
    setTyping(true);

    // Under two seconds — the same promise the product makes.
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { from: "business", text: option.reply, time: now() },
      ]);
      setTyping(false);
    }, 1200);
  }

  const remaining = OPTIONS.filter((option) => !used.includes(option.prompt));

  return (
    <section
      id="demo"
      className="border-ink-line scroll-mt-24 border-t px-6 py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-chrome-dim text-xs tracking-[0.3em] uppercase">
            Live demo
          </p>
          <h2 className="headline mt-4 text-5xl text-balance md:text-6xl">
            <span className="text-metal">This is your </span>
            <span className="text-gold-metal">staff</span>
            <span className="text-metal"> at 2am.</span>
          </h2>
          <p className="text-chrome-dim mt-5 max-w-md leading-relaxed">
            Trained on your menu, your hours, your prices. It answers in under
            ten seconds, books the table, and hands you the conversation the
            moment it actually needs you.
          </p>
          <p className="text-chrome-dim mt-4 max-w-md text-sm">
            Try it — tap a question a real customer would send.
          </p>
        </div>

        {/* Floating white card, same grammar as the carousel mockups. */}
        <div className="mx-auto w-full max-w-sm rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3 rounded-t-3xl bg-[#075E54] px-4 py-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
              YB
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Your Business ✓
              </p>
              <p className="text-xs text-white/70">
                {typing ? "typing…" : "online"}
              </p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="h-80 space-y-3 overflow-y-auto bg-[#ECE5DD] p-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.from === "customer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm text-[#111] shadow-sm ${
                    message.from === "customer" ? "bg-[#DCF8C6]" : "bg-white"
                  }`}
                >
                  <p className="leading-snug">{message.text}</p>
                  <p className="mt-1 text-right text-[10px] text-black/40">
                    {message.time}
                  </p>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-white px-3 py-2.5 shadow-sm">
                  <span className="flex gap-1">
                    <span className="size-1.5 animate-bounce rounded-full bg-black/30 [animation-delay:0ms]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-black/30 [animation-delay:150ms]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-black/30 [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 rounded-b-3xl bg-white p-3">
            {remaining.length > 0 ? (
              remaining.map((option) => (
                <button
                  key={option.prompt}
                  onClick={() => ask(option)}
                  disabled={typing}
                  className="rounded-full border border-[#075E54]/30 px-3 py-1.5 text-xs text-[#075E54] transition-colors hover:bg-[#075E54] hover:text-white disabled:opacity-40"
                >
                  {option.prompt}
                </button>
              ))
            ) : (
              <p className="w-full py-1 text-center text-xs text-black/50">
                That&apos;s the whole product. It never sleeps.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
