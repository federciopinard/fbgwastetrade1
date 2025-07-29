import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo e titolo */}
        <div className="flex items-center space-x-3">
          <img src="/logo-fbg.png" alt="Logo FBG" className="h-10 w-10" />
          <span className="text-xl font-bold text-green-700">FBG Waste Trade</span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex space-x-6 text-sm text-gray-800">
          <a href="#quotazione" className="hover:text-green-600">Richiedi quotazione</a>
          <a href="#borsa" className="hover:text-green-600">Borsa CER</a>
          <a href="#storia" className="hover:text-green-600">La nostra storia</a>
          <a href="/login" className="hover:text-green-600">Login</a>
        </div>

        {/* Lingue */}
        <div className="flex space-x-2 text-sm">
          <button className="hover:text-green-700">IT</button>
          <button className="hover:text-green-700">EN</button>
          <button className="hover:text-green-700">FR</button>
        </div>
      </div>
    </nav>
  );
};

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-auto">
      {/* Navbar */}
      <Navbar />

      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600788907411-1d16760c141e"
          alt="Environmental background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Header Title */}
      <div className="text-center pt-32 text-white">
        <h1 className="text-5xl font-bold drop-shadow-lg">Prezzi CER</h1>
      </div>

      {/* Main Content Section */}
      <div className="mt-12 flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-12">
        {/* Table/Form Section */}
        <div id="quotazione" className="bg-white/80 rounded-2xl p-6 shadow-xl w-full md:w-1/2">
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
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Ottieni quotazione</button>
          </form>
        </div>

        {/* Borsa CER */}
        <div id="borsa" className="bg-white/80 rounded-2xl p-6 shadow-xl w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Borsa CER - AI Live Feed</h2>
          <ul className="text-sm">
            <li className="flex justify-between"><span>19.12.12</span><span>€145,00</span></li>
            <li className="flex justify-between"><span>20.03.01</span><span>€98,50</span></li>
            <li className="flex justify-between"><span>17.05.04</span><span>€123,00</span></li>
            <li className="flex justify-between"><span>15.01.06</span><span>€110,25</span></li>
          </ul>
        </div>
      </div>

      {/* Family history section */}
      <div id="storia" className="bg-white/90 mt-16 p-8 rounded-2xl mx-4 md:mx-12 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">La nostra storia</h2>
        <p className="text-lg text-gray-800 text-center max-w-4xl mx-auto">
          Da tre generazioni la famiglia Pinard è protagonista nel settore dei rifiuti. Dalla raccolta locale,
          all’esportazione internazionale, fino a oggi: con FBG Waste Trade uniamo la nostra esperienza
          all’intelligenza artificiale per rivoluzionare il brokeraggio ambientale.
        </p>
        <div className="text-center mt-6">
          <Link href="/login" className="text-green-700 underline font-medium hover:text-green-900">
            Accedi alla tua area riservata
          </Link>
        </div>
      </div>
    </div>
  );
}
