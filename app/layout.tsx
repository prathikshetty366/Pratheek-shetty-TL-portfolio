import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pratheekshetty.dev"),
  title: "Pratheek Shetty — Technical Lead, Distributed Systems",
  description:
    "Technical Lead specializing in distributed systems, real-time telemetry, backend platforms, event-driven infrastructure, and enterprise data lakes.",
  keywords: [
    "Pratheek Shetty",
    "Technical Lead",
    "Distributed Systems",
    "Real-Time Data Infrastructure",
    "Kafka",
    "Apache Flink",
    "Apache Pinot",
    "Node.js",
    "System Design",
  ],
  openGraph: {
    title: "Pratheek Shetty — Technical Lead",
    description: "Distributed systems, backend platforms, and real-time data infrastructure.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
