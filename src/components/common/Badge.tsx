import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '../../utils';

const badgeVariants = cva('', {
  variants: {
    variant: {
      brand: 'bg-brand text-gray-100',
      default: 'bg-gray-700 text-gray-100',
    },
    size: {
      small: 'w-2 h-2 text-xs rounded-4 p-[1px]',
    },
  },
});

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children?: React.ReactNode;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const { variant = 'default', size = 'small', className, children, ...rest } = props;

  return (
    <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...rest}>
      {children}
    </span>
  );
});
