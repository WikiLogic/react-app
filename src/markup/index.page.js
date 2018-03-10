module.exports = function() {
    let pageContent = html`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wikilogic</title>
            <meta name="description" content="Furthering public reasoning with free and open access to high quality interdisciplinary knowledge and logic.">
            <link rel="icon" type="image/png" href="/favicon.png">
            <link href="static/main.css" rel="stylesheet">
        </head>
        <body>
            <div id="root"></div>
            <script src="static/app.js"></script>
        </body>
        </html>
    `;

    return pageContent;
};
