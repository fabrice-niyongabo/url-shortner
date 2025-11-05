import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { PopoverContent } from "@/components/ui/popover";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

interface IProps {
  setDateRange: (val: DateRange) => void;
  dateRange: DateRange | undefined;
  fetchData: () => void;
}
function Header({ dateRange, setDateRange, fetchData }: IProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      fetchData();
    }
  };

  return (
    <div className="flex items-center justify-between gap-5">
      <h1 className="text-2xl font-bold line-clamp-1">Users Engagement</h1>
      <div>
        <Popover onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {dateRange?.from && dateRange?.to ? (
                <span>
                  {dateRange.from.toLocaleDateString()} -
                  {dateRange.to.toLocaleDateString()}
                </span>
              ) : (
                <span>Select date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              animate
              required
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="rounded-lg border shadow-sm"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Header;
