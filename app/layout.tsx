import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tharunaistudio.com"),
  title: {
    default: "Tharun AI Studio — AI systems for modern businesses",
    template: "%s · Tharun AI Studio",
  },
  description:
    "Score your business's online presence in 20 seconds. Then we build the AI systems that fix it — smart websites, WhatsApp automation, reservations, AI support.",
  openGraph: {
    title: "Tharun AI Studio — AI systems for modern businesses",
    description:
      "Run a free 20-second audit of your Google presence. See exactly what it's costing you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="bg-ink text-chrome flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
