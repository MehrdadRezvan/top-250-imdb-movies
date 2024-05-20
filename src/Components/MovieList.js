import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieList({ data }) {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id, name } = data;
  useEffect(function () {
    setLoading(true);
    axios
      .get(
        `https://moviesapi.codingfront.dev/api/v1/genres/${id}/movies?page=1`
      )
      .then(function (response) {
        setMoviesData(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);
  function renderFarm() {
    return moviesData.map(function ({ id, title, poster, year }) {
      return (
        <li key={id} className="col-2 pr-2 pl-2">
          <Link to={`/m/${id}`}>
            <img src={poster} alt="" />
            <h6 className="mt-1">
              {title} ({year})
            </h6>
          </Link>
        </li>
      );
    });
  }
  function renderList() {
    if (loading === true) {
      return(
        <h1 className="text-align-center">Loading ...</h1>
      )} else if (moviesData.length === 0) {
      return(
        <h1 className="text-align-center">REFRESH  --- Couldn't reach the data on the server</h1>
      )
    } else {
      return(
        <div className="movie-list movie-row-6">
          <div className="list-title row align-center mb-3 mt-3">
            <h2>{name}</h2>
            <Link to={`/g/${id}`}>See more</Link>
          </div>
          <ul className="row mt-3">{renderFarm()}</ul>
        </div>
      )
    }
  }
  return(renderList())
}
