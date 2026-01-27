import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

interface WikipediaResponse {
  query?: {
    pages?: {
      [key: string]: {
        pageid: number;
        title: string;
        extract?: string;
        thumbnail?: {
          source: string;
          width: number;
          height: number;
        };
        original?: {
          source: string;
        };
      };
    };
  };
}

async function fetchWikipediaData(animalName: string) {
  try {
    // Fetch summary and image from Wikipedia API
    const encodedName = encodeURIComponent(animalName);
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedName}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'WildlifeRescueCentre/1.0 (Educational Project)',
      },
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    return {
      wikipediaExtract: data.extract || null,
      wikipediaImage: data.thumbnail?.source || data.originalimage?.source || null,
      wikipediaUrl: data.content_urls?.desktop?.page || null,
    };
  } catch (error) {
    console.error(`Error fetching Wikipedia data for ${animalName}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'wildlife.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const wildlife = JSON.parse(fileContents);
    
    // Enrich each animal with Wikipedia data
    const enrichedWildlife = await Promise.all(
      wildlife.map(async (animal: { name: string; scientificName: string }) => {
        // Try fetching by common name first, then scientific name
        let wikiData = await fetchWikipediaData(animal.name);
        
        if (!wikiData?.wikipediaExtract) {
          wikiData = await fetchWikipediaData(animal.scientificName);
        }
        
        return {
          ...animal,
          ...wikiData,
        };
      })
    );
    
    return NextResponse.json(enrichedWildlife);
  } catch (error) {
    console.error('Error reading wildlife data:', error);
    return NextResponse.json({ error: 'Failed to load wildlife data' }, { status: 500 });
  }
}