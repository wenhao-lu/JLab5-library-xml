// using jsdom module
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
// namespace
const libraryNS = "http://www.opengis.net/kml/2.2";

// load xml file function
async function loadLibraries() {
    if (xml == undefined) {
        // fetch the online xml file
      let response = await fetch(
        "http://www.torontopubliclibrary.ca/data/library-data.kml",
        {
          method: "get",
          headers: {
            "Content-Type": "application/xml"
          }
        }
      );
      // text file --> xml file
      data = new JSDOM(await response.text(), { contentType: "application/xml" });
      // xml = DOM in xml.file
      xml = data.window.document; 
    }
    return xml;
  }
  //return all the 'Placemark' from xml file 
  async function loadPlacemarks() {
    xml = await loadLibraries();
    return xml.querySelectorAll("Placemark");
  }
  // retrieve Placemark by id
  async function getPmById(id) {
    xml = await loadLibraries();
    // can try $x in google console first (xPath Expression)  
    // pass the param to 'id' to get the element
    let result = xml.getElementById(`${id}`);
    //console.log(result);

    return result;
  }
         
  module.exports = {
    loadLibraries,
    loadPlacemarks,
    getPmById
  };