export const brand = {
  paper: "#f2f7fc",
  ink: "#24344c",
  blue: "#215c8e",
  yellow: "#f5dc75",
}

export function BrandIcon({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: brand.blue,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        aria-hidden="true"
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 100 100"
      >
        <path
          fill={brand.yellow}
          d="M20 15h60a12 12 0 0 1 12 12v38a12 12 0 0 1-12 12H48L25 92V77h-5A12 12 0 0 1 8 65V27a12 12 0 0 1 12-12Z"
        />
        <path
          fill="none"
          stroke={brand.blue}
          strokeWidth="8"
          strokeLinecap="round"
          d="M35 35h30M50 35v24"
        />
      </svg>
    </div>
  )
}
