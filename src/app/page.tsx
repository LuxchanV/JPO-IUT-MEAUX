import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WhyCards from "@/components/WhyCards";
import InfoCards from "@/components/InfoCards";
import ProgramTimeline from "@/components/ProgramTimeline";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />

      <Section
        id="pourquoi"
        title="Pourquoi venir ?"
        subtitle="Une visite courte, utile et rassurante : repartez avec des réponses claires."
      >
        <WhyCards />
      </Section>

      <Section
        id="infos"
        title="Infos pratiques"
        subtitle="Horaires, adresse et accès en un clic."
      >
        <InfoCards />
      </Section>

      <Section
        id="programme"
        title="Programme de la journée"
        subtitle="Un déroulé simple et fluide pour organiser votre visite."
      >
        <ProgramTimeline />
      </Section>

      <Footer />
    </>
  );
}
