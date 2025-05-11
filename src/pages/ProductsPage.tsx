
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Filter, Search } from "lucide-react";
import { allProducts, categories, brands } from "@/data";
import { Product } from "@/types";

export default function ProductsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get("category") || "");
  const [selectedBrand, setSelectedBrand] = useState(queryParams.get("brand") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000000]);
  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // UI states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  
  // Apply filters
  useEffect(() => {
    let result = [...allProducts];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by brand
    if (selectedBrand) {
      result = result.filter(product => product.brand === selectedBrand);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by stock
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
    setPage(1);
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, inStockOnly, sortBy]);
  
  // Update visible products when page changes
  useEffect(() => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setVisibleProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, page]);
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange([0, 8000000]);
    setInStockOnly(false);
    setSortBy("featured");
  };
  
  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory) count++;
    if (selectedBrand) count++;
    if (inStockOnly) count++;
    if (priceRange[0] > 0 || priceRange[1] < 8000000) count++;
    return count;
  };
  
  return (
    <Layout>
      <div className="container py-8 pt-24">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">
          Explore Our Superbikes
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters for desktop */}
          <div className="w-full lg:w-64 hidden lg:block space-y-6">
            <div>
              <h3 className="font-medium mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategory === category.id}
                      onCheckedChange={() => {
                        setSelectedCategory(
                          selectedCategory === category.id ? "" : category.id
                        );
                      }}
                    />
                    <Label htmlFor={`category-${category.id}`} className="capitalize">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">Brands</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map(brand => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand.id}`}
                      checked={selectedBrand === brand.id}
                      onCheckedChange={() => {
                        setSelectedBrand(
                          selectedBrand === brand.id ? "" : brand.id
                        );
                      }}
                    />
                    <Label htmlFor={`brand-${brand.id}`} className="capitalize">
                      {brand.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={8000000}
                  step={50000}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mb-6"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>₹{(priceRange[0] / 100000).toFixed(1)}L</span>
                <span>₹{(priceRange[1] / 100000).toFixed(1)}L</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="in-stock" 
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(!!checked)}
              />
              <Label htmlFor="in-stock">In Stock Only</Label>
            </div>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter button and sort row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 lg:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {getActiveFilterCount() > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select 
                  value={sortBy} 
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z-A</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  {filteredProducts.length} products
                </div>
              </div>
            </div>
            
            {/* Mobile filters panel */}
            {isFilterOpen && (
              <div className="lg:hidden bg-background border rounded-lg p-4 mb-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm mb-2">Search</h4>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm mb-2">Categories</h4>
                    <Select 
                      value={selectedCategory} 
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id} className="capitalize">
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm mb-2">Brands</h4>
                    <Select 
                      value={selectedBrand} 
                      onValueChange={setSelectedBrand}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Brands</SelectItem>
                        {brands.map(brand => (
                          <SelectItem key={brand.id} value={brand.id} className="capitalize">
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm mb-2">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={8000000}
                        step={50000}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="mb-6"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>₹{(priceRange[0] / 100000).toFixed(1)}L</span>
                      <span>₹{(priceRange[1] / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="mobile-in-stock" 
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(!!checked)}
                    />
                    <Label htmlFor="mobile-in-stock">In Stock Only</Label>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleResetFilters}
                    >
                      Reset All
                    </Button>
                    <Button 
                      className="w-full"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Active filters */}
            {getActiveFilterCount() > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchTerm && (
                  <Badge 
                    variant="secondary" 
                    className="pl-2 pr-1 py-1.5 flex items-center gap-1"
                  >
                    <span>Search: {searchTerm}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {selectedCategory && (
                  <Badge 
                    variant="secondary" 
                    className="pl-2 pr-1 py-1.5 flex items-center gap-1 capitalize"
                  >
                    <span>Category: {categories.find(c => c.id === selectedCategory)?.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => setSelectedCategory("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {selectedBrand && (
                  <Badge 
                    variant="secondary" 
                    className="pl-2 pr-1 py-1.5 flex items-center gap-1 capitalize"
                  >
                    <span>Brand: {brands.find(b => b.id === selectedBrand)?.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => setSelectedBrand("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {(priceRange[0] > 0 || priceRange[1] < 8000000) && (
                  <Badge 
                    variant="secondary" 
                    className="pl-2 pr-1 py-1.5 flex items-center gap-1"
                  >
                    <span>Price: ₹{(priceRange[0] / 100000).toFixed(1)}L - ₹{(priceRange[1] / 100000).toFixed(1)}L</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => setPriceRange([0, 8000000])}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {inStockOnly && (
                  <Badge 
                    variant="secondary" 
                    className="pl-2 pr-1 py-1.5 flex items-center gap-1"
                  >
                    <span>In Stock Only</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => setInStockOnly(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground text-xs"
                  onClick={handleResetFilters}
                >
                  Clear All
                </Button>
              </div>
            )}
            
            {/* Products grid */}
            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try changing your search terms or filters.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, i) => (
                    <Button
                      key={i}
                      variant={page === i + 1 ? "default" : "outline"}
                      onClick={() => setPage(i + 1)}
                      className="w-10"
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.min(Math.ceil(filteredProducts.length / productsPerPage), p + 1))}
                    disabled={page === Math.ceil(filteredProducts.length / productsPerPage)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
