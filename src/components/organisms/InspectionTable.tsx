import Link from 'next/link';
import { Badge } from '../atoms/Badge';

interface Inspection {
  _id: string;
  no: string;
  status: string;
  unit?: string;
  insp_type?: string;
  appvwho?: string;
  location?: string;
  scope_of_work?: string;
  service_type?: string;
  createdate?: number;
  date?: string;
  related_to?: string;
}

interface InspectionTableProps {
  inspections: Inspection[];
}

export function InspectionTable({ inspections }: InspectionTableProps) {
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
              <th className="px-6 py-3">Request No</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Scope of Work</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Date Submitted</th>
              <th className="px-6 py-3">ECD</th>
              <th className="px-6 py-3">Related To</th>
              <th className="px-6 py-3">3rd Party</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((item) => (
              <tr key={item._id} className="bg-white border-b hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium text-neutral-900">{item.no || '-'}</td>
                <td className="px-6 py-4">{item.location || '-'}</td>
                <td className="px-6 py-4">{item.scope_of_work || '-'}</td>
                <td className="px-6 py-4">{item.insp_type || item.service_type || '-'}</td>
                <td className="px-6 py-4">{item.createdate ? new Date(item.createdate * 1000).toLocaleDateString() : '-'}</td>
                <td className="px-6 py-4">{item.date || '-'}</td>
                <td className="px-6 py-4 text-emerald-600 font-medium">{item.related_to || '-'}</td>
                <td className="px-6 py-4">{item.appvwho || '-'}</td>
                <td className="px-6 py-4">
                  <Badge status={item.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/${item._id}`} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
