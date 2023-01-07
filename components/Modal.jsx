import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Portal } from 'react-portal'
import 'animate.css'

const Modal = ({ onClose }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Portal node={document && document.getElementById('modal')}>
      <div
        onClick={onClose}
        className="absolute h-[290vh] w-full bg-transparent/60 "
      >
        <div className="mt-[50vh]">
          <div className="aspect-video max-w-[1200px] mx-auto">
            <ReactPlayer
              url="https://youtu.be/-7KaeMAxgRI"
              className="animate__animated animate__fadeIn animate__delay-1s aspect-video "
              width="100%"
              height="100%"
              controls={true}
              playing={true}
            />
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default Modal
