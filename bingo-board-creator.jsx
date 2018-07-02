import React from 'react'
import ReactDOM from 'react-dom'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      sayings: []
    }
    this.changeBackground = this.changeBackground.bind(this)
  }
  mapDiagonally() {
    var array1 = []
    this.state.board.forEach((r, idx) => {
      if (idx === 0) {
        r.forEach((o, ind) => {
          var array2 = []
          var count = ind
          this.state.board.forEach(w => {
            if (w[count] !== undefined) array2.push(w[count])
            count++
          })
          array1.push(array2)
        })
      } else {
        var array3 = []
        var count = 0
        for (var i = idx; i < this.state.board.length; i++) {
          if (this.state.board[i][count] !== undefined) array3.push(this.state.board[i][count])
          count++
        }
        array1.push(array3)
      }
    })
    return array1
  }
  mapHorizontally() {
    return this.state.board
  }
  mapVertically() {
    var collection = []
    this.state.board[0].forEach((c, idx) => {
      var array1 = []
      this.state.board.forEach(o => {
        array1.push(o[idx])
      })
      collection.push(array1)
    })
    return collection
  }
  mapDiagonallyRight() {
    var array1 = []
    this.state.board.forEach((r, idx) => {
      if (idx === 0) {
        for (var i = r.length - 1; i > 0; i--) {
          var array2 = []
          var count = i
          this.state.board.forEach(w => {
            if (w[count] !== undefined) array2.push(w[count])
            count--
          })
          array1.push(array2)
        }
      } else {
        var array3 = []
        var count = this.state.board[0].length - 1
        for (var i = idx; i < this.state.board.length; i++) {
          if (this.state.board[i][count] !== undefined) array3.push(this.state.board[i][count])
          count--
        }
        array1.push(array3)
      }
    })
    return array1
  }
  checkBoard(player) {
    var diagonals = this.mapDiagonally()
    var horizontals = this.mapHorizontally()
    var verticals = this.mapVertically()
    var diagonalsRight = this.mapDiagonallyRight()
    var result
    diagonalsRight.forEach(item => {
      item.forEach((num, ind) => {
        if (num === player && item[ind + 1] === player && item[ind + 2] === player && item[ind + 3] === player) {
          result = true
        }
      })
    })
    diagonals.forEach(item => {
      item.forEach((num, ind) => {
        if (num === player && item[ind + 1] === player && item[ind + 2] === player && item[ind + 3] === player) {
          result = true
        }
      })
    })
    horizontals.forEach(item => {
      item.forEach((num, ind) => {
        if (num === player && item[ind + 1] === player && item[ind + 2] === player && item[ind + 3] === player) {
          result = true
        }
      })
    })
    console.log(verticals)
    verticals.forEach(item => {
      item.forEach((num, ind) => {
        if (num === player && item[ind + 1] === player && item[ind + 2] === player && item[ind + 3] === player) {
          result = true
        }
      })
    })
    return result
  }
  componentDidMount() {
    const jeremySayings = ["Fool", "Guys", "I'm a God", "I'm so hung- over", "Cass- andra", "I'm so trigg- ered", "Scam"]
    this.setState({
      sayings: [
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
        jeremySayings[Math.floor(Math.random() * jeremySayings.length)],
      ]
    })
  }
  changeBackground(e) {
    const location = e.target.id.split('-')
    const board = this.state.board.slice()
    board[location[0]][location[1]] = 1
    this.setState({board: board})
    e.target.style.backgroundImage = "url(bold-circle.svg)"
    e.target.style.backgroundSize = "100%"
    if (this.checkBoard(1)) {
      var el = document.createElement('span')
      el.innerHTML = 'You win!'
      document.getElementById('pop-up').appendChild(el)
      document.getElementById('pop-up').style.backgroundImage = "url('https://nebula.wsimg.com/7004a76b21ccece4e628fb30638bea89?AccessKeyId=AE390C3BA3FA36C76872&disposition=0&alloworigin=1')"
      document.getElementById('pop-up').style.backgroundSize = '100%'
      document.getElementById('pop-up').style.backgroundRepeat = 'no-repeat'
      document.getElementById('pop-up').style.backgroundPosition = 'center'
    }
  }
  render() {
    return(
      <table>
      {[0, 1, 2, 3].map((row, index) => (
        <tbody key={row} className={`row${row}`}>
          <tr>
            <td id={`${row}-${0}`} onClick={this.changeBackground}>{this.state.sayings[(index * 4) + 0]}</td>
            <td id={`${row}-${1}`} onClick={this.changeBackground}>{this.state.sayings[(index * 4) + 1]}</td>
            <td id={`${row}-${2}`} onClick={this.changeBackground}>{this.state.sayings[(index * 4) + 2]}</td>
            <td id={`${row}-${3}`} onClick={this.changeBackground}>{this.state.sayings[(index * 4) + 3]}</td>
          </tr>
        </tbody>
      ))}
      </table>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
    this.closeModal = this.closeModal.bind(this)
  }
  closeModal() {
    document.getElementById('pop-up').style.display = 'none'
  }
  render() {
    return (
      <div id="pop-up">
        <span id="close-pop-up" onClick={this.closeModal}>&#10005;</span>
        <span>Bingo!</span>
        <Board />
        <p>Play a game with us! If you hear Jeremy saying one of these things, fill in the square!</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('board'))
