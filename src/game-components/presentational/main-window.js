import React from 'react'

const MainWindow = (props) => {
  return (<div className="game">
    {React.Children.map(props.children, (child) => {
      if(child !== null)  {
        return React.cloneElement(child, {...props})}
      else {
        return child
      }
    })}
  </div>)
}

export default MainWindow