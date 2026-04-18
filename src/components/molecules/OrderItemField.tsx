import React from 'react';
import { useFieldArray, useWatch, Control, UseFormRegister, UseFieldArrayRemove } from 'react-hook-form';
import { Trash, Plus } from 'lucide-react';
import { RHFSelect } from './RHFSelect';
import { RHFInput } from './RHFInput';
import { Button } from '../atoms/Button';
import { DropdownData } from '@/store/dropdownSlice';
import { FormValues } from '@/types';

interface OrderItemFieldProps {
  itemIndex: number;
  remove: UseFieldArrayRemove;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  dropdowns: DropdownData;
  totalItems: number;
}

export function OrderItemField({ itemIndex, remove, control, register, dropdowns, totalItems }: OrderItemFieldProps) {
  const { fields, append, remove: removeLot, replace } = useFieldArray({
    control,
    name: `items.${itemIndex}.lots`
  });

  // Watch the current lots array to handle cascading logic client side
  const lotValues = useWatch({ control, name: `items.${itemIndex}.lots` });
  const selectedItemCode = useWatch({ control, name: `items.${itemIndex}.itemCode` });

  const prevItemCode = React.useRef(selectedItemCode);

  React.useEffect(() => {
    if (prevItemCode.current !== undefined && prevItemCode.current !== selectedItemCode) {
      // Reset lot values when Item Description changes
      replace([{ stock_id: '', lot_no: '', allocation: '', owner: '', condition: '', avail_qty: 0, qty_required: 0, inspection_required: false }]);
    }
    prevItemCode.current = selectedItemCode;
  }, [selectedItemCode, replace]);

  return (
    <div className="border border-neutral-200 bg-neutral-50 p-4 rounded-md mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 border-b pb-4 space-y-4 sm:space-y-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-2/3">
          <RHFSelect
            name={`items.${itemIndex}.itemCode`}
            label="Item Description"
            rules={{ required: 'Required' }}
            options={dropdowns.itemCodes.map((i) => ({ id: i.id, name: i.code + ' - ' + i.desc }))}
            placeholder="Select an item"
          />
          <RHFInput name={`items.${itemIndex}.qty`} label="Qty" type="number" rules={{ required: 'Required' }} />
        </div>
        <Button disabled={totalItems <= 1} type="button" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 sm:ml-4 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => remove(itemIndex)}>
          <Trash className="w-4 h-4 mr-1" /> Delete Item
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((lotField, lotIndex) => {
          // Dynamic Cascading filtering logic
          const currentLotVal = lotValues?.[lotIndex] || {};

          let availableStocks = dropdowns.stocks || [];
          if (selectedItemCode) {
            const codeRef = dropdowns.itemCodes.find((i) => i.id === selectedItemCode)?.code;
            availableStocks = availableStocks.filter((s) => s.code === codeRef);
          }

          // If lot_no is selected, filter available allocations, etc.
          let allocations = [...new Set(availableStocks.filter((s) => !currentLotVal.lot_no || s.lot_no === currentLotVal.lot_no).map((s) => s.allocation))];
          let owners = [...new Set(availableStocks.filter((s) => (!currentLotVal.lot_no || s.lot_no === currentLotVal.lot_no) && (!currentLotVal.allocation || s.allocation === currentLotVal.allocation)).map((s) => s.owner))];
          let conditions = [...new Set(availableStocks.filter((s) => (!currentLotVal.lot_no || s.lot_no === currentLotVal.lot_no) && (!currentLotVal.allocation || s.allocation === currentLotVal.allocation) && (!currentLotVal.owner || s.owner === currentLotVal.owner)).map((s) => s.condition))];

          // Re-calculate Avail Qty if all exact match
          const exactStock = availableStocks.find((s) => s.lot_no === currentLotVal.lot_no && s.allocation === currentLotVal.allocation && s.owner === currentLotVal.owner && s.condition === currentLotVal.condition);

          return (
            <div key={lotField.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-2 items-end mb-6 pb-4 border-b lg:mb-0 lg:pb-0 lg:border-none">
              <RHFSelect disabled={!selectedItemCode} name={`items.${itemIndex}.lots.${lotIndex}.lot_no`} label="Lot Selection" placeholder="-"
                options={[...new Set(availableStocks.map((s) => s.lot_no))].map((x) => ({ id: x, name: x }))} />
              <RHFSelect disabled={!selectedItemCode} name={`items.${itemIndex}.lots.${lotIndex}.allocation`} label="Allocation" placeholder="-"
                options={allocations.map((x) => ({ id: x, name: typeof x === 'string' ? x : '' }))} />
              <RHFSelect disabled={!selectedItemCode} name={`items.${itemIndex}.lots.${lotIndex}.owner`} label="Owner" placeholder="-"
                options={owners.map((x) => ({ id: x, name: typeof x === 'string' ? x : '' }))} />
              <RHFSelect disabled={!selectedItemCode} name={`items.${itemIndex}.lots.${lotIndex}.condition`} label="Condition" placeholder="-"
                options={conditions.map((x) => ({ id: x, name: typeof x === 'string' ? x : '' }))} />

              <div className="flex flex-col space-y-1.5">
                <label className="text-[0.65rem] font-medium text-neutral-500 truncate">Avail. Qty</label>
                <input disabled value={exactStock ? exactStock.avail_qty : ''} className="flex h-9 w-full rounded-md border border-neutral-200 bg-neutral-100 px-3 py-1 text-sm text-neutral-900 font-medium" />
              </div>

              <RHFInput disabled={!selectedItemCode} name={`items.${itemIndex}.lots.${lotIndex}.qty_required`} label="Qty Required" type="number" />

              <div className="flex flex-col items-start sm:items-center justify-center space-y-1.5 sm:pb-2">
                <label className="text-[0.65rem] font-medium text-neutral-500 truncate">Inspection Required</label>
                <input disabled={!selectedItemCode} type="checkbox" {...register(`items.${itemIndex}.lots.${lotIndex}.inspection_required` as const)} className="h-4 w-4" />
              </div>

              <Button disabled={fields.length <= 1} type="button" variant="destructive" className="mb-px w-full md:w-auto lg:w-full flex justify-center disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => removeLot(lotIndex)}>
                <span className="lg:hidden mr-2">Remove Lot</span><Trash className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
      </div>
      <Button disabled={!selectedItemCode} type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({ stock_id: '', lot_no: '', allocation: '', owner: '', condition: '', avail_qty: 0, qty_required: 0, inspection_required: false })}>
        <Plus className="w-3 h-3 mr-1" /> Add Lot
      </Button>
    </div>
  );
}
