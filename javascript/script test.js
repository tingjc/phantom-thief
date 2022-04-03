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


// galleryApp.getObject = (item) => {
//     console.log(galleryApp.getObject)
//     fetch(`https://collectionapi.metmuseum.org/public/collection/v1/${item}`).then(function (response) {
//         console.log(response)
//         return response.json();
//     }).then(function (jsonResponse) {
//         console.log(item)
//         galleryApp.jsonResponse.forEach((pictures) => {
//             console.log(pictures)

//         })
//         galleryApp.displayURL(jsonResponse);
//     })

// }

galleryApp.sampleArray = []

galleryApp.displayObject = (item) => {
        const picObject = item.objectIDs
        // console.log(picObject)
        // let arrayCut = picObject.slice(0, 20)
        // console.log(arrayCut)
        picObject.forEach((element) => {
            // console.log(element)
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`).then(function (response) {
                return response.json();
            }).then(function (jsonResponse) {
                // console.log(jsonResponse)
                if (jsonResponse.primaryImage) {
                    // console.log(jsonResponse.primaryImage)
                    //if true, add it to sampleArray
                    galleryApp.sampleArray.push(
                        {
                            title: jsonResponse.title,
                            artist: jsonResponse.artistDisplayName,
                            src: jsonResponse.primaryImageSmall,
                            medium: jsonResponse.medium,
                            url: jsonResponse.primaryImage
                        })
                    // console.log(galleryApp.sampleArray.length)
                } //if condition END
            })
        })
    console.log(galleryApp.sampleArray)


}

galleryApp.displayURL = (datum) => {
    console.log(datum)
}

galleryApp.init = () => {
    galleryApp.getObject();
    // galleryApp.getURL();
}

galleryApp.init();