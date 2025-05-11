
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Layout from "@/components/Layout";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  
  // Redirect to home after certain time for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 60000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <Layout>
      <div className="container py-12 min-h-[70vh] flex flex-col items-center justify-center animate-fade-in">
        <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <Check className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Thank you for your purchase. We've sent you an email with the order details and tracking information.
        </p>
        
        <div className="bg-card border rounded-lg p-8 mb-8 w-full max-w-md">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">#SB-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-medium">Credit Card</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping Method:</span>
              <span className="font-medium">Standard Delivery</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery:</span>
              <span className="font-medium">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - 
                {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
