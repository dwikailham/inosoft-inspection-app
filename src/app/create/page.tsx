import { InspectionForm } from '@/components/organisms/InspectionForm';
import { PageHeader } from '@/components/molecules/PageHeader';

export default function CreateInspectionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Inspections', href: '/' },
          { label: 'Create Inspection' }
        ]}
        title="Create Inspection"
        subtitle="Fill out the required information to create a new return inspection."
      />

      <InspectionForm />
    </div>
  );
}
