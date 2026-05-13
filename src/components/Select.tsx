interface SelectProps {
  name: string;
  id: string;
  placeholder?: string;
  options: string[] | number[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  name,
  id,
  placeholder,
  options,
  value,
  defaultValue,
  onChange,
}: SelectProps) {
  return (
    <select
      className="rounded-md h-10 p-2 border border-gray-200 border-r-8 bg-gray-200 text-gray-700 outline-none"
      name={name}
      id={id}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {!!placeholder && (
        <option disabled hidden value="">
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={`${option}-${index}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
