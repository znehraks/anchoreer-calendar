import { Loader2 } from 'lucide-react';

export function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center animate-spin">
      <Loader2 />
    </div>
  );
}
