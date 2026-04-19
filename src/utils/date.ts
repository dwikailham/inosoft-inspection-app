import dayjs from 'dayjs';

export const formatDate = (
  dateValue?: string | number | Date | null,
  format: string = 'DD MMM YYYY'
): string => {
  if (!dateValue) return '-';

  const isUnixSeconds = typeof dateValue === 'number' && dateValue < 100000000000;
  const parsedDate = isUnixSeconds ? dateValue * 1000 : dateValue;

  const d = dayjs(parsedDate);

  if (!d.isValid()) return '-';

  return d.format(format);
};
