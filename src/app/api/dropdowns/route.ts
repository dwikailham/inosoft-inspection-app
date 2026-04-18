import { NextResponse } from 'next/server';
import { serviceTypes, stocks, scopes } from '@/lib/mockData';

export async function GET() {
  const dropdownData = {
    yards: [{ id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'MHPC' }, { id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a', name: 'Main Yard' }],
    units: [{ id: 'FT', name: 'FT' }, { id: 'M', name: 'Meter' }],
    serviceTypes: serviceTypes,
    scopes: scopes,
    tpis: [{ id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1', name: 'NOV Middle East Oil and Gas...' }],
    customers: [{ id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', name: 'MITME' }],
    itemCodes: [
      { id: '550e8400-e29b-41d4-a716-446655440000', code: 'ITM001278', desc: 'Casing 13 3/8", 68 PPF, L80...', batch: 'PO-2024-00457-A-RR' },
      { id: '123e4567-e89b-12d3-a456-426614174000', code: 'ITM001279', desc: 'Tubing 5", L80', batch: 'PO-2024-TUBING' }
    ],
    stocks: stocks
  };

  return NextResponse.json(dropdownData);
}
