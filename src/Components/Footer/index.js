import Menu from "../Menu";
import {footerMenuItems} from "../../data/menuItems"
import './style.css'

export default function Footer() {
  return(
    <div className="footer pt-2 pb-2">
      <div className="wrapper row space-between align-center">
        <Menu menuItems={footerMenuItems} />
        <a href="https://github.com/mehrdadrezvan" className="github row align-center">
          <span>Follow me on</span>
          <img src="/assets/images/github.svg" alt="" />
        </a>
      </div>
    </div>
  )
}