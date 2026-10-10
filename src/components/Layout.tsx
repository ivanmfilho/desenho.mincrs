import { Outlet } from 'react-router-dom'
import BrandLogo from './BrandLogo'

export default function Layout() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo-principal">
        Ir para o conteúdo
      </a>
      <header className="site-header">
        <div className="site-container site-header__inner">
          <BrandLogo linked className="site-header__logo" />
        </div>
      </header>
      <main id="conteudo-principal">
        <Outlet />
      </main>
    </div>
  )
}
