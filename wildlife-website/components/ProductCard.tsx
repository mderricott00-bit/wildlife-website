'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card-hover overflow-hidden group">
      <div className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="text-sm text-primary font-medium mb-2">{product.category}</div>
        <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            £{product.price.toFixed(2)}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
