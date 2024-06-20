import { useEffect, useState } from "react";
import API from "../../helpers/api";
import {
  Link,
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import { Button, Pagination, Col, Row, Space, Card } from "antd";
import PrimaryLayout from "../../Components/Layouts/PrimaryLayout";
import ScrollToTop from "../../Components/ScrollToTop";
import setTitle from "../../helpers/setTitle";
import './style.css'

export default function MovieList() {
  const [queryStrings, setQueryStrings] = useSearchParams();
  const [moviesData, setMoviesData] = useState({
    data: [],
    metadata: {},
  });
  const [genresData, setGenresData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(
    function () {
      setTitle("Loading ...");
      API.get("/genres")
        .then(function (response) {
          setGenresData(response.data);
          if (queryStrings.get("g")) {
            response.data.map(function (item) {
              if (item.id == queryStrings.get("g")) {
                setTitle(`Genre: ${item.name}`);
                return;
              } else {return}
            });
            getApiByGenre();
          } else {
            getApiAllMovies();
          }
        })
        .catch(function (error) {
          setTitle("Genres");
          console.log(error);
        });
    },
    [queryStrings.get("g"), queryStrings.get("page")]
  );
  function getApiByGenre(
    genreId = queryStrings.get("g"),
    page = queryStrings.get("page")
  ) {
    API.get(`/genres/${genreId}/movies?page=${page}`)
      .then(function (response) {
        setMoviesData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }
  function getApiAllMovies(page = queryStrings.get("page")) {
    API.get(`/movies?page=${page}`)
      .then(function (response) {
        setTitle("All Movies");
        setMoviesData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setTitle("Loading ERROR");
        setLoading(false);
        console.log(error);
      });
  }
  function listItems() {
    return moviesData.data.map(function ({ id, title, poster, year, country, imdb_rating }) {
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
    });
  }
  
  function renderList() {
    if (loading === true) {
      return <h1 className="text-align-center">Loading ...</h1>;
    } else if (moviesData.data.length === 0) {
      return (
        <h1 className="text-align-center">
          REFRESH --- Couldn't reach the data on the server
        </h1>
      );
    } else {
      return <Row gutter={[16,16]} className="movie-list mt-3 pb-3">{listItems()}</Row>;
    }
  }
  function onPageChange(page = 1) {
    setQueryStrings(createSearchParams({ page: page }));
    if (queryStrings.get("g")) {
      navigate(`/movies?g=${queryStrings.get("g")}&page=${page}`);
    } else {
      navigate(`/movies?page=${page}`);
    }
  }
  function filterGenre(e) {
    genresData.map(function({id, name}) {
      if (name == e.target.textContent) {
        navigate(`/movies?g=${id}`)
      } else if (e.target.textContent == "All Movies") {
        navigate('/movies')
     } else {return}
    })
  }
  function renderFilterButtons() {
    return genresData.map(function ({ id, name }) {
      return (
        <Col key={id} span={2}>
          <Button type={queryStrings.get("g") == id ? 'primary' : 'default'} key={id} onClick={filterGenre}>
            {name}
          </Button>
        </Col>
      );
    });
  }
  return (
    <PrimaryLayout>
      <div className="wrapper">
        <h4>Select a genre to filter results: </h4>
        <Row gutter={[8,8]} justify='space-between' className="filter-buttons mt-3 pb-3">
          <Col id="all" span={8}><Button type={queryStrings.get("g") ? 'default' : 'primary'} onClick={filterGenre}>All Movies</Button></Col>
          {renderFilterButtons()}
        </Row>
        {renderList()}
        <Pagination
          className="pagination mb-4 mt-3 pt-3 pb-3 text-align-center"
          hideOnSinglePage="true"
          showSizeChanger={false}
          onChange={onPageChange}
          current={moviesData.metadata.current_page}
          total={moviesData.metadata.total_count}
          pageSize={moviesData.metadata.per_page}
        />
        <ScrollToTop />
      </div>
    </PrimaryLayout>
  );
}
