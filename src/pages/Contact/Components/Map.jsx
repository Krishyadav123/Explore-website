import React from 'react'

const Map = () => {
  return (
    <div className='w-full h-[400px] mt-10 p-5 bg-[#ffffff] rounded-2xl shadow-lg overflow-hidden'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1840.1441778956391!2d75.85336953860701!3d22.717521194847173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fda0a27f50f5%3A0xdd375ab4fdfb3f50!2sRajwada%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1754819539456!5m2!1sen!2sin" width="100%" height="100%" className='border-0 rounded-xl'></iframe>
    </div>
  )
}

export default Map