import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '../../utils';

const IconButtonVariants = cva('', {
  variants: {
    size: {
      small: 'w-6 h-6',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof IconButtonVariants> & {
    className?: string;
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <button ref={ref} className={cn(IconButtonVariants({ size: 'small' }), className)} {...rest}>
      {children}
    </button>
  );
});

IconButton.displayName = 'IconButton';
