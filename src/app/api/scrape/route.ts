// src/app/api/scrape/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { scrapeDocumentation } from '@/lib/scraper'; // Using '@/' alias for cleaner imports

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    // 1. Validate input
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required and must be a string.' }, { status: 400 });
    }

    // 2. Validate URL format
    try {
      new URL(url);
    } catch (_) {
      return NextResponse.json({ error: 'Invalid URL format provided.' }, { status: 400 });
    }

    console.log(`API route received request to scrape: ${url}`);

    // 3. Call the scraper function
    const content = await scrapeDocumentation(url);

    // 4. Return the successful response
    return NextResponse.json({
      message: 'Scraping successful.',
      url: url,
      content: content,
    }, { status: 200 });

  } catch (error: any) {
    // 5. Handle errors gracefully
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to scrape the documentation.',
        details: error.message || 'An unknown error occurred.'
      },
      { status: 500 }
    );
  }
}
