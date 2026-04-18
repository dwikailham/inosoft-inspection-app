import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormField } from './FormField';
import { Select, SelectProps } from '../atoms/Select';

interface RHFSelectProps extends SelectProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
}

export function RHFSelect({ name, label, rules, ...props }: RHFSelectProps) {
  const { register, formState: { errors } } = useFormContext();
  const errorParts = name.split('.');
  
  let errorMsg: Record<string, unknown> | undefined = errors as unknown as Record<string, unknown>;
  for (const part of errorParts) {
    if (errorMsg && typeof errorMsg === 'object') {
      errorMsg = errorMsg[part] as Record<string, unknown> | undefined;
    }
  }

  return (
    <FormField label={label} error={errorMsg?.message as string | undefined}>
      <Select {...register(name, rules)} {...props} />
    </FormField>
  );
}
