import Layout from '../components/Layout/Layout.jsx'
import Hero from '../sections/Hero/Hero.jsx'
import About from '../sections/About/About.jsx'
import Menu from '../sections/Menu/Menu.jsx'
import Experience from '../sections/Experience/Experience.jsx'
import Gallery from '../sections/Gallery/Gallery.jsx'
import Testimonials from '../sections/Testimonials/Testimonials.jsx'
import Location from '../sections/Location/Location.jsx'
import './Home.css'

export default function Home() {
  return <Layout><Hero/><About/><Menu/><Experience/><Gallery/><Testimonials/><Location/></Layout>
}
