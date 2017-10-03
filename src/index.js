const app = new App()

document.addEventListener("DOMContentLoaded", function(event) {

  fetch('http://localhost:3000/api/v1/movies')
    .then(res => res.json())
    .then(res => render(res))
})

function render(res) {
  let randomIndex = Math.floor(Math.random() * res.length)
  let randomMovie = res[randomIndex]
  let youtubeKey = randomMovie.youtube_key
  let trailerUrl = `http://www.youtube.com/embed/${youtubeKey}?autoplay=1`
  document.querySelector('#trailer').innerHTML = `<iframe width="420" height="315"
src="${trailerUrl}">
</iframe>`
}
