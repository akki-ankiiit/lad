/** Official Luxury Antonovich Design medallion (antonovich-design.com). */
export default function BrandMark({ label = "" }) {
  return (
    <img
      src="/assets/antonovich/logo/antonovich-design-logo-mark.png"
      alt={label}
      aria-hidden={label ? undefined : "true"}
      width="371"
      height="240"
      loading="eager"
      decoding="async"
      className="logo brand-mark"
    />
  );
}
