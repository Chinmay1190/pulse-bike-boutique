
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, X, Search, Home } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  
  // Track scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full py-3 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl font-heading font-bold text-primary">SuperBikes</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn("nav-link", isActive("/") && "text-primary")}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={cn("nav-link", isActive("/products") && "text-primary")}
          >
            Products
          </Link>
          <Link 
            to="/categories" 
            className={cn("nav-link", isActive("/categories") && "text-primary")}
          >
            Categories
          </Link>
          <Link 
            to="/about" 
            className={cn("nav-link", isActive("/about") && "text-primary")}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={cn("nav-link", isActive("/contact") && "text-primary")}
          >
            Contact
          </Link>
        </nav>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full bg-primary text-white"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          
          {/* Mobile menu toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-background z-40 animate-fade-in">
          <nav className="flex flex-col p-6 space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/products" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <span>Products</span>
            </Link>
            <Link 
              to="/categories" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <span>Categories</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <span>About</span>
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <span>Contact</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
