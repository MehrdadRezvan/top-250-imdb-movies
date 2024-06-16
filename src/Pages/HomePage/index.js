import { useEffect, useState } from 'react'
import PrimaryLayout from '../../Components/Layouts/PrimaryLayout'
import MovieList from './../../Components/MovieList'
import setTitle from './../../helpers/setTitle'
import axios from 'axios'
import shuffle from '../../helpers/arrayShuffle'
import './style.css'

export default function HomePage() {
  const [genreList, setGenreList] = useState([])
  useEffect(function(){
    setTitle("Top 250 IMDB Movies")
    axios.get("https://moviesapi.codingfront.dev/api/v1/genres")
    .then(function(response){
      setGenreList(response.data)
    }).catch(function(error) {
      console.log(error)
    })
  },[])
  function renderHomePageLists() {
    const homePageListItems = shuffle(genreList)
    return homePageListItems.map(function(index, i) {
      return <MovieList key={i} data={index} />
    })
  }
  return (
      <PrimaryLayout>
        <div className='wrapper'>
          {renderHomePageLists()}
        </div>
      </PrimaryLayout>
  )
}