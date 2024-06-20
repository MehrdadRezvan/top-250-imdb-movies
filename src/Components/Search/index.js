import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from '../../helpers/api'
import './style.css'

export default function Search() {
  const [searchData,setSearchData] = useState({
    'data' : [],
    'metadata' : {}
  })
  const navigate = useNavigate()
  const searchinput = document.getElementById("search-input")
  window.addEventListener('click', function(e){   
    if (document.getElementById("search-box") !== null) {
      if (e.target == searchinput){
        document.getElementById("search-box").classList.remove('invisible')
      } else{
        document.getElementById("search-box").classList.add('invisible')
      }
    } else {return}
  });
  function searchFn(e) {
    if (e.target.value.length > 2) {
      API.get(`/movies?q=${e.target.value}`)
      .then(function(res) {
        setSearchData(res.data)
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
        searchData.data.map(function({id,title}){
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
    if (searchData.data.length > 0) {
      return(
        <ul id="search-box" className="absolute">{searchItems()}</ul>
      )} else {return}
  }
  function goToSearch(e) {
    if (e.key === "Enter") {
      navigate(`/search?q=${e.target.value}`)
    } else {return}
  }
  return(
    <div className="search row align-center relative">
      <Link to={'/search'}>
        <img className="mr-2" src="/assets/images/search.svg" alt="" />
      </Link>
      <input id="search-input" placeholder="Type-in to search ..." onChange={searchFn} onKeyDown={goToSearch}></input>
      {renderSearchResults()}
    </div>
  )
}