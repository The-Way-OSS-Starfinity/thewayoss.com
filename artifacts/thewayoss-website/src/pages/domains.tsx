import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { useMeta } from "@/lib/meta";

export default function DomainsPage() {
  useMeta({
    title: "Six Practices — Where Leaders Are Being Forged",
    description: "The six domains where The Way OSS is being practiced — from the mat to the studio to the workshop. Entries coming soon.",
    url: "/domains",
  });

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "80px", minHeight: "100vh", background: "#F5F2EC" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "96px 32px" }}>
          <p className="font-mono-meta" style={{ color: "#5C5750" }}>WHERE LEADERS ARE BEING FORGED</p>
          <h1 className="font-fraunces" style={{ fontSize: "48px", fontWeight: 400, color: "#1A1816", marginTop: "16px" }}>Six Practices</h1>
          <p style={{ fontFamily: "'Inter Variable', Inter, sans-serif", fontSize: "18px", color: "#5C5750", lineHeight: 1.6, marginTop: "24px" }}>Entries coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}