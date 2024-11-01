import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      title: 'text-2xl font-bold leading-tight',
      content: 'text-base leading-normal',
      detail: 'text-sm leading-snug',
    },
    color: {
      brand: 'text-brand',
      default: 'text-gray-500',
      lightGray: 'text-gray-300',
      gray: 'text-gray-700',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'content',
    color: 'brand',
  },
});

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  className?: string;
  children?: React.ReactNode;
}

const TitleTypography = forwardRef<HTMLHeadingElement, TypographyProps>((props, ref) => {
  const { variant = 'title', color = 'brand', weight, className, children, ...rest } = props;

  return (
    <h1 ref={ref} className={cn(typographyVariants({ variant, color, weight }), className)} {...rest}>
      {children}
    </h1>
  );
});

const TextTypography = forwardRef<HTMLSpanElement, TypographyProps>((props, ref) => {
  const { variant = 'content', color = 'brand', weight, className, children, ...rest } = props;

  return (
    <span ref={ref} className={cn(typographyVariants({ variant, color, weight }), className)} {...rest}>
      {children}
    </span>
  );
});

export const Typography = forwardRef<HTMLElement, TypographyProps>((props, ref) => {
  const { variant = 'content' } = props;
  if (variant === 'title') {
    return <TitleTypography {...props} ref={ref as React.Ref<HTMLHeadingElement>} />;
  }
  return <TextTypography {...props} ref={ref as React.Ref<HTMLSpanElement>} />;
});

TitleTypography.displayName = 'TitleTypography';
TextTypography.displayName = 'TextTypography';
Typography.displayName = 'Typography';
