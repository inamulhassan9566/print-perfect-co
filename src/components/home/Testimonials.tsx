import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  { name: "Sarah M.", role: "Entrepreneur", text: "The print quality exceeded my expectations. Colors are vibrant and the fabric feels premium. Will definitely order again!", rating: 5 },
  { name: "James K.", role: "Band Manager", text: "We ordered 200 custom shirts for our tour. Fast turnaround, incredible quality, and the live preview tool made it so easy.", rating: 5 },
  { name: "Emily R.", role: "Designer", text: "As a graphic designer, color accuracy is everything. PrintCraft nails it every time. My go-to for client merch.", rating: 5 },
  { name: "David L.", role: "Event Planner", text: "Ordered custom tees for a corporate event. The process was seamless and everyone loved the quality. Highly recommend!", rating: 5 },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const card = ref.current.querySelector(".testimonial-active");
    if (card) {
      gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
    }
  }, [current]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section ref={ref} className="section-padding bg-secondary/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-section text-foreground mb-4">What Our Customers Say</h2>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="testimonial-active bg-card rounded-2xl border border-border p-10">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-lg text-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
            <p className="font-heading font-semibold text-foreground">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full" aria-label="Previous testimonial">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-border"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full" aria-label="Next testimonial">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
