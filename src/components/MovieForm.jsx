import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";

function MovieForm({
    onAddReview,
    initialMovie = "",
    initialUser = "",
    show,
    onHide
}) {
    const movies = useSelector((state) => state.movies.movies);
    const [movieName, setMovieName] = useState(initialMovie);
    const [user, setUser] = useState(initialUser);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(5);
    const isEditMode = initialUser !== "";

    useEffect(() => {
        setMovieName(initialMovie);
        setUser(initialUser);
        const movie = movies.find((m) => m.movieName === initialMovie);
        const reviewData = movie?.reviews.find((r) => r.user === initialUser);
        if (reviewData) {
            setReview(reviewData.review);
            setRating(reviewData.rating);
        } else {
            setReview("");
            setRating(5);
        }
    }, [initialMovie, initialUser, movies]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (movieName && user && review && rating) {
            onAddReview(movieName, user, review, rating);
            toast.success("✅ Review submitted!");
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? "Edit Review" : "Submit Review"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-2">
                        <Form.Label>Movie Name</Form.Label>
                        <Form.Control type="text" value={movieName} disabled />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                            disabled={isEditMode}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Your Review</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Rating</Form.Label>
                        <div className="d-flex align-items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <AiFillStar
                                    key={star}
                                    onClick={() => setRating(star)}
                                    style={{
                                        fontSize: "2rem",
                                        cursor: "pointer",
                                        color: star <= rating ? "#ffc107" : "#dee2e6",
                                        transition: "color 0.2s",
                                        marginRight: "5px"
                                    }}
                                />
                            ))}
                            <span className="ms-2 text-muted">
                                ({rating} Star{rating > 1 ? "s" : ""})
                            </span>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Cancel</Button>
                    <Button type="submit" variant="primary">
                        {isEditMode ? "Edit Review" : "Submit Review"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default MovieForm;
