import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsUrl } = this.props;
    

    const defaultImage = "public/th.jpg";
    const defaultDescription = "Description not available.";

    return (
      <div className="container-fluid my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageURL ? imageURL : defaultImage} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description ? description : defaultDescription}
            </p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-primary">
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
