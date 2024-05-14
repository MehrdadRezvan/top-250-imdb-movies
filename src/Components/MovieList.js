import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import axios from "axios";

export default function MovieList({ data, title }) {
  const [moviesData, setMoviesData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(function () {
    setLoading(true)
    axios
      .get("https://moviesapi.codingfront.dev/api/v1/movies?page={page}")
      .then(function(response) {
        setMoviesData(response.data.data)
        setLoading(false)
      })
      .catch(function(error) {
        setLoading(false)
      });
  }, []);
  function renderFarm() {
    return moviesData.map(function ({ id, title, poster, year }) {
      return <MovieItem key={id} title={title} poster={poster} year={year} />;
    });
  }
  return (
    <div className="movie-list movie-row-6">
      <h2 className="pt-3 pb-3">{title}</h2>
      {loading == true ? <h3>درحال بارگزاری ...</h3> : <ul className="row">{renderFarm()}</ul>}
    </div>
  );
}
