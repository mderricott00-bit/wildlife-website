import { promises as fs } from 'fs';
import path from 'path';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  featured: boolean;
  inStock: boolean;
}

async function getAllProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function ProductsPage() {
  const products = await getAllProducts();
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary/10 dark:bg-primary/20 py-16">
        <div className="container-custom">
          <nav className="text-sm mb-4">
            <Link href="/" className="text-primary hover:text-primary-dark">Home</Link>
            <span className="mx-2 text-foreground/50">/</span>
            <span className="text-foreground">Products</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-foreground/80 max-w-2xl">
            Browse our carefully curated selection of premium pet supplies. From nutritious food to 
            engaging toys and comfortable bedding, we stock everything your pets need to live happy, healthy lives.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">All Products ({products.length})</h2>
            <div className="flex flex-wrap gap-2">
              <span className="badge bg-primary text-white">All Categories</span>
              {categories.map(category => (
                <span key={category} className="badge bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Info Banner */}
          <div className="mt-12 card p-8 text-center bg-primary/5 dark:bg-primary/10 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Can&apos;t Find What You&apos;re Looking For?</h3>
            <p className="text-lg text-foreground/80 mb-6">
              We stock many more products in-store and can order special items. Visit us or give us a call!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:01463555123" className="btn-primary">
                Call Us: 01463 555 123
              </a>
              <Link href="/" className="btn-outline">
                Visit Store Information
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
