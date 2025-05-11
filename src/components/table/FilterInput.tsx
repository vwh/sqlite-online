import { useCallback, useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

interface FilterInputProps {
  column: string;
  value: string;
  onChange: (column: string, value: string) => void;
  debounceTime?: number;
}

const FilterInput = ({
  column,
  value,
  onChange,
  debounceTime = 300
}: FilterInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  // Update the local value when the prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedOnChange = useMemo(() => {
    const handler = debounce((col: string, val: string) => {
      onChange(col, val);
    }, debounceTime);

    return handler;
  }, [onChange, debounceTime]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      debouncedOnChange(column, newValue);
    },
    [column, debouncedOnChange]
  );

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <Input
      type="text"
      className="border-primary/20 max-h-6 w-full rounded px-2 py-1 text-[0.8rem]"
      value={inputValue}
      onChange={handleChange}
      placeholder="Filter"
    />
  );
};

export default FilterInput;
