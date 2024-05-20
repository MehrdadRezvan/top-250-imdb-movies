import { Link } from "react-router-dom"

export default function Menu({menuItems = []}) {
  function renderMenu() {
    return menuItems.map(function({title, link}, i){
      return(
        <li key={i}>
          <Link to={link} className="d-inblock">{title}</Link>
        </li>
      )
    }) 
  }
  return(
    <ul className="menu row">{renderMenu()}</ul>
  )
}