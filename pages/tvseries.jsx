import Head from 'next/head'
import { useMemo,useState} from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import Grid from '../components/Grid'
import Layout from '../components/Layout'
import SearchForm from '../components/SearchForm'
import { useForm } from '../hooks/useForm'
const filterTvSeries = data => {
  return data.filter(
    map => map.category === 'TV Series' && map.isTrending === false
  )
}

const Series = () => {
  const { pieceData } = useSelector(state => state.movies)
  const Series = useMemo(() => filterTvSeries(pieceData) ?? [], [pieceData])


  const [inputValue, handleInputChange] = useForm({
    search: '',
  })
  const { search } = inputValue
  const [queryResults, setQueryResults] = useState([])

  useMemo(() => {
    if (search.length === 0) return
    const queryPieces = Series.filter(piece =>
      piece.title.toLowerCase().includes(inputValue.search.toLowerCase())
    )
    setQueryResults(queryPieces)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <>
      <Head>
        <title>TV Series</title>
      </Head>
      <Layout>
        <div className="my-6">
          <SearchForm
            placeholderTitle="Search for TV series"
            inputValue={inputValue}
            handler={handleInputChange}
          />
        </div>
        <div className="my-6 xl:my-10 max-w-[1440px]">
          <h2 className="text-m xl:text-l font-light text-white mb-6 xl:mb-8">
            {search
              ? `Found ${queryResults.length} results for '${search}'`
              : ' TV Series'}
          </h2>
          <Grid>
            {search
              ? queryResults.map((movie, index) => {
                  return <Card key={index} pieceData={movie} />
                })
              : Series.map((movie, index) => {
                  return <Card key={index} pieceData={movie} />
                })}
          </Grid>
        </div>
      </Layout>
    </>
  )
}

export default Series
