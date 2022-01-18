import React from 'react'

export default function ListComponent(props) {
    const { title, items } = props;
    if(items){
      return (
        <>
            <h4>{title}</h4>
            <ul className='noBullet'>
                {items.map(item => <li key={item.id || item.name || item}>{item.name || item}</li>)}
            </ul>
        </>
    )  
    }
    return(<h5>Loading{title}</h5>)
    
}
