
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CheckoutForm from "@/components/CheckoutForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data";

export default function CheckoutPage() {
  const { items, totalItems, totalAmount } = useCart();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-12 min-h-[50vh] flex flex-col items-center justify-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-medium mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            You need to add some products before checking out.
          </p>
          <Button size="lg" asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-12">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/cart">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Cart
            </Link>
          </Button>
        </div>
        
        <h1 className="text-3xl font-heading font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout form */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg p-6 animate-fade-in">
              <CheckoutForm />
            </div>
          </div>
          
          {/* Order summary */}
          <div>
            <div className="bg-card border rounded-lg p-6 sticky top-24 animate-fade-in">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              <div className="max-h-64 overflow-y-auto mb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded overflow-hidden mr-3">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium truncate w-36 sm:w-auto">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (18%)</span>
                  <span>{formatPrice(totalAmount * 0.18)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount * 1.18)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
