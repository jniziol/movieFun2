const apiKey = '0b941991fb739be72fed42ae5e2a4891'
const root = document.getElementById('root');

fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
  .then(resp => resp.json())
  .then(moviesResults => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then(resp => resp.json())
      .then(genresResults => {
        const movieGenres = buildMovieGenreObject(moviesResults.results, genresResults.genres);
        insertIntoDOM(movieGenres);
      });
  });  

// {"Adventure": [movie1]}
function buildMovieGenreObject(movies, genres) {
  movieGenres = {}


  

  genres.forEach(genre => {
    movies.forEach(function(movie) {
      if (movie.genre_ids.includes(genre.id)) {
        if(movieGenres[genre.name] === undefined) {
          movieGenres[genre.name] = [movie];
        } else {
          movieGenres[genre.name].push(movie);
        }
      }
    })
  });

  return movieGenres;
}

function insertIntoDOM(movieGenres) {
  let html = "";

  for(const genre in movieGenres) {
    html += `<div class="titleList">
              <div class="title">
                <h1>${genre}</h1>
                <div class="titles-wrapper">`
    
    movieGenres[genre].forEach(movie => {
      html += `
      <div class="movie">
        <img
          src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}"
        />
        <div class="overlay">
          <div class="title">${movie.title}</div>
          <div class="rating">${movie.vote_average}/10</div>
          <div class="plot">
            ${movie.overview}
          </div>
          <div class="listToggle">
            <div>
              <i class="fa fa-fw fa-plus"></i>
              <i class="fa fa-fw fa-check"></i>
            </div>
          </div>
        </div>
      </div>`
    });
          
    html += `</div>
        </div>
      </div>`
  }

  root.insertAdjacentHTML('beforeend', html);
}