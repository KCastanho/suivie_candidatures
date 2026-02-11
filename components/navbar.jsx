import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-center items-center gap-4">
        <Link href="/accueil" className="text-white hover:underline">
          Accueil
        </Link>
        <Link href="/add" className="text-white hover:underline">
          Ajouter
        </Link>
      </div>
    </nav>
  )
}