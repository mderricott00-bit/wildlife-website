'use client';

import { useState } from 'react';
import Image from 'next/image';
import WildlifeDetailModal from './WildlifeDetailModal';

interface Wildlife {
  id: number;
  name: string;
  scientificName: string;
  category: string;
  conservationStatus: string;
  sponsorshipCost: number;
  image: string;
  currentResidents: number;
  // Wikipedia data
  wikipediaExtract?: string;
  wikipediaImage?: string;
  wikipediaUrl?: string;
}

interface WildlifeCardProps {
  wildlife: Wildlife;
}

export default function WildlifeCard({ wildlife }: WildlifeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use Wikipedia image if available, otherwise fallback to local
  const displayImage = wildlife.wikipediaImage || wildlife.image;
  
  // Use Wikipedia extract for description, truncated for card
  const description = wildlife.wikipediaExtract 
    ? wildlife.wikipediaExtract.substring(0, 150) + '...'
    : 'Click to learn more about this species from Wikipedia.';

  return (
    <>
      <div 
        className="card-hover overflow-hidden group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <Image
            src={displayImage}
            alt={wildlife.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4">
            <span className="badge bg-white/90 dark:bg-gray-900/90 text-foreground">
              {wildlife.currentResidents} resident{wildlife.currentResidents !== 1 ? 's' : ''}
            </span>
          </div>
          {wildlife.wikipediaImage && (
            <div className="absolute top-4 left-4">
              <span className="badge bg-blue-500/90 text-white text-xs">
                📷 Wiki
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                {wildlife.name}
              </h3>
              <p className="text-sm italic text-foreground/60">{wildlife.scientificName}</p>
            </div>
          </div>
          
          <div className="mb-4">
            {wildlife.conservationStatus === 'Critically Endangered' && (
              <span className="badge badge-danger">Critically Endangered</span>
            )}
            {wildlife.conservationStatus === 'Endangered in UK' && (
              <span className="badge badge-warning">Endangered in UK</span>
            )}
            {wildlife.conservationStatus === 'Protected Species' && (
              <span className="badge badge-success">Protected Species</span>
            )}
          </div>

          <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
            {description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-sm text-foreground/60">Sponsorship from</span>
              <div className="text-2xl font-bold text-primary">
                £{wildlife.sponsorshipCost}/month
              </div>
            </div>
            <button className="text-primary hover:text-primary-dark font-semibold transition-colors flex items-center gap-2">
              Learn More
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <WildlifeDetailModal
        wildlife={wildlife}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
