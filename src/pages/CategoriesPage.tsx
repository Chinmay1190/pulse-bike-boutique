
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { categories } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CategoriesPage() {
  return (
    <Layout>
      <div className="container py-12 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Motorcycle Categories
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Explore our extensive collection of motorcycles based on different riding styles and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="overflow-hidden animate-zoom-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h2 className="text-white text-2xl font-heading font-bold">{category.name}</h2>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-heading font-bold text-xl mb-2">{category.name} Motorcycles</h3>
                  <p className="text-muted-foreground">
                    {category.id === 'sport' && 'High-performance bikes designed for speed, agility, and aggressive riding posture.'}
                    {category.id === 'cruiser' && 'Comfortable bikes for relaxed riding, characterized by low seats and forward foot controls.'}
                    {category.id === 'adventure' && 'Versatile bikes built for both on and off-road travel, perfect for long journeys.'}
                    {category.id === 'naked' && 'Stripped-down sport bikes without fairings, offering an upright riding position.'}
                    {category.id === 'touring' && 'Designed for long-distance comfort with large fairings, luggage capacity, and relaxed seating.'}
                    {category.id === 'retro' && 'Classic styling with modern technology, capturing the essence of motorcycling heritage.'}
                  </p>
                </div>
                
                <Button asChild className="w-full">
                  <Link to={`/products?category=${category.id}`}>
                    Browse {category.name} Bikes
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
