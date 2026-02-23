import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Minus, Plus, ShoppingCart, Zap, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import gsap from "gsap";

const SHIRT_COLORS = [
  { name: "White", value: "#FFFFFF", border: true },
  { name: "Black", value: "#111111" },
  { name: "Navy", value: "#1E3A5F" },
  { name: "Red", value: "#DC2626" },
  { name: "Forest Green", value: "#166534" },
  { name: "Gray", value: "#6B7280" },
  { name: "Royal Blue", value: "#2563EB" },
  { name: "Maroon", value: "#7F1D1D" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

const PRICE_PER_SHIRT = 29.99;

const DesignOrder = () => {
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [designFileName, setDesignFileName] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState(SHIRT_COLORS[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".customizer-panel", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleFile = useCallback((file: File) => {
    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PNG, JPG, or SVG file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setDesignImage(e.target?.result as string);
      setDesignFileName(file.name);
    };
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const clearDesign = () => {
    setDesignImage(null);
    setDesignFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addToCart = () => {
    addItem({
      id: `custom-${Date.now()}`,
      name: "Custom T-Shirt",
      color: selectedColor.name,
      size: selectedSize,
      quantity,
      price: PRICE_PER_SHIRT,
      designImage: designImage || undefined,
    });
    toast.success("Added to cart!");
  };

  const totalPrice = (PRICE_PER_SHIRT * quantity).toFixed(2);
  const isLightShirt = ["#FFFFFF", "#F3F4F6"].includes(selectedColor.value);

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container-custom text-center">
          <h1 className="heading-section text-primary-foreground mb-3">
            Design Your Custom T-Shirt
          </h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            Upload your artwork, pick your style, and preview it live on our premium shirts.
          </p>
        </div>
      </section>

      <div className="container-custom py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">
          {/* LEFT — Controls */}
          <div className="space-y-8">
            {/* Upload */}
            <div className="customizer-panel bg-card rounded-xl border border-border p-6 md:p-8">
              <Label className="heading-sub mb-4 block">1. Upload Your Design</Label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 md:p-10 text-center cursor-pointer transition-all duration-200 ${
                  isDragOver
                    ? "border-accent bg-accent/5 scale-[1.01]"
                    : "border-border hover:border-accent/50 hover:bg-secondary/50"
                }`}
              >
                {designImage ? (
                  <div className="space-y-3">
                    <img
                      src={designImage}
                      alt="Your design"
                      className="mx-auto max-h-32 object-contain rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground truncate max-w-xs mx-auto">
                      {designFileName}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearDesign();
                      }}
                      className="gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Replace
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Drag & drop your design here
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG, or SVG — up to 10MB
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="pointer-events-none">
                      Browse Files
                    </Button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  className="hidden"
                  onChange={onFileChange}
                />
              </div>
            </div>

            {/* Color Picker */}
            <div className="customizer-panel bg-card rounded-xl border border-border p-6 md:p-8">
              <Label className="heading-sub mb-4 block">2. Choose Shirt Color</Label>
              <div className="flex flex-wrap gap-3">
                {SHIRT_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-10 h-10 rounded-full transition-all duration-200 ${
                      selectedColor.name === color.name
                        ? "ring-2 ring-accent ring-offset-2 ring-offset-background scale-110"
                        : "hover:scale-105"
                    } ${color.border ? "border border-border" : ""}`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Selected: <span className="font-medium text-foreground">{selectedColor.name}</span>
              </p>
            </div>

            {/* Size Selector */}
            <div className="customizer-panel bg-card rounded-xl border border-border p-6 md:p-8">
              <Label className="heading-sub mb-4 block">3. Select Size</Label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-accent text-accent-foreground border-accent shadow-md"
                        : "bg-card text-foreground border-border hover:border-accent/50 hover:bg-secondary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Order */}
            <div className="customizer-panel bg-card rounded-xl border border-border p-6 md:p-8">
              <Label className="heading-sub mb-4 block">4. Quantity & Order</Label>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground">Qty:</span>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-foreground tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Unit Price</p>
                  <p className="text-lg font-bold text-foreground">${PRICE_PER_SHIRT}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-extrabold text-accent">${totalPrice}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={addToCart}
                  variant="outline"
                  className="flex-1 gap-2 h-12"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </Button>
                <Button
                  onClick={() => {
                    addToCart();
                    toast.info("Redirecting to checkout…");
                  }}
                  className="flex-1 gap-2 h-12 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Zap className="w-4 h-4" /> Buy Now
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT — Live Preview */}
          <div className="customizer-panel lg:sticky lg:top-28">
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <Label className="heading-sub mb-4 block text-center">Live Preview</Label>
              <div
                className="relative rounded-xl overflow-hidden flex items-center justify-center mx-auto"
                style={{ maxWidth: 420 }}
              >
                {/* Shirt SVG */}
                <svg
                  viewBox="0 0 400 480"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Shirt shape */}
                  <path
                    d="M100,0 L160,0 C160,35 175,60 200,60 C225,60 240,35 240,0 L300,0 L400,80 L360,120 L310,90 L310,480 L90,480 L90,90 L40,120 L0,80 Z"
                    fill={selectedColor.value}
                    stroke={isLightShirt ? "#E5E7EB" : "none"}
                    strokeWidth={isLightShirt ? 1 : 0}
                  />
                  {/* Design area overlay */}
                  {designImage && (
                    <image
                      href={designImage}
                      x="130"
                      y="120"
                      width="140"
                      height="160"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  )}
                  {/* Guide area when no design */}
                  {!designImage && (
                    <rect
                      x="135"
                      y="130"
                      width="130"
                      height="140"
                      rx="8"
                      fill="none"
                      stroke={isLightShirt ? "#D1D5DB" : "rgba(255,255,255,0.15)"}
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                  )}
                </svg>

                {/* Remove design button */}
                {designImage && (
                  <button
                    onClick={clearDesign}
                    className="absolute top-3 right-3 w-8 h-8 bg-card/90 backdrop-blur border border-border rounded-full flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    title="Remove design"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Summary beneath preview */}
              <div className="mt-6 grid grid-cols-3 text-center gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Color</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span
                      className={`w-4 h-4 rounded-full inline-block ${selectedColor.border ? "border border-border" : ""}`}
                      style={{ backgroundColor: selectedColor.value }}
                    />
                    <span className="text-sm font-medium text-foreground">{selectedColor.name}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Size</p>
                  <p className="text-sm font-medium text-foreground mt-1">{selectedSize}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Qty</p>
                  <p className="text-sm font-medium text-foreground mt-1">{quantity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignOrder;
