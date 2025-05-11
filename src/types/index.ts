
export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  category: string;
  brand: string;
  inStock: boolean;
  featured?: boolean;
  specs: {
    engine?: string;
    power?: string;
    torque?: string;
    transmission?: string;
    topSpeed?: string;
    weight?: string;
    fuelCapacity?: string;
    mileage?: string;
  };
};

export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
};

export type OrderDetails = {
  name: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
  };
};
