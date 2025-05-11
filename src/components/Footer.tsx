
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <h2 className="text-xl font-heading font-bold text-primary">
                SuperBikes
              </h2>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Your one-stop destination for high-performance superbikes
              in India. Quality, performance, and style guaranteed.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=sport" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sport
                </Link>
              </li>
              <li>
                <Link to="/products?category=cruiser" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cruiser
                </Link>
              </li>
              <li>
                <Link to="/products?category=adventure" className="text-muted-foreground hover:text-foreground transition-colors">
                  Adventure
                </Link>
              </li>
              <li>
                <Link to="/products?category=naked" className="text-muted-foreground hover:text-foreground transition-colors">
                  Naked
                </Link>
              </li>
              <li>
                <Link to="/products?category=touring" className="text-muted-foreground hover:text-foreground transition-colors">
                  Touring
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Contact
            </h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>123 Bike Street, Mumbai</p>
              <p>Maharashtra, India 400001</p>
              <p className="mt-2">
                <a href="tel:+919876543210" className="hover:text-foreground transition-colors">
                  +91 9876543210
                </a>
              </p>
              <p>
                <a href="mailto:info@superbikes.com" className="hover:text-foreground transition-colors">
                  info@superbikes.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 SuperBikes. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
