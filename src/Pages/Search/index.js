import { useEffect, useState } from 'react'
import { Link, useSearchParams, createSearchParams } from 'react-router-dom'
import PrimaryLayout from '../../Components/Layouts/PrimaryLayout'
import axios from 'axios'
import './style.css'

export default function Search() {
  const [queryStrings, setQueryStrings] = useSearchParams()
  const [searchData,setSearchData] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(function(){
    axios.get(`https://moviesapi.codingfront.dev/api/v1/movies?q=${queryStrings.get('q')}`)
    .then(function(res) {
      setSearchData(res.data.data)
      setLoading(false)
    })
    .catch(function(err){
      console.log(err)
      setLoading(false)
    })
  },[queryStrings.get('q')])
  function searchItems() {
    return(
      searchData.map(function ({ id, title, poster, year }) {
        return (
          <li key={id} className="col-11">
            <Link to={`/m/${id}`}>
              <img src={poster} alt="" />
              <h6 className="mt-1">
                {title} ({year})
              </h6>
            </Link>
          </li>
        );
      })
    )
  }
  function renderSearchResults() {
    if (searchData.length > 0) {
      if (loading === true) {
        return(
          <h1 className='align-center'>Loading ...</h1>
        )} else {
            return(
              <ul className="">
                {searchItems()}
              </ul>
        )}} 
          else {return}
  }
  function urlUpdate(e) {
    if (e.target.value.trim().length > 2) {
      setQueryStrings(createSearchParams({q : e.target.value}))
    } else {return}
  }
  return(
    <PrimaryLayout>
      <div className='wrapper'>
        <div className='search-input d-flex justify-center'>
          <input className='col-10 mb-3' placeholder="Type-in a movie name or part of a movie name to search ... (three characters minimum)" onChange={urlUpdate}></input>
        </div>
        {renderSearchResults()}
      </div>
    </PrimaryLayout>
  )
}