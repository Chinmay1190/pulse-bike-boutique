
import { ShieldCheck, Truck, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: "Genuine Products",
    description: "All our bikes are 100% genuine with manufacturer warranty and after-sales support.",
  },
  {
    icon: <Truck className="h-12 w-12 text-primary" />,
    title: "Free Delivery",
    description: "Free shipping across India for all our premium motorcycles.",
  },
  {
    icon: <CreditCard className="h-12 w-12 text-primary" />,
    title: "Secure Payments",
    description: "Multiple payment options with secure checkout process.",
  },
  {
    icon: <Headphones className="h-12 w-12 text-primary" />,
    title: "24/7 Support",
    description: "Our customer support team is available round the clock to assist you.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 border rounded-lg animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
