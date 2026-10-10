import { useCallback } from 'react'
import BrandLogo from '@/components/BrandLogo'
import ResponsiveFamilyPhoto from '@/components/ResponsiveFamilyPhoto'
import RevealSection from '@/components/RevealSection'
import { track } from '@/lib/tracking'

const DOWNLOAD_URL = '/arquivos/desenho-para-colorir-minc.pdf'
const CAPSULA_DO_TEMPO_URL = '' // Inserir aqui a URL oficial quando estiver disponível.

function DownloadButton() {
  const handleClick = useCallback(() => {
    try {
      track('download_desenho_minc')
    } catch {
      // O download deve seguir normalmente mesmo se a mensuração falhar.
    }
  }, [])

  return (
    <a
      className="download-button"
      href={DOWNLOAD_URL}
      download="desenho-para-colorir-minc.pdf"
      target="_blank"
      rel="noopener"
      onClick={handleClick}
    >
      <span>Baixar desenho para colorir</span>
    </a>
  )
}

function Index() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="site-container hero__grid">
          <div className="hero__copy">
            <h1 id="hero-title">Um futuro melhor também começa com imaginação.</h1>
            <p className="hero__intro">
              Preparamos um desenho especial para as crianças colorirem aquilo que mais importa: a
              casa, a família, os sonhos e tudo aquilo que queremos construir para o futuro.
            </p>
            <div className="hero__action hero__action--desktop">
              <DownloadButton />
              <p className="download-meta">PDF • Formato A4 • Pronto para imprimir</p>
            </div>
          </div>

          <div className="hero__preview-wrap">
            <span className="paper-label" aria-hidden="true">
              A4
            </span>
            <picture className="paper-preview">
              <source srcSet="/imagens/desenho-para-colorir-minc.webp" type="image/webp" />
              <img
                src="/imagens/desenho-para-colorir-minc.png"
                alt="Desenho Minc em preto e branco para crianças colorirem."
                width="1786"
                height="2525"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>

          <div className="hero__action hero__action--mobile">
            <DownloadButton />
            <p className="download-meta">PDF • Formato A4 • Pronto para imprimir</p>
          </div>
        </div>
      </section>

      <div className="site-container" aria-hidden="true">
        <div className="editorial-divider" />
      </div>

      <RevealSection className="story-section" id="historia" ariaLabelledby="story-title">
        <div className="site-container story-section__grid">
          <div className="story-section__photo">
            <ResponsiveFamilyPhoto />
          </div>

          <div className="story-section__copy">
            <h2 id="story-title">Toda grande história começa no presente.</h2>
            <p className="story-section__lead">
              Uma casa é onde os planos começam, as crianças crescem e os momentos de hoje se
              transformam nas memórias de amanhã.
            </p>
            <p>
              Na Minc, acreditamos que construir vai muito além da casa. É criar o espaço onde uma
              família vai construir a sua história.
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="capsule-section" id="capsula" ariaLabelledby="capsule-title">
        <div className="site-container capsule-section__inner">
          <div className="capsule-section__intro">
            <h2 id="capsule-title">E se pudéssemos guardar um pedacinho desse momento?</h2>
            <p>
              Foi assim que nasceu a Cápsula do Tempo Minc: um convite para as famílias guardarem
              memórias, desenhos, cartas e planos para reencontrá-los no futuro.
            </p>
            {CAPSULA_DO_TEMPO_URL ? (
              <a className="secondary-link" href={CAPSULA_DO_TEMPO_URL}>
                Conheça a Cápsula do Tempo Minc
              </a>
            ) : null}
          </div>

          <aside className="family-prompt" aria-labelledby="prompt-question">
            <p className="family-prompt__label">Uma pergunta para fazer depois de colorir:</p>
            <blockquote id="prompt-question">
              Como você imagina nossa família daqui a 5 anos?
            </blockquote>
            <p>
              Vale desenhar, escrever ou contar uma história. Guarde a resposta. Talvez seja
              divertido encontrá-la novamente no futuro.
            </p>
          </aside>
        </div>
      </RevealSection>

      <RevealSection as="footer" className="site-footer" ariaLabelledby="footer-signature">
        <div className="site-container site-footer__inner">
          <BrandLogo variant="white" linked className="site-footer__logo" />
          <p id="footer-signature" className="site-footer__signature">
            Construímos o futuro melhor do que o presente.
          </p>
          <nav className="site-footer__links" aria-label="Links da Minc">
            <a
              href="https://instagram.com/minc.construtora"
              target="_blank"
              rel="noopener noreferrer"
            >
              @minc.construtora
            </a>
            <a href="https://mincrs.com.br" target="_blank" rel="noopener noreferrer">
              mincrs.com.br
            </a>
          </nav>
          <div className="site-footer__base">
            <span>Lajeado · RS</span>
            <span>© Minc</span>
          </div>
        </div>
      </RevealSection>
    </>
  )
}

export default Index
