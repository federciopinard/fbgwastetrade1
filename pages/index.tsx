import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-white text-gray-900">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white shadow px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-green-700 text-white px-3 py-1 text-sm font-semibold">
            ♻️ FBG Waste Trade
          </div>
        </div>
        <nav className="space-x-6 text-sm font-medium text-gray-800">
          <Link href="/">Home</Link>
          <Link href="/quotazione">Quotazione</Link>
          <Link href="/borsa">Borsa CER</Link>
          <Link href="/login">Login</Link>
        </nav>
        {/* Lingue */}
        <div className="space-x-2 text-sm font-semibold">
          <button>IT</button>
          <button>EN</button>
          <button>FR</button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[90vh] w-full">
  <Image
    src="https://images.unsplash.com/photo-1600585152434-7e84b008f3a7"
    alt="Green technology"
    fill
    style={{ objectFit: "cover" }}
    quality={100}
  />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl font-bold drop-shadow">La prima borsa CER con Intelligenza Artificiale</h1>
          <p className="mt-4 text-xl max-w-2xl drop-shadow">
            Quotazioni ambientali in tempo reale. Brokeraggio rifiuti smart e sostenibile.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="mt-8 max-w-6xl mx-auto px-4">
        {/* Form quotazione + borsa */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Richiedi una quotazione</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Codice CER</label>
                <input type="text" className="w-full p-2 rounded border" placeholder="Es. 19.12.12" />
              </div>
              <div>
                <label className="block text-sm font-medium">Quantità (tonnellate)</label>
                <input type="number" className="w-full p-2 rounded border" placeholder="Es. 30" />
              </div>
              <div>
                <label className="block text-sm font-medium">Località</label>
                <input type="text" className="w-full p-2 rounded border" placeholder="Es. Torino" />
              </div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Ottieni quotazione
              </button>
            </form>
          </div>

          {/* Borsa */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Borsa CER - AI Live Feed</h2>
            <ul className="space-y-2">
              <li className="flex justify-between"><span>19.12.12</span><span>€145,00</span></li>
              <li className="flex justify-between"><span>20.03.01</span><span>€98,50</span></li>
              <li className="flex justify-between"><span>17.05.04</span><span>€123,00</span></li>
              <li className="flex justify-between"><span>15.01.06</span><span>€110,25</span></li>
            </ul>
          </div>
        </div>

        {/* Storia della famiglia */}
        <div className="mt-12 bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">La nostra storia</h2>
          <p className="text-gray-700 text-lg">
            Da tre generazioni la famiglia Pinard è protagonista nel settore dei rifiuti. Dalla raccolta locale,
            all’esportazione internazionale, fino a oggi: con FBG Waste Trade uniamo la nostra esperienza
            all’intelligenza artificiale per rivoluzionare il brokeraggio ambientale.
          </p>
          <div className="mt-4">
            <Link href="/login" className="text-green-700 underline font-medium hover:text-green-900">
              Accedi alla tua area riservata
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
