export function downloadResults() {
    if (filteredResults.length === 0) {
        alert('No results to download. Please perform a search first.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Address,Phone,Website,Latitude,Longitude\n";

    filteredResults.forEach(result => {
        csvContent += `"${result.name}","${result.address}","${result.phone}","${result.website}","${result.latitude}","${result.longitude}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "search_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showDownloadNotification();
}
