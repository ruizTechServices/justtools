import NavBar from "../components/app/landing_page/Navbar"
import Hero from "../components/app/landing_page/Hero"
import Description from "../components/app/landing_page/description"

const items = [
  { label: "Home", href: "/" },
  { label: "Summarizer", href: "/summarizer" },
  
]

export default function Home() {
  return (
    <div className="w-full h-[300vh] overflow-hidden">
      <NavBar items={items} />
    </div>
  )
}
