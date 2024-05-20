import { Link } from "react-router-dom"
import Menu from "../Menu"
import {headerMenuItems} from "../../data/menuItems"
import './style.css'

export default function Header() {
  return(
    <div className="header pt-4 pb-4">
      <div className="wrapper row space-between align-center">
        <Menu menuItems={headerMenuItems} />
        <Link to='/' className="logo d-inblock">
          <div className="logo row align-center">
            <img src="/assets/images/main-logo.svg" alt="" />
            <h1>Top 250 IMDB Movies</h1>
          </div>
        </Link>
        <div className="search row align-center">
          <img className="mr-2" src="/assets/images/search.svg" alt="" />
          <input placeholder="Type-in to search ..."></input>
        </div>
      </div>
    </div>
  )
}