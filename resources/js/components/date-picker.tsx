import { format } from 'date-fns';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FC } from 'react';
import { Input } from './ui/input';

type DatePickerProps = {
  value?: Date | undefined;
  onValueChange?: (date: Date | undefined) => void;
};

const DatePicker: FC<DatePickerProps> = ({ value, onValueChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          value={value ? format(value, 'PPP') : ''}
          readOnly
          placeholder="Pick a date"
          className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        />
        {/* <Button variant="outline" data-empty={!value} className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground">
          <CalendarIcon />
          {value ? format(value, 'PPP') : <span>Pick a value</span>}
        </Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" captionLayout="dropdown" selected={value} onSelect={onValueChange} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
