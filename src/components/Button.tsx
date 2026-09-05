type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

export function Button({ onClick, children }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-surface rounded-md px-4 py-2 text-sm font-medium"
    >
      {children}
    </button>
  );
}
