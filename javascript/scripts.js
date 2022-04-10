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

const ul = document.querySelector('.results')

//create event for form submission aka button click
galleryApp.buttonClick = function() {
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

const error = document.createElement('p')

galleryApp.IDcall = function() {
    fetch(galleryApp.url)
    .then( function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        console.log("our response data", jsonData); 
        if (jsonData.objectIDs === null) {

            const header = document.querySelector('.headerTwo')

            error.textContent = "Nothing on display!"

            header.append(error)
            console.log("error")
        }
        // this gives an object of an array of objectIDs
        galleryApp.arrayList = jsonData.objectIDs.slice(0, 12);
        
        return galleryApp.arrayList
    })
    .then(function() {
        console.log("our sliced array", galleryApp.arrayList);
        //create loop to call individual object APIs
        // push them into empty array
        // galleryApp.displayList = []

        galleryApp.arrayList.forEach(function(id){
            
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then( function(response) {
                return response.json()
                

            })
            .then(function(jsonData) {
                galleryApp.displayImg(jsonData);
                // galleryApp.zoomImg(jsonData);
                galleryApp.displayText(jsonData);
                
                // galleryApp.displayList.push(jsonData);
            })
        })//arrayList.loop END
        // console.log("list to be displayed", galleryApp.displayList);
    })
}; //galleryApp.IDcall END

galleryApp.displayText = function(data) {

    console.log("mydata", data)
    // const list = document.querySelector('li')
    const h4 = document.querySelectorAll('.artTitles')
    console.log("h4 here", h4)
    // console.log("this", this)

    const h4Length = h4.length
    console.log(h4.length)

    // for (let i = 0; i < h4.length; i++) { 
    //     console.log(i)
    // }
    // const element = h4[length++]
    // console.log("hi i am element", element)
    h4.forEach(function (individualh4) {
    individualh4.addEventListener('click', function () {
    //     // console.log("this", this, "h4", h4, "h4 length++", h4[length++])
        console.log("indi", individualh4)
        console.log("h4", h4)
        // h4.innerHTML = data.title
        // console.log("data title here", data.title)
        // console.log("length here", h4.length)

    })
})
}

// galleryApp.zoomImg = function(data) {
//     const imageSmall = document.querySelector("img") 

//         imageSmall.addEventListener('click', function(data){
//             console.log("hello everyone")
            
//     })
// }

galleryApp.displayImg = function(option) {    

    let titleCut = option.title;

    if (titleCut.length > 50){
        titleCut = titleCut.slice(0, 40) + "[...]";
    }

    const li = document.createElement('li')

    li.innerHTML = 
    `
    <div class="containerimg">
        <img src="${option.primaryImageSmall}" alt="${option.title} by ${option.artistDisplayName}">
    </div>
    <h4 class=artTitles>${titleCut}</h4>

    <p>${option.artistDisplayName}</p>
    <a href="${option.objectURL}"><p>Link to the museum</p></a> 
    `
    ul.appendChild(li)
    
}
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
    
    
    
    departmentArray.forEach(function(departmentNumber) {
        
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
