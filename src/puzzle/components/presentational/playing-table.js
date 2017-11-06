import React from 'react'

const PlayingTable = ({flexTableWidth, playingItems}) => (
  <table className="items-list"
         style={{width: flexTableWidth}}>
    <tbody>
    {playingItems}
    </tbody>
  </table>
)

export default PlayingTable