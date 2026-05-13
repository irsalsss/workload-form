const STATUS_FULL = 'bg-emerald-100 text-emerald-800'; // 1. fte === 1 (Green)
const STATUS_EMPTY = 'bg-rose-100 text-rose-800'; // 2. fte === 0 (Red)
const STATUS_PARTIAL = 'bg-amber-100 text-amber-800'; // 3. fte < 1 && fte > 0 (Yellow)
const STATUS_OVERLOAD = 'bg-blue-100 text-blue-800'; // 4. fte > 1 (Blue)

export const getStatus = (fteValue: number) => {
  if (isNaN(fteValue)) return '';
  if (fteValue === 1) return STATUS_FULL;
  if (fteValue === 0) return STATUS_EMPTY;
  if (fteValue < 1 && fteValue > 0) return STATUS_PARTIAL;
  return STATUS_OVERLOAD;
};
