//Pseudo - code
// Get user input from dropdown menus
    // store selections as a variable
// Use user input for API call parameters

// MOMA search url = https://collectionapi.metmuseum.org/public/collection/v1/search
// parameters:
// -- q : [dropdown menu item]
// -- dateBegin : [start date]
// -- dateEnd : [end date]
// -- hasImages : true

// MOMA search call gives an array of objectIDs
    // Get top 12 IDs from the array

    // for each item in that array of 12
        // -- create an li element
        // -- append li to ul
        
        // -- append info found in MOMA object json:
        // MOMA object url =  https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]
        // ---- img src, 
        // ---- title, 
        // ---- artist name, 
        // ---- medium, 
        // ---- link to moma/wiki entry
        // -- display element on page

const galleryApp = {};

const url = new URL('https://collectionapi.metmuseum.org/public/collection/v1/search')
        url.search = new URLSearchParams(
            {
                q : "sunflowers",
                
            }
        )

        console.log(url);
        

//This is the function that makes the call
galleryApp.apiCall = function() {
    fetch(url).then(function(response) {
    return response.json();
    //this returns a json of objectIDs
}).then(function(jsonResponse) {
    console.log(jsonResponse);
    

    // To show the object, the url =  https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]
    const first = jsonResponse.objectIDs[0];
    const second = jsonResponse.objectIDs[1];
    console.log(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${first}`);
    console.log(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${second}`);

})
};

galleryApp.init = function() {
    console.log("Hello")
    galleryApp.apiCall();
}

galleryApp.init();
