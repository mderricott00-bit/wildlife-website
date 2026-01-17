'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  ageGroup: 'adults' | 'children' | 'all';
  price: number;
  capacity: number;
  spotsAvailable: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  requirements: string[];
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<'all' | 'adults' | 'children' | 'all-ages'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'all-ages') return event.ageGroup === 'all';
    return event.ageGroup === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/70">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary/10 dark:bg-primary/20 py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-lg text-foreground/80 max-w-2xl">
            Join us for educational workshops, wildlife experiences, and family-friendly events. 
            Something for everyone, from hands-on activities to expert-led talks.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setFilter('adults')}
              className={`btn ${filter === 'adults' ? 'btn-primary' : 'btn-outline'}`}
            >
              Adults Only ({events.filter(e => e.ageGroup === 'adults').length})
            </button>
            <button
              onClick={() => setFilter('children')}
              className={`btn ${filter === 'children' ? 'btn-primary' : 'btn-outline'}`}
            >
              Children Only ({events.filter(e => e.ageGroup === 'children').length})
            </button>
            <button
              onClick={() => setFilter('all-ages')}
              className={`btn ${filter === 'all-ages' ? 'btn-primary' : 'btn-outline'}`}
            >
              All Ages ({events.filter(e => e.ageGroup === 'all').length})
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="card-hover overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 right-4">
                    {event.ageGroup === 'adults' && (
                      <span className="badge badge-success">For Adults</span>
                    )}
                    {event.ageGroup === 'children' && (
                      <span className="badge badge-warning">For Children</span>
                    )}
                    {event.ageGroup === 'all' && (
                      <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        All Ages
                      </span>
                    )}
                  </div>
                  {event.spotsAvailable <= 5 && event.spotsAvailable > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="badge bg-amber-500 text-white">
                        Only {event.spotsAvailable} spots left!
                      </span>
                    </div>
                  )}
                  {event.spotsAvailable === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
                        FULLY BOOKED
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4 text-foreground/70">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-4 line-clamp-2">
                    {event.shortDescription}
                  </p>

                  {event.fullDescription && (
                    <details className="mb-4">
                      <summary className="cursor-pointer text-primary hover:text-primary-dark font-semibold mb-2">
                        Read more...
                      </summary>
                      <p className="text-foreground/70 text-sm leading-relaxed mt-2">
                        {event.fullDescription}
                      </p>
                      {event.requirements.length > 0 && (
                        <div className="mt-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
                          <h4 className="font-bold text-sm mb-2">Requirements:</h4>
                          <ul className="text-sm text-foreground/70 space-y-1">
                            {event.requirements.map((req, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </details>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-3xl font-bold text-primary">£{event.price}</span>
                      <span className="text-foreground/60 text-sm ml-2">per person</span>
                    </div>
                    <div className="text-right text-sm text-foreground/60">
                      {event.spotsAvailable > 0 ? (
                        <span>{event.spotsAvailable} / {event.capacity} spots</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Fully Booked</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-foreground/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">No events found</h3>
              <p className="text-foreground/70">Try selecting a different filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Info */}
      <section className="section-padding bg-card">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">How to Book</h2>
          <div className="card p-8 bg-primary/5 dark:bg-primary/10">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  By Phone
                </h3>
                <p className="text-foreground/80 mb-2">Call us to book your place</p>
                <a href="tel:01463555123" className="text-primary hover:text-primary-dark font-semibold text-lg">
                  01463 555 123
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  By Email
                </h3>
                <p className="text-foreground/80 mb-2">Email us your booking request</p>
                <a href="mailto:events@jacobspetshop.scot" className="text-primary hover:text-primary-dark font-semibold">
                  events@jacobspetshop.scot
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-foreground/70">
                <strong>Note:</strong> Subscribers receive priority booking and a 10% discount on all events. 
                <a href="/subscribe" className="text-primary hover:text-primary-dark ml-1 font-semibold">
                  Subscribe now →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
