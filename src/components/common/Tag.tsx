import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '../../utils';

const tagVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-white text-gray-800 rounded-full border-2 p-2',
    },
    size: {
      medium: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'medium',
  },
});

export type TagProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tagVariants> & {
    className?: string;
  };

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <span ref={ref} className={cn(tagVariants(), className)} {...rest}>
      {children}
    </span>
  );
});
