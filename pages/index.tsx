import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white">
      {/* Hero background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1503264116251-35a269479413"
          alt="Waste management background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">♻️ FBG Waste Trade</span>
        </div>
        <nav className="flex gap-6 text-sm">
          <a href="#quotazione" className="hover:underline">Quotazione</a>
          <a href="#borsa" className="hover:underline">Borsa CER</a>
          <a href="#storia" className="hover:underline">Chi siamo</a>
          <a href="/login" className="hover:underline">Login</a>
          <select className="bg-transparent border px-2 rounded text-white text-sm">
            <option>IT</option>
            <option>EN</option>
            <option>FR</option>
          </select>
        </nav>
      </header>

      {/* Hero section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          La prima Borsa CER con Intelligenza Artificiale
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          Quotazioni intelligenti. Trading ambientale. Un nuovo modo di lavorare con i rifiuti.
        </p>
      </section>

      {/* Quotazione */}
      <section id="quotazione" className="bg-white text-gray-800 py-16 px-6 md:px-24">
        <h2 className="text-3xl font-semibold text-center mb-8">Richiedi una quotazione</h2>
        <form className="max-w-2xl mx-auto space-y-4">
          <div>
            <label className="block mb-1 font-medium">Codice CER</label>
            <input type="text" placeholder="Es. 19.12.12" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantità (tonnellate)</label>
            <input type="number" placeholder="Es. 30" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Località</label>
            <input type="text" placeholder="Es. Torino" className="w-full p-2 border rounded" />
          </div>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
            Ottieni quotazione stimata
          </button>
        </form>
      </section>

      {/* Borsa CER */}
      <section id="borsa" className="bg-gray-100 text-gray-800 py-16 px-6 md:px-24">
        <h2 className="text-3xl font-semibold text-center mb-8">Borsa CER - AI Live Feed</h2>
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <ul className="space-y-2 text-lg">
            <li className="flex justify-between"><span>19.12.12</span><span>€145,00</span></li>
            <li className="flex justify-between"><span>20.03.01</span><span>€98,50</span></li>
            <li className="flex justify-between"><span>17.05.04</span><span>€123,00</span></li>
            <li className="flex justify-between"><span>15.01.06</span><span>€110,25</span></li>
          </ul>
        </div>
      </section>

      {/* Storia */}
      <section id="storia" className="bg-white text-gray-900 py-16 px-6 md:px-24">
        <h2 className="text-3xl font-semibold text-center mb-6">La nostra storia</h2>
        <p className="max-w-3xl mx-auto text-lg text-center">
          Da tre generazioni la famiglia Pinard è protagonista nel settore dei rifiuti.
          Dalla raccolta locale all’esportazione internazionale, oggi con FBG Waste Trade
          portiamo il settore nel futuro grazie all’intelligenza artificiale.
        </p>
      </section>
    </div>
  );
}
