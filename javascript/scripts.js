//Pseudo - code
// Get user input from dropdown menus 
// Use user input for API call parameters
// MOMA search url = https://collectionapi.metmuseum.org/public/collection/v1/search
// parameters:
// -- q : [predetermined keyword]
// -- dateBegin : [start date]
// -- dateEnd : [end date]
// -- hasImages : true

// MOMA search call gives an array of objectIDs
// Get a selection of IDs from the array
// for each item in that selection
// -- create an html element
// -- append info found in MOMA object json:
// MOMA object url =  https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]
// ---- img src, 
// ---- title, 
// ---- artist name, 
// ---- medium, 
// ---- link to moma/wiki entry
// -- display element on page
