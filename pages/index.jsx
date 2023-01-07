import Head from 'next/head'
import Card from '../components/Card'
import Grid from '../components/Grid'
import SearchForm from '../components/SearchForm'
import TrendingCard from '../components/TrendingCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import useWindowSize from '../hooks/useWindowSize'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { useForm } from '../hooks/useForm'
const filterTrending = data => {
  return data.filter(piece => piece.isTrending === true)
}

const filterRecommended = data => {
  return data.filter(piece => piece.isTrending === false)
}

const Home = () => {
  const { pieceData } = useSelector(state => state.movies)
  const { width } = useWindowSize()

  const [inputValue, handleInputChange] = useForm({
    search: '',
  })
  const { search } = inputValue
  const [queryResults, setQueryResults] = useState([])

  useMemo(() => {
    if (search.length === 0) return
    const queryPieces = pieceData.filter(piece =>
      piece.title.toLowerCase().includes(inputValue.search.toLowerCase())
    )
    setQueryResults(queryPieces)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const Trending = useMemo(() => filterTrending(pieceData) ?? [], [pieceData])

  const Recommended = useMemo(
    () => filterRecommended(pieceData) ?? [],
    [pieceData]
  )

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Layout>
        <div className="my-6">
          <SearchForm
            placeholderTitle="Search for movies or TV series"
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
            <div className="my-6 xl:my-[34px]">
              <h2 className="text-m xl:text-l font-light text-white mb-4 xl:mb-8">
                Trending
              </h2>
              <div className="relative max-w-[1440px]">
                <Swiper spaceBetween={40} width={width < 768 ? 240 : 470}>
                  {Trending.map((movie, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <TrendingCard pieceData={movie} />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
                <div className="absolute top-0 right-0 bg-gradient-to-l from-secondary_background/90 h-[140px] md:h-[230px] w-1/12 z-[1]" />
              </div>
            </div>
            <div className="my-6 xl:my-10 max-w-[1440px]">
              <h2 className="text-m xl:text-l font-light text-white mb-6 xl:mb-8">
                Recommended for you
              </h2>
              <Grid>
                {Recommended.map((movie, index) => {
                  return <Card key={index} pieceData={movie} />
                })}
              </Grid>
            </div>
          </>
        )}
      </Layout>
    </>
  )
}

export default Home
