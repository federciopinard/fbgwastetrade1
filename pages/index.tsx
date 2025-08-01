// pages/index.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import emailjs from "emailjs-com";

export default function Home() {
  const [codice, setCodice] = useState("");
  const [quantita, setQuantita] = useState("");
  const [localita, setLocalita] = useState("");
  const [prezzoStimato, setPrezzoStimato] = useState<number | null>(null);
  const [listino, setListino] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchListino() {
      try {
        const res = await fetch("/api/listino");
        const data = await res.json();
        setListino(data);
      } catch (error) {
        console.error("Errore caricamento listino:", error);
        setListino({
          "19.12.12": 145,
          "20.03.01": 98.5,
          "17.05.04": 123,
          "15.01.06": 110.25,
        });
      }
    }
    fetchListino();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prezzoUnitario = listino[codice.trim()];
    if (!prezzoUnitario || !quantita) {
      setPrezzoStimato(null);
      return;
    }
    const totale = prezzoUnitario * parseFloat(quantita);
    setPrezzoStimato(parseFloat(totale.toFixed(2)));

    // EmailJS
    emailjs.send(
      "service_xxx",        // <-- SOSTITUISCI con il tuo ID servizio
      "template_xxx",       // <-- SOSTITUISCI con il tuo template
      {
        codice,
        quantita,
        localita,
        prezzo: totale.toFixed(2),
        email_destinatario: "fbgbrokerage@gmail.com",
      },
      "user_xxx"            // <-- SOSTITUISCI con il tuo User ID
    )
    .then(() => alert("Richiesta inviata!"))
    .catch(err => {
      console.error("Errore invio email:", err);
      alert("Errore invio email");
    });
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white shadow px-6 py-4">
        <div className="text-green-800 font-bold text-lg">♻️ FBG Waste Trade</div>
        <nav className="space-x-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/quotazione">Quotazione</Link>
          <Link href="/borsa">Borsa CER</Link>
          <Link href="/login">Login</Link>
          <Link href="/notizie">Notizie</Link>
        </nav>
        <div className="space-x-2 text-sm">
          <button>IT</button><button>EN</button><button>FR</button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-[100vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1599310121373-2d06db1cd042?auto=format&fit=crop&w=1600&q=80"
          alt="Impianto"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-bold drop-shadow">La prima borsa CER con Intelligenza Artificiale</h1>
          <p className="mt-4 text-xl max-w-xl drop-shadow">Brokeraggio rifiuti smart e sostenibile. Quotazioni in tempo reale.</p>
        </div>
      </div>

      {/* Main */}
      <main className="mt-12 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form */}
          <div className="bg-white shadow rounded-2xl p-6 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Richiedi una quotazione</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm">Codice CER</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Es. 19.12.12"
                  value={codice}
                  onChange={(e) => setCodice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm">Quantità (tonnellate)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Es. 25"
                  value={quantita}
                  onChange={(e) => setQuantita(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm">Località</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Es. Milano"
                  value={localita}
                  onChange={(e) => setLocalita(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ottieni quotazione</button>
              {prezzoStimato !== null && (
                <div className="mt-4 text-green-700 font-semibold">Prezzo stimato: €{prezzoStimato.toFixed(2)}</div>
              )}
            </form>
          </div>

          {/* Borsa CER dinamica */}
          <div className="bg-white shadow rounded-2xl p-6 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Borsa CER - Prezzi aggiornati</h2>
            <ul className="space-y-2">
              {Object.entries(listino).map(([cer, prezzo]) => (
                <li key={cer} className="flex justify-between text-sm">
                  <span>{cer}</span><span>€{prezzo.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Storia */}
        <div className="mt-12 bg-white shadow rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">La nostra storia</h2>
          <p className="text-gray-700 text-lg">
            Da tre generazioni la famiglia Pinard è protagonista nel settore dei rifiuti. Con FBG Waste Trade uniamo la nostra esperienza all’intelligenza artificiale per rivoluzionare il brokeraggio ambientale.
          </p>
          <Link href="/area-clienti" className="mt-4 inline-block text-green-700 underline font-medium hover:text-green-900">
            Accedi alla tua area riservata
          </Link>
        </div>
      </main>
    </div>
  );
}
