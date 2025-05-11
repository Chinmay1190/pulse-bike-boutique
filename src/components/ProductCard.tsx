
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  
  return (
    <Card 
      className="overflow-hidden card-hover border group animate-zoom-in"
      style={{ animationDelay: `${index * 0.05}s` }}
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
        
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of Stock
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
            <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
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
            disabled={!product.inStock}
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
  );
}
