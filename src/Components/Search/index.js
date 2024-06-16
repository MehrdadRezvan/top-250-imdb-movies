import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import './style.css'

export default function Search() {
  const [searchData,setSearchData] = useState([])
  const navigate = useNavigate()
  function searchFn(e) {
    if (e.target.value.length > 2) {
      axios.get(`https://moviesapi.codingfront.dev/api/v1/movies?q=${e.target.value}`)
      .then(function(res) {
        setSearchData(res.data.data)
      })
      .catch(function(err){
        console.log(err)
      })
    } else if (e.target.parentNode.children.length > 2) {
      e.target.parentNode.children[2].remove()
    }
  }
  function searchItems() {
    return(
        searchData.map(function({id,title}){
          return(
            <li key={id}>
              <Link to={`/m/${id}`}>
                {title}
              </Link>
            </li>
          )
        })
    )
  }
  function renderSearchResults() {
    if (searchData.length > 0) {
      return(
        <ul className="absolute">{searchItems()}</ul>
      )} else {return}
  }
  function goToSearch(e) {
    if (e.key === "Enter") {
      navigate(`/search?q=${e.target.value}`)
    } else {return}
  }
  return(
    <div className="search row align-center relative">
      <img className="mr-2" src="/assets/images/search.svg" alt="" />
      <input placeholder="Type-in to search ..." onChange={searchFn} onKeyDown={goToSearch}></input>
      {renderSearchResults()}
    </div>
  )
}