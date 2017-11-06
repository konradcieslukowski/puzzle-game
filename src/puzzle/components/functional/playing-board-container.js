import React from 'react'
import PlayingItem from '../presentational/playing-item'
import checkCurrentAnswers from '../../utils/check-user-answers'
import renderImagePreloader from '../../../game-components/presentational/image-preloader'

export default class PlayingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: null,
      firstIndex: null,
      secondIndex: null,
      gameArray: null,
      savedGameArray: null,
      solutionsArray: null,
      flexTableWidth: null,
      firstId: null,
      tableFormat: null,
      columns: null,
      winning: false,
      loadedArray: [],
      imagesLoaded: false
    }
  }

  onLoadHandler = () => {
    const loadedArray = this.state.loadedArray
    loadedArray.push(true)
    this.setState({loadedArray}, () => {
      if (this.state.gameArray.length === loadedArray.length)
        this.setState({imagesLoaded: true})
    })
  }

  getClickedIndex(index, clickedClass, clickedId) {
    if (this.state.firstIndex !== null && clickedClass === undefined) {
      this.setState({secondIndex: index}, () => {
        this.gameEngine();
      })
    } else if (this.state.firstIndex === null && clickedClass === undefined) {
      this.setState({firstIndex: index, firstId: clickedId})
    } else {
      this.setState({firstIndex: null})
    }
  }

  toggleItems = () => {
    const first = this.state.firstIndex
    const second = this.state.secondIndex
    const gameArray = this.state.gameArray.map((item) => item)
    const firstItem = gameArray.splice(first, 1)[0];
    gameArray.splice(second, 0, firstItem);
    let secondItem;
    if (second > first) {
      secondItem = gameArray.splice(second - 1, 1)[0];
    }
    else if (first > second) {
      secondItem = gameArray.splice(second + 1, 1)[0];
    }
    gameArray.splice(first, 0, secondItem)

    return gameArray
  }

  updateItemsStateAfterToggle = (gameArray) => {
    this.setState({gameArray: gameArray, firstIndex: null, secondIndex: null, firstId: null})
  }

  gameEngine() {
    const gameArray = this.toggleItems()
    this.updateItemsStateAfterToggle(gameArray)
    const winning = checkCurrentAnswers(gameArray, this.state.solutionsArray)
    if (winning) {
      this.props.showPrize()
      this.props.setGameAsSolved()
      this.setState({winning: true})
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.state.gameArray !== null && nextProps.tipIsShowing === false && this.state.savedGameArray === null) || nextProps.arraysPreparedToGame === null) {
      return false
    } else if (this.state.gameArray === null && nextProps.tipIsShowing === false && nextProps.isSolved === false) {
      this.setState({
        gameArray: nextProps.arraysPreparedToGame.playArray,
        solutionsArray: nextProps.arraysPreparedToGame.solutionsArray,
        bookId: nextProps.bookId,
        tableFormat: nextProps.arraysPreparedToGame.columns / nextProps.arraysPreparedToGame.rows,
        columns: nextProps.arraysPreparedToGame.columns
      })

    } else if (this.state.gameArray !== null && nextProps.tipIsShowing === true && nextProps.isSolved === false && this.state.savedGameArray === null) {
      this.setState({
        savedGameArray: this.state.gameArray,
        gameArray: nextProps.arraysPreparedToGame.tipArray
      })
    } else if (this.state.gameArray !== null && nextProps.tipIsShowing === false && this.state.savedGameArray !== null) {
      this.setState({
        gameArray: this.state.savedGameArray,
        savedGameArray: null
      })
    }
  }

  /* setting table width */
  componentDidUpdate(prevProps, prevState) {
    // prevent possible undefined during some update (for example if game on time)
    if (this.playingBoard !== undefined) {
      // count proportionally widht of each item in row
      const cellWidthPercentage = 100 / this.state.columns
      // counti max possible table width considering max possible height of table =  wrapper height and format
      const maxTableWidth = this.playingBoard.clientHeight * this.state.tableFormat
      const tableWidthPercentage = maxTableWidth / this.playingBoard.clientWidth * 100
      // add some bufor as margin from wrapper
      const bufor = 5
      // count  and set height of cell in px to cooperate with absolute positioning
      const tableWidthPx = maxTableWidth - bufor / 100 * this.playingBoard.clientWidth
      const cellHeightPx = tableWidthPx / this.props.arraysPreparedToGame.columns
      // set zoom for each chunk of image = width of table
      const imageWidthPercentage = 100 * this.props.arraysPreparedToGame.columns
      if (prevProps !== this.props) {
        this.setState({
          flexTableWidth: tableWidthPercentage - bufor + '%',
          cellWidthPercentage: cellWidthPercentage + '%',
          // assign cellHeight dynamically as normally height auto values dissapear when pos absolute
          cellHeightPx: cellHeightPx + 'px',
          imageWidthPercentage: imageWidthPercentage + '%'
        })
      }
    }
  }

  renderTipView = () => (
    <PlayingItem value={this.state.gameArray[0].value}
                 item={this.state.gameArray[0]}
                 sizeBoard={this.board}
                 tipIsShowing={this.props.tipIsShowing}
                 winning={this.state.winning}/>
  )

  renderCurrentItemsView = () => (
    this.state.gameArray.map((item, index) => (
      <PlayingItem key={item.id}
                   cellWidthPercentage={this.state.cellWidthPercentage}
                   cellHeightPx={this.state.cellHeightPx}
                   imageWidthPercentage={this.state.imageWidthPercentage}
                   getClickedIndex={this.getClickedIndex.bind(this, index)}
                   onLoadHandler={this.onLoadHandler}
                   item={item}
                   className={this.state.firstIndex === index ? 'item--clicked' : undefined}
                   bookId={this.props.bookId}/>
    ))
  )

  render() {
    if (this.state.gameArray !== null) {
      return (
        <div className="items-container"
             ref={div => this.playingBoard = div}>
          {renderImagePreloader(this.state.imagesLoaded)}
          <div className="items-list"
               style={{width: this.state.flexTableWidth}}
               ref={node => this.board = node}>
            {this.state.winning || this.props.tipIsShowing ?
              this.renderTipView()
              : this.renderCurrentItemsView()
            }
          </div>
        </div>
      )
    }
    return <div></div>;
  }
}