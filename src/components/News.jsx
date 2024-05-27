import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=645492f4e3644edd8e75e49acabe300f";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Upnext App - Top Headlines</h2>
        <div className="row mt-4">
          {this.state.articles.map((element) => (
            <div className="col-md-4 mb-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 99) : ""}
                imageURL={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default News;
