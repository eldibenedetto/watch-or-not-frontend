const app = new App()
// let moviesUserWatched = []

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
  })
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
  fetch('http://localhost:3000/api/v1/movies')
    .then(res => res.json())
    .then(res => render(res))
}


function render(res) {
  let randomIndex = Math.floor(Math.random() * res.length)
  let randomMovie = res[randomIndex]
    //add if statement to check if user has seen this trailer
  let youtubeKey = randomMovie.youtube_key
  let trailerUrl = `http://www.youtube.com/embed/${youtubeKey}?autoplay=1`
  document.querySelector('#mydivheader').innerHTML = `<h3><strong>${randomMovie.title}</strong></h3><iframe width="598" height="336"
  src="${trailerUrl}">
  </iframe>`
  localStorage.setItem("movieId", `${randomMovie.id}`)
}

function renderPosters(res) {
  let baseUrl = "https://image.tmdb.org/t/p/w640"
  res.movies.forEach(movie => {
  let fullUrl = baseUrl + JSON.parse(movie.raw_JSON).poster_path
  document.querySelector("#moviePosters").innerHTML += `<img src=${fullUrl}>`
  })
}

// //Make the DIV element draggagle:
// dragElement(document.getElementById(("mydiv")));
//
// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     /* if present, the header is where you move the DIV from:*/
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     /* otherwise, move the DIV from anywhere inside the DIV:*/
//     elmnt.onmousedown = dragMouseDown;
//   }
//
//   function dragMouseDown(e) {
//     e = e || window.event;
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }
//
//   function elementDrag(e) {
//     e = e || window.event;
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }
//
//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }


// base url for img src https://image.tmdb.org/t/p/w640/
