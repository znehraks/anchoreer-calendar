import { forwardRef } from 'react';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <button ref={ref} role="button" tabIndex={0} className={className} {...rest}>
      {children}
    </button>
  );
});

IconButton.displayName = 'IconButton';
