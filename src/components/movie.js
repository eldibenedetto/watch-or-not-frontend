class Movie {
  constructor(attributes){
    this.movieid = attributes.id // not accurate
    this.title = attributes.title
    this.trailerUrl = attributes.url
    this.rating = 0
    this.usersWhoRated = []
  }

  render(){
    debugger
  //   <iframe width="420" height="315"
  //   src=`https://www.youtube.com/embed/${youtubeId}?autoplay=1`>
  //  </iframe>
  }

  updateRating(){
    //need to iterate through usersWhoRated array, grab watch or no value, then divide but number of users
  }


}
