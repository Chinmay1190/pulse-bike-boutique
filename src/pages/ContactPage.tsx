
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      setLoading(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container py-12 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Contact Us
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Feel free to reach out to us with any questions or inquiries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="animate-slide-in">
            <div className="bg-card border rounded-lg p-8">
              <h2 className="text-2xl font-heading font-bold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in" style={{animationDelay: "0.2s"}}>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Get in touch</h2>
              <p className="text-muted-foreground mb-6">
                Our customer support team is available to assist you with any questions or concerns.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <address className="not-italic text-muted-foreground">
                      123 Bike Street, <br />
                      Mumbai, Maharashtra 400001, <br />
                      India
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a href="tel:+919876543210" className="text-muted-foreground hover:text-foreground transition-colors">
                      +91 9876543210
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:info@superbikes.com" className="text-muted-foreground hover:text-foreground transition-colors">
                      info@superbikes.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM <br />
                      Saturday: 10:00 AM - 4:00 PM <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Visit our showroom</h2>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {/* Placeholder for Google Maps */}
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">Google Maps Integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about our products and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, debit cards, net banking, UPI, and EMI options. We also offer financing solutions for eligible customers.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-medium mb-2">What is your delivery timeframe?</h3>
              <p className="text-sm text-muted-foreground">
                Delivery times depend on your location and motorcycle availability. Typically, it takes 7-14 business days from purchase to delivery.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-medium mb-2">Do you offer test rides?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, we offer test rides at our showrooms and partner locations across major cities. You can book a test ride online or by contacting our team.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-medium mb-2">What warranty do your motorcycles come with?</h3>
              <p className="text-sm text-muted-foreground">
                All our motorcycles come with the manufacturer's standard warranty. We also offer extended warranty options for additional peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
