import React from 'react'

const Command = ({gameMappedData, level, tipIsShowing}) =>
  (<div className="command command__title">{tipIsShowing ?
    'Tip' : gameMappedData.levels[level - 1].command }
  </div>)

export default Command