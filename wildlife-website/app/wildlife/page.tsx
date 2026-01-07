'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import WildlifeCard from '@/components/WildlifeCard';

interface Wildlife {
  id: number;
  name: string;
  scientificName: string;
  category: string;
  conservationStatus: string;
  sponsorshipCost: number;
  image: string;
  currentResidents: number;
  // Wikipedia data (primary source)
  wikipediaExtract?: string;
  wikipediaImage?: string;
  wikipediaUrl?: string;
}

export default function WildlifePage() {
  const [wildlife, setWildlife] = useState<Wildlife[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWildlife() {
      try {
        const response = await fetch('/api/wildlife');
        const data = await response.json();
        setWildlife(data);
      } catch (error) {
        console.error('Error loading wildlife:', error);
      } finally {
        setLoading(false);
      }
    }
    loadWildlife();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/70">Loading wildlife data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1600&q=80"
          alt="Scottish wildlife in natural habitat"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Jacob&apos;s Wildlife Rescue Centre
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl leading-relaxed">
              Dedicated to the rescue, rehabilitation, and conservation of Scotland&apos;s native wildlife. 
              Every sponsorship makes a real difference.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              Our Wildlife Rescue Centre is committed to protecting Scotland&apos;s precious native species. 
              We provide expert medical care, rehabilitation, and a safe haven for injured, orphaned, and 
              vulnerable wildlife. Through education and conservation efforts, we work to ensure these 
              magnificent creatures thrive for future generations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">250+</h3>
              <p className="text-foreground/70">Animals Rescued Annually</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">85%</h3>
              <p className="text-foreground/70">Successful Release Rate</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">40 Years</h3>
              <p className="text-foreground/70">Conservation Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife Sponsorship */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sponsor Scottish Wildlife
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Meet our resident animals and support their care through our sponsorship programme. 
              Click on any animal to learn more about them.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wildlife.map((animal) => (
              <WildlifeCard key={animal.id} wildlife={animal} />
            ))}
          </div>
        </div>
      </section>

      {/* How Sponsorship Helps */}
      <section className="section-padding bg-primary/5 dark:bg-primary/10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              How Your Sponsorship Helps
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Direct Animal Care</h3>
                <p className="text-foreground/70">
                  Your sponsorship provides food, veterinary care, and specialist housing for resident animals during their rehabilitation.
                </p>
              </div>

              <div className="card p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Habitat Protection</h3>
                <p className="text-foreground/70">
                  Funds support habitat conservation projects and the creation of safe release sites for rehabilitated animals.
                </p>
              </div>

              <div className="card p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Education & Research</h3>
                <p className="text-foreground/70">
                  Support educational programmes and scientific research that advances wildlife conservation knowledge.
                </p>
              </div>

              <div className="card p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Community Engagement</h3>
                <p className="text-foreground/70">
                  Enable community events, school visits, and public awareness campaigns about Scottish wildlife.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Subscribe to become a sponsor and receive exclusive updates about your chosen animal, 
              plus a 10% discount voucher for our pet shop.
            </p>
            <a href="/subscribe" className="btn-primary text-lg px-8 py-4">
              Become a Sponsor Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
