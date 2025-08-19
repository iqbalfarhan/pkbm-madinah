import { cn } from '@/lib/utils';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Label } from './ui/label';

type FormControlProps = PropsWithChildren & {
  label?: string;
  required?: boolean;
  className?: string;
  hint?: string;
  action?: ReactNode;
};

const FormControl: FC<FormControlProps> = ({ children, label, required = false, className, action, hint }) => {
  return (
    <div className={cn('flex flex-col items-start gap-2', className)}>
      {label && (
        <div className="flex w-full items-center justify-between">
          <Label className="font-medium text-muted-foreground">
            {label} {required && <span className="text-destructive">*</span>}
          </Label>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
};

export default FormControl;
