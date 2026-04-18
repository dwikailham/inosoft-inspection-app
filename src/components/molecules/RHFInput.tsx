import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormField } from './FormField';
import { Input, InputProps } from '../atoms/Input';

interface RHFInputProps extends InputProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
}

export function RHFInput({ name, label, rules, ...props }: RHFInputProps) {
  const { register, formState: { errors } } = useFormContext();
  const errorParts = name.split('.');

  // Navigate through potential nested object paths for errors like items[0].lots[1].avail_qty
  let errorMsg = errors;
  for (const part of errorParts) {
    if (errorMsg) {
      errorMsg = errorMsg[part] as any;
    }
  }

  return (
    <FormField label={label} error={errorMsg?.message as string | undefined}>
      <Input {...register(name, rules)} {...props} />
    </FormField>
  );
}
