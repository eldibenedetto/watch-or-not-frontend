const app = new App()

let pageMax
let currentPage = 1
let allIDs = []

document.addEventListener("DOMContentLoaded", function(event) {

  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=121f65c343fcbbfc19cceaf9c89e37fd&language=en-US&page=${currentPage}`)
    .then(res => res.json())
    .then(json => pageLooper(json))
});
  // Make a loop using the fetch request to grab all the IDs and place them into an array
  // Randomly pick an ID from the array and render a preview on the page

  function pageLooper(json){
    pageMax = json.total_pages
    let resultIDs = []
    let jsonData
    for (let i = 1; i < pageMax; i++){

      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=121f65c343fcbbfc19cceaf9c89e37fd&language=en-US&page=${currentPage}`)
        .then(res => res.json())
        .then(json => )
        })

      for (let j = 0; j < jsonData.results.length; j++){
        resultIDs.push(jsonData.results[j].id)
      }

      allIDs.push(resultIDs)
      resultIDs = []
      currentPage++
    }
    debugger
    console.log(allIDs)
  }
