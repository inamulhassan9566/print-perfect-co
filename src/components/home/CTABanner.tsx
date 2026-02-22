import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTABanner = () => {
  return (
    <section className="section-padding bg-accent">
      <div className="container-custom text-center">
        <h2 className="heading-section text-accent-foreground mb-4">Create Your Custom Shirt Today</h2>
        <p className="text-accent-foreground/80 max-w-lg mx-auto mb-8 text-lg">
          Upload your design, preview it live, and order in minutes. It's that simple.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-10 h-12 text-base font-semibold">
          <Link to="/design">
            Start Designing Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTABanner;
