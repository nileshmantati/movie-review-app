// components/AllReviews.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const AllReviews = ({ onEdit, onDelete }) => {
    const movies = useSelector((state) => state.movies.movies);
    const [searchMovie, setSearchMovie] = useState("");
    const [searchUser, setSearchUser] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");

    const allReviews = movies.flatMap((movie) =>
        movie.reviews.map((review) => ({
            movieName: movie.movieName,
            ...review,
        }))
    );

    const filteredReviews = allReviews.filter((review) => {
        const matchesMovie = review.movieName
            .toLowerCase()
            .includes(searchMovie.trim().toLowerCase());
        const matchesUser = review.user
            .toLowerCase()
            .includes(searchUser.trim().toLowerCase());
        const matchesRating = ratingFilter
            ? review.rating === parseInt(ratingFilter)
            : true;
        return matchesMovie && matchesUser && matchesRating;
    });

    return (
        <div className="container mt-4">
            <h2>All Reviews</h2>

            {/* 🔍 Search Filters */}
            <div className="row g-2 my-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Movie"
                        value={searchMovie}
                        onChange={(e) => setSearchMovie(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by User"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                    >
                        <option value="">All Ratings</option>
                        {[1, 2, 3, 4, 5].map((r) => (
                            <option key={r} value={r}>
                                {r} Star
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredReviews.length === 0 ? (
                <p>No matching reviews found.</p>
            ) : (
                <table className="table table-bordered mt-3">
                    <thead className="table-light">
                        <tr>
                            <th>Movie</th>
                            <th>User</th>
                            <th>Review</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReviews.map((r, i) => (
                            <tr key={i}>
                                <td>{r.movieName}</td>
                                <td>{r.user}</td>
                                <td>{r.review}</td>
                                <td>{r.rating} ⭐</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => onEdit(r.movieName, r.user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    `Delete review by ${r.user} for ${r.movieName}?`
                                                )
                                            ) {
                                                onDelete(r.movieName, r.user);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <NavLink to="/" className="btn btn-outline-secondary mt-3">
                ⬅ Back to Home
            </NavLink>
        </div>
    );
};

export default AllReviews;
