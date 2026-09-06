import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="flex-1">
        <CustomCursor />
        <Navbar />

        {/* Hero stays pinned — About slides over it on scroll */}
        <div className="hero-sticky-wrapper">
          <HeroSection />
        </div>

        {/* Everything below overlays the pinned hero */}
        <div className="content-overlay">
          <AboutSection />
          <ProjectsSection />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
