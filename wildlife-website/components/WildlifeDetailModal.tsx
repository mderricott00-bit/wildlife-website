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
  currentResidents: number;
  // Wikipedia data (primary source)
  wikipediaExtract?: string;
  wikipediaImage?: string;
  wikipediaUrl?: string;
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

  // Use Wikipedia image if available, otherwise fallback to local
  const displayImage = wildlife.wikipediaImage || wildlife.image;

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

        {/* Image - Uses Wikipedia image if available */}
        <div className="relative h-80 bg-gray-100 dark:bg-gray-800">
          <Image
            src={displayImage}
            alt={wildlife.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="badge bg-white/90 dark:bg-gray-900/90 text-foreground text-base px-4 py-2">
              {wildlife.currentResidents} resident{wildlife.currentResidents !== 1 ? 's' : ''} at centre
            </span>
          </div>
          {wildlife.wikipediaImage && (
            <div className="absolute bottom-4 right-4">
              <span className="badge bg-blue-500/90 text-white text-xs px-2 py-1">
                📷 Wikipedia
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
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

          {/* Wikipedia Description - Primary Content */}
          {wildlife.wikipediaExtract ? (
            <div className="card p-6 bg-card border mb-8">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.436 0 .135.053.33.166.601 1.082 2.646 4.818 10.521 4.818 10.521l.136.046 2.411-4.81-.482-1.067-1.658-3.264s-.318-.654-.428-.872c-.728-1.443-.712-1.518-1.447-1.617-.207-.023-.313-.05-.313-.149v-.468l.06-.045h4.292l.113.037v.451c0 .105-.076.15-.227.15l-.308.047c-.792.061-.661.381-.136 1.422l1.582 3.252 1.758-3.504c.293-.64.233-.801-.378-.801l-.263-.009c-.163 0-.245-.037-.245-.149v-.468l.06-.045h3.666l.06.045v.455c0 .119-.073.176-.219.176-.595.063-1.006.202-1.317.732l-2.644 5.328 2.593 5.192 4.078-10.091c.163-.479.209-.754.209-.933 0-.318-.263-.441-.789-.469l-.358-.026c-.153 0-.23-.049-.23-.168v-.455l.06-.045h3.91l.06.045v.455c0 .119-.076.168-.229.168-.639.047-1.072.262-1.332.937l-5.176 13.048c-.545 1.315-.829 1.26-1.194.189z"/>
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-foreground">About {wildlife.name}</h3>
                  <p className="text-sm text-foreground/60">Information sourced from Wikipedia</p>
                </div>
              </div>
              <p className="text-foreground/80 leading-relaxed text-lg mb-4">
                {wildlife.wikipediaExtract}
              </p>
              {wildlife.wikipediaUrl && (
                <a 
                  href={wildlife.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read full article on Wikipedia
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ) : (
            <div className="card p-6 bg-gray-50 dark:bg-gray-800/50 mb-8">
              <p className="text-foreground/60 text-center">
                Loading information from Wikipedia...
              </p>
            </div>
          )}

          {/* Sponsorship CTA - Local data */}
          <div className="card p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Sponsor {wildlife.name}</h3>
                <p className="text-foreground/80 mb-2">
                  Help us care for the {wildlife.currentResidents} {wildlife.name.toLowerCase()}{wildlife.currentResidents !== 1 ? 's' : ''} at our rescue centre.
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
