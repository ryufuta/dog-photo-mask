type Props = {
  message: string;
};

export function LoadingIndicator({ message }: Props) {
  return (
    <div
      className="flex min-h-80 items-center justify-center gap-4"
      role="status"
    >
      <div
        className="size-6 animate-spin rounded-full border-4 border-muted border-t-primary motion-reduce:animate-none"
        aria-hidden="true"
      />
      <p>{message}</p>
    </div>
  );
}
