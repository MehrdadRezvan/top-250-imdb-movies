import { Link, useParams } from "react-router-dom";
import PrimaryLayout from "../../Components/Layouts/PrimaryLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import setTitle from "../../helpers/setTitle";

export default function GenreList() {
  const {id} = useParams()
  const [listData, setListData] = useState([])
  // const [genreName, setGenreName] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(function() {
    setTitle("Loading ...")
    axios.get("https://moviesapi.codingfront.dev/api/v1/genres")
    .then(function(response) {
      response.data.map(function(item) {
        if (item.id == id) {
          setTitle(`Genre: ${item.name}`)
          return
        }
      })
    })
    .catch(function(error) {
      setTitle("Genres")
    })
    axios.get(`https://moviesapi.codingfront.dev/api/v1/genres/${id}/movies`)
    .then(function(response) {
      setListData(response.data.data)
      setLoading(false)
    })
    .catch(function(error) {
      setLoading(false)
      setTitle("REFRESH THE PAGE")
    })
  },[])
  function renderFarm() {
    return listData.map(function ({ id, title, poster, year }) {
      return (
        <li key={id} className="pr-2 pl-2">
          <Link to={`/m/${id}`}>
            <img src={poster} alt="" />
            <h6 className="mt-1">
              {title} ({year})
            </h6>
          </Link>
        </li>
      );
    })
  }
  return(
    <PrimaryLayout>
      <div className="wrapper">
        {loading == true ? <div className="text-align-center">Loading ...</div> :
          <ul>{renderFarm()}</ul>
        }
      </div>
    </PrimaryLayout>
  )
}