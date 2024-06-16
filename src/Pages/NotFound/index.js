import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PrimaryLayout from '../../Components/Layouts/PrimaryLayout'
import setTitle from './../../helpers/setTitle'
import './style.css'

export default function NotFound() {
  useEffect(function(){
    setTitle("404 Wrong Address")
  },[])
  return(
      <PrimaryLayout>
        <div className='notfound'>
          <div className='wrapper row align-center'>
            <div className='left col-6'>
              <h1 className='pb-2'>Oops!</h1>
              <h4 className='pb-4'>Couldn't reach the address you were looking for ...</h4>
              <p className='pb-3'>You can still go back home and try again</p>
              <Link to={"/"}>Return to homepage ►</Link>
            </div>
            <div className='right col-6'>
              <img src='/assets/images/404.svg' />
            </div>
          </div>
        </div>
      </PrimaryLayout>
  )
}