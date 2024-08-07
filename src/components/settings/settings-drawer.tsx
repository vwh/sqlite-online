import useSQLiteStore from "@/store/useSQLiteStore";
import { useEffect, useCallback } from "react";
import useLocalStorageState, {
  getLocalStorageItem,
  setLocalStorageItem
} from "@/hooks/useLocalStorageState";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DateFormatSection,
  RowsPerPageSection,
  ThemeChangeSection,
  QueryHistorySection
} from "./settings-sections";
import { SettingsIcon } from "lucide-react";

const ROWS_PER_PAGE_KEY = "rowsPerPage";
const DATE_FORMAT_KEY = "dateFormat";
const THEME_COLOR_KEY = "theme-color";
const THEME_COLORS = ["slate", "blue", "nord", "old"];

export default function Settings() {
  const {
    setRowPerPageOrAuto,
    setIsCustomQuery,
    queryHestory,
    dateFormatValue,
    setDateFormatValue
  } = useSQLiteStore();

  const [rowsPerPage, setRowsPerPage] = useLocalStorageState(
    ROWS_PER_PAGE_KEY,
    "auto"
  );
  const [themeColor, setThemeColor] = useLocalStorageState(
    THEME_COLOR_KEY,
    "default"
  );

  const isAutoRowsPerPage = rowsPerPage === "auto";

  useEffect(() => {
    setRowPerPageOrAuto(isAutoRowsPerPage ? "auto" : Number(rowsPerPage));
  }, [rowsPerPage, setRowPerPageOrAuto]);

  useEffect(() => {
    setDateFormatValue(getLocalStorageItem(DATE_FORMAT_KEY, "default"));
  }, [setDateFormatValue]);

  useEffect(() => {
    THEME_COLORS.forEach((t) =>
      document.body?.classList.toggle(t, t === themeColor)
    );
  }, [themeColor]);

  const handleRowsPerPageChange = useCallback(
    (value: string) => {
      setIsCustomQuery(false);
      if (value === "auto" || Number(value) > 0) {
        setRowsPerPage(value);
      } else {
        toast.error(
          "Please provide a positive number of rows per page or set it to auto."
        );
      }
    },
    [setIsCustomQuery, setRowsPerPage]
  );

  const handleDateFormatChange = useCallback(
    (value: string) => {
      setDateFormatValue(value);
      setLocalStorageItem(DATE_FORMAT_KEY, value);
    },
    [setDateFormatValue]
  );

  const handleThemeChange = useCallback(
    (value: string) => {
      setThemeColor(value);
    },
    [setThemeColor]
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="grow" title="Open settings drawer">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <div className="mt-6 space-y-6">
          <RowsPerPageSection
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
          <DateFormatSection
            dateFormatValue={dateFormatValue}
            onDateFormatChange={handleDateFormatChange}
          />
          <ThemeChangeSection
            themeColor={themeColor}
            onThemeChange={handleThemeChange}
            themeColors={THEME_COLORS}
          />
          <QueryHistorySection queryHistory={queryHestory} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
