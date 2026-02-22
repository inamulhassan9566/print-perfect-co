import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(heroRef.current.querySelector(".hero-badge"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(heroRef.current.querySelector("h1"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2")
      .fromTo(heroRef.current.querySelector(".hero-sub"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(heroRef.current.querySelector(".hero-buttons"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <div className="hero-badge inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-8 opacity-0">
            <Sparkles className="w-4 h-4" />
            Premium Print-On-Demand
          </div>

          <h1 className="heading-hero text-primary-foreground mb-6 opacity-0">
            Design Your Own
            <br />
            <span className="text-accent">Custom T-Shirt</span>
          </h1>

          <p className="hero-sub text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-10 leading-relaxed opacity-0">
            Upload your artwork, preview it live on a premium mockup, choose your perfect fit, and order in minutes. Quality printing, delivered fast.
          </p>

          <div className="hero-buttons flex flex-wrap gap-4 opacity-0">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-8 h-12 text-base font-semibold">
              <Link to="/design">
                Start Designing
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl px-8 h-12 text-base">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Orb */}
      <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;
