import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { id: "1", name: "Classic Cotton Tee", price: "$24.99", color: "bg-foreground" },
  { id: "2", name: "Premium Blend Tee", price: "$29.99", color: "bg-muted-foreground" },
  { id: "3", name: "Vintage Wash Tee", price: "$27.99", color: "bg-accent" },
  { id: "4", name: "Organic Essential Tee", price: "$32.99", color: "bg-foreground" },
  { id: "5", name: "Streetwear Drop Tee", price: "$34.99", color: "bg-muted-foreground" },
  { id: "6", name: "Relaxed Fit Tee", price: "$26.99", color: "bg-accent" },
];

const FeaturedProducts = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            ref.current!.querySelectorAll(".product-card"),
            { opacity: 0, y: 30, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-secondary/50">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="heading-section text-foreground mb-2">Featured T-Shirts</h2>
            <p className="text-muted-foreground">Our most popular blank canvases for your designs.</p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex rounded-xl">
            <Link to="/products">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="product-card group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 opacity-0"
            >
              <div className="aspect-square bg-secondary flex items-center justify-center relative overflow-hidden">
                <div className="w-32 h-40 rounded-lg bg-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-1">{p.name}</h3>
                <p className="text-accent font-bold">{p.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
