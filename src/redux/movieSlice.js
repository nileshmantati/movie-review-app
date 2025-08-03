import { createSlice } from "@reduxjs/toolkit";
import movieimg1 from '../assets/movieimg1.jpg';
import movieimg2 from '../assets/movieimg2.jpg';
import movieimg3 from '../assets/movieimg3.webp';

const defaultMovies = [
    {
        movieName: "Inception",
        poster: movieimg1,
        reviews: []
    },
    {
        movieName: "Interstellar",
        // poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        poster: movieimg2,
        reviews: []
    },
    {
        movieName: "The Dark Knight",
        // poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        poster: movieimg3,
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
