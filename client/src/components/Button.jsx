import React from 'react'

const Button = ({src,clickFun,size}) => {
  return (
    <div>
        <button className='my-[20%]' onClick={clickFun}>
            <lord-icon
                src={src}
                trigger="click"
                colors="primary:#4be1ec,secondary:#cb5eee"
                style={{width:size,height:size}}>
            </lord-icon>
        </button>
    </div>
  )
}

export default Button