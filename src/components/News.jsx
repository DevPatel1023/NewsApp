import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      pageSize: props.pageSize || 9, 
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const { page, pageSize } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${page}&category=business&apiKey=645492f4e3644edd8e75e49acabe300f&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  handlePrevClick = async () => {
    this.setState(
      (prevState) => ({
        page: prevState.page - 1,
      }),
      this.fetchNews
    );
  };

  handleNextClick = async () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      this.fetchNews
    );
  };

  render() {
    const { articles, page, pageSize, totalResults, loading } = this.state;
    return (
      <div className="container my-3">
        <h2 className="text-center">Upnext news - Top Headlines</h2>
        {loading && <div className="text-center">Loading...</div>}
        <div className="row mt-4">
          {!loading &&
            articles.map((element) => (
              <div className="col-md-4 mb-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageURL={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-outline-danger"
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-outline-danger"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

News.defaultProps = {
  pageSize: 9,
  country : 'us',
  category : 'general'
};
News.propTypes = {
  pageSize: PropTypes.number,
  country : PropTypes.string,
  category : PropTypes.string
};


export default News;
