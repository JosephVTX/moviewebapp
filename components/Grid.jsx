
const Grid = ({children}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-4 md:gap-y-6 xl:gap-y-8 gap-x-[15px] md:gap-x-[29px] xl:gap-x-10">
      {children}
    </div>
  )
}

export default Grid