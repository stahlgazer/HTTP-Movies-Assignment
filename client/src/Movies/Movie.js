import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateMovie from "./UpdateMovie";
import { Route } from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = () => {
    this.props.history.push(`/movies/${this.state.movie.id}/update-movie/`);
  };

  deleteMovie = () => {
    let id = this.state.movie.id;
    axios
      .delete(`http://localhost:5000/api/movies/${id}`, id)
      .then(response => {
        console.log(id, "deleted.", response);
        this.props.history.push("/");
      })
      .catch(error => console.log("Error deleting movie", id, error));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save Movie
        </div>
        <div className="save-button" onClick={this.editMovie}>
          Edit Movie
        </div>
        <div className="save-button" onClick={this.deleteMovie}>
          Delete Movie
        </div>
        <Route
          path="/movies/:id/update-movie/"
          render={props => {
            return <UpdateMovie {...props} movie={this.state.movie} />;
          }}
        />
      </div>
    );
  }
}
