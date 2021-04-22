import React, { Component } from 'react';
import { API } from '../../../../config';
import AddReview from '../AddReview/AddReview';
import ReviewStar from '../ReviewStar/ReviewStar';
import ReviewList from '../ReviewList/ReviewList';
import './ProductReview.scss';

export default class ProductReview extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      reviewArr: [],
      starArr: [],
      productName: '',
      productUrl: '',
      ratingAvg: 0,
    };
  }
  componentDidMount() {
    fetch(`${API}/products/2/reviews`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          reviewArr: data.reviews,
          count: data.count,
          productName: data.product_name,
          productUrl: data.reviews[0].thumbnail_url,
          starArr: [data.five, data.four, data.three, data.two, data.one],
          ratingAvg: data.average_rating,
        });
      });
  }
  render() {
    const {
      reviewArr,
      productName,
      productUrl,
      starArr,
      count,
      ratingAvg,
    } = this.state;
    return (
      <div className="productReview">
        <AddReview />
        <ReviewStar
          total={count}
          ratingAvg={ratingAvg}
          starArr={starArr}
          productName={productName}
          productUrl={productUrl}
          reviewArr={reviewArr}
        />
        <ReviewList
          total={count}
          starArr={starArr}
          productName={productName}
          productUrl={productUrl}
          reviewArr={reviewArr}
        />
      </div>
    );
  }
}
