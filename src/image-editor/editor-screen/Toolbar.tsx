type Props = {
  label: string;
  children: React.ReactNode;
};

export function Toolbar({ label, children }: Props) {
  return (
    <div
      role="group"
      aria-label={label}
      className="mx-auto grid w-full max-w-sm shrink-0 grid-cols-2 gap-3 py-2 [&_button]:h-12 [&_button]:w-full"
    >
      {children}
    </div>
  );
}
