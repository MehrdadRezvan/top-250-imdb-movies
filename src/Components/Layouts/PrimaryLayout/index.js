import { Fragment } from "react";
import Header from "../../Header";
import Footer from "../../Footer";

export default function PrimaryLayout({children}) {
  return(
    <Fragment>
      <Header />
      <div className="pb-50">
        {children}
      </div>
      <Footer />
    </Fragment>
  )
}