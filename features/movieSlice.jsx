import { createSlice } from '@reduxjs/toolkit'
import data from '../data/data'

const getBookmarkedMovies = () => {
  return data.filter(movie => {
    return movie.category === 'Movie' && movie.isBookmarked === true
  })
}

const getBookmarkedTvSeries = () => {
  return data.filter(movie => {
    return movie.category === 'TV Series' && movie.isBookmarked === true
  })
}

const initialState = {
  pieceData: data,
  bookmarkedMovies: getBookmarkedMovies(),
  bookmarkedTvSeries: getBookmarkedTvSeries(),
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addBookmarkToMovies(state, action) {
      const movie = action.payload
      const movieIndex = state.pieceData.findIndex(
        piece => piece.title === movie.title
      )
      state.pieceData[movieIndex].isBookmarked = true
      state.bookmarkedMovies.push({
        ...movie,
        isBookmarked: true,
      })
    },
    removeBookmarkToMovies(state, action) {
      const movie = action.payload
      const movieIndex = state.pieceData.findIndex(
        piece => piece.title === movie.title
      )
      state.pieceData[movieIndex].isBookmarked = false
      const bookmarkedMoviesWithoutRemoved = state.bookmarkedMovies.filter(
        piece => piece.title !== movie.title
      )
      state.bookmarkedMovies = bookmarkedMoviesWithoutRemoved
    },
    addBookmarkToTvSeries(state, action) {
      const tvserie = action.payload
      const tvserieIndex = state.pieceData.findIndex(
        piece => piece.title === tvserie.title
      )
      state.pieceData[tvserieIndex].isBookmarked = true
      state.bookmarkedTvSeries.push({
        ...tvserie,
        isBookmarked: true,
      })
    },
    removeBookmarkToTvSeries(state, action) {
      const tvserie = action.payload
      const tvserieIndex = state.pieceData.findIndex(
        piece => piece.title === tvserie.title
      )
      state.pieceData[tvserieIndex].isBookmarked = false
      const bookmarkedTvSeriesWithoutRemoved = state.bookmarkedTvSeries.filter(
        piece => piece.title !== tvserie.title
      )
      state.bookmarkedTvSeries = bookmarkedTvSeriesWithoutRemoved
    },
  },
})

export const {
  addBookmarkToMovies,
  removeBookmarkToMovies,
  addBookmarkToTvSeries,
  removeBookmarkToTvSeries,
} = movieSlice.actions

export default movieSlice.reducer
