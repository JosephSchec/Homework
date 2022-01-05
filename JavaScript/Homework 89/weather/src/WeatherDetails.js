import React from 'react'

export default function WeatherDetails(props) {
    const { weather, icon, temp } = props;

    return (
        <>
            <div className='container-fluid'>
                <div className='text-center'>
                    <h1>{weather}</h1>
                    <img src={icon} alt="" />
                    <h2>F &deg; {temp}</h2>
                </div>
            </div>
        </>
    )
}

async function getData(zip) {
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=817b6dc7c6c8bb692981d4fc128af292`)
        if (!data.ok) {
            throw new Error('Data not Ok')
        }
        return data.json();
    } catch (error) {
        console.error(error);
    }
}

export async function getDetails(detailsFor, zip) {
    let data = await getData(zip);
    if (detailsFor === 'weather') {
        return `The weather in ${data.name} is ${data.weather[0].main}`;
    }
    else if (detailsFor === 'icon') {
        return `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    }
    else if (detailsFor === 'temp') {
        return ` ${data.main.temp}`
    }
}
/*export async function getWeather(zip) {
    let data = await getData(zip);
    return `The weather in ${data.name} is ${data.weather[0].main}`;
}

export async function getIcon(zip) {
    const data = await getData(zip);
    return `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
}

export async function getTemp(zip) {
    const data = await getData(zip);
    return ` ${data.main.temp}`
}*/