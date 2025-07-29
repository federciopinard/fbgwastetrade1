import React, { useEffect, useState } from 'react';

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
      const response = await fetch('/api/prices'); // API da definire
      const data = await response.json();
      setCerList(data);
    };

    fetchCERPrices();
  }, []);

  return (
    <div>
      <h1>Prezzi CER</h1>
      <ul>
        {cerList.map((item) => (
          <li key={item.code}>
            {item.code} - {item.name}: {item.price}€ ({item.trend}) - Agg. {item.lastUpdated}
          </li>
        ))}
      </ul>
    </div>
  );
}
