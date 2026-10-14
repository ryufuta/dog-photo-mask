import { type ExternalToast,toast } from 'sonner';

function showNotification(
  type: 'warning' | 'error' | 'success',
  message: string,
  options?: ExternalToast,
) {
  const id = toast[type](
    <>
      {message}
      <button
        type="button"
        aria-label={`通知を閉じる：${message}`}
        title="クリック・タップで閉じる"
        className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={() => toast.dismiss(id)}
      />
    </>,
    { richColors: true, ...options },
  );
  return id;
}

export const notify = {
  warning: (message: string, options?: ExternalToast) =>
    showNotification('warning', message, options),
  error: (message: string, options?: ExternalToast) =>
    showNotification('error', message, options),
  success: (message: string, options?: ExternalToast) =>
    showNotification('success', message, options),
};
