export interface LotForm {
  stock_id: string;
  lot_no: string;
  allocation: string;
  owner: string;
  condition: string;
  avail_qty: number;
  qty_required: number;
  inspection_required: boolean;
}

export interface ItemForm {
  itemCode: string;
  qty: number;
  lots: LotForm[];
}

export interface FormValues {
  service_type: string;
  scope_of_work: string;
  location: string;
  customer_id: string;
  date: string;
  related_to: string;
  dc_code: string;
  notes: string;
  charge_to_customer?: boolean;
  status?: string;
  items: ItemForm[];
}

export interface CustomerData {
  customer: string;
  customer_ref: string;
  name: string;
}

export interface InspectionField {
  _id: string;
  name: string;
  selected: boolean;
}

export interface InspectionWork {
  _id: string;
  subscope_name: string;
  fields: InspectionField[];
}

export interface InspectionSow {
  template?: string;
  works: InspectionWork[];
}

export interface LotItem {
  lot_no: string;
  allocation: string;
  owner: string;
  condition: string;
  qty_required?: number;
}

export interface InspectionItem {
  id_item?: string;
  item_code?: string;
  item_desc?: string;
  batch?: string;
  condition?: string;
  qty?: number;
  lots?: LotItem[];
}

export interface InspectionData {
  _id: string;
  no: string;
  status: string;
  unit?: string;
  yard?: string;
  appvwhen?: number;
  appvwho?: string;
  insp_type?: string;
  service_type?: string;
  location?: string;
  customer?: CustomerData;
  customer_id?: string;
  createdate?: number;
  date?: string;
  related_to?: string;
  dc_code?: string;
  items_raw?: InspectionItem[];
  items?: InspectionItem[];
  sow?: InspectionSow[];
}
