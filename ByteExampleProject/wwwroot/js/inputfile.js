(function () {
    window.BlazorInputFile = {
        downloadFile: async function downloadFile(filename, byteStream, contentType, openInBrowser) {
            const arrayBuffer = await byteStream.arrayBuffer();

            var definedContentType = "application/octet-stream";
            if (typeof contentType !== "undefined") { definedContentType = contentType; }
            var blob = new Blob([arrayBuffer], { type: definedContentType });

            if (navigator.msSaveBlob) {
                //Download document in Edge browser                
                navigator.msSaveBlob(blob, filename);
            }
            else {
                var link = document.createElement('a');

                if (typeof openInBrowser !== "undefined" && openInBrowser) { link.target = "_blank"; }
                else { link.download = filename; }

                var objectUrl = URL.createObjectURL(blob);
                link.href = objectUrl;
                document.body.appendChild(link); // Needed for Firefox
                link.click();
                URL.revokeObjectURL(objectUrl);
                document.body.removeChild(link);
            }
        }
    };
})();