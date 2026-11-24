import { useMemo, useState } from 'react'
import { ArrowUpRight, Flame, MessageCircle, UtensilsCrossed } from 'lucide-react'
import { menuCategories, menuItems, popularMenuItems } from '../../data/menuData'
import { getWhatsAppUrl } from '../../data/cafeData'
import './Menu.css'

const money = (price) => `\u20b9${price}`
const tilePosition = (cell) => ({
  backgroundPosition: `${(cell % 4) * 100 / 3}% ${Math.floor(cell / 4) * 100 / 3}%`,
})

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('popular')
  const items = useMemo(() => {
    if (activeCategory === 'popular') return menuItems.filter((item) => popularMenuItems.includes(item.id))
    return menuItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="menu" className="menu-section section-shell">
      <div className="section-heading section-heading--center">
        <span className="eyebrow"><UtensilsCrossed size={14}/> Made fresh at Chai Loop</span>
        <h2>Good food. <em>Good company.</em></h2>
        <p>Find your next favourite, from crispy bites and loaded plates to coolers made for a slow afternoon.</p>
      </div>
      <div className="menu-tabs" role="tablist" aria-label="Menu categories">
        {menuCategories.map((category) => (
          <button key={category.id} type="button" role="tab" aria-selected={activeCategory === category.id}
            className={activeCategory === category.id ? 'menu-tab is-active' : 'menu-tab'}
            onClick={() => setActiveCategory(category.id)}>{category.label}</button>
        ))}
      </div>
      <div className="menu-results" aria-live="polite">
        <span>{activeCategory === 'popular' ? 'A few house favourites' : menuCategories.find((category) => category.id === activeCategory)?.label}</span>
        <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
      </div>
      <div className="menu-grid" key={activeCategory}>
        {items.map((item) => <article className="menu-card" key={item.id}>
          <div className="menu-card__image-wrap">
            <div className="menu-card__photo" role="img" aria-label={`Freshly prepared ${item.name}`} style={tilePosition(item.imageCell)} />
            <span className="menu-card__category">{item.comboGroup ?? menuCategories.find((category) => category.id === item.category)?.label}</span>
            {popularMenuItems.includes(item.id) && <span className="menu-card__featured"><Flame size={12}/> Favourite</span>}
          </div>
          <div className="menu-card__body">
            <div className="menu-card__title-row"><h3>{item.name}</h3><strong>{money(item.price)}</strong></div>
            {item.description && <p>{item.description}</p>}
            {item.price_alternatives?.length > 0 && <small className="menu-card__price-note" title={item.price_note}>Also listed at {item.price_alternatives.map(money).join(' / ')}</small>}
            <a href={getWhatsAppUrl(`Hello Chai Loop Cafe! I would like to enquire about ${item.name} (${money(item.price)}).`)} target="_blank" rel="noreferrer" className="menu-card__enquire">Enquire on WhatsApp <ArrowUpRight size={14}/></a>
          </div>
        </article>)}
      </div>
      <div className="menu-note"><span>*A few items have different prices across the printed menus. Ask the cafe to confirm the latest price.</span><a href={getWhatsAppUrl('Hello Chai Loop Cafe! Please share your latest complete menu.')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Ask for the latest menu</a></div>
    </section>
  )
}
