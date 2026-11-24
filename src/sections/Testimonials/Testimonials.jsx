import { Star } from 'lucide-react'
import './Testimonials.css'

const reviews = [
  { quote: 'Excellent place serving the best tea and snacks. Everything in the menu is so good.', author: 'Faras Moosa', source: 'Google review' },
  { quote: 'Good food, good service.', author: 'Customer review', source: 'Google review' },
  { quote: 'Awesome fresh beef patties burger.', author: 'Customer review', source: 'Google review' },
]

export default function Testimonials() {
  return <section className="testimonials-section section-shell"><div className="section-heading section-heading--center"><span className="eyebrow">A little love from the neighbourhood</span><h2>Good words, <em>good vibes.</em></h2><p>What customers have shared about their Chai Loop visits.</p></div><div className="testimonials-summary"><div className="testimonials-summary__score">4.6</div><div><div className="testimonials-stars" aria-label="Rated 4.6 out of 5">★★★★★</div><strong>Customer rating</strong><small>Based on the Google listing details provided</small></div></div><div className="testimonials-grid">{reviews.map((review) => <article className="review-card" key={review.quote}><div className="review-card__stars"><Star/><Star/><Star/><Star/><Star/></div><p>“{review.quote}”</p><div className="review-card__author"><strong>{review.author}</strong><small>{review.source}</small></div></article>)}</div></section>
}
