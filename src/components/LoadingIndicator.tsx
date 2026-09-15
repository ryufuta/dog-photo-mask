type Props = {
  message: string;
};

export function LoadingIndicator({ message }: Props) {
  return (
    <div className="bg-surface flex flex-col items-center gap-4 p-10">
      <div
        className="size-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900"
        aria-hidden="true"
      />
      <p>{message}</p>
    </div>
  );
}
