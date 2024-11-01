export function CalendarGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-7 h-full">{children}</div>;
}
