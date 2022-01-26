

export async function getData(urlEnding) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/${urlEnding}`);
        if (!response.ok) {
            throw new Error(`the url with ending : ${urlEnding} , resulted in ${response.status}`)
        }
        return response.json();
    } catch (error) {
        console.error(error)
    }
}

