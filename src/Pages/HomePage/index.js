import { useEffect, useState } from 'react'
import PrimaryLayout from '../../Components/Layouts/PrimaryLayout'
import MovieListComp from './../../Components/MovieListComp'
import setTitle from './../../helpers/setTitle'
import API from '../../helpers/api'
import shuffle from '../../helpers/arrayShuffle'
import './style.css'

export default function HomePage() {
  const [genreList, setGenreList] = useState([])
  useEffect(function(){
    setTitle("Top 250 IMDB Movies")
    API.get("/genres")
    .then(function(response){
      setGenreList(response.data)
    }).catch(function(error) {
      console.log(error)
    })
  },[])
  function renderHomePageLists() {
    const homePageListItems = shuffle(genreList)
    return homePageListItems.map(function(index, i) {
      return <MovieListComp key={i} data={index} />
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