import { AuditExperience } from "@/components/AuditExperience";
import { BookCta } from "@/components/BookCta";
import { DemoChat } from "@/components/DemoChat";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Proof } from "@/components/Proof";
import { Systems } from "@/components/Systems";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <AuditExperience />
        <Systems />
        <DemoChat />
        <Proof />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}
