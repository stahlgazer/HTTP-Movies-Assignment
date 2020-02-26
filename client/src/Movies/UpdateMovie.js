import React, { useState } from "react";
import axios from "axios";

const UpdateMovie = props => {
  console.log(props, "updated movie props");

  const [updatedMovie, setUpdatedMovie] = useState(props.movie);
  console.log("updatedMovie:", updatedMovie);

  const handleChange = event => {
    setUpdatedMovie({
      ...updatedMovie,
      [event.target.name]: event.target.value
    });
  };
  console.log("updatedMovie:", updatedMovie);

  const handleSubmit = event => {
    event.preventDefault();
    let stars;

    if (updatedMovie.stars instanceof Array) {
      stars = updatedMovie.stars;
    } else {
      stars = updatedMovie.stars.split(",");
    }
    let data = { ...updatedMovie, stars };

    axios
      .put(`http://localhost:5000/api/movies/${updatedMovie.id}`, data)
      .then(res => {
        console.log(res);
        props.history.push("/");
      })
      .catch(err => console.log(err));
    console.log("updatedMovie:", updatedMovie);
  };

  return (
    <div className="updateMovieDiv">
      <h1>Update Movie Info</h1>

      <form name="updateMovie">
        <label htmlFor="title">
          Movie Title:
          <input
            name="title"
            onChange={handleChange}
            value={updatedMovie.title}
          />
        </label>
        <label htmlFor="director">
          Director:
          <input
            name="director"
            onChange={handleChange}
            value={updatedMovie.director}
          />
        </label>
        <label htmlFor="metascore">
          Metascore:
          <input
            name="metascore"
            onChange={handleChange}
            value={updatedMovie.metascore}
          />
        </label>
        <label htmlFor="stars">
          Stars:
          <input
            name="stars"
            onChange={handleChange}
            value={updatedMovie.stars}
          />
        </label>
        <button onClick={handleSubmit}>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
