import React from 'react'

const PlayingItem = ({className, onLoadHandler, getClickedIndex, item, sizeBoard, tipIsShowing, winning, cellWidthPercentage, imageWidthPercentage, cellHeightPx}) => {
 const  clickHandler = () => {
  getClickedIndex(className, item.id)
  }
    const width = sizeBoard !== undefined ? sizeBoard.clientWidth : null
    const itemClass = winning || tipIsShowing ? "item item--border-none" : "item"
    const imageClass = winning || tipIsShowing ? "item__image--only" : null
    const activeClass = className !== undefined ? className : ''

    return (
      <div className={itemClass + ' ' + activeClass}
           style={{width: width === null ? cellWidthPercentage : width, height: cellHeightPx}}
           id={item.id}
           onClick={clickHandler}
           onLoad={onLoadHandler}>
        <img className={`item__image ${imageClass}`}
             style={{
               width: imageWidthPercentage,
               top: item.top + '%',
               left: item.left + '%'
             }}
             src={`${item.value}`}
             alt="item"/>
      </div>
    )
  }

  export default PlayingItem