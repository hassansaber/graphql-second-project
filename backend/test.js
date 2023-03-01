fetch("https://api.tvmaze.com/shows/82/episodes")
  .then((response) => response.json())
  .then((data) => console.log(data));