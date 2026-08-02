type RejectBannerProps = {
  message: string;
};

export function RejectBanner({ message }: RejectBannerProps) {
  return (
    <div className="rounded-[1rem] border border-[rgba(154,52,18,0.15)] bg-[rgba(154,52,18,0.08)] px-4 py-3 text-sm text-[var(--warn)]">
      <p className="font-semibold">Needs vendor attention</p>
      <p className="mt-1">{message}</p>
    </div>
  );
}
