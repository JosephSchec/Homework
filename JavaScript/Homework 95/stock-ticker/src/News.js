import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Price from './Price';

export default function News() {
    const [desc, setDesc] = useState({});
    const [news, setNews] = useState([]);
    const { ticker } = useParams();
    useEffect(() => {
        (async () => {
            try {
                const descResponse = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker.toUpperCase()}&token=c7onieaad3i94t1inp70`);
                const newsResponse = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${ticker.toUpperCase()}&from=2022-01-25&to=2022-01-26&token=c7onieaad3i94t1inp70`)
                if (!descResponse.ok || !newsResponse.ok) {
                    throw new Error(`Desc : ${descResponse.status} ${descResponse.statusText} News: ${newsResponse.status} ${newsResponse.statusText} `)
                }
                const tickerDesc = await descResponse.json();
                const tickerNews = await newsResponse.json();

                setDesc(tickerDesc);
                setNews(tickerNews.slice(0, 5));
            } catch (error) {
                console.log(error);
            }
        })();
    }, [ticker])


    return (
        <>
            <div className='container'>
                <div className='row justify-content-center text-center'></div>
                <h1>{desc.ticker}-{desc.name}</h1>
                <h2 >Current Price : $<Price /></h2>
                <h2>News:</h2>
                {news.map(news => <Link to={`/${ticker}/news/${news.id}`} key={news.id}><h6>{news.headline}</h6></Link>)}
            </div>

        </>

    )
}
