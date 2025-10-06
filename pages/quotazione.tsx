// app/quotazione/page.tsx
"use client";
import { useMemo, useState } from "react";

type CERKey =
  | "170605_lastre" | "170605_frammenti" | "170605_voluminosi"
  | "170603" | "200301" | "150106" | "200102" | "200101"
  | "160103" | "200135" | "200136" | "160213";

const CER: Record<CERKey, { label: string; price: number; premio?: boolean }> = {
  "170605_lastre":    { label: "17 06 05* – Fibrocemento (lastre integre)",           price: 375.00 },
  "170605_frammenti": { label: "17 06 05* – Fibrocemento (frammenti in big bag)",      price: 472.00 },
  "170605_voluminosi":{ label: "17 06 05* – Fibrocemento (voluminosi)",                price: 1800.00 },
  "170603":           { label: "17 06 03* – Lana minerale (big bag)",                   price: 750.00 },
  "200301":           { label: "20 03 01 – Rifiuti urbani indifferenziati",             price: 205.00 },
  "150106":           { label: "15 01 06 – Imballaggi in materiali misti",              price: 205.00 },
  "200102":           { label: "20 01 02 – Vetro",                                      price: 24.00  },
  "200101":           { label: "20 01 01 – Carta e cartone (premio)",                   price: 30.00, premio: true },
  "160103":           { label: "16 01 03 – Pneumatici fuori uso (PFU)",                 price: 240.00 },
  "200135":           { label: "20 01 35 – AEE con componenti pericolosi",              price: 195.00 },
  "200136":           { label: "20 01 36 – AEE senza componenti pericolosi",            price: 60.00  },
  "160213":           { label: "16 02 13 – Apparecchi con componenti pericolosi",       price: 195.00 },
};

const REGION_RATE: Record<string, number> = {
  "Piemonte": 1.40, "Lombardia": 1.50, "Liguria": 1.60,
  "Veneto": 1.55, "Emilia-Romagna": 1.55, "Toscana": 1.60, "Altre": 1.70
};

const SURCHARGE_HP = 0.10;       // +10% pericolosi
const SURCHARGE_BULKY = 0.15;    // +15% voluminosi/handling speciale
const BULK_QTY = 50;             // soglia sconto quantità
const BULK_DISC = -0.05;         // -5% oltre soglia
const LOAD_PER_TON = 8.5;        // € / t per carico
const MIN_FIR = 50;              // € minimo per FIR (non si applica sui “premi”)

