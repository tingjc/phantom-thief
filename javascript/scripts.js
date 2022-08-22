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

//global ul for selection purposes later
const ul = document.querySelector('.results')

//create event for form submission aka button click
galleryApp.buttonClick = function () {
    const selectButton = document.querySelector("button");
    selectButton.addEventListener('click', function() {
        error.textContent = ("")

        const optionSelect = document.querySelector("select");
        const departmentValue = optionSelect.value

        const h2 = document.querySelector('h2')
        h2.innerText = optionSelect.selectedOptions[0].innerText

        ul.innerHTML = "";

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

//global scope error message element
const error = document.createElement('p')

// call to the Met API for objectIDs
galleryApp.IDcall = function() {
    fetch(galleryApp.url)
    .then( function(response) {
        return response.json();
    })
    .then(function(jsonData) {
    
        //error handling for if the search returns empty 
        if (jsonData.objectIDs === null) {

            const header = document.querySelector('.headerTwo')

            error.textContent = "Nothing on display!"

            header.append(error)
            
        }
        // this gives an object of an array of objectIDs
        galleryApp.arrayList = jsonData.objectIDs.slice(0, 12);
        
        return galleryApp.arrayList
    })
    .then(function() {
        
        //create loop to call individual object APIs
        galleryApp.arrayList.forEach(function(id, index){
            
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then( function(response) {
                return response.json()  
            })
            .then(function(jsonData) {
                galleryApp.displayImg(jsonData);
                
                if (index === galleryApp.arrayList.length-1) {
                    //ADDEVENTLISTENER
                    const AllLi = document.querySelectorAll("li");
                    AllLi.forEach(li => {
                        li.addEventListener("click", function(event) {
                            const close = document.querySelector(".tapToClose");
                            const closeButton = document.createElement("p")
                            closeButton.classList.add("tapToClose")
                            closeButton.innerText = "Tap to Close"

                            if (li.classList.contains("pop")) {
                                close.remove();
                                li.classList.remove("pop");

                                
                            } else {
                                li.classList.add("pop");
                                h4 = document.querySelectorAll(".artTitles");
                                h4.forEach(h4 => {
                                    h4.innerText = h4.title;
                                })
                                li.appendChild(closeButton);

                            }
                        });
                    })
                }
            })
        })//arrayList.loop END

    })
}; //galleryApp.IDcall END

galleryApp.displayText = function() {
    ul.addEventListener("click", function(event){
        if(event.target.innerText !== event.target.title) {
            event.target.innerText = event.target.title
        }

        document.querySelector(".galleryName").scrollIntoView(true);
        
    })
    
}; //galleryApp.IDcall END

//create object display function
// display function requires a separate call to individual object APIs
galleryApp.displayImg = function(option) {    

    // Some object titles are so long they garble the display space
    // create variable for checking title length
    let titleCut = option.title;

    if (titleCut.length > 50){
        titleCut = titleCut.slice(0, 40) + "[...]";
    }

    // create 'li' to append to .results 'ul'
    const li = document.createElement('li')

    li.innerHTML = 
    `
    <div class="containerimg">
        <img src="${option.primaryImageSmall}" alt="${option.title} by ${option.artistDisplayName}">
    </div>
    <div class="containerText">
    <p>ID: ${option.objectID}</p>
    <h4 class="artTitles" title="${option.title}">${titleCut}</h4>

    <p>${option.artistDisplayName}</p>
    <a href="${option.objectURL}"><p>Link to the museum</p></a>
    </div> 
    `
    ul.appendChild(li)
}//displayImg END

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
    
    departmentArray.forEach(function(departmentNumber) {
        
        const newOption = document.createElement("option");
        newOption.value = departmentNumber.departmentId;
        newOption.innerText = departmentNumber.displayName;
        selectDropdown.append(newOption); 
    })
}

galleryApp.init = function() {
    galleryApp.departmentCall();
    galleryApp.buttonClick();
    // galleryApp.displayText();
};

galleryApp.init();
