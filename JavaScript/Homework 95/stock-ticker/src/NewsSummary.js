import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



export default function NewsSummary() {
    const [news, setNews] = useState('');
    const { ticker, newsId } = useParams();
    useEffect(() => {
        (async () => {
            try {
                const newsResponse = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${ticker.toUpperCase()}&from=2022-01-25&to=2022-01-26&token=c7onieaad3i94t1inp70`)
                if (!newsResponse.ok) {
                    throw new Error(`News: ${newsResponse.status} ${newsResponse.statusText} `)
                }
                const tickerNews = await newsResponse.json();
                const newsSummary = tickerNews.find(news => news.id === Number(newsId));
                setNews(newsSummary);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [ticker, newsId])
    return (<>
        <div className='container'>
            <div className='row m-0'>
                {news.summary}
               <div className='row m-0 d-inline'>For more on this topic visit : <a href={news.url}>Here</a> </div> 
            </div>
        </div>
    </>
    )
}
