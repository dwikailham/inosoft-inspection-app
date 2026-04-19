'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { InspectionData } from '@/types';
import { formatDate } from '@/utils/date';

interface InspectionTableProps {
  inspections: InspectionData[];
}

export function InspectionTable({ inspections }: InspectionTableProps) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (inspections.length === 0) {
    return (
      <div className="text-center py-10 bg-white border rounded-lg mt-4 shadow-sm">
        <p className="text-neutral-500 text-sm">No inspections found in this state.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-neutral-600">
          <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 border-b">
            <tr>
              <th className="px-4 py-3 w-10"></th>
              <th className="px-4 py-3">Request No</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Date Submitted</th>
              <th className="px-4 py-3">ECD</th>
              <th className="px-4 py-3">Related To</th>
              <th className="px-4 py-3">3rd Party</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((item) => {
              const isExpanded = !!expandedRows[item._id];
              const itemsList = item.items_raw || item.items || [];
              const hasItems = itemsList.length > 0;

              return (
                <React.Fragment key={item._id}>
                  <tr className={`bg-white hover:bg-neutral-50 transition-colors ${isExpanded ? 'border-b-0' : 'border-b'}`}>
                    <td className="px-4 py-4 text-center">
                      {hasItems ? (
                        <button
                          onClick={() => toggleRow(item._id)}
                          className="p-1 rounded-md hover:bg-neutral-200 transition-colors focus:outline-none"
                          aria-label="Toggle details"
                        >
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-neutral-600" /> : <ChevronRight className="w-4 h-4 text-neutral-600" />}
                        </button>
                      ) : (
                        <div className="w-6 h-6"></div>
                      )}
                    </td>
                    <td className="px-4 py-4 font-medium text-neutral-900">{item.no || '-'}</td>
                    <td className="px-4 py-4">{item.location || '-'}</td>
                    <td className="px-4 py-4">{item.insp_type || item.service_type || '-'}</td>
                    <td className="px-4 py-4">{formatDate(item.createdate)}</td>
                    <td className="px-4 py-4">{formatDate(item.date)}</td>
                    <td className="px-4 py-4 text-emerald-600 font-medium">{item.related_to || '-'}</td>
                    <td className="px-4 py-4">{item.appvwho || '-'}</td>
                    <td className="px-4 py-4">
                      <Badge status={item.status} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link href={`/${item._id}`} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        View
                      </Link>
                    </td>
                  </tr>
                  {isExpanded && hasItems && (
                    <tr className="border-b bg-neutral-50 shadow-inner">
                      <td colSpan={10} className="p-0">
                        <div className="pl-14 pr-4 py-2">
                          <table className="w-full text-xs text-left">
                            <thead className="text-neutral-500 font-medium border-b border-neutral-200">
                              <tr>
                                <th className="py-2.5 font-medium">Item Description</th>
                                <th className="py-2.5 font-medium text-center">Ownership</th>
                                <th className="py-2.5 font-medium text-center">Lot No.</th>
                                <th className="py-2.5 font-medium text-center">Qty</th>
                                <th className="py-2.5 font-medium text-center">Progress</th>
                              </tr>
                            </thead>
                            <tbody>
                              {itemsList.map((rawItem, idx) => (
                                <tr key={rawItem.id_item || idx} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-100 transition-colors">
                                  <td className="py-3 text-neutral-800">{rawItem.item_desc || rawItem.item_code || '-'}</td>
                                  <td className="py-3 text-center font-medium text-neutral-700">{rawItem.owned_name || rawItem.owner || 'PT Santosa'}</td>
                                  <td className="py-3 text-center text-neutral-600">{rawItem.lot_no || rawItem.batch || '-'}</td>
                                  <td className="py-3 text-center font-medium">{rawItem.qty || '-'}</td>
                                  <td className="py-3 text-center text-neutral-600">0%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
