import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { products, Product } from "@/data/products";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TYPES = [
  { value: "all", label: "All" },
  { value: "basic", label: "Basic" },
  { value: "premium", label: "Premium" },
  { value: "oversized", label: "Oversized" },
];

const COLORS = ["All", "White", "Black", "Gray", "Navy", "Red", "Green"];

const Products = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("All");
  const [priceRange, setPriceRange] = useState([50]);
  const [showFilters, setShowFilters] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const filtered = products.filter((p) => {
    if (typeFilter !== "all" && p.type !== typeFilter) return false;
    if (colorFilter !== "All" && !p.colors.includes(colorFilter)) return false;
    if (p.price > priceRange[0]) return false;
    return true;
  });

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".product-card");
    if (cards.length === 0) return;
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power3.out" }
    );
  }, [filtered.length, typeFilter, colorFilter, priceRange]);

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container-custom text-center">
          <h1 className="heading-section text-primary-foreground mb-3">Our Products</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            Premium blanks ready for your custom design. Choose your base, then make it yours.
          </p>
        </div>
      </section>

      <div className="container-custom py-10 md:py-14">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-6">
          <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-60 flex-shrink-0 space-y-8`}
          >
            {/* Type */}
            <div>
              <h3 className="font-heading font-semibold text-foreground text-sm mb-3 uppercase tracking-wider">
                Type
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTypeFilter(t.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 text-left ${
                      typeFilter === t.value
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-card text-foreground border-border hover:border-accent/50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="font-heading font-semibold text-foreground text-sm mb-3 uppercase tracking-wider">
                Color
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColorFilter(c)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 text-left ${
                      colorFilter === c
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-card text-foreground border-border hover:border-accent/50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-heading font-semibold text-foreground text-sm mb-3 uppercase tracking-wider">
                Max Price
              </h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={20}
                max={50}
                step={1}
              />
              <p className="text-sm text-muted-foreground mt-2">Up to ${priceRange[0]}</p>
            </div>

            {/* Reset */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground"
              onClick={() => {
                setTypeFilter("all");
                setColorFilter("All");
                setPriceRange([50]);
              }}
            >
              <X className="w-3.5 h-3.5" /> Reset Filters
            </Button>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No products match your filters.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setTypeFilter("all");
                    setColorFilter("All");
                    setPriceRange([50]);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div
                ref={gridRef}
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => (
  <Link
    to={`/products/${product.id}`}
    className="product-card group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300"
  >
    <div className="aspect-square bg-secondary flex items-center justify-center overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="w-2/3 h-2/3 object-contain group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-5">
      <span className="text-xs uppercase tracking-wider text-accent font-semibold">{product.type}</span>
      <h3 className="font-heading font-semibold text-foreground mt-1 group-hover:text-accent transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
      <p className="text-lg font-bold text-foreground mt-3">${product.price}</p>
    </div>
  </Link>
);

export default Products;
