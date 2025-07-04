import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FC } from 'react';

type DatePickerProps = {
  value?: Date | undefined;
  onValueChange?: (date: Date | undefined) => void;
};

const DatePicker: FC<DatePickerProps> = ({ value, onValueChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" data-empty={!value} className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground">
          <CalendarIcon />
          {value ? format(value, 'PPP') : <span>Pick a value</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" captionLayout="dropdown" selected={value} onSelect={onValueChange} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
