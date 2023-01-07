import Head from 'next/head'
import { useState,useMemo } from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import Grid from '../components/Grid'
import Layout from '../components/Layout'
import SearchForm from '../components/SearchForm'
import { useForm } from '../hooks/useForm'

const Bookmarked = () => {
  const { bookmarkedMovies, bookmarkedTvSeries } = useSelector(
    state => state.movies
  )
  const bookmarkedPieces = bookmarkedMovies.concat(bookmarkedTvSeries)
  const [inputValue, handleInputChange] = useForm({
    search: '',
  })
  const { search } = inputValue
  const [queryResults, setQueryResults] = useState([])

  useMemo(() => {
    if (search.length === 0) return
    const queryPieces = bookmarkedPieces.filter(piece =>
      piece.title.toLowerCase().includes(inputValue.search.toLowerCase())
    )
    setQueryResults(queryPieces)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <>
      <Head>
        <title>Bookmarked</title>
      </Head>
      <Layout>
        <div className="my-6">
          <SearchForm
            placeholderTitle="Search for bookmarked shows"
            inputValue={inputValue}
            handler={handleInputChange}
          />
        </div>
        {search ? (
          <div className="my-6 xl:my-10 max-w-[1440px]">
            <h2 className="text-m xl:text-l font-light text-white mb-6 xl:mb-8">
              {`Found ${queryResults.length} results for '${search}'`}
            </h2>
            <Grid>
              {queryResults.map((movie, index) => {
                return <Card key={index} pieceData={movie} />
              })}
            </Grid>
          </div>
        ) : (
          <>
            <div className="my-6 xl:my-10 max-w-[1440px]">
              <h2 className="text-m xl:text-l font-light text-white mb-6 xl:mb-8">
                Bookmarked Movies
              </h2>
              {bookmarkedMovies.length === 0 ? (
                <div>
                  <span className="text-terciary_others text-xl md:text-2xl xl:text-4xl font-medium">
                    No movies here, please bookmark someone
                  </span>
                </div>
              ) : (
                <Grid>
                  {bookmarkedMovies.map((movie, index) => {
                    return <Card key={index} pieceData={movie} />
                  })}
                </Grid>
              )}
            </div>
            <div className="my-6 xl:my-10 max-w-[1440px]">
              <h2 className="text-m xl:text-l font-light text-white mb-6 xl:mb-8">
                Bookmarked TV Series
              </h2>
              {bookmarkedTvSeries.length === 0 ? (
                <div>
                  <span className="text-terciary_others text-xl md:text-2xl xl:text-4xl font-medium">
                    No tv series here, please bookmark someone
                  </span>
                </div>
              ) : (
                <Grid>
                  {bookmarkedTvSeries.map((tvserie, index) => {
                    return <Card key={index} pieceData={tvserie} />
                  })}
                </Grid>
              )}
            </div>
          </>
        )}
      </Layout>
    </>
  )
}

export default Bookmarked
