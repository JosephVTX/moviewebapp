import { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

const Login = () => {
  const [isEmailFocus, setIsEmailFocus] = useState(false)
  const [isPasswordFocus, setIsPasswordFocus] = useState(false)

  const hrEmailClass = classNames({
    'border-t-white': isEmailFocus,
    'border-t-terciary_others': !isEmailFocus,
  })

  const hrPasswordClass = classNames({
    'border-t-white': isPasswordFocus,
    'border-t-terciary_others': !isPasswordFocus,
  })

  const handleFocusEmail = e => {
    setIsEmailFocus(true)
  }
  const handleBlurEmail = e => {
    setIsEmailFocus(false)
  }

  const handleFocusPassword = e => {
    setIsPasswordFocus(true)
  }

  const handleBlurPassword = e => {
    setIsPasswordFocus(false)
  }

  return (
    <div className="px-6 flex flex-col justify-center items-center">
      <div className="mt-12 md:mt-20 mb-[73.6px] ">
        <Image src="/logo.svg" alt="logo icon" width={32} height={25.6} />
      </div>
      <div
        id="login"
        className="bg-secondary_background max-w-[327px] md:min-w-[400px] min-h-[365px] md:min-h-[373px] p-12 rounded-[10px] md:rounded-[20px]"
      >
        <h2 className="text-l text-white mb-10">Login</h2>
        <form className="flex flex-col">
          <div className="mb-5">
            <input
              type="text"
              placeholder="Email address"
              autoComplete="off"
              className="outline-none border-none bg-transparent text-base placeholder:text-terciary_others focus:text-white px-4 pb-4"
              onFocus={handleFocusEmail}
              onBlur={handleBlurEmail}
            />
            <hr className={hrEmailClass} />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              className="outline-none border-none bg-transparent text-base placeholder:text-terciary_others focus:text-white px-4 pb-4"
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
            />
            <hr className={hrPasswordClass} />
          </div>

          <button className="transition-all duration-75 ease-out rounded-md bg-primary_red text-base py-[15px] text-white my-10 hover:bg-white hover:text-secondary_background">
            Login to your account
          </button>
        </form>
        <div className='md:text-center'>
          <span className="text-white text-base mr-[9px]">
            Don`t have an account?
          </span>
          <span className="text-primary_red text-base">Sign up</span>
        </div>
      </div>
    </div>
  )
}

export default Login
