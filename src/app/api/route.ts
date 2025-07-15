import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type errorResponse = {
  error: string;
  message: string;
  code: string;
  type: string;
};

async function fetchAndExtract(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const $ = cheerio.load(html);
    

    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const headings = $('h1, h2').map((_, el) => $(el).text()).get().join('\n');

    return `
      Title: ${title}
      Meta Description: ${metaDescription}
      Headings: ${headings}
    `;
  } catch (err) {
    console.error('Error fetching URL:', err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const pageSummary = await fetchAndExtract(url);

  if (!pageSummary) {
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // cheaper
      messages: [
        {
          role: 'system',
          content: `
            You are a data extraction agent for a company that is looking for clients that want to sign a contract with the government. Given the summary of a web page, extract and return a JSON object with this exact structure:

            {
              "company_name": string,
              "service_line": string[],
              "company_description": string,
              "tier1_keywords": string[],
              "tier2_keywords": string[],
              "emails": string[],
              "poc": string[]
            }

            - "tier1_keywords" = keywords that this company would use to search for public government opportunities.
            - "tier2_keywords" =  keywords that this company MIGHT use to search for government opportunities.
            - "emails" = extract any emails from the text (can be empty if none).
            - "poc" = point of contact (as an array of strings).
            - "service_line" = the primary services or solutions offered by the company (as an array of strings).
            Strictly return only the JSON. Do not add any explanation or notes.
            `,
        },
        {
          role: 'user',
          content: `Here is the web page summary:\n\n${pageSummary}`,
        },
      ],
    });

    const jsonResponse = completion.choices[0].message.content?.trim();
    return NextResponse.json({ data: jsonResponse });
  } catch (err) {
    console.error('OpenAI API error:', err);

    if (err instanceof OpenAI.APIError) {
      return NextResponse.json(
        { 
          error: 'OpenAI API Error',
          message: err.message,
          code: err.code,
          type: err.type
        },
        { status: err.status || 500 }
      );
    }

    return NextResponse.json({ error: 'Failed to analyze page with OpenAI' }, { status: 500 });
  }
}
