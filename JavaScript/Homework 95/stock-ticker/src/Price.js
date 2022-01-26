import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function Price() {
    const [price, setPrice] = useState(0);
    const { ticker } = useParams();
    useEffect(() => {
        (async () => {
            try {
                const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker.toUpperCase()}&token=c7onieaad3i94t1inp70&token=c7onieaad3i94t1inp70`)
                if (!r.ok) {
                    throw new Error(`News: ${r.status} ${r.statusText} `)
                }
                const tickerPrice = await r.json();
                setPrice(tickerPrice);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [ticker])
    return <div className={`d-inline ${Number(price.d) > 0 ? 'text-success' : 'text-danger'}`}>{price.c}</div>;
}
