import { useEffect } from 'react'
import PrimaryLayout from '../../Components/Layouts/PrimaryLayout'
import MovieList from './../../Components/MovieList'
import setTitle from './../../helpers/setTitle'

export default function HomePage() {
  useEffect(function(){
    setTitle("Top 250 IMDB Movies")
  },[])
  return (
      <PrimaryLayout>
        <MovieList title='Special recs' />
        <MovieList title='Most watched this week' />
        <MovieList title='Blockbusters' />
      </PrimaryLayout>
  )
}