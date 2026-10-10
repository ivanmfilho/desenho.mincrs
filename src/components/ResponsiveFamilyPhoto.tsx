export default function ResponsiveFamilyPhoto() {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet="/imagens/familia-capsula-640.avif 640w, /imagens/familia-capsula-960.avif 960w, /imagens/familia-capsula-1440.avif 1440w, /imagens/familia-capsula-1536.avif 1536w"
        sizes="(min-width: 1024px) 62vw, 100vw"
      />
      <source
        type="image/webp"
        srcSet="/imagens/familia-capsula-640.webp 640w, /imagens/familia-capsula-960.webp 960w, /imagens/familia-capsula-1440.webp 1440w, /imagens/familia-capsula-1536.webp 1536w"
        sizes="(min-width: 1024px) 62vw, 100vw"
      />
      <img
        src="/imagens/familia-capsula-1440.jpg"
        srcSet="/imagens/familia-capsula-640.jpg 640w, /imagens/familia-capsula-960.jpg 960w, /imagens/familia-capsula-1440.jpg 1440w, /imagens/familia-capsula-1536.jpg 1536w"
        sizes="(min-width: 1024px) 62vw, 100vw"
        alt="Família reunida em casa com a Cápsula do Tempo Minc."
        width="1536"
        height="864"
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}
