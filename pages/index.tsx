import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-auto">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1507238691726-670b816f59b5"
          alt="Environmental background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Header Title */}
      <div className="text-center pt-20 text-white">
        <h1 className="text-5xl font-bold drop-shadow-lg">Prezzi CER</h1>
      </div>

      {/* Main Content Section */}
      <div className="mt-12 flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-12">
        {/* Table/Form Section */}
        <div className="bg-white/80 rounded-2xl p-6 shadow-xl w-full md:w-1/2">
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
        <div className="bg-white/80 rounded-2xl p-6 shadow-xl w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Borsa CER - AI Live Feed</h2>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>19.12.12</span><span>€145,00</span></li>
            <li className="flex justify-between"><span>20.03.01</span><span>€98,50</span></li>
            <li className="flex justify-between"><span>17.05.04</span><span>€123,00</span></li>
            <li className="flex justify-between"><span>15.01.06</span><span>€110,25</span></li>
          </ul>
        </div>
      </div>

      {/* Family history section */}
      <div className="bg-white/90 mt-16 p-8 rounded-2xl mx-4 md:mx-12 shadow-lg">
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
