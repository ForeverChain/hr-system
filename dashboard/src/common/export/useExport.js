function useExport(exportHeaders) {
    function convertToCSV(data) {
        const header = Object.values(exportHeaders).map((item) => item) + '\n';
        const csv = header + data.map((row) => Object.values(row).join(',')).join('\n');
        return csv;
    }

    function downloadCSV(data, filename) {
        if (data) {
            const csv = convertToCSV(data);

            const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], {
                type: 'text/csv; charset=utf-8',
            });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = filename || 'export.csv';

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }

    const downloadJson = (jsonData) => {
        // Convert JSON data to a Blob
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

        // Create a link element
        const downloadLink = document.createElement('a');

        // Set the download attribute and create a URL for the Blob
        downloadLink.download = 'data.json';
        downloadLink.href = window.URL.createObjectURL(blob);

        // Append the link to the document
        document.body.appendChild(downloadLink);

        // Simulate a click on the link to trigger the download
        downloadLink.click();

        // Remove the link from the document
        document.body.removeChild(downloadLink);
    };

    return {
        downloadCSV,
        downloadJson,
    };
}

export default useExport;
