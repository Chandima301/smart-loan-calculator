export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" stroke="currentColor" strokeOpacity="0.3" fill="none" />
      <rect x="3"  y="7"  width="4.5" height="14" rx="1.5" fill="currentColor" opacity="1"   />
      <rect x="9.75"  y="11" width="4.5" height="10" rx="1.5" fill="currentColor" opacity="0.75" />
      <rect x="16.5" y="15" width="4.5" height="6"  rx="1.5" fill="currentColor" opacity="0.5"  />
    </svg>
  );
}
