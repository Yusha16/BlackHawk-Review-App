import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

export const ReviewDetail = ({
    review,
    id,
    
}) => (
    <div className="row">    
        <div className="card p-2 m-2">
            <div>
                {review.fullName}
            </div>
            <div>
                {review.postDate}
            </div>
            <div>
                {review.starRating}
            </div>
            <div>
                {review.postReview}
            </div>
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    let review = state.reviews.find(review => review.id === id);
    return {
        id: id,
        review: review
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
}

export const ConnectedReviewDetail = connect(mapStateToProps, mapDispatchToProps) (ReviewDetail);