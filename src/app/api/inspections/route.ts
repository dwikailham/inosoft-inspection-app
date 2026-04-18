import { NextResponse } from 'next/server';
import { inspectionsList } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(inspectionsList);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newItem = {
    ...inspectionsList[0],
    ...body, // Spread body to include inputted location, date, scopes, etc.
    _id: crypto.randomUUID(),
    no: `REQ-2024-000${inspectionsList.length + 1}`,
    insp_type: body.service_type || 'New Arrival',
    status: body.status || 'New', // Dynamic from UI button 
  };
  inspectionsList.unshift(newItem); // Add to top
  return NextResponse.json({ success: true, item: newItem }, { status: 201 });
}
