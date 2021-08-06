const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.set(path.join(__dirname, "/views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render('api');
});

app.get("*", (req, res) => {
    res.render("notfound");
})

app.listen(3000, () => {
    console.log("listening");
});