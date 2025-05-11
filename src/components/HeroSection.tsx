
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold animate-slide-in">
            Unleash The Power. <br />
            <span className="text-primary">Feel The Freedom.</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl opacity-90 max-w-lg animate-slide-in" style={{animationDelay: "0.1s"}}>
            Discover the thrill of riding with our premium collection of high-performance superbikes.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 animate-slide-in" style={{animationDelay: "0.2s"}}>
            <Button size="lg" asChild>
              <Link to="/products">Explore Collection</Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/categories">View Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
