import { Link } from "react-router-dom"

export default function Header() {
  return(
    <div className="header pt-4 pb-4">
      <div className="wrapper row space-between">
        <Link to='/' className="logo d-inblock">
          <img src="main-logo.svg" />
        </Link>
        <Link to='/' className="logo d-inblock">
          <h1>Top 250 IMDB Movies</h1>
        </Link>
        <div className="ham-menu">
          <img src="ham-menu.svg" />
        </div>
      </div>
    </div>
  )
}