const apiKey = '0b941991fb739be72fed42ae5e2a4891'

fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
  .then(resp => resp.json())
  .then(moviesResults => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then(resp => resp.json())
      .then(genresResults => {
        buildMovieGenreObject(moviesResults.results, genresResults.genres);
      });
  });  

// {"Adventure": [movie1]}
function buildMovieGenreObject(movies, genres) {
  movieGenres = {}

  movies.forEach(movie => {
    movie.genre_ids.forEach(genre_id => {
      let movieGenre = genres.find(genre => genre.id === genre_id);
      
      if(movieGenres[movieGenre.name] === undefined) {
        movieGenres[movieGenre.name] = [movie];
      } else {
        movieGenres[movieGenre.name].push(movie);
      }
    });
  });

  console.log(movieGenres);
}

function insertIntoDOM(crazyeMovieGenreObject) {

}