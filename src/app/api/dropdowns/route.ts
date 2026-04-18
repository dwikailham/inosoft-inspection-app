import { NextResponse } from 'next/server';
import { serviceTypes, stocks, scopes, itemCodes } from '@/lib/mockData';

export async function GET() {
  const dropdownData = {
    yards: [{ id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'MHPC' }, { id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a', name: 'Main Yard' }],
    units: [{ id: 'FT', name: 'FT' }, { id: 'M', name: 'Meter' }],
    serviceTypes: serviceTypes,
    scopes: scopes,
    tpis: [{ id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1', name: 'NOV Middle East Oil and Gas...' }],
    customers: [{ id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', name: 'MITME' }],
    itemCodes: itemCodes,
    stocks: stocks
  };

  return NextResponse.json(dropdownData);
}
