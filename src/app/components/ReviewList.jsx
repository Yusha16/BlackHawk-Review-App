import React, { Component }  from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

export class ReviewList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchLatestData(this.props.id);
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="row">    
                    <div className="card p-2 m-2">
                        Loading
                    </div>
                </div>
            );
        }

        return (
            <div className="row">    
                <div className="card p-2 m-2">
                    {this.props.reviews.map(review => (
                        <Link to={`/review/${review.id}`} key={review.id}>
                            <div className="card p-2 mt-2">
                                {review.postDate} | {review.fullName} | {review.starRating}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = state.session.id;
    return {
        id: id,
        reviews: state.reviews,
        loading: state.session.loading
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchLatestData(id) {
            dispatch(mutations.loading());
            dispatch(mutations.requestLatestReviewData(id));
        }
    }
}

export const ConnectedReviewList = connect(mapStateToProps, mapDispatchToProps) (ReviewList);