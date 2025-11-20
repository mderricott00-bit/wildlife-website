import { promises as fs } from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  featured: boolean;
  inStock: boolean;
  details?: string;
}

async function getProduct(id: string): Promise<Product | undefined> {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const products: Product[] = JSON.parse(fileContents);
  return products.find(p => p.id === parseInt(id));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="bg-card border-b border-border py-4">
        <div className="container-custom">
          <nav className="text-sm">
            <Link href="/" className="text-primary hover:text-primary-dark">Home</Link>
            <span className="mx-2 text-foreground/50">/</span>
            <Link href="/products" className="text-primary hover:text-primary-dark">Products</Link>
            <span className="mx-2 text-foreground/50">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <div className="absolute top-4 right-4">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="badge bg-primary/10 text-primary mb-4">{product.category}</div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">£{product.price.toFixed(2)}</span>
                {product.inStock ? (
                  <span className="badge badge-success">In Stock</span>
                ) : (
                  <span className="badge badge-danger">Out of Stock</span>
                )}
              </div>

              <div className="prose prose-lg dark:prose-invert mb-8">
                <p className="text-lg text-foreground/80">{product.description}</p>
                {product.details && (
                  <p className="mt-4 text-foreground/70">{product.details}</p>
                )}
              </div>

              <div className="card p-6 bg-primary/5 dark:bg-primary/10 mb-6">
                <h3 className="font-bold text-lg mb-3">Available In-Store</h3>
                <p className="text-foreground/80 mb-4">
                  This product is available for purchase at our physical store location. 
                  Visit us to see it in person and get expert advice from our team.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>123 Highland Road, Inverness, Scotland, IV2 4AB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call us: 01463 555 123</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/products" className="btn-outline flex-1 text-center">
                  ← Back to Products
                </Link>
                <Link href="/subscribe" className="btn-primary flex-1 text-center">
                  Get 10% Off Voucher
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
