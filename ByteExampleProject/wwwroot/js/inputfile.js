(function () {
    window.BlazorInputFile = {
        /* Source: https://www.syncfusion.com/kb/10358/how-to-create-a-pdf-file-in-blazor-using-c
         *        ,https://github.com/arivera12/BlazorDownloadFile/blob/3f6383d3bd4435aabbf5f920316cad8088e48808/BlazorDownloadFile/Script/DownloadFileScript.cs#L36 */
        downloadFile: function downloadFile(filename, bytes, contentType, openInBrowser) {
            /* Old load method with based base64
            var data = window.atob( bytesBase64 );
            var bytes = new Uint8Array( data.length );
            for ( var i = 0; i < data.length; i++ ) {
                bytes[i] = data.charCodeAt( i );
            }
            */            

            // Uncomment this to load as expected with passed Uint8Array
            //bytes = new Uint8Array(bytes);

            var definedContentType = "application/octet-stream";
            if (typeof contentType !== "undefined") { definedContentType = contentType; }
            var blob = new Blob([bytes.buffer], { type: definedContentType });

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