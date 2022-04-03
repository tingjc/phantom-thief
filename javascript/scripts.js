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
                q : "hearts",
                
            }
        )

        console.log(url);
        

//create a blank array to filter galleryApp.response
galleryApp.sampleArray = []
console.log(galleryApp.sampleArray)

//This is the function that makes the call
galleryApp.apiCall = function() {
    fetch(url).then(function(response) {
    return response.json();
    //this returns a json of objectIDs
}).then(function(jsonResponse) {

    console.log(galleryApp.apiCall)
    //only get the first 20 IDs from the list
    galleryApp.response = jsonResponse.objectIDs.slice(0, 4);



    //filtering galleryApp.response
    galleryApp.response.forEach((a) => {
        console.log(galleryApp.response)
        //make a call to the individual object api
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${a}`).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            console.log(jsonResponse)
            //check if the individual object has an image
            if (jsonResponse.primaryImage) {
                // console.log(jsonResponse.primaryImage)
                //if true, add it to sampleArray
                galleryApp.sampleArray.push(
                    {
                        title: jsonResponse.title,
                        artist: jsonResponse.artistDisplayName,
                        src: jsonResponse.primaryImageSmall,
                        medium: jsonResponse.medium,
                    })
                    console.log(galleryApp.sampleArray.length)
                } //if condition END
            galleryApp.sampleArray.forEach((item) => {
                galleryApp.display(item);
            })
            }
            
        )
    })//end galleryApp.response forEach

    


    // // To show the object, the url =  https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]
    // const first = jsonResponse.objectIDs[0];
    // const second = jsonResponse.objectIDs[1];
    // console.log(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${first}`);
    // console.log(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${second}`);

})
}; //galleryApp.apiCall END




galleryApp.display = function(array) {
    const resultsUl = document.querySelector('.results')
    // resultsUl.innerHTML = "";
    //commented above line out to not erase each item

    //creating li
    const entryLi = document.createElement('li')
    //create image
    const image = document.createElement('img')
    image.src = array.src
    console.log(array.src);
    //alt text needed
    entryLi.appendChild(image);

    resultsUl.appendChild(entryLi);

    
}

const searchButton = document.querySelector('button');

galleryApp.startSearch = function() {
    searchButton.addEventListener('click', function() {
        galleryApp.apiCall()
    }) 
}

galleryApp.init = function() {
    galleryApp.startSearch();
    console.log("Hello")
}

galleryApp.init();
