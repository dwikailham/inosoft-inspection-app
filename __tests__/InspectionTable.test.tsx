import { render, screen } from '@testing-library/react';
import { InspectionTable } from '@/components/organisms/InspectionTable';
import '@testing-library/jest-dom';

describe('InspectionTable Component', () => {
  const mockInspections = [
    {
      _id: '1',
      no: 'RRIN-2025-0001',
      status: 'Open',
      unit: 'FT',
      insp_type: 'Return Inspection',
      appvwho: 'John Doe',
    },
    {
      _id: '2',
      no: 'RRIN-2025-0002',
      status: 'Completed',
      unit: 'M',
      insp_type: 'Regular Inspection',
      appvwho: 'Jane Smith',
    },
  ];

  it('renders "No inspections found" when empty', () => {
    render(<InspectionTable inspections={[]} />);
    expect(screen.getByText(/No inspections found in this state/i)).toBeInTheDocument();
  });

  it('renders table headers correctly', () => {
    render(<InspectionTable inspections={mockInspections} />);
    expect(screen.getByText('Type')).toBeInTheDocument();
  });

  it('renders inspection data correctly', () => {
    render(<InspectionTable inspections={mockInspections} />);
    expect(screen.getByText('RRIN-2025-0001')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('RRIN-2025-0002')).toBeInTheDocument();
  });
});
