const galleryApp = {}

const url = new URL('https://collectionapi.metmuseum.org/public/collection/v1/search')
url.search = new URLSearchParams(
    {
        q: "sunflowers",

    })

    const dropdown = document.getElementById('dropdown')

console.log(url);


galleryApp.getObject = () => 
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (jsonResponse) {
        galleryApp.displayObject(jsonResponse);



        
    })


galleryApp.displayObject = (item) => {
        const picObject = item.objectIDs
        console.log(picObject)
        let arrayCut = picObject.slice(0, 20)
        // console.log(arrayCut)
        arrayCut.forEach((element) => {
            console.log(element)
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`).then(function (response) {
                return response.json();
            }).then(function (jsonResponse) {
                console.log(jsonResponse)
            })
        })
}

galleryApp.displayURL = (datum) => {
    console.log(datum)
}

galleryApp.init = () => {
    galleryApp.getObject();
    // galleryApp.getURL();
}

galleryApp.init();