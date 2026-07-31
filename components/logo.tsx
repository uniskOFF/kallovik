export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#0F1728" stroke="rgba(255,255,255,0.08)" />
      <path
        d="M20 9L29 28H24.5L20 18L15.5 28H11L20 9Z"
        fill="#3B82F6"
      />
      <circle cx="20" cy="26.5" r="2.2" fill="#60A5FA" />
    </svg>
  )
}
