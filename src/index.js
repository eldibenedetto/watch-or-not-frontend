const app = new App()

document.addEventListener("DOMContentLoaded", function(event) {

  document.querySelector("#LogInFormSubmit").addEventListener('click', function(e){
    e.preventDefault()

    fetch(`http://localhost:3000/api/v1/sessions`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: document.querySelector("#login-username").value
      })
    })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem("userId", `${res.id}`)
      localStorage.setItem("userName", `${res.username}`)
      watchedMovies = res.watched_movies 
      // baseUrl = https://image.tmdb.org/t/p/w640
      // variable = JSON.parse(res.movies[0].raw_JSON).poster_path
      // imgUrl = baseUrl + variable
      return res
    })
    .then(res => renderPosters(res))

    document.querySelector("#logInSignUp").style.display = "none"
    document.querySelector("#mainPage").style.display = "unset"
    //make session users ID
    showTrailer()
  })

  document.querySelector("#SignUpFormSubmit").addEventListener('click', function(e){
    e.preventDefault()

    fetch("http://localhost:3000/api/v1/users", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: document.querySelector("#sign-up-name").value,
        username: document.querySelector("#sign-up-username").value,
        age: document.querySelector("#sign-up-age").value,
        gender: document.querySelector("#sign-up-gender").value
      })
    })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem("userId", `${res.id}`)
      localStorage.setItem("userName", `${res.username}`)
    })

    document.querySelector("#logInSignUp").style.display = "none"
    document.querySelector("#mainPage").style.display = "unset"
    showTrailer()
  })

})

function enteringWatchZone(){
  fetch("http://localhost:3000/api/v1/user_movies", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: localStorage.userId,
      movie_id: localStorage.movieId,
      approved: 0
    })
  }).then(res => res.json()).then(res => addPoster(res))
  showTrailer()
}

function enteringNahZone(){
  fetch("http://localhost:3000/api/v1/user_movies", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: localStorage.userId,
      movie_id: localStorage.movieId,
      approved: 1
    })
  })
  showTrailer()
}

function showTrailer(){
  let username = localStorage.userName
  fetch(`http://localhost:3000/api/v1/movies?username=${username}`)
    .then(res => res.json())
    .then(res => render(res))
}

function render(res) {
  let randomIndex = Math.floor(Math.random() * res.length)
  let randomMovie = res[randomIndex]
  let youtubeKey = randomMovie.youtube_key
  let trailerUrl = `http://www.youtube.com/embed/${youtubeKey}?autoplay=1`
  document.querySelector('#mydivheader').innerHTML = `<h3><strong>${randomMovie.title}</strong></h3><iframe width="598" height="336"
  src="${trailerUrl}">
  </iframe>`
  localStorage.setItem("movieId", `${randomMovie.id}`)
}

function renderPosters(res) {
  let baseUrl = "https://image.tmdb.org/t/p/w640"
  res.watched_movies.forEach(movie => {
  let fullUrl = baseUrl + JSON.parse(movie.raw_JSON).poster_path
  document.querySelector("#moviePosters").innerHTML += `<button id=${movie.id} class="modalLaunch"><img id=${movie.id} src=${fullUrl}></button>`
  })
  res.watched_movies.forEach(movie => {
    document.getElementById(`${movie.id}`).addEventListener("click", (e)=> {debugger})
  })
}

function addPoster(res){
  let baseUrl = "https://image.tmdb.org/t/p/w640"
  let fullUrl = baseUrl + JSON.parse(res.raw_JSON).poster_path
  document.querySelector("#moviePosters").innerHTML += `<img src=${fullUrl}>`
}

// Get the modal
// var modal = document.getElementById('myModal');
//
// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
//
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
//   }
