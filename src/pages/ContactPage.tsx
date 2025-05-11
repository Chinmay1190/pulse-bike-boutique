
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ContactMap from "@/components/ContactMap";
import { Mail, Phone, MapPin, User, MessageSquare } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Create a schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Initialize form with React Hook Form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      form.reset();
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
            <div className="bg-card border rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="text-primary" /> Send us a message
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input 
                                placeholder="John Doe" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input 
                                placeholder="example@email.com" 
                                type="email"
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input 
                                placeholder="+91 9876543210" 
                                type="tel"
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="How can we help you?" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message here..."
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in" style={{animationDelay: "0.2s"}}>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Get in touch</h2>
              <p className="text-muted-foreground mb-6">
                Our customer support team is available to assist you with any questions or concerns.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
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
                    <Phone className="h-5 w-5 text-primary" />
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
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:info@superbikes.com" className="text-muted-foreground hover:text-foreground transition-colors">
                      info@superbikes.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Visit our showroom</h2>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-md border">
                <ContactMap />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-8 animate-fade-in shadow-sm">
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
