import React from 'react'

const renderImagePreloader =(loaded) => {
  if (loaded) {
    return null;
  } else {
      return (
        <div className={`loader--background`}>
          <div className={`loader`}></div>
        </div>
      )
    }
}

export default renderImagePreloader