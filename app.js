'use strict'

const express = require('express')
      path= requires('path')

      var app = express();

app.use(express.static('./klustera-application/dist'));

app.get("/*", (req, res)=>
    {
        res.sendFile(path.join(__dirname, "/klustera-application/dist/index.html"));
    }
);

app.listen(process.env.PORT || 8080,
    ()=>
    {console.log("Servidor corriendo en el puerto 8080")})