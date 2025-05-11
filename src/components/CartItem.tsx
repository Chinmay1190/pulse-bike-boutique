
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data";

interface CartItemProps {
  product: Product;
  quantity: number;
}

export default function CartItem({ product, quantity }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [localQuantity, setLocalQuantity] = useState(quantity);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setLocalQuantity(value);
      updateQuantity(product.id, value);
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-b animate-fade-in">
      {/* Product image */}
      <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md flex-shrink-0">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      {/* Product details */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <Link to={`/product/${product.id}`} className="text-lg font-medium hover:text-primary transition-colors">
              {product.name}
            </Link>
            <p className="text-sm text-muted-foreground capitalize">
              {product.category} | {product.brand}
            </p>
          </div>
          <div className="mt-2 sm:mt-0 font-medium">
            {formatPrice(product.price)}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label htmlFor={`quantity-${product.id}`} className="text-sm mr-2">
              Quantity:
            </label>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-r-none"
                onClick={() => updateQuantity(product.id, Math.max(1, localQuantity - 1))}
                disabled={localQuantity <= 1}
              >
                -
              </Button>
              <Input
                id={`quantity-${product.id}`}
                type="number"
                min="1"
                value={localQuantity}
                onChange={handleQuantityChange}
                className="h-8 w-14 text-center rounded-none border-x-0"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-l-none"
                onClick={() => updateQuantity(product.id, localQuantity + 1)}
              >
                +
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive"
              onClick={() => removeFromCart(product.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Remove</span>
            </Button>
          </div>
          
          <div className="font-medium">
            {formatPrice(product.price * localQuantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
