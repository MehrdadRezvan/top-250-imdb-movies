import { useEffect, useState } from "react";
import API from '../helpers/api'
import { Link } from "react-router-dom";
import {Row, Col, Card } from "antd";

export default function MovieListComp({ data }) {
  const [moviesData, setMoviesData] = useState({
    'data':[],
    'metadata':{}
  });
  const [loading, setLoading] = useState(false);
  const { id, name } = data;
  const { Meta } = Card;
  useEffect(function () {
    setLoading(true);
    API
      .get(
        `/genres/${id}/movies?page=1`
      )
      .then(function (response) {
        setMoviesData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);
  function renderFarm() {
    return moviesData.data.map(function ({ id, title, poster, year, country }) {
      return (
        <Col className='movie-item' key={id} span={4}>
          <Link to={`/m/${id}`}>
            {/* <img src={poster} alt="" />
            <h6 className="mt-1">
              {title} ({year})
            </h6> */}
            <Card
              hoverable
              style={{
                width: "100%",
              }}
              cover={<img alt="IMAGE NOT FOUND" src={poster} />}>
              <Meta title={title} description={`${country} - ${year}`} />
            </Card>
          </Link>
        </Col>
      );
    });
  }
  function renderList() {
    if (loading === true) {
      return(
        <h1 className="text-align-center">Loading ...</h1>
      )} else if (moviesData.data.length === 0) {
      return(
        <h1 className="text-align-center">REFRESH  --- Couldn't reach the data on the server</h1>
      )
    } else {
      return(
        <div className="movie-list movie-row-6">
          <div className="list-title row align-center mb-3 mt-3">
            <h2>{name}</h2>
            <Link to={`/movies?g=${id}`}>See more</Link>
          </div>
          <Row className="mt-3" gutter={[16, 16]}>{renderFarm()}</Row>
        </div>
      )
    }
  }
  return(renderList())
}
