'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '../atoms/Badge';

interface InspectionDetailProps {
  data: any; // Ideally we type this with the exact fe-datatest schema
}

export function InspectionDetail({ data }: InspectionDetailProps) {
  const router = useRouter();

  if (!data) return <div>No data found</div>;

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm max-w-8xl mx-auto space-y-8">
      {/* Top Details Panel */}
      <div className="border border-neutral-200 rounded-md">
        <div className="p-4 border-b">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 w-full text-sm">
            <div>
              <p className="text-neutral-500 mb-1">Request No.</p>
              <p className="font-bold text-neutral-900">{data.no}</p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1">Service Type</p>
              <p className="font-bold text-neutral-900">{data.insp_type || data.service_type || '-'}</p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1">Location</p>
              <p className="font-bold text-neutral-900">{data.location || '-'}</p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1">Charge to customer</p>
              <p className="font-bold text-neutral-900">{data.customer?.name || data.customer_id || '-'}</p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1">Status</p>
              <Badge status={data.status} />
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6 text-sm">
          <div>
            <p className="text-neutral-500 mb-1">Date Submitted</p>
            <p className="font-bold text-neutral-900">{data.createdate ? new Date(data.createdate * 1000).toLocaleDateString() : '01 May 23'}</p>
          </div>
          <div>
            <p className="text-neutral-500 mb-1">Estimated Completion Date</p>
            <p className="font-bold text-neutral-900">{data.date || '-'}</p>
          </div>
          <div>
            <p className="text-neutral-500 mb-1">Related To</p>
            <p className="font-bold text-emerald-600">{data.related_to || '-'}</p>
          </div>
        </div>
        <div className="p-4 border-t">
          <p className="text-neutral-500 mb-1 text-xs">Custom Field Header</p>
          <p className="text-neutral-500 mt-2 text-sm">D/C Code</p>
          <p className="font-bold text-neutral-900">{data.dc_code || '-'}</p>
        </div>
      </div>

      {/* Scope Of Work Panel */}
      <div className="border border-neutral-200 rounded-md overflow-hidden">
        <h3 className="font-bold text-neutral-800 text-lg p-4 bg-white border-b">Scope Of Work</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-neutral-600">
            <thead className="bg-neutral-200 text-neutral-700 text-xs">
              <tr>
                <th className="px-4 py-2">Service Type</th>
                <th className="px-4 py-2">Scope Name</th>
                <th className="px-4 py-2">Scope Description</th>
              </tr>
            </thead>
            <tbody>
              {data.sow?.map((scope: any, idx: number) => (
                scope.works.map((work: any) => (
                  <tr key={work._id} className="border-t bg-white">
                    <td className="px-4 py-3 font-semibold">{work.subscope_name}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {work.fields?.filter((f: any) => f.selected).map((field: any) => (
                          <span key={field._id} className="bg-neutral-100 text-neutral-500 text-xs px-2 py-1 rounded border shadow-sm">{field.name}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-500">{scope.template || '-'}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Information Panel */}
      <div className="border border-neutral-200 rounded-md overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white border-b">
          <h3 className="font-bold text-neutral-800 text-lg">Item Information</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-neutral-600">
            <thead className="bg-neutral-200 text-neutral-700 text-xs">
              <tr>
                <th className="px-4 py-3">Item No.</th>
                <th className="px-4 py-3">Item Description</th>
                <th className="px-4 py-3">Lot No.</th>
                <th className="px-4 py-3">Allocation</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3 text-center bg-gray-300">Requested PCS</th>
                <th className="px-4 py-3 text-center bg-gray-300">Pending PCS</th>
              </tr>
            </thead>
            <tbody>
              {(data.items || data.items_raw)?.map((item: any, idx: number) => (
                <React.Fragment key={item.id_item || idx}>
                  <tr className="border-t bg-white">
                    <td className="px-4 py-3 text-xs" rowSpan={Math.max(1, item.lots?.length || 1)}>{item.item_code || '-'}</td>
                    <td className="px-4 py-3 text-xs" rowSpan={Math.max(1, item.lots?.length || 1)}>{item.item_desc || '-'}</td>

                    {/* Render first lot inline or mock empty */}
                    <td className="px-4 py-3 text-xs font-semibold">{item.lots?.[0]?.lot_no || '-'}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{item.lots?.[0]?.allocation || '-'}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{item.lots?.[0]?.owner || '-'}</td>
                    <td className="px-4 py-3"><Badge status={item.lots?.[0]?.condition || item.condition || '-'} /></td>
                    <td className="px-4 py-3 text-center bg-neutral-50">{item.lots?.[0]?.qty_required || '-'}</td>
                    <td className="px-4 py-3 text-center bg-neutral-50">{item.lots?.[0]?.qty_required || '-'}</td>
                  </tr>
                  {/* Additional Lots for this item */}
                  {item.lots?.slice(1).map((lot: any, lotIdx: number) => (
                    <tr key={lotIdx} className="border-t bg-white bg-opacity-50">
                      <td className="px-4 py-3 text-xs font-semibold">{lot.lot_no}</td>
                      <td className="px-4 py-3 font-semibold text-neutral-900">{lot.allocation}</td>
                      <td className="px-4 py-3 font-semibold text-neutral-900">{lot.owner}</td>
                      <td className="px-4 py-3"><Badge status={lot.condition} /></td>
                      <td className="px-4 py-3 text-center bg-neutral-50">{lot.qty_required}</td>
                      <td className="px-4 py-3 text-center bg-neutral-50">{lot.qty_required}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
