import { useEffect } from 'react'
import PrimaryLayout from '../../Components/Layouts/PrimaryLayout'
import setTitle from './../../helpers/setTitle'

export default function NotFound() {
  useEffect(function(){
    setTitle("404 Wrong URL")
  },[])
  return(
      <PrimaryLayout>
        <div className='wrapper'>
          <div>DESTINATION ADDRESS NOT FOUND!!! </div>
        </div>
      </PrimaryLayout>
  )
}