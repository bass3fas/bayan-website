import { NextResponse } from 'next/server';
import { NewsItem } from '@/interfaces';

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Join Our Team: Sales Engineer - Neurosurgery Equipment Position Available",
    excerpt: "Bayan Medical Company is seeking a highly skilled and motivated Sales Engineer to support the sales efforts of our neurosurgery and ENT surgery equipment. Join our dynamic team and drive sales growth in cutting-edge medical technology.",
    content: `
      <p>We are excited to announce a new career opportunity at Bayan Medical Company. We are seeking a highly skilled and motivated Sales Engineer to join our team and support the sales efforts of our neurosurgery / ENT surgery equipment.</p>
      
      <h3>Job Description: Sales Engineer - Neurosurgery Equipment</h3>
      <p>The ideal candidate will have a strong technical background and a proven ability to drive sales growth in the medical equipment industry.</p>
      
      <h3>Key Duties and Responsibilities:</h3>
      <ul>
        <li>Manage and coordinate activities focused on promoting and selling medical equipment</li>
        <li>Recommend changes to current sales techniques to improve sales performance and drive better results</li>
        <li>Provide expert knowledge and technical support to clients</li>
        <li>Implement sales programs aimed at driving revenue growth and increasing market share</li>
        <li>Develop, implement, and monitor annual sales forecasts to ensure alignment with business goals</li>
        <li>Sell a full product line of offerings and maintain accurate customer information</li>
        <li>Deliver exceptional and professional customer service to both new and existing customers</li>
        <li>Identify and target potential customers, generating leads for sales equipment</li>
      </ul>
      
      <h3>Required Skills:</h3>
      <ul>
        <li>Meeting Sales Goals and Customer Service Oriented approach</li>
        <li>Sales Planning, Forecasting and Budgeting Experience</li>
        <li>Knowledge of Managing Processes and Negotiation Skills</li>
        <li>Strong Market Knowledge and Analytical Skills</li>
        <li>Excellent verbal and communication skills</li>
        <li>Outstanding negotiation skills and commitment to succeed</li>
        <li>Ability to discuss highly technical concepts with prospective leads</li>
        <li>Willingness to travel</li>
        <li>Strong verbal, written, and interpersonal skills</li>
      </ul>
      
      <h3>Minimum Requirements:</h3>
      <ul>
        <li>Bachelor's Degree in Biomedical Engineering</li>
        <li>At least 2-5 years in sales role handling sales of medical equipment</li>
        <li>UAE Work Experience</li>
        <li>UAE Driving License & must own a car</li>
      </ul>
      
      <p><strong>Ready to advance your career with Bayan Medical?</strong> <a href="/#contact" class="text-blue-600 underline hover:text-blue-800">Apply now through our contact form</a> and join our team in driving innovation in healthcare technology.</p>
    `,
    image: "/assets/images/news/1.png",
    date: new Date().toISOString().split('T')[0], // Today's date
    category: "announcement"
  },
  {
    id: 2,
    title: "Career Opportunity: Senior Product Specialist - Neurosurgery Products",
    excerpt: "Bayan Medical Company is looking for a knowledgeable and experienced Senior Product Specialist for Neurosurgery products. Join our Abu Dhabi team and become a subject matter expert in neurosurgical solutions.",
    content: `
      <p>We are pleased to announce another exciting career opportunity at Bayan Medical Company. We are seeking a knowledgeable and experienced Senior Product Specialist - Neurosurgery to join our team in Abu Dhabi, UAE.</p>
      
      <h3>Job Description: Senior Product Specialist - Surgery Products</h3>
      <p>The ideal candidate will have a solid background in Sales and Marketing of Neuro Surgical Products and Consumables.</p>
      
      <p><strong>Location:</strong> Abu Dhabi, UAE</p>
      
      <h3>Key Duties and Responsibilities:</h3>
      <ul>
        <li>Serve as a subject matter expert for Neurosurgery solutions</li>
        <li>Establish and implement sales objectives and goals</li>
        <li>Consistently achieve and exceed Annual Sales Targets by planning, organizing and managing all sales activities</li>
        <li>Develop and maintain strong relationships with key stakeholders such as doctors and hospital purchasing teams</li>
        <li>Proactively arrange appointments through both pre-arranged appointments and regular cold calling</li>
        <li>Develop and deliver professional presentations to Surgeons and medical staff</li>
        <li>Maintain comprehensive and accurate records of all stakeholders</li>
        <li>Track and analyze competitor activities and products</li>
        <li>Explore markets to identify new sales leads, opportunities and industry trends</li>
        <li>Represent the company at Medical Conferences and industry events</li>
        <li>Evaluate market demand and meet customers' needs and expectations</li>
      </ul>
      
      <h3>Required Skills:</h3>
      <ul>
        <li>Strong Social Communication Skills</li>
        <li>Customer Satisfaction focused approach</li>
        <li>Results Oriented mindset</li>
        <li>Analytical and Detail oriented</li>
        <li>Problem solving capabilities</li>
        <li>Well Organized work approach</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>Bachelor's Degree in a related field (Biomedical Engineering, Medical Engineering, Nursing, Pharmacy, Medical Technology, etc.)</li>
        <li>2-5 years of sales experience related to Neuro Surgical products</li>
        <li>Excellent written communication skills</li>
        <li>UAE Work Experience preferred</li>
        <li>UAE Driving License</li>
      </ul>
      
      <p><strong>Take the next step in your healthcare career!</strong> <a href="/#contact" class="text-blue-600 underline hover:text-blue-800">Submit your application through our contact form</a> and become part of our innovative team at Bayan Medical.</p>
    `,
    image: "/assets/images/news/1.png",
    date: new Date().toISOString().split('T')[0], // Today's date
    category: "announcement"
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');

    // If requesting a specific news item by ID
    if (id) {
      const newsItem = newsData.find(item => item.id === parseInt(id));
      if (!newsItem) {
        return NextResponse.json({ error: 'News item not found' }, { status: 404 });
      }
      return NextResponse.json(newsItem);
    }

    // Filter by category if provided
    let filteredNews = newsData;
    if (category && category !== 'all') {
      filteredNews = newsData.filter(item => item.category === category);
    }

    // Sort by date (newest first)
    filteredNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      news: filteredNews,
      total: filteredNews.length
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newsItem: Omit<NewsItem, 'id'> = await request.json();
    
    // Generate new ID
    const newId = Math.max(...newsData.map(item => item.id)) + 1;
    
    const newNewsItem: NewsItem = {
      ...newsItem,
      id: newId
    };
    
    newsData.unshift(newNewsItem); // Add to beginning of array
    
    return NextResponse.json(newNewsItem, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news item' },
      { status: 500 }
    );
  }
}