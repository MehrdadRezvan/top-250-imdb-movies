import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PrimaryLayout from "../../Components/Layouts/PrimaryLayout";
import setTitle from './../../helpers/setTitle'
import './style.css'

export default function SingleMovie() {
  const {id} = useParams()
  const [movieData, setMovieData] = useState({})
  const [heroImg, setHeroImg] = useState("")
  const [loading, setLoading] = useState(true);
  useEffect(function(){
    setTitle("Loading ...")
  },[])
  useEffect(function(){
    axios.get(`https://moviesapi.codingfront.dev/api/v1/movies/${id}`)
    .then(function(response) {
      setMovieData(response.data)
      setTitle(`${response.data.title} (${response.data.year})`)
      setHeroImg(response.data.images[0])
      setLoading(false)
    })
    .catch(function(error) {
      setTitle("REFRESH THE PAGE")
      setLoading(false)
    })
  },[id])
  return(
    <PrimaryLayout>
      <div className="inner-hero relative">
        <img src={heroImg} alt="" />
        <div className="dark-layer absolute"></div>
      </div>
      <div className='wrapper'>
        {loading === true ? (
          <h3>Loading ...</h3>) : (
            <Fragment>
              <div className="inner-heading row relative pb-3">
                <img src={movieData.poster} alt="" />
                <div className="heading-info pl-3">
                  <h1 className="pb-2">{movieData.title}</h1>
                  <h5 className="pb-2">Directed by: {movieData.director}</h5>
                  <h6>{movieData.country} - {movieData.year}</h6>
                </div>
              </div>
              <div className="info-sec row pb-3">
                <div className="left col-2">
                  <h6>Writer(s):</h6>
                  <p className="pb-2">{movieData.writer}</p>
                  <h6>Runtime:</h6>
                  <p className="pb-3">{movieData.runtime}</p>
                  <h6>Release Date:</h6>
                  <p className="pb-2">{movieData.released}</p>
                  <h6>CD/DVD/BluRay Release Date:</h6>
                  <p className="pb-2">{movieData.dvd}</p>
                  <h6>IMDB Rating:</h6>
                  <p>{movieData.imdb_rating}/10</p>
                  <p className="pb-2">of {movieData.imdb_votes} votes</p>
                  <a className="imdb-link d-inblock pb-3" href={`https://www.imdb.com/title/${movieData.imdb_id}`}>Go to IMDB</a>
                </div>
                <div className="right col-10">
                  <h6>Plot:</h6>
                  <p className="pb-3">{movieData.plot} ...</p>
                  <h6>Cast:</h6>
                  <p className="pb-3">{movieData.actors}</p>
                </div>
              </div>
            </Fragment>
        )}
      </div>
    </PrimaryLayout>
  )
}

// {
//   "id": 32,
//   "rated": "R",
//   "awards": "Nominated for 4 Oscars. 7 wins & 14 nominations total",
//   "metascore": "97",
//   "imdb_rating": "8.5",
//   "imdb_votes": "649,146",
//   "type": "movie",
//   "website": "N\/A",
//   "language": "English",
//   "ratings": "[{\"Value\": \"8.5\/10\", \"Source\": \"Internet Movie Database\"}, {\"Value\": \"96%\", \"Source\": \"Rotten Tomatoes\"}, {\"Value\": \"97\/100\", \"Source\": \"Metacritic\"}]",
//   "box_office": "$32,000,000",
//   "production": "N\/A",
//   "response": "True",
//   "genres": [
//       "Horror",
//       "Mystery",
//       "Thriller"
//   ]}