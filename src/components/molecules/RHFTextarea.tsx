import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormField } from './FormField';
import { Textarea, TextareaProps } from '../atoms/Textarea';

interface RHFTextareaProps extends TextareaProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
}

export function RHFTextarea({ name, label, rules, ...props }: RHFTextareaProps) {
  const { register, formState: { errors } } = useFormContext();
  const errorParts = name.split('.');

  // Navigate through potential nested object paths for errors like items[0].lots[1].avail_qty
  let errorMsg: Record<string, unknown> | undefined = errors as unknown as Record<string, unknown>;
  for (const part of errorParts) {
    if (errorMsg && typeof errorMsg === 'object') {
      errorMsg = errorMsg[part] as Record<string, unknown> | undefined;
    }
  }

  return (
    <FormField label={label} error={errorMsg?.message as string | undefined}>
      <Textarea {...register(name, rules)} {...props} />
    </FormField>
  );
}
