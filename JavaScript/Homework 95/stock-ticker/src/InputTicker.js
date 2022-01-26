import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InputTicker() {
    const [ticker, setTicker] = useState('');
    
    return (
        <>
            <div className='container'>
                <div className="row input-group m-0 p-0 mt-3 w-50 justify-self-start">
                    <span className="input-group-text w-25" >Enter Ticker Symbol:</span>
                    <input type="text" className="form-control w-25" placeholder="E.g. MSFT" aria-label="Ticker" aria-describedby="button" onChange={(e) => setTicker(e.target.value)} />
                    <Link to={`/${ticker}`} className='d-inline-block w-25 '> <button className="btn btn-outline-secondary p-2" type="button"  >Update</button></Link>
                </div>
            </div>
        </>);
}
