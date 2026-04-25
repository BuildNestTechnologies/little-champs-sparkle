import { Preloader } from "@/components/Preloader";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { Programs } from "@/components/sections/Programs";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FloatingCallButton } from "@/components/ui/FloatingCallButton";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Preloader />
      <TopBar />
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <ScrollStory />
        <Programs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingCallButton />
      <WhatsAppButton />
      <ChatBot />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Preschool",
            name: "Little Champs School",
            description: "Kindergarten and preschool in Bhiwandi offering Playgroup, Nursery, LKG and UKG with play-based learning.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kamatghar Road, Brahmanand Nagar",
              addressLocality: "Bhiwandi",
              addressRegion: "Maharashtra",
              postalCode: "421305",
              addressCountry: "IN",
            },
            telephone: "+91 73873 26222",
            email: "info@littlechampsschool.com",
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "6" },
            sameAs: ["https://instagram.com/little_champs_school"],
          }),
        }}
      />
    </div>
  );
};

export default Index;
