/* eslint-disable no-console */
import React from 'react';
import SearchBar from './components/SearchBar';
import RatingTable from './components/RatingTable';
import ReviewRender from './components/ReviewRender';
import RatingStar from './components/RatingStar';
import style from '../public/style.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    const { reviews } = props.payload[0];

    const revData = this.dataSlicer(reviews);
    const { ratings, overall_rating } = this.findOverallRating(reviews);
    this.state = {
      original_data: [],
      rev_data: revData,
      ratings,
      overall_rating,
      num_reviews: reviews.length,
      search_text: '',
      curPage: 0,
    };


    this.editSearchText = this.editSearchText.bind(this);
    this.clearSearchText = this.clearSearchText.bind(this);
    this.setCurPage = this.setCurPage.bind(this);
  }

  setCurPage(page) {
    this.setState({
      curPage: page,
    });
  }

  findOverallRating(rev_array) {
    let sum_rating = {
      accuracy: 0,
      communication: 0,
      cleanliness: 0,
      location: 0,
      check_in: 0,
      value: 0,
    };
    for (let i = 0; i < rev_array.length; i++) {
      sum_rating['accuracy'] += rev_array[i].accuracy_rating;
      sum_rating['communication'] += rev_array[i].communication_rating;
      sum_rating['cleanliness'] += rev_array[i].cleanliness_rating;
      sum_rating['location'] += rev_array[i].location_rating;
      sum_rating['check_in'] += rev_array[i].check_in_rating;
      sum_rating['value'] += rev_array[i].value_rating;
    }
    let average = {};
    for (let key in sum_rating) {
      average[key] = Number((sum_rating[key] / rev_array.length).toFixed(1));
    }
    let overall_rating = 0;
    for (let key in average) {
      overall_rating += Number(average[key]);
    }
    overall_rating = Number((overall_rating / 6).toFixed(1));
    return {
      ratings: average,
      overall_rating,
    };
  }

  // slice data into 7 reviews per array. and store in rev_data
  dataSlicer(revData) {
    const totalPages = Math.ceil(revData.length / 7);
    const dataForPages = [];
    for (let i = 0; i < totalPages; i++) {
      dataForPages.push(revData.slice(7 * i, 7 * (i + 1)));
    }
    return dataForPages;
  }

  editSearchText(e) {
    e.preventDefault();
    this.setState({
      search_text: e.target.value,
    });
  }

  clearSearchText(e) {
    e.preventDefault();
    this.setState({
      search_text: '',
    });
    document.getElementById('searchTextArea').value = '';
    this.dataSlicer(this.state.original_data);
    this.setCurPage(0);
  }


  render() {
    return (
      <div className={style.rew_board} >
        <div className={style.seperator24} />
        <div className={style.reviewAndSearchBar}>
          <div className={style.rev_count}>
            {`${this.state.num_reviews} Reviews`}
          </div>
          <span className={style.topRatingStar}>
            <RatingStar rating={this.state.overall_rating} />
          </span>
          <SearchBar original_data={this.state.original_data}
            editSearchText={this.editSearchText}
            dataSlicer={this.dataSlicer.bind(this)}
            search_text={this.state.search_text}
            clearSearchText={this.clearSearchText}
            setCurPage={this.setCurPage}
          />
        </div>
        <div className={style.seperator16} />
        <div className={style.ratingTable}>
          <RatingTable ratings={this.state.ratings} />
        </div>
        <div className={style.review_table}>
          <ReviewRender
            data={this.state.rev_data}
            search_text={this.state.search_text}
            curPage={this.state.curPage}
            setCurPage={this.setCurPage}
          />
        </div>
      </div>
    );
  }
}

export default App;
