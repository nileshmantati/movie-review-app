import { createSlice } from "@reduxjs/toolkit";
import movieimg1 from '../p7825626_p_v8_af.jpg';

const defaultMovies = [
    {
        movieName: "Inception",
        poster: movieimg1,
        reviews: []
    },
    {
        movieName: "Interstellar",
        poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        reviews: []
    },
    {
        movieName: "The Dark Knight",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        reviews: []
    }
];

const initialState = {
    movies: JSON.parse(localStorage.getItem("movies")) || defaultMovies
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addOrUpdateReview: (state, action) => {
            const { movieName, user, review, rating } = action.payload;
            const movie = state.movies.find((m) => m.movieName === movieName);
            if (movie) {
                const existingReview = movie.reviews.find((r) => r.user === user);
                if (existingReview) {
                    existingReview.review = review;
                    existingReview.rating = rating;
                } else {
                    movie.reviews.push({ user, review, rating });
                }
            }
            localStorage.setItem("movies", JSON.stringify(state.movies));
        },
        deleteReview: (state, action) => {
            const { movieName, user } = action.payload;
            const movie = state.movies.find((m) => m.movieName === movieName);
            if (movie) {
                movie.reviews = movie.reviews.filter((r) => r.user !== user);
            }
            localStorage.setItem("movies", JSON.stringify(state.movies));
        },
    },
});

export const { addOrUpdateReview, deleteReview } = movieSlice.actions;
export default movieSlice.reducer;
