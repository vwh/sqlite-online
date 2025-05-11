import { memo } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

const MemoizedChevronDownIcon = memo(ChevronDownIcon);
const MemoizedChevronRightIcon = memo(ChevronRightIcon);

interface ToggleChevronProps {
  expanded: boolean;
  size?: number;
}

const ToggleChevron = memo(({ expanded, size = 4 }: ToggleChevronProps) => {
  return expanded ? (
    <MemoizedChevronDownIcon className={`h-${size} w-${size}`} />
  ) : (
    <MemoizedChevronRightIcon className={`h-${size} w-${size}`} />
  );
});

export default ToggleChevron;
