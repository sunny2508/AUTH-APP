import React from 'react'

const Input = ({icon:Icon,...props}) => {
  return (
    <div className="relative mb-6">
      <div className="absolute flex items-center inset-y-0 left-0 pl-3
       pointer-events-none" >
        <Icon className="size-5 text-[#3A2618]"/>
      </div>


      <input
      {...props}
      className='w-full pl-10 pr-3 py-2 bg-[#37423D] bg-opacity-50
      rounded-lg border-2 border-[#37423D] focus:border-gray-800
      focus:ring-2 focus:ring-gray-800 text-gray-950 placeholder-gray-800
      transition duration-200'/>

    </div>
  )
}

export default Input