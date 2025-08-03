import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import AllReviews from "./components/AllReviews";
import Header from "./components/Header";

import { useDispatch } from "react-redux";
import { addOrUpdateReview, deleteReview } from "./redux/movieSlice";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const handleAddOrUpdate = (movieName, user, review, rating) => {
    dispatch(addOrUpdateReview({ movieName, user, review, rating }));
    setShowModal(false);
  };

  const handleDelete = (movieName, user) => {
    dispatch(deleteReview({ movieName, user }));
  };

  const openModal = (movieName, user = "") => {
    setCurrentMovie({ movieName, user });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentMovie(null);
  };

  return (
    <Router>
      <Header />
      <ToastContainer />
      <MovieForm
        show={showModal}
        onHide={closeModal}
        onAddReview={handleAddOrUpdate}
        initialMovie={currentMovie?.movieName || ""}
        initialUser={currentMovie?.user || ""}
      />
      <Routes>
        <Route
          path="/"
          element={<MovieList onOpenModal={openModal} />}
        />
        <Route
          path="/allreviews"
          element={<AllReviews onEdit={openModal} onDelete={handleDelete} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
