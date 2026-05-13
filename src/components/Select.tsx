interface SelectProps {
  name: string;
  id: string;
  placeholder: string;
  options: string[] | number[];
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  name,
  id,
  placeholder,
  options,
  value,
  onChange,
}: SelectProps) {
  return (
    <select
      className="rounded-md h-10 p-2 border border-gray-300"
      name={name}
      id={id}
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
