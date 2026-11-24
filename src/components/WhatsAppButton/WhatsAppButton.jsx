import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '../../data/cafeData'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
  return <a className="whatsapp-float" href={getWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="Chat with Chai Loop Cafe on WhatsApp"><MessageCircle size={23}/><span>Chat with us</span></a>
}
