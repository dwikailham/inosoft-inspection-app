export const scopes = [
  { id: '3f4e240b-789a-4c28-9d21-f3b14eddb17a', name: 'Standard Scope', included: ['Visual Thread', 'Visual Body', 'Full Length Drift'] },
  { id: '6c8f9b45-123e-4b67-a25e-8b1e4c7d9a1c', name: 'Basic Check', included: ['Visual Body', 'Tally Report'] },
  { id: '1e9a3b68-8d02-4c12-8e4d-7b2e2b3e4b44', name: 'Comprehensive', included: ['Visual Thread', 'Visual Body', 'Magnetic Particle', 'Wall Thickness Check'] }
];

export const serviceTypes = [
  { id: 'New Arrival', name: 'New Arrival' },
  { id: 'Maintenance', name: 'Maintenance' },
  { id: 'On Spot', name: 'On Spot' }
];

export const stocks = [
  { id: 'd0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', code: 'ITM001278', lot_no: 'LOT-A100', allocation: 'Unallocated', owner: 'OFFSHORE', condition: 'Good', avail_qty: 54 },
  { id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', code: 'ITM001278', lot_no: 'LOT-A100', allocation: 'Unallocated', owner: 'MITME', condition: 'Fair', avail_qty: 12 },
  { id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', code: 'ITM001278', lot_no: 'LOT-B200', allocation: 'Project-X', owner: 'OFFSHORE', condition: 'Good', avail_qty: 110 },
  { id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', code: 'ITM001279', lot_no: 'LOT-C300', allocation: 'Unallocated', owner: 'MITME', condition: 'Good', avail_qty: 30 }
];

export const mockInspectionData = {
  "_id": "1e9a3b68-8d02-4c12-8e4d-7b2e2b3e4b44",
  "no": "RRIN-2025-0002",
  "status": "Completed",
  "unit": "FT",
  "yard": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
  "appvwhen": 1735893615,
  "appvwho": "Eldhos Kunjukunju",
  "insp_type": "Return Inspection",
  "customer": {
    "customer": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "customer_ref": "ADNOC MR 10345183 / 10345893 / 10345620",
    "name": "MITME"
  },
  "items_raw": [
    {
      "id_item": "550e8400-e29b-41d4-a716-446655440000",
      "item_code": "ITM001278",
      "item_desc": "Casing 13 3/8\", 68 PPF, L80, JFELION, R3, Coated",
      "batch": "PO-2024-00457-A-RR",
      "condition": "good",
      "qty": 2,
      "lots": [
        {
          "lot_no": "MMT30624701",
          "allocation": "PT Santosa",
          "owner": "MITO",
          "condition": "Good",
          "qty_required": 1900
        }
      ]
    }
  ],
  "sow": [
    {
      "template": "e7b0ec18-49ba-4702-864a-3ed8dfdebd1a",
      "works": [
        {
          "_id": "673f4e15-802c-4735-a77c-ea5df2e2b3c2",
          "subscope_name": "Inspection",
          "fields": [
            {
              "name": "Visual Thread",
              "selected": true,
              "_id": "f51b94b0-fb54-4f27-b089-df33a6750ac0"
            },
            {
              "name": "Visual Body",
              "selected": true,
              "_id": "4b68e982-f542-4f1e-8e54-5d9c22263d91"
            }
          ]
        }
      ]
    }
  ]
};

export const inspectionsList = [
  mockInspectionData,
  { ...mockInspectionData, _id: '3f4e240b-789a-4c28-9d21-f3b14eddb17a', no: 'REQ-2024-0002', status: 'Open' },
  { ...mockInspectionData, _id: '6c8f9b45-123e-4b67-a25e-8b1e4c7d9a1c', no: 'REQ-2024-0003', status: 'For Review' },
];

export const itemCodes = [
  { id: '550e8400-e29b-41d4-a716-446655440000', code: 'ITM001278', desc: 'Casing 13 3/8", 68 PPF, L80...', batch: 'PO-2024-00457-A-RR' },
  { id: '123e4567-e89b-12d3-a456-426614174000', code: 'ITM001279', desc: 'Tubing 5", L80', batch: 'PO-2024-TUBING' }
];
