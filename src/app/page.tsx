'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { InspectionData } from '@/types';
import { useRouter } from 'next/navigation';
import { TabNavigation } from '@/components/molecules/TabNavigation';
import { InspectionTable } from '@/components/organisms/InspectionTable';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Search, Plus } from 'lucide-react';
import { PageHeader } from '@/components/molecules/PageHeader';

export default function ListInspectionPage() {
  const router = useRouter();
  const [inspections, setInspections] = useState<InspectionData[]>([]);
  const [activeTab, setActiveTab] = useState('Open');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInspections = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/inspections');
        setInspections(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInspections();
  }, []);

  const tabs = ['Open', 'For Review', 'Completed'];

  const filteredInspections = inspections.filter((item) => {
    if (!item.status) return false;

    // Support search string
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches = (item.no?.toLowerCase().includes(q)) ||
        (item.location?.toLowerCase().includes(q)) ||
        (item.insp_type?.toLowerCase().includes(q));
      if (!matches) return false;
    }

    const s = item.status.toLowerCase();
    if (activeTab === 'Open') {
      return ['open', 'new', 'in progress', 'draft'].includes(s);
    }
    return s === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Inspections' }]}
        title="Inspections"
        subtitle="Manage and track your inspections here."
      />

      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pt-2">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            className="pl-9"
            placeholder="Search inspections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-3 w-full sm:w-auto justify-end">
          <Button variant="outline">Export</Button>
          {activeTab === 'Open' && (
            <Button onClick={() => router.push('/create')} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Create Request
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-neutral-500">Loading inspections...</div>
      ) : (
        <InspectionTable inspections={filteredInspections} />
      )}
    </div>
  );
}
