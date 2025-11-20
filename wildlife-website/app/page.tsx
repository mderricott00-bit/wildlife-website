import { promises as fs } from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

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

// Server Component - fetches data at build time
async function getFeaturedProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const products: Product[] = JSON.parse(fileContents);
  return products.filter(product => product.featured);
}

export default async function Home() {
  // Server-side data fetching
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 dark:from-primary/20 dark:via-secondary/10 dark:to-accent/20">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Welcome to Jacob&apos;s Pet Shop
                <span className="block text-primary mt-2">& Wildlife Rescue Centre</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
                Serving the Scottish community since 1985 with quality pet supplies, expert advice, 
                and dedicated wildlife conservation efforts. Visit our rescue centre to meet native 
                Scottish wildlife and support vital conservation work.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary">
                  Shop Products
                </Link>
                <Link href="/wildlife" className="btn-outline">
                  Visit Wildlife Centre
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80"
                alt="Scottish Highland landscape with wildlife"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Local Pet Shop Since 1985
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              At Jacob&apos;s Pet Shop, we&apos;re passionate about pets and wildlife. Our family-run business 
              has been providing quality pet supplies, expert advice, and exceptional customer service for nearly 
              four decades. Located in the heart of Inverness, we serve pet owners across the Highlands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Products</h3>
              <p className="text-foreground/70">
                Carefully curated selection of premium pet supplies from trusted brands, 
                all at competitive prices.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Advice</h3>
              <p className="text-foreground/70">
                Our knowledgeable team is here to help with all your pet care questions 
                and recommendations.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Community Focus</h3>
              <p className="text-foreground/70">
                Supporting local pet owners and wildlife conservation through education 
                and action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-foreground/70">
                Hand-picked selection of our most popular items
              </p>
            </div>
            <Link 
              href="/products" 
              className="hidden md:flex items-center text-primary hover:text-primary-dark font-semibold transition-colors group"
            >
              View All Products
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link href="/products" className="btn-primary inline-flex items-center">
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Wildlife Rescue CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200&q=80"
                alt="Red squirrel in Scottish woodland"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Support Scottish Wildlife Conservation
              </h2>
              <p className="text-lg mb-6 text-white/90 leading-relaxed">
                Our Wildlife Rescue Centre provides care and rehabilitation for native Scottish species 
                including red squirrels, pine martens, wildcats, and birds of prey. Every sponsorship 
                directly supports their care and contributes to vital conservation work protecting 
                Scotland&apos;s precious wildlife heritage.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sponsor endangered Scottish wildlife</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Visit our rescue centre and meet the residents</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Learn about conservation and wildlife protection</span>
                </li>
              </ul>
              <Link href="/wildlife" className="btn bg-white text-primary hover:bg-white/90">
                Learn More About Wildlife Rescue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Join us for educational workshops, wildlife experiences, and family-friendly events
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="badge badge-success mb-4">For Adults</div>
              <h3 className="text-xl font-bold mb-2">Wildlife Photography Workshop</h3>
              <p className="text-foreground/70 mb-4">
                Learn professional photography techniques with close access to our resident animals.
              </p>
              <div className="text-sm text-foreground/60 mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>December 5, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
              </div>
              <Link href="/events" className="text-primary hover:text-primary-dark font-semibold">
                Learn More →
              </Link>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="badge badge-warning mb-4">For Children</div>
              <h3 className="text-xl font-bold mb-2">Junior Zookeeper Experience</h3>
              <p className="text-foreground/70 mb-4">
                Hands-on experience helping care for rescued Scottish wildlife (ages 8-15).
              </p>
              <div className="text-sm text-foreground/60 mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>December 14, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>10:00 AM - 3:00 PM</span>
                </div>
              </div>
              <Link href="/events" className="text-primary hover:text-primary-dark font-semibold">
                Learn More →
              </Link>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="badge bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 mb-4">
                All Ages
              </div>
              <h3 className="text-xl font-bold mb-2">Scottish Wildlife Talk & Tour</h3>
              <p className="text-foreground/70 mb-4">
                Educational tour of the centre with conservation talk (suitable for all ages).
              </p>
              <div className="text-sm text-foreground/60 mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>December 8, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>2:00 PM - 4:00 PM</span>
                </div>
              </div>
              <Link href="/events" className="text-primary hover:text-primary-dark font-semibold">
                Learn More →
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link href="/events" className="btn-primary inline-flex items-center">
              View All Events
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-primary/5 dark:bg-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe for Exclusive Benefits
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Join our community and receive a 10% discount voucher to use in-store! 
              Subscribers get access to exclusive offers, event notifications, and conservation updates.
            </p>
            <Link href="/subscribe" className="btn-primary text-lg px-8 py-4">
              Subscribe Now & Get Your Voucher
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
