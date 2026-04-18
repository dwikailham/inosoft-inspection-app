'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { InspectionData } from '@/types';
import { useParams } from 'next/navigation';
import { InspectionDetail } from '@/components/organisms/InspectionDetail';
import { PageHeader } from '@/components/molecules/PageHeader';

export default function DetailInspectionPage() {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<InspectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`/api/inspections/${id}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-neutral-500">Loading details...</div>;

  return (
    <div className="pb-10 space-y-6">
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Inspections', href: '/' },
          { label: 'Inspection Detail' }
        ]}
        title="Inspection Detail"
        subtitle="View detailed information about this inspection request."
      />
      <InspectionDetail data={data} />
    </div>
  );
}
