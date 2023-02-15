const express = require("express");
const path = require("path");
// using libraries.js
const libraries = require("./components/libraries");

const app = express();
const port = process.env.PORT || "8888";
// using view engine 'pug'
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// set up page routers
app.get("/", async (request, response) => {
    // using loadPlacemarks() function
    let libraryList = await libraries.loadPlacemarks();
    response.render("index", { title: "Home", libraries: libraryList });
  });
  app.get("/library/:libraryId", async (request, response) => {
    // retrieve by libraryId
    let libraryInfo = await libraries.getPmById(request.params.libraryId);
    response.render("library", { title: "Library", library: libraryInfo });
  });
    
  //server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });

                  