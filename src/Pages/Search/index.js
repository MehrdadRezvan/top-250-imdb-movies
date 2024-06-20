import { useEffect, useState } from 'react'
import { Link, useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import { Pagination, Col, Row, Space, Card } from "antd";
import PrimaryLayout from '../../Components/Layouts/PrimaryLayout'
import API from '../../helpers/api'
import ScrollToTop from './../../Components/ScrollToTop'
import './style.css'

export default function Search() {
  const [queryStrings, setQueryStrings] = useSearchParams()
  const [searchData,setSearchData] = useState({
    'data':[],
    'metadata':{}
  })
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(function(){
    API.get(`/movies?q=${queryStrings.get('q')}&page=${queryStrings.get('page')}`)
    .then(function(res) {
      setSearchData(res.data)
      setLoading(false)
    })
    .catch(function(err){
      console.log(err)
      setLoading(false)
    })
  },[queryStrings.get('q'), queryStrings.get("page")])
  function searchItems() {
    return(
      searchData.data.map(function ({ id, title, poster, year, country, imdb_rating }) {
        return (
          <Col key={id} span={12}>
          <Link to={`/m/${id}`}>
            <Row gutter={[8,8]} justify='space-between'>
              <Col className="movie-poster" span={8}>
                <img src={poster} alt="" />
              </Col>
              <Col span={16}>
                <Space className="movie-space" direction="vertical" size={16}>
                  <Card className="movie-details"
                    title={`# ${id} || ${title}`}
                    // extra={<a href="#">More</a>}
                    style={{
                      width: '100%',
                    }}>
                    <p>{`${year} - ${country}`}</p>
                    <br />
                    <br />
                    <p>IMDB Ratings: {imdb_rating}</p>
                  </Card>
                </Space>
              </Col>
            </Row>
          </Link>
        </Col>
        );
      })
    )
  }
  function renderSearchResults() {
    if (loading === true) {
      return(
        <div className="text-align-center">Loading ...</div>
      )} else if (searchData.data.length > 0) {
        return(
          <Row gutter={[16,16]} className="movie-list mt-3 pb-3">{searchItems()}</Row>
        )} else {return}
  }
  function urlUpdate(e) {
    if (e.target.value.trim().length > 2) {
      setQueryStrings(createSearchParams({q : e.target.value}))
    } else {return}
  }
  function onPageChange(page = 1) {
    setQueryStrings(createSearchParams({ q : queryStrings.get("q") ,page: page }));
    navigate(`/search?q=${queryStrings.get("q")}&page=${page}`);
  }
  return(
    <PrimaryLayout>
      <div className='wrapper'>
        <div className='search-input d-flex justify-center'>
          <input className='col-10 mb-3' placeholder="Type-in a movie name or part of a movie name to search ... (three characters minimum)" onChange={urlUpdate} defaultValue={queryStrings.get('q')}></input>
        </div>
        {renderSearchResults()}
      </div>
      <Pagination
          className="pagination mb-4 mt-3 pt-3 pb-3 text-align-center"
          hideOnSinglePage="true"
          showSizeChanger={false}
          onChange={onPageChange}
          current={searchData.metadata.current_page}
          total={searchData.metadata.total_count}
          pageSize={searchData.metadata.per_page}
        />
      <ScrollToTop />
    </PrimaryLayout>
  )
}