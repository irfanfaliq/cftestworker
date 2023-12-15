  export default {
    async fetch(req) {
    const url = new URL(req.url);

    // Getting client's information
    const EMAIL = req.headers.get(`cf-access-authenticated-user-email`);
    const TIMESTAMP = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' });
    const getcountry = req.headers.get(`cf-ipcountry`);
    const COUNTRY = `<a href="/secure/${getcountry}.png">${getcountry}</a>`;
    
    // The web content 
    const content = `

    <head>
    <title>PUJ Technologies Secured Site</title>
    <style>
    .center {
      text-align: center;
      margin: auto;
      width: 60%;
      border: 3px solid grey;
      padding: 20px;
    }
    .right {
      text-align: right;
      width: 60%;
      margin: auto;
      padding: -10px;
    }
    </style>
    </head>
    <body>
    <div class="center">
    <h1>Welcome to the secured website ${EMAIL}</h1>
    ${EMAIL} authenticated at ${TIMESTAMP} from ${COUNTRY}
    <div class="right">
    <p><a href="/cdn-cgi/access/logout">Logout</a></p>
    </div></div>
    </body>`;

    //Conditions    
    const image = url.pathname.split ("/").filter(Boolean);
    if(image.length > 1) {
      try {
        const flag = await fetch(`https://pub-f31748239f2c4a4e8b38267a40d5f40b.r2.dev/${getcountry}.png`)
        .then(respond => respond.arrayBuffer())
         return new Response(flag, {
          headers: { "Content-Type": "image/png" }
         });
      }
      catch (error) {
        return new Response("Country flag not found", {          
          status: 404,
          headers: { "Content-Type": "text/plain" }
        });
      }
  }
    return new Response(content, {
      headers: { "Content-Type": "text/html" }
    });
    }
  }
//# sourceMappingURL=worker.js.map

