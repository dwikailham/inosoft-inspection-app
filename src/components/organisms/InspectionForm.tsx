'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useForm, useFieldArray, FormProvider, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Plus, Trash } from 'lucide-react';
import { RHFInput } from '../molecules/RHFInput';
import { RHFSelect } from '../molecules/RHFSelect';
import { RHFTextarea } from '../molecules/RHFTextarea';
import { Button } from '../atoms/Button';
import { OrderItemField } from '../molecules/OrderItemField';

// Type definitions for the form
interface LotForm {
  stock_id: string; // The selected cascading start ID, or empty
  lot_no: string;
  allocation: string;
  owner: string;
  condition: string;
  avail_qty: number;
  qty_required: number;
  inspection_required: boolean;
}

interface ItemForm {
  itemCode: string;
  qty: number;
  lots: LotForm[];
}

interface FormValues {
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

export function InspectionForm() {
  const router = useRouter();
  const dropdowns = useSelector((state: RootState) => state.dropdowns.data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('New');

  const methods = useForm<FormValues>({
    defaultValues: {
      service_type: '',
      scope_of_work: '',
      location: '',
      charge_to_customer: false,
      customer_id: '',
      date: '',
      related_to: '',
      dc_code: '',
      notes: '',
      items: [
        { itemCode: '', qty: 0, lots: [{ lot_no: '', allocation: '', owner: '', condition: '', avail_qty: 0, qty_required: 0, inspection_required: false }] }
      ]
    }
  });

  const { control, handleSubmit, watch, register, setValue } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const watchScope = watch('scope_of_work');
  const chargeToCustomer = watch('charge_to_customer');

  useEffect(() => {
    if (!chargeToCustomer) {
      // Correctly reset the customer name when disabled
      setValue('customer_id', '');
    }
  }, [chargeToCustomer, setValue]);

  if (!dropdowns) return <div className="p-4 text-center">Loading dropdowns...</div>;

  const selectedScopeObj = dropdowns.scopes?.find(s => s.id === watchScope);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const payload = { ...data, status: submitStatus };
      await axios.post('/api/inspections', payload);
      router.push("/"); // Redirect to the main page
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 md:p-8 rounded-lg border shadow-sm max-w-8xl mx-auto">

        {/* Top Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RHFSelect name="service_type" label="* Service Type" options={dropdowns.serviceTypes} placeholder="Select Type" rules={{ required: 'Required' }} />
              <RHFSelect name="scope_of_work" label="* Scope of Work" options={dropdowns.scopes} placeholder="Select a Scope of Work Name" rules={{ required: 'Required' }} />
            </div>

            <div className="bg-neutral-50 border rounded-md p-3 min-h-[4rem]">
              <p className="text-xs font-semibold text-neutral-500 mb-2">* Scope included</p>
              <div className="flex flex-wrap gap-2">
                {selectedScopeObj ? (
                  selectedScopeObj.included.map((chip, idx) => (
                    <span key={idx} className="bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full text-xs font-medium">
                      {chip}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-neutral-400 italic">Select a scope of work above...</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <RHFInput name="location" label="* Location" placeholder="Select Location" rules={{ required: 'Required' }} />
              <RHFInput name="date" label="* Est. Completion Date" type="date" rules={{ required: 'Required' }} />
              <RHFInput name="related_to" label="* Related To" placeholder="Select Related To" rules={{ required: 'Required' }} />
            </div>

            <div className="pt-2">
              <p className="text-sm font-semibold text-neutral-800 mb-2">Custom Field Header</p>
              <div className="w-full sm:w-1/2 md:w-1/3">
                <RHFInput name="dc_code" label="D/C Code" placeholder="Enter D/C Code" />
              </div>
            </div>
          </div>

          <div className="space-y-6 md:border-l md:pl-8">
            <div className="flex space-x-4 items-center">
              <label className="text-sm font-medium text-neutral-700">Charge to Customer</label>
              <input type="checkbox" {...register('charge_to_customer')} className="toggle-checkbox" />
            </div>
            <RHFSelect
              name="customer_id"
              label={chargeToCustomer ? "* Customer Name" : "Customer Name"}
              options={dropdowns.customers}
              placeholder="Select Customer Name"
              disabled={!chargeToCustomer}
              rules={{ required: chargeToCustomer ? 'Required' : false }}
            />
          </div>
        </div>

        {/* Dynamic Order Information */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-neutral-800">Order Information</h3>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ itemCode: '', qty: 0, lots: [] })}>
              <Plus className="w-4 h-4 mr-1" /> Add Item
            </Button>
          </div>

          {fields.map((field, index) => (
            <OrderItemField
              key={field.id}
              itemIndex={index}
              remove={remove}
              control={control}
              register={register}
              dropdowns={dropdowns}
              totalItems={fields.length}
            />
          ))}
        </div>

        {/* Note to Yard */}
        <div className="pt-4 border-t w-full">
          <RHFTextarea
            name="notes"
            label="Note to Yard"
            placeholder="Enter Note"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-3 sm:space-y-0 pt-6 border-t">
          <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={() => router.push('/')}>Cancel</Button>
          <Button type="button" variant="outline" className="w-full sm:w-auto" disabled={isSubmitting} onClick={() => { setSubmitStatus('Draft'); handleSubmit(onSubmit)(); }}>Save as Draft</Button>
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting} onClick={() => setSubmitStatus('New')}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
        </div>
      </form>
    </FormProvider>
  );
}
