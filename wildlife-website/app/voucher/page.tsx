'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VoucherPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router, mounted]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  const voucherCode = `JACOB-${user.uid.substring(0, 8).toUpperCase()}`;
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-4xl">
        {/* Welcome Message */}
        <div className="mb-8 no-print">
          <h1 className="text-4xl font-bold mb-4">Your Discount Voucher</h1>
          <p className="text-lg text-foreground/70">
            Thank you for subscribing! Print your voucher below and present it at our store to receive 10% off your purchase.
          </p>
        </div>

        {/* Voucher */}
        <div className="card overflow-hidden shadow-2xl mb-8" id="voucher">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <h2 className="text-3xl font-bold">Jacob&apos;s Pet Shop</h2>
            </div>
            <p className="text-xl opacity-90">Subscriber Discount Voucher</p>
          </div>

          {/* Voucher Content */}
          <div className="p-8 bg-white dark:bg-gray-900">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary/10 dark:bg-primary/20 px-8 py-4 rounded-lg mb-4">
                <div className="text-6xl font-bold text-primary mb-2">10% OFF</div>
                <div className="text-xl text-foreground">All In-Store Purchases</div>
              </div>
            </div>

            <div className="border-t border-b border-border py-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Voucher Code</div>
                  <div className="text-2xl font-mono font-bold text-primary">{voucherCode}</div>
                </div>
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Valid From</div>
                  <div className="text-2xl font-semibold text-foreground">{currentDate}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-foreground/70">
              <div>
                <h3 className="font-bold text-foreground mb-2">How to Use:</h3>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Print this voucher or show it on your mobile device</li>
                  <li>Present at checkout in our physical store</li>
                  <li>Receive 10% off your total purchase</li>
                  <li>Keep your voucher - you can use it multiple times!</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Terms & Conditions:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Valid only at Jacob&apos;s Pet Shop, 123 Highland Road, Inverness</li>
                  <li>Cannot be combined with other offers or promotions</li>
                  <li>Not valid for online purchases</li>
                  <li>No cash alternative available</li>
                  <li>Voucher valid while subscription is active</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-semibold text-foreground">Jacob&apos;s Pet Shop</div>
                  <div className="text-foreground/60">123 Highland Road, Inverness, IV2 4AB</div>
                  <div className="text-foreground/60">Tel: 01463 555 123</div>
                </div>
                <div className="text-right">
                  <div className="text-foreground/60">Subscriber:</div>
                  <div className="font-medium text-foreground">{user.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="bg-gradient-to-r from-primary to-secondary h-2" />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 no-print">
          <button
            onClick={handlePrint}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Voucher
          </button>
          <button
            onClick={() => router.push('/products')}
            className="btn-outline"
          >
            Browse Products
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 no-print">
          <div className="card p-6 bg-primary/5 dark:bg-primary/10">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lost Your Voucher?
            </h3>
            <p className="text-foreground/80 text-sm">
              No problem! Just log in to your account anytime to view and print your voucher again. 
              Your unique voucher code never changes.
            </p>
          </div>

          <div className="card p-6 bg-secondary/5 dark:bg-secondary/10">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Store Hours
            </h3>
            <div className="text-sm text-foreground/80 space-y-1">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="font-medium">9am - 6pm</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium">9am - 5pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium">10am - 4pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
