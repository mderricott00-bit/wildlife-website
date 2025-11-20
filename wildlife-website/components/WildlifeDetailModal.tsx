'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Wildlife {
  id: number;
  name: string;
  scientificName: string;
  category: string;
  conservationStatus: string;
  sponsorshipCost: number;
  image: string;
  fullDescription: string;
  habitat: string;
  diet: string;
  threats: string;
  facts: string[];
  currentResidents: number;
}

interface WildlifeDetailModalProps {
  wildlife: Wildlife;
  isOpen: boolean;
  onClose: () => void;
}

export default function WildlifeDetailModal({ wildlife, isOpen, onClose }: WildlifeDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative h-80 bg-gray-100 dark:bg-gray-800">
          <Image
            src={wildlife.image}
            alt={wildlife.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute bottom-4 left-4">
            <span className="badge bg-white/90 dark:bg-gray-900/90 text-foreground text-base px-4 py-2">
              {wildlife.currentResidents} resident{wildlife.currentResidents !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{wildlife.name}</h2>
            <p className="text-lg italic text-foreground/60 mb-3">{wildlife.scientificName}</p>
            <div className="flex flex-wrap gap-2">
              {wildlife.conservationStatus === 'Critically Endangered' && (
                <span className="badge badge-danger">Critically Endangered</span>
              )}
              {wildlife.conservationStatus === 'Endangered in UK' && (
                <span className="badge badge-warning">Endangered in UK</span>
              )}
              {wildlife.conservationStatus === 'Protected Species' && (
                <span className="badge badge-success">Protected Species</span>
              )}
              <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {wildlife.category}
              </span>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-foreground/80 leading-relaxed">{wildlife.fullDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card p-4 bg-primary/5 dark:bg-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-bold text-foreground">Habitat</h3>
              </div>
              <p className="text-sm text-foreground/70">{wildlife.habitat}</p>
            </div>

            <div className="card p-4 bg-secondary/5 dark:bg-secondary/10">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="font-bold text-foreground">Diet</h3>
              </div>
              <p className="text-sm text-foreground/70">{wildlife.diet}</p>
            </div>

            <div className="card p-4 bg-accent/5 dark:bg-accent/10">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="font-bold text-foreground">Threats</h3>
              </div>
              <p className="text-sm text-foreground/70">{wildlife.threats}</p>
            </div>
          </div>

          <div className="card p-6 bg-card mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Fascinating Facts
            </h3>
            <ul className="space-y-3">
              {wildlife.facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-foreground/80">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Sponsor {wildlife.name}</h3>
                <p className="text-foreground/80 mb-2">
                  Help us care for these magnificent animals and support vital conservation work.
                </p>
                <p className="text-3xl font-bold text-primary">
                  From £{wildlife.sponsorshipCost} per month
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Link 
                  href="/subscribe"
                  className="btn-primary text-center whitespace-nowrap"
                >
                  Become a Sponsor
                </Link>
                <button
                  onClick={onClose}
                  className="btn-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
