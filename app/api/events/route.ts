import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'events.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const events = JSON.parse(fileContents);
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error reading events data:', error);
    return NextResponse.json({ error: 'Failed to load events data' }, { status: 500 });
  }
}
