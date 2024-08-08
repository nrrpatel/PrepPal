import React from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'

function RecordAnswerSection() {
  return (
    <div className='flex flex-col my-20 justify-center items-center bg-secondary rounded-lg'>
        <Image src={'/webcam.png'} width={200} height={200} className='absolute'/>
        <Webcam mirrored={true}
/>
    </div>
  )
}

export default RecordAnswerSection