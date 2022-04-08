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

//create event for form submission aka button click
galleryApp.buttonClick = function() {
    const selectButton = document.querySelector("button");
    selectButton.addEventListener('click', function() {
        const optionSelect = document.querySelector("select");
        const departmentValue = optionSelect.value

        galleryApp.url = new URL("https://collectionapi.metmuseum.org/public/collection/v1/search");

        galleryApp.url.search = new URLSearchParams(
    {
        q: "",
        departmentId: departmentValue,
        isOnView: true


    }
)
    galleryApp.IDcall();
    })
} // .buttonClick END


galleryApp.IDcall = function() {
    fetch(galleryApp.url)
    .then( function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        console.log("our response data", jsonData); 
        // this gives an object of an array of objectIDs
        galleryApp.arrayList = jsonData.objectIDs.slice(0, 30);
        return galleryApp.arrayList
    })
    .then(function() {
        console.log("our sliced array", galleryApp.arrayList);
        //create loop to call individual object APIs
        // push them into empty array
        galleryApp.displayList = []
        galleryApp.arrayList.forEach(function(id){
            
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then( function(response) {
                return response.json()

            })
            .then(function(jsonData) {
                console.log(jsonData)
                galleryApp.displayList.push(jsonData);
            })
        })//arrayList.loop END
        console.log("list to be displayed", galleryApp.displayList);
    })
}; //galleryApp.IDcall END

//create object display function
// display function requires a separate call to individual object APIs


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
        newOption.value = departmentNumber.departmentId;
        newOption.innerText = departmentNumber.displayName;
        selectDropdown.append(newOption);
    })

}



galleryApp.init = function() {
    console.log("Hello");
    galleryApp.departmentCall();
    galleryApp.buttonClick();

}

galleryApp.init();
