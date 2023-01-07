import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  addBookmarkToMovies,
  addBookmarkToTvSeries,
  removeBookmarkToMovies,
  removeBookmarkToTvSeries,
} from '../features/movieSlice'
import Modal from './Modal.jsx'

const Dot = () => {
  return <div className="min-w-[3px] h-[3px] rounded-xl bg-[#979797]"></div>
}

const CategoryMovieIcon = () => {
  return (
    <div className="relative w-3 h-3">
      <Image
        src="/icon-category-movie.svg"
        alt=""
        priority
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  )
}

const BookMarkedEmptyIcon = ({ isBookmarked, handler }) => {
  const buttonClassnames = classNames(
    'h-8',
    'w-8',
    'flex',
    'justify-center',
    'items-center',
    'rounded-full',
    'bg-primary_background',
    {
      'hover:bg-white': !isBookmarked,
      group: !isBookmarked,
    }
  )
  return (
    <div className="absolute top-[8px] right-[8px] z-[1]">
      <button onClick={handler} className={buttonClassnames} aria-label="bookmark">
        <svg
          width="12"
          height="14"
          className="stroke-white group-hover:stroke-primary_background"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
            strokeWidth="1.5"
            fill={isBookmarked ? 'white' : 'none'}
          />
        </svg>
      </button>
    </div>
  )
}

const TrendingCard = ({ pieceData }) => {
  const dispatch = useDispatch()
  const { pathname } = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(pieceData.isBookmarked)
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(!isOpen)
  }
  const { category, rating, thumbnail, title, year } = pieceData
  const largeImage = thumbnail?.trending?.large

  const handleBookmarkStateInBookmarkPage = () => {
    if (category === 'Movie') {
      dispatch(removeBookmarkToMovies(pieceData))
    } else if (category === 'TV Series') {
      dispatch(removeBookmarkToTvSeries(pieceData))
    }
  }

  const handleBookmarkState = () => {
    if (isBookmarked === true) {
      setIsBookmarked(false)
      if (category === 'Movie') {
        dispatch(removeBookmarkToMovies(pieceData))
      } else if (category === 'TV Series') {
        dispatch(removeBookmarkToTvSeries(pieceData))
      }
    } else if (isBookmarked === false) {
      setIsBookmarked(true)
      if (category === 'Movie') {
        dispatch(addBookmarkToMovies(pieceData))
      } else if (category === 'TV Series') {
        dispatch(addBookmarkToTvSeries(pieceData))
      }
    }
  }

  return (
    <div className="relative">
      <BookMarkedEmptyIcon
        isBookmarked={isBookmarked}
        handler={
          pathname === '/bookmarked'
            ? handleBookmarkStateInBookmarkPage
            : handleBookmarkState
        }
      />
      <div className="relative group flex-1 min-w-[240px] md:min-w-[470px] h-[140px] md:h-[230px]">
        <Image
          src={largeImage.slice(8)}
          alt=""
          className="rounded-[8px]"
          priority
          quality={100}
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
        />
        <div className="absolute bottom-0 left-0 rounded-[8px] h-[70px] min-w-[240px] [background-image:linear-gradient(to_bottom,rgba(0,0,0,0.01),rgba(0,0,0,0.75))]">
          <div className="h-[38px] pl-4">
            <div className="text-white flex items-center gap-2 text-sm font-light">
              <span>{year}</span>
              <Dot />
              <div className="flex items-center gap-[6px]">
                <CategoryMovieIcon />
                <span className="min-w-[32px] [letter-spacing: 0.03em]">
                  {category}
                </span>
              </div>
              <div className="flex gap-2 items-center ">
                <Dot />
                <span>{rating}</span>
              </div>
            </div>
            <p className="text-base md:text-s font-medium text-white h-[19px] mt-1">
              {title}
            </p>
          </div>
        </div>
        <div className="absolute bg-black/50 w-full h-full group-hover:flex group-hover:items-center group-hover:justify-center hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute rounded-full pl-2 pr-6 py-3 flex items-center bg-white/20"
            aria-label="Play"
          >
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
                fill="#FFF"
              />
            </svg>
            <span className="text-xs font-medium ml-[19px] text-white">
              Play
            </span>
          </button>
        </div>
      </div>
      {isOpen && <Modal onClose={onClose} />}
    </div>
  )
}

export default TrendingCard
