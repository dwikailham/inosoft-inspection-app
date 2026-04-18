import { NextResponse } from 'next/server';
import { inspectionsList, itemCodes } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(inspectionsList);
}

export async function POST(request: Request) {
  const body = await request.json();
  const mappedItemsRaw = body.items ? body.items.map((item: any) => {
    const codeRef = itemCodes.find((c: any) => c.id === item.itemCode);
    return {
      id_item: crypto.randomUUID(),
      item_code: codeRef?.code || '',
      item_desc: codeRef?.desc || '',
      batch: codeRef?.batch || '',
      condition: item.lots?.[0]?.condition || 'good',
      qty: Number(item.qty) || 0,
      lot_no: item.lots?.[0]?.lot_no || '',
      allocation: item.lots?.[0]?.allocation || '',
      owner: item.lots?.[0]?.owner || '',
      // Mapping ke owned_name agar konsisten dengan fallback UI
      owned_name: item.lots?.[0]?.owner || '',
      qty_required: Number(item.lots?.[0]?.qty_required) || Number(item.qty) || 0,
      lots: item.lots
    };
  }) : undefined;

  const newItem = {
    ...inspectionsList[0],
    ...body, // Spread body to include inputted location, date, scopes, etc.
    // Explicitly handle customer override so mock 'MITME' customer isn't persistently inherited
    customer: body.charge_to_customer ? undefined : null,
    items_raw: mappedItemsRaw || body.items_raw, // Map items to table shape
    _id: crypto.randomUUID(),
    no: `REQ-2024-000${inspectionsList.length + 1}`,
    insp_type: body.service_type || 'New Arrival',
    status: body.status || 'New', // Dynamic from UI button 
  };
  inspectionsList.unshift(newItem); // Add to top
  return NextResponse.json({ success: true, item: newItem }, { status: 201 });
}
