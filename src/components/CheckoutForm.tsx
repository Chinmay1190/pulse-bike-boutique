
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { OrderDetails } from "@/types";
import { CreditCard, BadgeIndianRupee, Landmark, Wallet } from "lucide-react";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { totalAmount, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
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
  
  // Payment method options
  const paymentMethods = [
    {
      id: "card",
      title: "Credit / Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "upi",
      title: "UPI / Net Banking",
      icon: <BadgeIndianRupee className="h-5 w-5" />,
    },
    {
      id: "wallet",
      title: "Digital Wallet",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      id: "banking",
      title: "Bank Transfer",
      icon: <Landmark className="h-5 w-5" />,
    },
  ];
  
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
        
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className={`border rounded-md p-4 cursor-pointer transition-colors ${paymentMethod === method.id ? 'bg-muted/30 border-primary' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                  {paymentMethod === method.id && (
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                  )}
                </div>
                <RadioGroupItem 
                  value={method.id} 
                  id={method.id} 
                  className="sr-only"
                />
                <div className="flex items-center gap-2">
                  {method.icon}
                  <Label htmlFor={method.id} className="cursor-pointer">
                    {method.title}
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
        
        {paymentMethod === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-fade-in">
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
        )}
        
        {paymentMethod === "upi" && (
          <div className="space-y-4 mt-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="username@upi"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="px-3 py-2 border rounded-md bg-card/50">
                <img src="/placeholder.svg" alt="Google Pay" className="h-6" />
              </div>
              <div className="px-3 py-2 border rounded-md bg-card/50">
                <img src="/placeholder.svg" alt="PhonePe" className="h-6" />
              </div>
              <div className="px-3 py-2 border rounded-md bg-card/50">
                <img src="/placeholder.svg" alt="Paytm" className="h-6" />
              </div>
            </div>
          </div>
        )}
        
        {paymentMethod === "wallet" && (
          <div className="space-y-4 mt-4 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-md p-4 text-center cursor-pointer hover:border-primary">
                <div className="h-10 w-10 bg-muted mx-auto mb-2 rounded-md"></div>
                <span className="text-sm">Paytm</span>
              </div>
              <div className="border rounded-md p-4 text-center cursor-pointer hover:border-primary">
                <div className="h-10 w-10 bg-muted mx-auto mb-2 rounded-md"></div>
                <span className="text-sm">Amazon Pay</span>
              </div>
              <div className="border rounded-md p-4 text-center cursor-pointer hover:border-primary">
                <div className="h-10 w-10 bg-muted mx-auto mb-2 rounded-md"></div>
                <span className="text-sm">Freecharge</span>
              </div>
              <div className="border rounded-md p-4 text-center cursor-pointer hover:border-primary">
                <div className="h-10 w-10 bg-muted mx-auto mb-2 rounded-md"></div>
                <span className="text-sm">MobiKwik</span>
              </div>
            </div>
          </div>
        )}
        
        {paymentMethod === "banking" && (
          <div className="space-y-4 mt-4 animate-fade-in">
            <div className="p-4 bg-muted/20 rounded-md">
              <h4 className="font-medium mb-2">Bank Transfer Instructions</h4>
              <p className="text-sm text-muted-foreground">
                Please transfer the total amount to the following bank account:
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p><span className="font-medium">Account Name:</span> SuperBikes India Ltd.</p>
                <p><span className="font-medium">Account Number:</span> 1234567890</p>
                <p><span className="font-medium">IFSC Code:</span> SBIN0000123</p>
                <p><span className="font-medium">Bank:</span> State Bank of India</p>
              </div>
              <p className="text-xs mt-3 text-muted-foreground">
                Your order will be processed once payment is confirmed.
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-4">
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Processing..." : `Pay Now - ₹${(totalAmount / 100).toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
}
