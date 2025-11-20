import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'wildlife.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const wildlife = JSON.parse(fileContents);
    
    return NextResponse.json(wildlife);
  } catch (error) {
    console.error('Error reading wildlife data:', error);
    return NextResponse.json({ error: 'Failed to load wildlife data' }, { status: 500 });
  }
}
