
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { allProducts, formatPrice } from "@/data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, ChevronLeft, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  const { addToCart, items } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const inCart = items.some(item => item.product.id === productId);
  
  // Fetch product
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const found = allProducts.find(p => p.id === productId);
      setProduct(found || null);
      setLoading(false);
      
      // Set related products
      if (found) {
        const related = allProducts
          .filter(p => (p.category === found.category || p.brand === found.brand) && p.id !== found.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }, 500);
  }, [productId]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container py-12 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg animate-pulse-slow">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="container py-12 min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8 pt-24">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/products">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Link>
          </Button>
          
          <nav className="text-sm">
            <ol className="flex items-center">
              <li className="flex items-center">
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <span className="mx-2 text-muted-foreground">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
                <span className="mx-2 text-muted-foreground">/</span>
              </li>
              <li className="truncate max-w-[150px] sm:max-w-none">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border animate-fade-in">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, idx) => (
                <div 
                  key={idx}
                  className={`aspect-square cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-colors ${
                    selectedImage === idx ? 'border-primary ring-2 ring-primary/20' : ''
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product info */}
          <div className="animate-slide-in">
            <h1 className="text-3xl font-heading font-bold">{product.name}</h1>
            
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through ml-3">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            <div className="mt-6 flex items-center">
              <div className="flex items-center">
                <span className={`h-3 w-3 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
              
              <div className="ml-6">
                <span className="text-muted-foreground">Brand: </span>
                <Link
                  to={`/products?brand=${product.brand}`}
                  className="text-primary hover:underline capitalize"
                >
                  {product.brand}
                </Link>
              </div>
              
              <div className="ml-6">
                <span className="text-muted-foreground">Category: </span>
                <Link
                  to={`/products?category=${product.category}`}
                  className="text-primary hover:underline capitalize"
                >
                  {product.category}
                </Link>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="mt-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  value && (
                    <div key={key} className="flex justify-between pr-4">
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              {product.inStock ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border rounded-md">
                    <button 
                      className="px-4 py-2 text-lg"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-lg font-medium min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button 
                      className="px-4 py-2 text-lg"
                      onClick={() => setQuantity(q => q + 1)}
                      disabled={quantity >= 5}
                    >
                      +
                    </button>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    {inCart ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <Button size="lg" disabled className="w-full">
                  Out of Stock
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs for product details */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-6 border rounded-b-lg">
            <h3 className="text-lg font-medium mb-4">Product Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="mt-4 text-muted-foreground">
              Experience the thrill of riding one of the world's most advanced motorcycles.
              Engineered for perfection, this bike offers exceptional performance, handling,
              and comfort whether you're on city streets or open highways.
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="p-6 border rounded-b-lg">
            <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
            <div className="space-y-4">
              {Object.entries(product.specs).map(([key, value]) => (
                value && (
                  <div key={key} className="grid grid-cols-1 sm:grid-cols-2 border-b pb-2">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span>{value}</span>
                  </div>
                )
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="p-6 border rounded-b-lg">
            <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
            <p className="text-muted-foreground">
              We provide free shipping across India for all motorcycles. Delivery typically takes 7-14 business days.
              For larger bikes, we coordinate with local dealers for pickup and registration assistance.
            </p>
            
            <h3 className="text-lg font-medium mt-6 mb-4">Return Policy</h3>
            <p className="text-muted-foreground">
              We have a 7-day return policy for unused motorcycles in their original packaging.
              Please note that shipping costs for returns are the responsibility of the customer unless the return is due to a defect.
            </p>
          </TabsContent>
        </Tabs>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
