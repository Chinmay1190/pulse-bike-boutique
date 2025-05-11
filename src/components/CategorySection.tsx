
import { Link } from "react-router-dom";
import { categories } from "@/data";
import { Card, CardContent } from "@/components/ui/card";

export default function CategorySection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Browse By Category
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Explore our extensive collection of motorcycles categorized by riding styles
            and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className="block"
            >
              <Card 
                className="overflow-hidden card-hover h-full animate-zoom-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <h3 className="text-white font-medium text-lg">{category.name}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
