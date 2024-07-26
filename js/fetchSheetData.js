export async function fetchSheetData(keyword, location, radius) {
    const response = await fetch('/.netlify/functions/fetchSheetData', {
        method: 'POST',
        body: JSON.stringify({ keyword, location, radius })
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
