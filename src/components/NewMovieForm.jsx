import React, { useState } from "react";

function NewMovieForm({ onAddMovie }) {
    const [movieName, setMovieName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMovie(movieName);
        setMovieName("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
                placeholder="Add New Movie"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
            />
            <button type="submit">Add Movie</button>
        </form>
    );
}

export default NewMovieForm;
