import {  MapPin, Phone, ArrowUpRight } from 'lucide-react'
import { cafeData, getWhatsAppUrl } from '../../data/cafeData'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__intro">
          <a className="site-footer__brand" href="#home"><span>Chai Loop</span><small>CAFÉ</small></a>
          <p>Chai, bites and good moments in Kakkanad. Find your favourite and loop back soon.</p>
          <div className="site-footer__social">
            <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Phone size={17}/></a>
            {cafeData.instagramUrl && <a href={cafeData.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={17}/></a>}
          </div>
        </div>
        <div className="site-footer__links">
          <strong>Explore</strong>
          <a href="#home">Home</a><a href="#menu">Menu</a><a href="#experience">Experience</a><a href="#gallery">Gallery</a><a href="#about">About</a>
        </div>
        <div className="site-footer__contact">
          <strong>Find us</strong>
          <span><MapPin size={15}/>{cafeData.address}</span>
          <a href={`tel:${cafeData.phone}`}><Phone size={15}/>{cafeData.displayPhone}</a>
          <a href={cafeData.mapsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14}/></a>
        </div>
      </div>
      <div className="site-footer__bottom"><span>© {new Date().getFullYear()} Chai Loop Cafe. All rights reserved.</span><span>Made for good chai and good company.</span></div>
    </footer>
  )
}
