
import { brands } from "@/data";
import { Link } from "react-router-dom";

export default function BrandSection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Top Brands
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We partner with the world's leading motorcycle manufacturers to offer you the best.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {brands.map((brand, index) => (
            <Link
              key={brand.id}
              to={`/products?brand=${brand.id}`}
              className="p-4 opacity-70 hover:opacity-100 transition-opacity"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain dark:invert"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
