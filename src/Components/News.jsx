// * Red color comments indicates the instructions to change the component into function based component
import React from "react";
import { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import "../App.css";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState([]);
  const [page, setPage] = useState(1);

  // * Previous page function
  const handlePrevPage = async () => {
    props.setProgress(0);
    window.scrollTo(0, 0);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${
      props.apiKey
    }&page=${page - 1}&pageSize=6&category=${props.category}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setPage(page - 1);
    setArticles(parseData.articles);
    props.setProgress(100);
  };

  // * Next page function
  const handleNextPage = async () => {
    props.setProgress(0);
    window.scrollTo(0, 0);
    if (page + 1 > Math.ceil(totalResults / 6)) {
    } else {
      console.log("Total results are: " + totalResults);

      let url = `https://newsapi.org/v2/top-headlines?apiKey=${
        props.apiKey
      }&page=${page + 1}&pageSize=6&category=${props.category}`;
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      setPage(page + 1);
      setArticles(parseData.articles);
    }
    props.setProgress(100);
  };

  // * Component did mount
  useEffect(() => {
    const fetchNews = async () => {
      props.setProgress(0);
      try {
        let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&page=1&pageSize=6&category=${props.category}`;
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(
          Array.isArray(parseData.articles) ? parseData.articles : []
        );
        setTotalResults(parseData.totalResults || 0);
      } catch (error) {
        setArticles([]);
        setTotalResults(0);
      }
      props.setProgress(100);
    };
    fetchNews();
  }, [props.apiKey, props.category]);

  // useEffect((props) => {
  //   props.setProgress(0);
  //   let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&page=1&pageSize=6&category=${props.category}`;
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log(parseData);
  //   setPage(page-1)
  //   setArticles(parseData.articles)
  //   props.setProgress(100);
  // }, [])

  return (
    <div>
      <center className="my-3">
        <h2 className="my-5 mt-5 pt-5">Welcome to NewsMonkey</h2>
      </center>

      <div className="container" id="news-items">
        <div className="row my-3 d-flex justify-content-center align-items-center">
          {(articles || []).map((ele) => {
            return (
              <NewsItems
                title={ele.title}
                key={ele.url}
                description={ele.description}
                publishedAt={ele.publishedAt}
                newsUrl={ele.url}
                imageUrl={
                  ele.urlToImage === null ? "/noImage.png" : ele.urlToImage
                }
              />
            );
          })}
        </div>
      </div>
      <div className="container d-flex justify-content-between my-4">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevPage}
        >
          <i className="fa-solid fa-arrow-left"></i> Previous Page
        </button>
        <h5>{`Page: ${page}/${Math.ceil(totalResults / 6)}`}</h5>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleNextPage}
          disabled={page + 1 > Math.ceil((totalResults || 0) / 6)}
        >
          Next Page <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

News.propTypes = {
  category: PropTypes.string,
};
News.defaultProps = {
  category: "sports",
};

export default News;
