import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface CERData {
  code: string;
  name: string;
  price: number;
  trend: string;
  lastUpdated: string;
}

export default function Home() {
  const [cerList, setCerList] = useState<CERData[]>([]);

  useEffect(() => {
    const fetchCERPrices = async () => {
      const data: CERData[] = [
        {
          code: "19.12.12",
          name: "Plasmix da impianto",
          price: 103.0,
          trend: "📉 -3.2%",
          lastUpdated: "24/07/2025",
        },
        {
          code: "20.03.01",
          name: "Rifiuto urbano",
          price: 210.0,
          trend: "📈 +1.8%",
          lastUpdated: "23/07/2025",
        },
        {
          code: "19.05.03",
          name: "Rifiuto da digestato",
          price: 34.5,
          trend: "➖ 0.0%",
          lastUpdated: "25/07/2025",
        },
      ];
      setCerList(data);
    };

    fetchCERPrices();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="text-5xl font-bold mb-4">FBG Waste Trade</h1>
          <p className="text-xl mb-8 max-w-3xl">
            La prima Borsa CER con prezzi dinamici aggiornati automaticamente da fonti pubbliche, dati privati e AI.
          </p>
        </motion.div>
      </section>

      <section className="py-12 max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-semibold mb-6">Borsa CER – Prezzi Dinamici</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">CER</th>
                <th className="px-4 py-2 text-left">Nome rifiuto</th>
                <th className="px-4 py-2 text-left">Prezzo €/ton</th>
                <th className="px-4 py-2 text-left">Trend</th>
                <th className="px-4 py-2 text-left">Ultimo aggiornamento</th>
              </tr>
            </thead>
            <tbody>
              {cerList.map((cer) => (
                <tr key={cer.code} className="border-t">
                  <td className="px-4 py-2 font-mono">{cer.code}</td>
                  <td className="px-4 py-2">{cer.name}</td>
                  <td className="px-4 py-2">€ {cer.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{cer.trend}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{cer.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-8 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-2">FBG Waste Trade</h4>
            <p className="text-sm">Innovazione nel brokeraggio rifiuti. Powered by AI.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contatti</h4>
            <p>Email: info@fbgbrokerage.com</p>
            <p>LinkedIn: FBG Brokerage</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Lingue</h4>
            <p>🇮🇹 Italiano | 🇬🇧 English | 🇫🇷 Français</p>
          </div>
        </div>
      </footer>
    </main>
  );
}