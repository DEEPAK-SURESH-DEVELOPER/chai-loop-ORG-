import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { MapPin, Menu as MenuIcon, X, MessageCircle, ArrowUpRight } from 'lucide-react'
import { cafeData, getWhatsAppUrl } from '../../data/cafeData'
import logo from '../../assets/images/chai-loop-logo.png'
import './Header.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

// Space kept above a section when scrolling to it, so the floating navbar never covers its heading
const SCROLL_OFFSET = 96

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('home')
  const reduceMotion = useReducedMotion()

  const closeMenu = useCallback(() => setMobileOpen(false), [])

  // Navbar state on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active link follows the section crossing the middle of the screen
  useEffect(() => {
    const sections = navLinks.map(({ href }) => document.querySelector(href)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Lock page scroll while the sidebar is open, close on Escape
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => event.key === 'Escape' && closeMenu()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen, closeMenu])

  // Close the sidebar if the screen grows to desktop width
  useEffect(() => {
    const query = window.matchMedia('(min-width: 821px)')
    const onChange = (event) => event.matches && closeMenu()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [closeMenu])

  // Smooth scroll with offset; waits for the sidebar to close first on mobile
  const goTo = (event, href) => {
    const target = document.querySelector(href)
    if (!target) return // let the browser handle it normally
    event.preventDefault()
    const wasOpen = mobileOpen
    closeMenu()
    setActive(href.slice(1))
    window.setTimeout(
      () => {
        const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
        window.scrollTo({ top: href === '#home' ? 0 : top, behavior: reduceMotion ? 'auto' : 'smooth' })
        window.history.replaceState(null, '', href)
      },
      wasOpen ? 240 : 0
    )
  }

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 340, damping: 30, mass: 0.9 }

  const panelVariants = {
    hidden: { opacity: 0, x: 36, scale: 0.95 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { ...spring, when: 'beforeChildren', staggerChildren: reduceMotion ? 0 : 0.055, delayChildren: 0.06 },
    },
    exit: { opacity: 0, x: 28, scale: 0.96, transition: { duration: reduceMotion ? 0 : 0.2, ease: 'easeIn' } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 18 },
    show: { opacity: 1, x: 0, transition: spring },
  }

  return (
    <header className="site-header">
      {/* Dimmed + blurred page behind the sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            className="navbar__scrim"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          />
        )}
      </AnimatePresence>

      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} aria-label="Main navigation">
        <a href="#home" className="navbar__brand" aria-label="Chai Loop Cafe home" onClick={(e) => goTo(e, '#home')}>
          <span className="navbar__brand-mark"><img className="navbar__brand-logo" src={logo} alt="" /></span>
          <span className="navbar__brand-copy"><strong>Chai Loop</strong><small>CAFÉ</small></span>
        </a>

        <a className="navbar__location" href={cafeData.mapsUrl} target="_blank" rel="noreferrer">
          <MapPin size={15} /><span>{cafeData.shortAddress}</span><ArrowUpRight size={13} />
        </a>

        {/* Desktop links: the active pill glides between items */}
        <div className="navbar__menu">
          <ul className="navbar__links">
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = active === id
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={isActive ? 'is-active' : ''}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => goTo(e, link.href)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="navbar__pill"
                        transition={spring}
                      />
                    )}
                    <span className="navbar__link-label">{link.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="navbar__actions">
          <a
            className="navbar__cta"
            href={getWhatsAppUrl('Hello Chai Loop Cafe! I would like to place an enquiry.')}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} /><span>Contact Us</span>
          </a>
          <button
            className="navbar__toggle"
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                className="navbar__toggle-icon"
                initial={{ rotate: -80, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 80, opacity: 0, scale: 0.7 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
              >
                {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile floating sidebar. Kept outside <nav> so the glass blur and positioning don't conflict */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            id="mobile-menu"
            className="sidebar"
            aria-label="Site menu"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <ul className="sidebar__links">
              {navLinks.map((link) => {
                const id = link.href.slice(1)
                const isActive = active === id
                return (
                  <motion.li key={link.label} variants={itemVariants}>
                    <a
                      href={link.href}
                      className={isActive ? 'is-active' : ''}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => goTo(e, link.href)}
                    >
                      <span>{link.label}</span>
                      <i className="sidebar__dot" aria-hidden="true" />
                    </a>
                  </motion.li>
                )
              })}
            </ul>

            <motion.div className="sidebar__footer" variants={itemVariants}>
              <a className="sidebar__location" href={cafeData.mapsUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
                <MapPin size={16} /><span>{cafeData.shortAddress}</span><ArrowUpRight size={14} />
              </a>
              <a
                className="navbar__cta sidebar__cta"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
              >
                <MessageCircle size={17} /> WhatsApp us
              </a>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  )
}