export default function QuotazionePage() {
  const [cer, setCer] = useState<CERKey | "">("");
  const [qty, setQty] = useState<number>(0);
  const [region, setRegion] = useState<string>("");
  const [km, setKm] = useState<number>(0);
  const [hazard, setHazard] = useState(false);
  const [bulky, setBulky] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const result = useMemo(() => {
    if (!cer || !qty || !region) return null;

    const item = CER[cer as CERKey];
    const base = item.price;
    const premio = !!item.premio;

    // fattore prezzo €/t
    let factor = 1;
    if (hazard) factor += SURCHARGE_HP;
    if (bulky) factor += SURCHARGE_BULKY;
    if (qty > BULK_QTY) factor += BULK_DISC;

    const pricePerTon = premio ? base : +(base * factor).toFixed(2);

    // trasporto & handling
    const kmRate = REGION_RATE[region] ?? 1.6;
    const transport = +(km * kmRate).toFixed(2);
    const handling = +(qty * LOAD_PER_TON).toFixed(2);

    // totale materiale (premio => negativo: riconoscimento)
    const materialAmount = premio ? -(base * qty) : +(pricePerTon * qty).toFixed(2);

    // totale complessivo (applica minimo FIR solo se non premio)
    let total = materialAmount + transport + handling;
    if (!premio) total = Math.max(total, MIN_FIR);

    return {
      label: item.label,
      premio,
      pricePerTon,
      transport,
      handling,
      materialAmount,
      total: +total.toFixed(2)
    };
  }, [cer, qty, region, km, hazard, bulky]);

  const copySummary = () => {
    if (!result) return;
    const txt =
`FBG Brokerage – Stima quotazione
CER: ${CER[cer as CERKey].label}
Quantità: ${qty.toFixed(1)} t
Regione: ${region} • Distanza: ${km.toFixed(0)} km
Pericoloso: ${hazard ? "Sì" : "No"} • Voluminosi: ${bulky ? "Sì" : "No"}

€/t materiale: ${result.premio ? `Premio +${CER[cer as CERKey].price.toFixed(2)}` : result.pricePerTon.toFixed(2)} €
Trasporto: ${result.transport.toFixed(2)} €
Handling/carico: ${result.handling.toFixed(2)} €
Totale stimato: ${result.total.toFixed(2)} €

* Prezzi indicativi, soggetti a omologa, verifica ADR e disponibilità impianto.
www.fbgbrokerage.com  •  +39 348 9050478  •  Albo TO34811`;
    navigator.clipboard.writeText(txt);
    alert("Riepilogo copiato negli appunti.");
  };

  const mailto = () => {
    if (!result) return;
    const subject = encodeURIComponent("Richiesta quotazione CER – FBG Brokerage");
    const body = encodeURIComponent(
      `Azienda: ${company}\nReferente: ${nome}\nEmail: ${email}\nTelefono: ${phone}\n\n` +
      `CER: ${CER[cer as CERKey].label}\nQuantità: ${qty} t\nRegione: ${region}\nDistanza: ${km} km\n` +
      `Pericoloso: ${hazard ? "Sì" : "No"} • Voluminosi: ${bulky ? "Sì" : "No"}\n\n` +
      `${result.premio ? `Premio carta/cartone: +${CER[cer as CERKey].price.toFixed(2)} €/t` : `€/t materiale: ${result.pricePerTon.toFixed(2)} €`}\n` +
      `Trasporto: ${result.transport.toFixed(2)} €\nHandling: ${result.handling.toFixed(2)} €\n` +
      `Totale stimato: ${result.total.toFixed(2)} €\n\n` +
      `Note: prezzi indicativi soggetti a omologa e disponibilità impianto.\nwww.fbgbrokerage.com • Albo TO34811`
    );
    window.location.href = `mailto:fbgbrokerage@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="px-4 sm:px-6 md:px-10 py-8 max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Richiedi una quotazione</h1>
        <p className="text-slate-600 mt-1">
          Seleziona codice CER e parametri. La stima è immediata.
          Prezzi indicativi, soggetti a omologa e disponibilità impianto.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-sm text-slate-600">Codice CER</label>
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 p-2"
                value={cer} onChange={e => setCer(e.target.value as CERKey | "")}>
                <option value="">Seleziona…</option>
                {Object.entries(CER).map(([key, v]) => (
                  <option key={key} value={key}>{v.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-600">Quantità (t)</label>
                <input type="number" min="0" step="0.1"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2"
                  value={qty || ""} onChange={e => setQty(parseFloat(e.target.value)||0)} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Distanza stimata (km)</label>
                <input type="number" min="0" step="1"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2"
                  value={km || ""} onChange={e => setKm(parseFloat(e.target.value)||0)} />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Regione</label>
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 p-2"
                value={region} onChange={e => setRegion(e.target.value)}>
                <option value="">Seleziona…</option>
                {Object.keys(REGION_RATE).map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={hazard} onChange={e=>setHazard(e.target.checked)} />
                <span>Rifiuto pericoloso (HP)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={bulky} onChange={e=>setBulky(e.target.checked)} />
                <span>Voluminosi / handling speciale</span>
              </label>
            </div>

            <hr className="my-1" />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-600">Nome</label>
                <input className="mt-1 w-full rounded-lg border border-slate-300 p-2"
                  value={nome} onChange={e=>setNome(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Email</label>
                <input type="email" className="mt-1 w-full rounded-lg border border-slate-300 p-2"
                  value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-600">Azienda</label>
                <input className="mt-1 w-full rounded-lg border border-slate-300 p-2"
                  value={company} onChange={e=>setCompany(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Telefono</label>
                <input className="mt-1 w-full rounded-lg border border-slate-300 p-2"
                  value={phone} onChange={e=>setPhone(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={copySummary}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
                type="button">
                Copia riepilogo
              </button>
              <button
                onClick={mailto}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                type="button">
                Invia via email
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Stima</h2>
          {!result ? (
            <p className="text-slate-600">Compila i campi per ottenere la stima.</p>
          ) : (
            <div className="space-y-2 text-slate-800">
              <div><b>CER:</b> {result.label}</div>
              <div><b>€/t materiale:</b> {result.premio ? `Premio +${CER[cer as CERKey].price.toFixed(2)}` : `${result.pricePerTon.toFixed(2)} €`}</div>
              <div><b>Trasporto:</b> {result.transport.toFixed(2)} € • <b>Handling:</b> {result.handling.toFixed(2)} €</div>
              <div><b>Quantità:</b> {qty.toFixed(1)} t • <b>Distanza:</b> {km.toFixed(0)} km • <b>Regione:</b> {region}</div>
              <hr />
              <div className="text-lg"><b>Totale stimato:</b> {result.total.toFixed(2)} €</div>
              <p className="text-sm text-slate-500">
                * Prezzi indicativi, soggetti a omologa, verifica ADR e disponibilità impianto.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
