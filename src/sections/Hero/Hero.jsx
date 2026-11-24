import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, Coffee, PlayCircle, Sparkles } from 'lucide-react'
import './Hero.css'
import heroBg from '../../assets/images/hero-bg.png'
import chaiCupImg from '../../assets/images/chai-cup.png'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 60)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero__overlay" />
      <div className="hero__glow" />
      <div className="hero__container">
        <div className={`hero__content ${loaded ? 'hero__content--visible' : ''}`}>
          <div className="hero__badge"><Sparkles size={14} /><span>Kakkanad's spot for good food & chai</span></div>
          <h1 className="hero__title">More Than Chai,<br />It's a <span className="hero__title-accent">Chai Loop</span></h1>
          <p className="hero__description">From comforting chai and cool drinks to loaded fries, momos and burgers — find your next favourite bite at Chai Loop.</p>
          <div className="hero__actions">
            <a href="#menu" className="hero__btn hero__btn--primary"><Coffee size={18} /><span>Explore Menu</span><ArrowRight size={16} /></a>
            <a href="#about" className="hero__btn hero__btn--ghost"><PlayCircle size={19} /><span>Discover Chai Loop</span></a>
          </div>
          <div className="hero__proof"><span className="hero__proof-stars">★★★★★</span><span>Local flavours. Good company. Easy-going moments.</span></div>
        </div>
        <div className={`hero__cup-wrapper ${loaded ? 'hero__cup-wrapper--visible' : ''}`}>
          <div className="steam-container" aria-hidden="true"><div className="steam-wisp steam-wisp--1"/><div className="steam-wisp steam-wisp--2"/><div className="steam-wisp steam-wisp--3"/><div className="steam-wisp steam-wisp--4"/></div>
          <div className="hero__cup-frame"><img src={chaiCupImg} alt="A steaming Chai Loop cup of chai" className="hero__cup-img" fetchPriority="high"/><div className="hero__cup-shadow"/></div>
        </div>
      </div>
      <div className="hero__scroll"><span>Scroll to explore</span><ArrowDown size={17}/></div>
    </section>
  )
}
