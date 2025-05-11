
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutPage() {
  return (
    <Layout>
      <div className="container py-12 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            About SuperBikes
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We're passionate about delivering the best motorcycles to enthusiasts across India.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="order-2 lg:order-1 animate-slide-in">
            <h2 className="text-2xl font-heading font-bold mb-4">
              Our Story
            </h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2020, SuperBikes started as a small dealership in Mumbai with a vision 
              to provide high-end motorcycles to Indian enthusiasts at competitive prices. What 
              began as a passion project has now grown into India's premier online motorcycle 
              marketplace.
            </p>
            <p className="text-muted-foreground mb-4">
              Our team consists of motorcycle enthusiasts who understand the thrill of riding 
              and the importance of quality, performance, and safety. We carefully select each 
              model in our inventory to ensure we offer only the best to our customers.
            </p>
            <p className="text-muted-foreground">
              Today, we serve thousands of customers across the country, delivering not just 
              motorcycles but exceptional experiences that last a lifetime.
            </p>
          </div>
          
          <div className="order-1 lg:order-2 animate-zoom-in">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="SuperBikes Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="mission" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mission">Our Mission</TabsTrigger>
            <TabsTrigger value="values">Our Values</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
          </TabsList>
          <TabsContent value="mission" className="p-6 border rounded-b-lg animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-heading font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-4">
                To provide motorcycle enthusiasts across India with access to the world's best superbikes, 
                along with exceptional service, fair pricing, and ongoing support that enhances their riding experience.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">What We Aim To Do:</h4>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Make high-performance motorcycles accessible to Indian riders</li>
                <li>Educate riders about safety, maintenance, and responsible riding</li>
                <li>Build a community of passionate motorcycle enthusiasts</li>
                <li>Support local riding events and motorcycle culture</li>
                <li>Provide exceptional after-sales service and support</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="values" className="p-6 border rounded-b-lg animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border rounded-lg p-5">
                <h3 className="font-heading font-bold mb-2 text-primary">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  We never compromise on the quality of our motorcycles and ensure that every bike meets 
                  our rigorous standards before reaching our customers.
                </p>
              </div>
              
              <div className="border rounded-lg p-5">
                <h3 className="font-heading font-bold mb-2 text-primary">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  We conduct our business with honesty and transparency, providing accurate information 
                  and fair pricing to all our customers.
                </p>
              </div>
              
              <div className="border rounded-lg p-5">
                <h3 className="font-heading font-bold mb-2 text-primary">Customer Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Our customers are at the center of everything we do, and we strive to exceed their 
                  expectations at every touchpoint.
                </p>
              </div>
              
              <div className="border rounded-lg p-5">
                <h3 className="font-heading font-bold mb-2 text-primary">Passion</h3>
                <p className="text-sm text-muted-foreground">
                  We're passionate about motorcycles and share that enthusiasm with our customers, 
                  helping them find the perfect bike for their needs.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="team" className="p-6 border rounded-b-lg animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="Rahul Sharma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-bold">Rahul Sharma</h3>
                <p className="text-primary">Founder & CEO</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Former professional racer with over 15 years of experience in the motorcycle industry.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="Priya Desai" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-bold">Priya Desai</h3>
                <p className="text-primary">Operations Director</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supply chain expert who ensures smooth operations and timely delivery of all orders.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="Amit Patel" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-bold">Amit Patel</h3>
                <p className="text-primary">Technical Expert</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Certified motorcycle mechanic with expertise across all major international brands.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-muted/30 rounded-lg p-8 mb-16 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold">
              Why Choose SuperBikes?
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              We're more than just a motorcycle retailer - we're a community of passionate riders.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Extensive Collection</h3>
              <p className="text-sm text-muted-foreground">
                With over 65+ premium motorcycles from top global brands, we offer the widest selection in India.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Expert Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Our team of motorcycle experts helps you find the perfect bike for your needs and preferences.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Nationwide Service</h3>
              <p className="text-sm text-muted-foreground">
                With service centers across 25 major cities, we ensure your bike receives the best care.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">4</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Community Events</h3>
              <p className="text-sm text-muted-foreground">
                Join our regular rides, track days, and meetups to connect with fellow motorcycle enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
