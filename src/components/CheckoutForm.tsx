
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { OrderDetails } from "@/types";
import { CreditCard, BadgeIndianRupee } from "lucide-react";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { totalAmount, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OrderDetails>({
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof OrderDetails] as any,
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      clearCart();
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully.",
      });
      navigate("/checkout-success");
    }, 2000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Shipping Address</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address.line1">Address Line 1</Label>
            <Input
              id="address.line1"
              name="address.line1"
              value={formData.address.line1}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address.line2">Address Line 2 (Optional)</Label>
            <Input
              id="address.line2"
              name="address.line2"
              value={formData.address.line2 || ""}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address.city">City</Label>
              <Input
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address.state">State</Label>
              <Input
                id="address.state"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address.postalCode">Postal Code</Label>
              <Input
                id="address.postalCode"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Payment Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4 cursor-pointer bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span>Credit / Debit Card</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-muted flex items-center justify-center">
                <div className="h-3 w-3 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <BadgeIndianRupee className="h-5 w-5" />
                <span>UPI / Net Banking</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="4242 4242 4242 4242"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Processing..." : `Pay Now - ₹${(totalAmount / 100).toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
}
