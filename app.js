const express = require("express");

const app = express();

app.use(express.static('tmp'))

app.get("/", (req, res) => {
    res.send("Vay");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} uzerinden baslatildi.`);
});
