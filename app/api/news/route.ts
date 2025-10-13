import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// -----------------
// MongoDB Connection
// -----------------
const uri = process.env.MONGODB_URI || 'mongodb+srv://bass3fas:fskj2581994@bayan.b4m5ord.mongodb.net/';
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

// -----------------
// API Handler
// -----------------
export async function GET(req: NextRequest) {
  try {
    const client = await connectToDatabase();
    const db = client.db('bayanmed'); // your database name
    const collection = db.collection('news');

    // Get category filter from query params
    const url = new URL(req.url);
    const category = url.searchParams.get('category') || 'all';

    // Build query
    const query = category === 'all' ? {} : { category };

    // Fetch news and sort by newest
    const newsItems = await collection.find(query).sort({ date: -1 }).toArray();

    // Return as JSON
    return NextResponse.json({ news: newsItems || [] });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ news: [] });
  }
}
