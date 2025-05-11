
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { allProducts, formatPrice } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Get featured products or random products if not enough featured ones
    const featuredProducts = allProducts.filter(p => p.featured);
    const randomProducts = allProducts
      .filter(p => !p.featured)
      .sort(() => 0.5 - Math.random());
    
    setFeatured([...featuredProducts, ...randomProducts].slice(0, 8));
  }, []);
  
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Featured Superbikes
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Check out our most popular and high-performance motorcycles that deliver
            exceptional power, style, and an unmatched riding experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <Card 
              key={product.id} 
              className="overflow-hidden card-hover border group animate-zoom-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {product.featured && (
                  <Badge className="absolute top-2 left-2 bg-primary">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      <Link 
                        to={`/product/${product.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <div className="mt-2">
                      <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="rounded-full hover:bg-primary hover:text-white transition-colors"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="mt-3">
                  <Link to={`/product/${product.id}`}>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/products">View All Bikes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
