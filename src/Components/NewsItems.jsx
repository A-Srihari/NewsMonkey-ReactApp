import React from "react";

const NewsItems = (props) => {
  let { title, description, imageUrl, newsUrl, publishedAt } = props;
  return (
    <div className="col-xl-4 my-3 col-md-6" id="card-news-items">
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p>Published: {new Date(publishedAt).toGMTString()}</p>
          <a href={newsUrl} target="_blank" className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewsItems;
