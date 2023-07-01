import React from 'react'

const NoDataFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        textAlign: 'right',
      }}
    >
      <h1
        className="text-xl"
        style={{ fontSize: '30px', fontFamily: 'cursive' }}
      >
        No Data Found
      </h1>
    </div>
  )
}

export default NoDataFound
