import { Contact } from "@/components/Contact/Contact";
import { Experience } from "@/components/Experience/Experience";
import { Expertise } from "@/components/Expertise/Expertise";
import { Hero } from "@/components/Hero/Hero";
import { Metrics } from "@/components/Metrics/Metrics";
import { Navbar } from "@/components/Navbar/Navbar";
import { PlatformStack } from "@/components/PlatformStack/PlatformStack";
import { Writing } from "@/components/Writing/Writing";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pratheek Shetty",
    jobTitle: "Technical Lead",
    url: "https://pratheekshetty.netlify.app",
    sameAs: [
      "https://www.linkedin.com/in/pratheek-shetty-10a173186",
      "https://pratheekshetty.medium.com",
    ],
    knowsAbout: [
      "Distributed systems",
      "Real-time data infrastructure",
      "Apache Kafka",
      "Apache Flink",
      "Apache Pinot",
      "PostgreSQL",
      "Cloud architecture",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Expertise />
        <PlatformStack />
        <Experience />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
