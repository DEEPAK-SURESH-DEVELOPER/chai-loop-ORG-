import { Bike, Coffee, Truck } from 'lucide-react'
import './Experience.css'

const services = [
  { icon: Coffee, title: 'Dine-in', text: 'Take a seat, slow down and enjoy your favourites at the cafe.' },
  { icon: Bike, title: 'Drive-through', text: 'Pick up your cravings and get back on the move.' },
  { icon: Truck, title: 'No-contact delivery', text: 'Enjoy Chai Loop favourites delivered to your doorstep.' },
]

export default function Experience() {
  return <section id="experience" className="experience section-shell"><div className="section-heading"><span className="eyebrow">Made for your kind of day</span><h2>Good food, <em>your way.</em></h2><p>Drop by, grab it on the go or enjoy your favourites at home.</p></div><div className="experience__grid">{services.map(({ icon: Icon, title, text }, index) => <article className="experience-card" key={title}><span className="experience-card__number">0{index + 1}</span><div className="experience-card__icon"><Icon size={25}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
}
