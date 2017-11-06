import React from 'react'

import TipTrigger from './trigger-tip'
import ResultsTrigger from './trigger-results'

const TriggersWrapper = ({thisLevelData, toggleTip, showResults, tipTriggerIsBlocking, tipIsShowing}) => (
    <div className={`wrapper--game-triggers`}>
      <TipTrigger tipTriggerIsBlocking={tipTriggerIsBlocking}
                                  tipIsShowing={tipIsShowing}
                                  timeRestriction={thisLevelData.timeRestriction}
                                  toggleTip={toggleTip}/>
      {thisLevelData.timeRestriction > 0 ?
        <ResultsTrigger showResults={showResults}/> : null}
    </div>)

export default TriggersWrapper