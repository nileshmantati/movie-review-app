import React from "react";
import { useSelector } from "react-redux";

function calculateAverageRating(reviews) {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return reviews.length === 0 ? null : (total / reviews.length).toFixed(1);
}

function MovieList({ onOpenModal }) {
    const movies = useSelector((state) => state.movies.movies);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">All Movies</h2>
            <div className="d-flex flex-wrap gap-4">
                {movies.map((movie, idx) => (
                    <div
                        key={idx}
                        className="card p-2 shadow"
                        style={{ width: "220px", borderRadius: "8px" }}
                    >
                        <img
                            src={movie.poster}
                            alt={movie.movieName}
                            className="card-img-top"
                            style={{
                                height: "300px",
                                objectFit: "cover",
                                borderRadius: "5px",
                            }}
                        />
                        <div className="card-body p-0 mt-2">
                            <h5 className="card-title">{movie.movieName}</h5>
                            {movie.reviews.length > 0 ? (
                                <p className="text-muted">
                                    ⭐ {calculateAverageRating(movie.reviews)} / 5
                                </p>
                            ) : (
                                <p className="text-muted">No reviews yet.</p>
                            )}
                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-primary btn-sm mt-2"
                                    onClick={() => onOpenModal(movie.movieName)}
                                >
                                    Add Review
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
