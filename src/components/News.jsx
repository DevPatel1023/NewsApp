import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&page=${this.state.page}&apiKey=645492f4e3644edd8e75e49acabe300f`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleprevClick = async () => {
    this.setState(
      (prevState) => ({
        page: prevState.page - 1,
      }),
      this.fetchNews
    );
  };

  handlenextClick = async () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      this.fetchNews
    );
  };

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
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handleprevClick}
            className="btn btn-outline-danger"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            onClick={this.handlenextClick}
            className="btn btn-outline-danger"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
