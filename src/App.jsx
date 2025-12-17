import { useState, useEffect } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);






  // Status Check Logic
  useEffect(() => {
    const checkOpenStatus = () => {
      // Create date object for Brazil time (UTC-3) without DST
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const brazilTime = new Date(utc + (3600000 * -3));

      const day = brazilTime.getDay(); // 0 = Sunday, 1 = Monday, ...
      const hour = brazilTime.getHours();
      const minute = brazilTime.getMinutes();
      const timeInMinutes = hour * 60 + minute;

      let isOpen = false;

      if (day >= 1 && day <= 5) {
        // Mon - Fri: 16:00 (960) to 21:30 (1290)
        isOpen = timeInMinutes >= 960 && timeInMinutes < 1290;
      } else if (day === 6) {
        // Saturday: 17:00 (1020) to 22:30 (1350)
        isOpen = timeInMinutes >= 1020 && timeInMinutes < 1350;
      } else {
        // Sunday: Closed
        isOpen = false;
      }

      setIsOpen(isOpen);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll Reveal Logic
      const reveals = document.querySelectorAll(".reveal");
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case elements are already in view
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav>
            <div className="logo">
              <img src="/logorpburguer.png" alt="RPBurguer" style={{ height: '100px', width: '100px', transform: 'translateY(-8px)' }} />
            </div>
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <a href="#" onClick={() => setIsMenuOpen(false)}>Início</a>
              <a href="#menu" onClick={() => setIsMenuOpen(false)}>Cardápio</a>
              <a href="https://wa.me/5571983578408" target="_blank" rel="noreferrer" onClick={() => setIsMenuOpen(false)}>Contato</a>
            </div>
            <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="status-badge">
                <span className={`dot ${isOpen ? 'open' : 'closed'}`}></span>
                <span className="status-text">
                  {isOpen ? 'Aberto Agora' : (() => {
                    const now = new Date();
                    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
                    const brazilTime = new Date(utc + (3600000 * -3));
                    const day = brazilTime.getDay();

                    if (day === 0) return 'Fechado (Abre Segunda)';
                    if (day === 6) return 'Fechado (Abre às 17h)';
                    return 'Fechado (Abre às 16h)';
                  })()}
                </span>
              </div>
              <button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <div className={`custom-burger ${isMenuOpen ? 'open' : ''}`}>
                  <span className="bun-top"></span>
                  <span className="meat"></span>
                  <span className="bun-bottom"></span>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container flex-center" style={{ gap: '2rem', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div className="hero-content">
              <div className="reveal" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <span className="status-badge" style={{
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  border: '1px solid rgba(255, 107, 53, 0.2)',
                  color: '#ff6b35'
                }}>
                  Entrega Disponível via WhatsApp
                </span>
              </div>
              <h1>O <span>Smash</span> Que Você <span>R</span>es<span>P</span>eita</h1>
              <p style={{ marginBottom: '2rem', maxWidth: '500px', marginInline: 'auto' }}>
                Carne fresca, queijo derretendo e aquele sabor defumado que só a RPBurguer tem.
                <br />
                <span style={{ color: '#ff6b35', fontWeight: 'bold' }}>Levamos até você!</span> Faça seu pedido.
              </p>

              <a
                href="https://wa.me/5571983578408?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20fazer%20um%20pedido."
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382C17.112 14.175 16.035 14.175 15.828 14.382C15.621 14.589 15.071 15.424 14.863 15.631C14.656 15.838 14.242 16.046 13.621 15.631C13.001 15.217 12.189 14.542 11.238 13.593C10.288 12.643 9.613 11.832 9.199 11.211C8.784 10.59 8.992 10.176 9.199 9.968C9.406 9.761 10.241 9.212 10.448 9.004C10.655 8.797 10.655 8.59 10.448 8.23C10.241 7.87 9.199 5.798 8.992 5.034C8.784 4.27 8.163 4.27 7.749 4.27C7.334 4.27 6.713 4.477 6.092 5.099C5.471 5.72 5.056 7.172 5.056 9.245C5.056 11.318 6.505 13.805 7.127 14.634C7.749 15.463 10.448 19.403 14.802 20.854C19.155 22.305 19.362 21.061 19.776 20.647C20.191 20.233 21.434 19.403 21.641 18.367C21.848 17.33 21.641 17.025 21.226 16.818L17.472 14.382Z" />
                </svg>
                Pedir no WhatsApp
              </a>
            </div>

            <div className="hero-image">
              <img src="/burger-hero.png" alt="Smash Burger Suculento" style={{ height: 'auto', width: '600px', borderRadius: '50% 20% / 10% 40%' }} />
            </div>
          </div>
        </section>

        <section className="features" id="menu">
          <div className="container">
            <div className="section-header reveal">
              <h2>Linha Artesanal</h2>
              <p>Sabor inigualável e ingredientes selecionados</p>
            </div>

            <div className="grid">
              <div className="card reveal">
                <img src="/RP_CLASSICO.png" alt="RPCLASSICO" className="card-image" />
                <h3>RPCLASSICO</h3>
                <p>Pão de batata, carne fraldinha, queijo cheddar, molho cheddar, ketchup, maionese da casa, barbecue, alface, tomate.</p>
                <br />
                <span className="price">R$ 18,00</span>
              </div>
              <div className="card reveal" style={{ position: 'relative', border: '1px solid var(--color-primary)' }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(255, 107, 53, 0.4)'
                }}>
                  Mais Pedido
                </div>
                <img src="/PRBURGUER.png" alt="RPBURGER" className="card-image" />
                <h3>RPBURGER</h3>
                <p>Pão de batata, carne fraldinha, queijo cheddar, <span className="diff">cebola caramelizada</span>, <span className="diff">bacon</span>, molho cheddar, ketchup, maionese da casa, barbecue, alface, tomate.</p>
                <span className="price">R$ 22,00</span>
              </div>
              <div className="card reveal">
                <img src="/DUPLAIGNORANCIA.png" alt="DUPLA IGNORÂNCIA" className="card-image" />
                <h3>DUPLA IGNORÂNCIA</h3>
                <p>Pão de batata, <span className='diff'>2x carne fraldinha</span>, <span className='diff'>2x queijo cheddar</span>, cebola caramelizada, bacon, molho cheddar, ketchup, maionese da casa, barbecue, alface, tomate.</p>
                <span className="price">R$ 31,00</span>
              </div>
            </div>

            <div className="section-header reveal" style={{ marginTop: '6rem' }}>
              <h2>Cardápio Completo</h2>
              <p>Confira outras delícias da nossa casa</p>
            </div>

            <div className="grid">
              {/* Lanches */}
              <div className="card reveal menu-category">
                <h3>Lanches Tradicionais</h3>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">MISTO</span>
                    <span className="menu-item-price">R$ 6,00</span>
                  </div>
                  <p className="menu-item-desc">Pão, queijo, presunto, ketchup, mostarda, maionese.</p>
                </div>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">HAMBURGUER</span>
                    <span className="menu-item-price">R$ 8,00</span>
                  </div>
                  <p className="menu-item-desc">Pão, carne de hambúrguer, alface, tomate, ketchup, mostarda, maionese.</p>
                </div>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">MISBURGUER</span>
                    <span className="menu-item-price">R$ 12,00</span>
                  </div>
                  <p className="menu-item-desc">Pão, carne de hambúrguer, queijo, presunto, alface, tomate, ketchup, mostarda, maionese.</p>
                </div>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">MISBACON</span>
                    <span className="menu-item-price">R$ 16,00</span>
                  </div>
                  <p className="menu-item-desc">Pão, carne de hambúrguer, queijo, presunto, bacon, alface, tomate, ketchup, mostarda, maionese.</p>
                </div>
              </div>

              {/* Batata Frita */}
              <div className="card reveal menu-category">
                <h3>Batata Frita</h3>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">Batata 100g</span>
                    <span className="menu-item-price">R$ 7,00</span>
                  </div>
                </div>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">Batata 200g</span>
                    <span className="menu-item-price">R$ 10,00</span>
                  </div>
                </div>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">Batata 200g</span>
                    <span className="menu-item-price">R$ 15,00</span>
                  </div>
                  <p className="menu-item-desc">Acompanhada de Cheddar & Bacon</p>
                </div>
              </div>

              {/* Bebidas */}
              <div className="card reveal menu-category">
                <h3>Bebidas</h3>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">Goob 250ml</span>
                    <span className="menu-item-price">R$ 2,50</span>
                  </div>
                </div>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">Refri 350ml</span>
                    <span className="menu-item-price">R$ 5,00</span>
                  </div>
                </div>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">Refri 1L</span>
                    <span className="menu-item-price">R$ 7,00</span>
                  </div>
                </div>
                <div className="menu-item">
                  <div className="menu-item-header">
                    <span className="menu-item-name">Água 500ml</span>
                    <span className="menu-item-price">R$ 2,00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--color-text-muted)' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>ONDE ESTAMOS</span>
            </div>
            <p style={{ color: 'var(--color-text-main)', fontSize: '1.1rem', margin: 0 }}>Avenida Edgard Santos</p>
            <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: 0, opacity: 0.8 }}>
              Em frente ao condomínio Bosque da Lagoa, próximo ao Bora Bora
            </p>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <a
              href="https://www.instagram.com/rpburgeroficial/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-text-main)',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-full)',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'var(--color-text-main)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Siga @rpburgeroficial
            </a>
          </div>
          <p>&copy; 2024 RPBurguer. Todos os direitos reservados.</p>
        </footer>
      </main>
    </>
  )
}

export default App
