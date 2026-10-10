type BrandLogoProps = {
  className?: string
  variant?: 'navy' | 'white'
  linked?: boolean
}

const OFFICIAL_LOGO_URL = 'https://mincrs.com.br/assets/logo_white_horizontal-63d41-CJVCDjp_.png'

export default function BrandLogo({
  className = '',
  variant = 'navy',
  linked = false,
}: BrandLogoProps) {
  const logo = (
    <span className={`brand-logo brand-logo--${variant} ${className}`}>
      <img
        src={OFFICIAL_LOGO_URL}
        alt="Minc Incorporação e Construção"
        width="3500"
        height="350"
        decoding="async"
      />
    </span>
  )

  if (!linked) return logo

  return (
    <a
      className="brand-logo-link"
      href="https://mincrs.com.br"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visitar o site da Minc Construtora"
    >
      {logo}
    </a>
  )
}
