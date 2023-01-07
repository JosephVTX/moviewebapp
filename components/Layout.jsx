import Navbar from './Navbar.jsx'

export default function Layout({ children }) {
  return (
    <div className="xl:flex xl:flex-row md:px-6 xl:px-9 md:pt-6 xl:pt-9 md:pb-14">
      <Navbar />
      <div className="px-4 xl:pl-9 xl:pr-0 xl:flex-1">{children}</div>
    </div>
  )
}
