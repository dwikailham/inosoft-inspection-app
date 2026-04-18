'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Badge } from '../atoms/Badge';

import { InspectionData, InspectionSow, InspectionWork, InspectionField, InspectionItem, LotItem } from '@/types';

interface InspectionDetailProps {
  data: InspectionData | null;
}

export function InspectionDetail({ data }: InspectionDetailProps) {
  const router = useRouter();
  const dropdowns = useSelector((state: RootState) => state.dropdowns.data);

  if (!data) return <div className="p-10 text-center">No data found</div>;

  // Resolve dynamic fields from dropdowns if they exist as ID
  const customerName = dropdowns?.customers?.find(c => c.id === data.customer_id)?.name || data.customer?.name || data.customer_id || '-';
  const serviceTypeName = dropdowns?.serviceTypes?.find(s => s.id === data.service_type)?.name || data.insp_type || data.service_type || '-';
  const scopeObj = dropdowns?.scopes?.find(s => s.id === data.scope_of_work);

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
              <p className="font-bold text-neutral-900">{serviceTypeName}</p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1">Location</p>
              <p className="font-bold text-neutral-900">{data.location || '-'}</p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1">Charge to customer</p>
              <p className="font-bold text-neutral-900">{customerName}</p>
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
            <p className="font-bold text-neutral-900">{data.createdate ? new Date(data.createdate * 1000).toLocaleDateString() : new Date().toLocaleDateString()}</p>
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
                <th className="px-4 py-2">Service Type / Subscope</th>
                <th className="px-4 py-2">Scope Details</th>
                <th className="px-4 py-2">Template / Description</th>
              </tr>
            </thead>
            <tbody>
              {scopeObj ? (
                <tr className="border-t bg-white">
                  <td className="px-4 py-3 font-semibold">{serviceTypeName}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      <span className="font-semibold text-neutral-800 mr-2">{scopeObj.name}:</span>
                      {scopeObj.included.map((chip, idx) => (
                        <span key={idx} className="bg-neutral-100 text-neutral-500 text-xs px-2 py-1 rounded border shadow-sm">{chip}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-500">-</td>
                </tr>
              ) : (
                data.sow?.map((scope: InspectionSow, idx: number) => (
                  scope.works.map((work: InspectionWork) => (
                    <tr key={work._id} className="border-t bg-white">
                      <td className="px-4 py-3 font-semibold">{work.subscope_name}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {work.fields?.filter((f: InspectionField) => f.selected).map((field: InspectionField) => (
                            <span key={field._id} className="bg-neutral-100 text-neutral-500 text-xs px-2 py-1 rounded border shadow-sm">{field.name}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-neutral-500">{scope.template || '-'}</td>
                    </tr>
                  ))
                ))
              )}
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
            <thead className="bg-neutral-200 text-neutral-700 text-[11px] uppercase border-b-2 border-neutral-300">
              <tr>
                <th rowSpan={2} className="px-4 py-3 align-bottom border-r border-neutral-300">Item No.</th>
                <th rowSpan={2} className="px-4 py-3 align-bottom border-r border-neutral-300">Item Description</th>
                <th rowSpan={2} className="px-4 py-3 align-bottom">Lot No.</th>
                <th rowSpan={2} className="px-4 py-3 align-bottom">Allocation</th>
                <th rowSpan={2} className="px-4 py-3 align-bottom">Owner</th>
                <th rowSpan={2} className="px-4 py-3 align-bottom border-r border-neutral-300">Condition</th>
                <th colSpan={2} className="px-4 py-1.5 text-center bg-neutral-300 border-r border-neutral-400">Requested</th>
                <th colSpan={2} className="px-4 py-1.5 text-center bg-neutral-300 border-r border-neutral-400">Pending</th>
                <th colSpan={2} className="px-4 py-1.5 text-center bg-neutral-300">Completed</th>
              </tr>
              <tr>
                <th className="px-3 py-1.5 text-center text-neutral-600 bg-neutral-200 border-t border-neutral-300">PCS</th>
                <th className="px-3 py-1.5 text-center text-neutral-600 bg-neutral-200 border-t border-r border-neutral-300">MT</th>
                <th className="px-3 py-1.5 text-center text-neutral-600 bg-neutral-200 border-t border-neutral-300">PCS</th>
                <th className="px-3 py-1.5 text-center text-neutral-600 bg-neutral-200 border-t border-r border-neutral-300">MT</th>
                <th className="px-3 py-1.5 text-center text-neutral-600 bg-neutral-200 border-t border-neutral-300">PCS</th>
                <th className="px-3 py-1.5 text-center text-neutral-600 bg-neutral-200 border-t border-neutral-300">MT</th>
              </tr>
            </thead>
            <tbody>
              {(data.items_raw)?.map((item: InspectionItem, idx: number) => (
                <React.Fragment key={item.id_item || idx}>
                  <tr className="border-t bg-white">
                    <td className="px-4 py-3 text-xs border-r border-neutral-100" rowSpan={Math.max(1, item.lots?.length || 1)}>{item.item_code || '-'}</td>
                    <td className="px-4 py-3 text-xs border-r border-neutral-100" rowSpan={Math.max(1, item.lots?.length || 1)}>{item.item_desc || '-'}</td>

                    {/* Render first lot inline or mock empty */}
                    <td className="px-4 py-3 text-xs font-semibold">{item.lots?.[0]?.lot_no || item.lot_no || '-'}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{item.lots?.[0]?.allocation || item.allocation || '-'}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{item.lots?.[0]?.owner || item.owner || item.owned_name || '-'}</td>
                    <td className="px-4 py-3 border-r border-neutral-100"><Badge status={item.lots?.[0]?.condition || item.condition || '-'} /></td>
                    <td className="px-3 py-3 text-center font-medium bg-neutral-50">{item.lots?.[0]?.qty_required || item.qty_required || item.qty || '-'}</td>
                    <td className="px-3 py-3 text-center text-neutral-500 bg-neutral-50 border-r border-neutral-200">127.89</td>
                    <td className="px-3 py-3 text-center font-medium">{item.lots?.[0]?.qty_required || item.qty_required || item.qty || '-'}</td>
                    <td className="px-3 py-3 text-center text-neutral-500 border-r border-neutral-200">92.86</td>
                    <td className="px-3 py-3 text-center font-medium bg-neutral-50">0</td>
                    <td className="px-3 py-3 text-center text-neutral-500 bg-neutral-50">0</td>
                  </tr>
                  {/* Additional Lots for this item */}
                  {item.lots?.slice(1).map((lot: LotItem, lotIdx: number) => (
                    <tr key={lotIdx} className="border-t bg-white bg-opacity-50">
                      <td className="px-4 py-3 text-xs font-semibold">{lot.lot_no}</td>
                      <td className="px-4 py-3 font-semibold text-neutral-900">{lot.allocation}</td>
                      <td className="px-4 py-3 font-semibold text-neutral-900">{lot.owner}</td>
                      <td className="px-4 py-3 border-r border-neutral-100"><Badge status={lot.condition} /></td>
                      <td className="px-3 py-3 text-center font-medium bg-neutral-50">{lot.qty_required}</td>
                      <td className="px-3 py-3 text-center text-neutral-500 bg-neutral-50 border-r border-neutral-200">127.89</td>
                      <td className="px-3 py-3 text-center font-medium">{lot.qty_required}</td>
                      <td className="px-3 py-3 text-center text-neutral-500 border-r border-neutral-200">92.86</td>
                      <td className="px-3 py-3 text-center font-medium bg-neutral-50">0</td>
                      <td className="px-3 py-3 text-center text-neutral-500 bg-neutral-50">0</td>
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
