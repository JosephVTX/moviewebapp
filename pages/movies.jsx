import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import Grid from '../components/Grid'
import Layout from '../components/Layout'
import SearchForm from '../components/SearchForm.jsx'
import { useForm } from '../hooks/useForm'
const filterMovies = data => {
  return data.filter(
    map => map.category === 'Movie' && map.isTrending === false
  )
}

const Movies = () => {
  const { pieceData } = useSelector(state => state.movies)
  const Movies = useMemo(() => filterMovies(pieceData) ?? [], [pieceData])

  const [inputValue, handleInputChange] = useForm({
    search: '',
  })
  const { search } = inputValue
  const [queryResults, setQueryResults] = useState([])

  useMemo(() => {
    if (search.length === 0) return
    const queryPieces = Movies.filter(piece =>
      piece.title.toLowerCase().includes(inputValue.search.toLowerCase())
    )
    setQueryResults(queryPieces)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Layout>
        <div className="my-6">
          <SearchForm
            placeholderTitle="Search for movies"
            inputValue={inputValue}
            handler={handleInputChange}
          />
        </div>
        <div className="my-6 xl:my-10 max-w-[1440px]">
          <h2 className="text-m xl:text-l font-light text-white mb-6 xl:mb-8">
            {search
              ? `Found ${queryResults.length} results for '${search}'`
              : 'Movies'}
          </h2>
          <Grid>
            {search
              ? queryResults.map((movie, index) => {
                  return <Card key={index} pieceData={movie} />
                })
              : Movies.map((movie, index) => {
                  return <Card key={index} pieceData={movie} />
                })}
          </Grid>
        </div>
      </Layout>
    </>
  )
}

export default Movies
