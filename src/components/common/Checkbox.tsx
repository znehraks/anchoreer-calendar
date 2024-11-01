import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '../../utils';

const checkboxVariants = cva('', {
  variants: {
    size: {
      medium: 'w-4 h-4',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export type CheckboxProps = VariantProps<typeof checkboxVariants> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
  };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { size = 'medium', ...rest } = props;
  return (
    <input
      ref={ref}
      role="checkbox"
      tabIndex={0}
      type="checkbox"
      className={cn(checkboxVariants({ size }), props.className)}
      {...rest}
    />
  );
});

Checkbox.displayName = 'Checkbox';
