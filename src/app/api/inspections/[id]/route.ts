import { NextResponse } from 'next/server';
import { inspectionsList } from '@/lib/mockData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const found = inspectionsList.find(i => i._id === id);
  if (found) {
    return NextResponse.json(found);
  }
  
  // Fallback
  return NextResponse.json(inspectionsList[0]);
}
