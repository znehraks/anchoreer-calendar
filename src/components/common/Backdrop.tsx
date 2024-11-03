import { cn } from '../../utils';

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface IBackDropProps extends React.ButtonHTMLAttributes<HTMLDivElement> {}

export function Backdrop(props: IBackDropProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black opacity-50 cursor-pointer',
        className,
      )}
      {...rest}
    />
  );
}
