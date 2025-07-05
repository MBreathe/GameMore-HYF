
async function fetcher(url: string, options: RequestInit) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export default fetcher;