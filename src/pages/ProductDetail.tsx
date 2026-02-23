import { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Palette, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import gsap from "gsap";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (!pageRef.current || !product) return;
    const ctx = gsap.context(() => {
      gsap.from(".detail-section", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-section mb-4">Product Not Found</h1>
          <Button variant="outline" onClick={() => navigate("/products")}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container-custom pt-6">
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>
      </div>

      <section className="container-custom py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* Image */}
          <div className="detail-section bg-secondary rounded-2xl aspect-square flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-2/3 h-2/3 object-contain"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="detail-section">
              <span className="text-xs uppercase tracking-wider text-accent font-semibold">
                {product.type}
              </span>
              <h1 className="heading-section mt-1">{product.name}</h1>
              <p className="text-3xl font-extrabold text-accent mt-3">${product.price}</p>
            </div>

            <div className="detail-section">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="detail-section space-y-3">
              <div className="flex items-start gap-3">
                <Ruler className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Material</p>
                  <p className="text-sm text-muted-foreground">{product.material}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Care Instructions</p>
                  <p className="text-sm text-muted-foreground">{product.care}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Palette className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Available Colors</p>
                  <p className="text-sm text-muted-foreground">{product.colors.join(", ")}</p>
                </div>
              </div>
            </div>

            <div className="detail-section flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                className="flex-1 h-12 bg-accent text-accent-foreground hover:bg-accent/90 gap-2 text-base"
              >
                <Link to="/design">
                  <Sparkles className="w-4 h-4" /> Customize This Shirt
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 h-12 text-base">
                <Link to="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
