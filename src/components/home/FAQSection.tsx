import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What file formats do you accept for designs?", a: "We accept PNG, JPG, and SVG files. For best results, upload high-resolution files (300 DPI or higher) with transparent backgrounds." },
  { q: "What printing method do you use?", a: "We use Direct-to-Garment (DTG) printing for small orders and screen printing for bulk orders. Both methods deliver vibrant, long-lasting colors." },
  { q: "What sizes are available?", a: "We offer sizes from XS to 3XL across all our T-shirt styles. Check individual product pages for detailed size charts." },
  { q: "How long does shipping take?", a: "Production takes 2-3 business days. Standard shipping is 5-7 days, and express shipping is 2-3 days. Tracking is included with every order." },
  { q: "Can I order just one shirt?", a: "Absolutely! We welcome single orders as well as bulk orders. No minimum quantity required." },
  { q: "What is your return policy?", a: "We offer full refunds or reprints for any quality issues. Since items are custom-made, we cannot accept returns for change of mind, but we stand behind our print quality." },
];

const FAQSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-section text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Everything you need to know about ordering custom T-shirts.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow">
                <AccordionTrigger className="text-left font-heading font-medium text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
