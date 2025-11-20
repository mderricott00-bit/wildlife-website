'use client';

import { useRouter } from 'next/navigation';

export default function SubscribePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Subscribe to Jacob&apos;s Community
          </h1>
          <p className="text-xl text-foreground/80">
            Get exclusive benefits and support Scottish wildlife conservation
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card p-8">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">10% Discount Voucher</h3>
            <p className="text-foreground/70">
              Receive a printable voucher for 10% off all in-store purchases. 
              Use it as many times as you like!
            </p>
          </div>

          <div className="card p-8">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Priority Event Booking</h3>
            <p className="text-foreground/70">
              Get first access to book our popular wildlife events and workshops 
              before they&apos;re opened to the public.
            </p>
          </div>

          <div className="card p-8">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Wildlife Updates</h3>
            <p className="text-foreground/70">
              Receive exclusive updates about our rescue centre residents, 
              conservation projects, and success stories.
            </p>
          </div>

          <div className="card p-8">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Educational Content</h3>
            <p className="text-foreground/70">
              Access to exclusive guides, care tips, and educational resources 
              about pets and Scottish wildlife.
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="card p-8 md:p-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join?
          </h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Create your free account now to start receiving your benefits. 
            It only takes a minute to sign up!
          </p>
          <button
            onClick={() => router.push('/login')}
            className="btn-primary text-lg px-8 py-4"
          >
            Create Account & Get Voucher
          </button>
          <p className="text-sm text-foreground/60 mt-4">
            Already subscribed?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-primary hover:text-primary-dark font-semibold"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="card p-6 cursor-pointer">
              <summary className="font-bold text-lg">Is subscription free?</summary>
              <p className="mt-3 text-foreground/70">
                Yes! Our subscription is completely free. We simply want to build a community 
                of people who care about pets and wildlife conservation.
              </p>
            </details>

            <details className="card p-6 cursor-pointer">
              <summary className="font-bold text-lg">How do I use my discount voucher?</summary>
              <p className="mt-3 text-foreground/70">
                Once you&apos;ve signed up, you can access your voucher from your account. 
                Simply print it out and present it at our store checkout to receive 10% off your purchase.
              </p>
            </details>

            <details className="card p-6 cursor-pointer">
              <summary className="font-bold text-lg">Can I unsubscribe anytime?</summary>
              <p className="mt-3 text-foreground/70">
                Absolutely. You can delete your account at any time from your account settings. 
                No questions asked.
              </p>
            </details>

            <details className="card p-6 cursor-pointer">
              <summary className="font-bold text-lg">Will you share my email address?</summary>
              <p className="mt-3 text-foreground/70">
                Never. We respect your privacy and will only use your email to send you 
                updates about our services and conservation work. You can opt out anytime.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
