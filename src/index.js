const app = new App()
// let moviesUserWatched = []

document.addEventListener("DOMContentLoaded", function(event) {

  document.querySelector("#LogInFormSubmit").addEventListener('click', function(e){
    e.preventDefault()
    document.querySelector("#logInSignUp").style.display = "none"
    //make session users ID
    showTrailer()
  })

  document.querySelector("#SignUpFormSubmit").addEventListener('click', function(e){
    e.preventDefault()
    document.querySelector("#logInSignUp").style.display = "none"

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

    showTrailer()
  })

})


// function fetchUsersWatchedMovies(){
//   fetch('http://localhost:3000/api/v1/user_movies')
// }

function showTrailer(){
  fetch('http://localhost:3000/api/v1/movies')
    .then(res => res.json())
    .then(res => render(res))
}


function render(res) {
  let randomIndex = Math.floor(Math.random() * res.length)
  let randomMovie = res[randomIndex]
  let youtubeKey = randomMovie.youtube_key
  let trailerUrl = `http://www.youtube.com/embed/${youtubeKey}?autoplay=1`
  document.querySelector('#trailer').innerHTML = `<iframe width="420" height="315"
  src="${trailerUrl}">
  </iframe>`
}
