export function CalendarGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid grid-cols-7 h-full"
      style={{
        minHeight: 'calc(100vh - 6rem)',
      }}
    >
      {children}
    </div>
  );
}
