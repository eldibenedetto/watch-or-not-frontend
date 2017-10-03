const app = new App()
const apiKey = "121f65c343fcbbfc19cceaf9c89e37fd"

let pageMax
let currentPage = 0
let allIDs = []

document.addEventListener("DOMContentLoaded", function(event) {

  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
    .then(res => res.json())
    .then(json => {
      pageMax = json.total_pages
      return json
    })
    .then(() => {
      for (let i = 0; i < pageMax; i++){
        currentPage++
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${currentPage}`)
          .then(res => res.json())
          .then(json => {
            pageLooper(json)
            pageMax = json.total_pages
          })
      }
    })
});

function pageLooper(json){

  let resultIDs = []

  for (let i = 0; i < json.results.length; i++){
    resultIDs.push(json.results[i].id)
  }
  allIDs = allIDs.concat(resultIDs)
}

function cleanOutNoVideoTrailers(){
  for (let i = 0; i < allIDs.length; i++){
    let videoId = allIDs[i]
    fetch(`https://api.themoviedb.org/3/movie/${videoId}?api_key=${apiKey}&append_to_response=videos`)
      .then(res => res.json())
      .then(res => {
        if (res.videos.results.length === 0) {
          allIDs.splice(i, 1)
        }
      })
  }
}


function renderTrailer(){
  let randomIndex = Math.floor(Math.random() * allIDs.length)
  let videoID = allIDs[randomIndex]
  fetch(`https://api.themoviedb.org/3/movie/${videoID}?api_key=${apiKey}&append_to_response=videos`)
    .then(res => res.json())
    .then(res => console.log(res))
}
