import React from 'react'

import PrizeWindow from '../presentational/prize-window'

export default class PrizeWindowContainer extends React.Component {

  state={
    prizeWindowButtonsAreBlocked: false
  }

  clickHandler() {
    this.props.hidePrize();
  }

  getFinalValue = (valueArray) => {
    const currentValues = valueArray.slice()
    const finalValue = currentValues.join('')
    this.setState({finalValue: finalValue})
  }

  submit = () => {
    this.props.hidePrize();
    this.props.setWinnerName(this.state.finalValue)
  }

  togglePrizeWindowBlockade = (keyboardIsActive) => {
    this.setState({prizeWindowButtonsAreBlocked: keyboardIsActive ? true : false,
    inputIsComplete:  keyboardIsActive ? true : false})
  }



  render() {
    const {prizeIsShowing, hidePrize, inheritedGameFormat} = this.props
    return (
      <div>
 <PrizeWindow prizeIsShowing={prizeIsShowing}
                                   inheritedGameFormat={inheritedGameFormat}
                                   timeRestriction={this.props.gameMappedData.levels[this.props.level - 1].timeRestriction}
                                   hidePrize={hidePrize}
                                   getFinalValue={this.getFinalValue}
                                   togglePrizeWindowBlockade={this.togglePrizeWindowBlockade}/>
        }
      </div>
    )
  }
}