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

const galleryURL = new URL("https://collectionapi.metmuseum.org/public/collection/v1/objects");

galleryURL.search = new URLSearchParams(
    {
        departmentIds: 1

    }
)

galleryApp.IDcall = function() {
    fetch(galleryURL)
    .then( function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        console.log(jsonData); 
        // this gives an object of an array of objectIDs
        const arrayList = jsonData.objectIDs.slice(0, 30);
        console.log(arrayList);
        
    })
}; //galleryApp.IDcall END

//Populating Dropdown Menu with Department Name
// // make function to call departments API
galleryApp.departmentCall = function() {
    const departmentURL = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

    fetch(departmentURL)
    .then( function(response) {
        return response.json();
    })
    .then( function(jsonData) {
        galleryApp.departmentDisplay(jsonData);
    })
    
}// departmentCall END

// Create function to display department names in dropdown
galleryApp.departmentDisplay = function (jsonObject) {
    const departmentArray = jsonObject.departments;
    const selectDropdown = document.querySelector("#dropdown");
    
    departmentArray.forEach( function(departmentNumber) {
        const newOption = document.createElement("option");
        newOption.value = departmentNumber.displayName;
        newOption.innerText = departmentNumber.displayName;
        selectDropdown.append(newOption);
    })

}



galleryApp.init = function() {
    console.log("Hello");
    galleryApp.IDcall(); // should only happen at button click
    galleryApp.departmentCall();
}

galleryApp.init();
