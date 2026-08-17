type Props = {
  children: React.ReactNode;
};

export function Toolbar({ children }: Props) {
  return (
    <div className="mb-2 flex h-14 shrink-0 items-center gap-2 px-4">
      {children}
    </div>
  );
}
