import { Coffee } from 'lucide-react'
import CircularGallery from '../../components/animations/CircularGallery/CircularGallery'
import cafe from '../../assets/images/gallery/gallery-cafe-interior.png'
import chai from '../../assets/images/gallery/gallery-chai.png'
import burger from '../../assets/images/gallery/gallery-burger.png'
import momos from '../../assets/images/gallery/gallery-momos.png'
import loadedFries from '../../assets/images/gallery/gallery-loaded-fries.png'
import shakes from '../../assets/images/gallery/gallery-shakes.png'
import './Gallery.css'

const galleryItems = [
  { image: cafe, text: 'A warm cafe welcome', description: 'Settle in, share a few plates, and make yourself at home.' },
  { image: chai, text: 'Fresh chai', description: 'A comforting cup, brewed for a slow moment.' },
  { image: burger, text: 'Smashed burger', description: 'Juicy patties, melted cheese, crisp greens and toasted buns.' },
  { image: momos, text: 'Steamed momos', description: 'Steamed bites served with a bright, spicy dip.' },
  { image: loadedFries, text: 'Loaded fries', description: 'Crispy fries topped with flavour and made to share.' },
  { image: shakes, text: 'Shakes & falooda', description: 'A sweet, chilled finish to your Chai Loop visit.' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section section-shell">
      <div className="section-heading section-heading--center">
        <span className="eyebrow"><Coffee size={14}/> A little look around</span>
        <h2>Your next <em>favourite moment.</em></h2>
        <p>Warm chai, a table full of good food, and room to stay a little longer.</p>
      </div>
      <div className="gallery-carousel-frame">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#fff0dc"
          borderRadius={0.05}
          font="600 20px Georgia"
          scrollEase={0.05}
          itemSize={1}
          itemAspect={0.78}
          gap={0.26}
          wave={1}
          fadeEdges={0.12}
          shadow={0.25}
          scrollSpeed={2}
          autoScroll={0}
          snap
          grayscale={false}
          showTitles
          openOnClick
          intro
          aria-label="Chai Loop cafe and food gallery"
        />
      </div>
      <p className="gallery-disclaimer">Gallery photos are illustrative. Ask us about today’s fresh picks.</p>
    </section>
  )
}
