/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Movie from './Movie';
import { getMovies } from './actions'


class MoviesList extends PureComponent {
  componentDidMount() {
    const refetchMovies = 1000 * 60 * 60;
    if (this.props.isLoaded === false ||
      ((new Date()) - new Date(this.props.moviesLoadedAt)) > refetchMovies) {
      this.props.getMovies();
    }
  }

  render() {
    const { movies, isLoaded } = this.props;
    if (!isLoaded) return <h1>Loading</h1>
    return (
      <MovieGrid>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieGrid>

    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  isLoaded: state.movies.moviesLoaded,
  moviesLoadedAt: state.movies.moviesLoadedAt,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getMovies,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList)


const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
  /* grid-column-gap: 1rem; */
`
