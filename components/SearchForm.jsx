import Image from 'next/image'
const SearchIcon = () => {
  return (
    <button aria-label="search">
      <div className="relative w-6 h-6 xl:w-8 xl:h-8">
        <Image
          priority
          src="/icon-search.svg"
          alt="form search icon"
          quality={100}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </button>
  )
}

const SearchForm = ({ placeholderTitle = 'Search...',inputValue,handler }) => {

  const { search } = inputValue ?? ""
  return (
    <form className="xl:mr-10">
      <div className="flex items-center gap-4 h-[24px] xl:h-8 ">
        <SearchIcon />
        <input
          type="text"
          placeholder={placeholderTitle}
          autoComplete="off"
          name="search"
          value={search}
          onChange={handler}
          className="min-w-[214px] h-[2rem] xl:h-[4rem] text-base xl:text-m font-light flex-1 outline-none bg-transparent  placeholder:text-terciary_others text-white focus:border-b-2 focus:border-terciary_others"
        />
      </div>
    </form>
  )
}

export default SearchForm
