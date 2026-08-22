import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Portfolio from '@/components/Portfolio';
import Craft from '@/components/Craft';
import Pricing from '@/components/Pricing';
import Timeline from '@/components/Timeline';
import RemoteOrdering from '@/components/RemoteOrdering';
import Reviews from '@/components/Reviews';
import EnquiryForm from '@/components/EnquiryForm';
import Visit from '@/components/Visit';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />

        <Section id="portfolio" labelledBy="portfolio-heading">
          <Portfolio />
        </Section>

        <Section id="craft" labelledBy="craft-heading" tinted>
          <Craft />
        </Section>

        <Section id="pricing" labelledBy="pricing-heading">
          <Pricing />
        </Section>

        <Section id="timelines" labelledBy="timelines-heading" ruled>
          <Timeline />
        </Section>

        {/* Blush tint separates the remote path from the studio-visit path. */}
        <Section id="remote" labelledBy="remote-heading" tinted>
          <RemoteOrdering />
        </Section>

        <Section id="reviews" labelledBy="reviews-heading">
          <Reviews />
        </Section>

        <Section id="enquiry" labelledBy="enquiry-heading" ruled>
          <EnquiryForm />
        </Section>

        <Section id="visit" labelledBy="visit-heading" tinted>
          <Visit />
        </Section>

        <Section id="faq" labelledBy="faq-heading">
          <FAQ />
        </Section>
      </main>

      <Footer />
      <WhatsAppFab />
    </>
  );
}
