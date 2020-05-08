const apiKey = '0b941991fb739be72fed42ae5e2a4891'

fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
  .then(resp => resp.json())
  .then(moviesResults => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then(resp => resp.json())
      .then(genresResults => {
        console.log(genresResults.genres);
        console.log(moviesResults.results);
      });
  });
  