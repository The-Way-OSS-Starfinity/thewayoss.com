import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TheWhy from "@/components/sections/TheWhy";
import Pillars from "@/components/sections/Pillars";
import Domains from "@/components/sections/Domains";
import Journal from "@/components/sections/Journal";
import Voices from "@/components/sections/Voices";
import Threshold from "@/components/sections/Threshold";
import { useMeta } from "@/lib/meta";

export default function HomePage() {
  useMeta({ url: "/" });

  return (
    <div className="w-full bg-[#F5F2EC] min-h-screen">
      <Nav />
      <main>
        <Hero />
        <TheWhy />
        <Pillars />
        <Domains />
        <Journal />
        <Voices />
        <Threshold />
      </main>
      <Footer />
    </div>
  );
}