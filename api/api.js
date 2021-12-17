const express = require("express");
const app = express();

let list;

app.post("/api/list", (req, res) => {
	console.log("\x1b[31m(!) Update of PLAYERS");

    list = req.query;
    console.log(req.query);

    res.status(200).json({
    	status: "succes",
    	message: "Succes"
    });
});

app.get("/api/list", (req, res) => {
	console.log("\x1b[33m+ GET");
    res.json(list);
});

app.listen(80, function() {
    console.log("\x1b[31mWebsite as ready on port 80 !\n");
});