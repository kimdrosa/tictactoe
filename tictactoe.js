
const readline = require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

let startgame = function() {
	console.log('*New Game*')
	rl.question('how many rows would you like to use?', (ans) => {
		let board = new Board(ans)
	})
}

class Board {
	constructor(rows){
		this.num_rows = rows
		this.board = []

		//x always goes first
		this.turn = 'X'
		this.turnCount = 0
		this.makeRows()
		console.log(this.printPrettyBoard())
		this.promptTurn()
	}

	makeRows(){
		for(let i = 0; i < this.num_rows; i++){
			let currentRow = []
			for(let j = 0; j < this.num_rows; j++){
				currentRow.push(' ')
			}
			this.board.push(currentRow)
		}
	}

	printBoard() {
		for(let i = 0; i < this.num_rows; i++){
			console.log(this.board[i])
		}
	}

	printPrettyBoard() {
		let prettyBoard = []
		let topRow = ""

		for(let i=0; i < this.num_rows; i++){
			topRow += "  " + i + " "
		}

		console.log(topRow)
		console.log(" ")
		for (let j = 0; j < this.board.length; j++){
			let currentRow = ""
			currentRow += j
			let nextRow = ""
			for (let k = 0; k < this.board.length; k++){
				if (k === this.board.length - 1){
					currentRow += ' ' + this.board[j][k]
					nextRow += "----"
				} else {
					currentRow += ' '+ this.board[j][k] + ' |'
					nextRow += "----"
				}
			}
			prettyBoard.push(currentRow)
			if(j < this.board.length - 1){
				prettyBoard.push(nextRow)
			}
			
		}

		for(let l = 0; l < prettyBoard.length; l++){
			console.log(prettyBoard[l])
		}
	}

	clearBoard(){
		this.board = []
		this.makeRows()
	}

	aiTurn(){
		for(let i = 0; i < num_rows; i++){
			for(let j = 0; j < num_rows; j++){
				if(this.board[i][j] === ' '){
					this.board[i][j] === this.turn
				}
			}
		}
	}

	promptTurn(){
		rl.question(this.turn + ' player turn, input coordinates like this: x,y' , (coords) => {
			let coordArray = coords.split(',')
			this.playerTurn(coordArray[0], coordArray[1])
		})
	}

	playerTurn(x = null,y = null){
		if(x === null || y === null){
			this.promptTurn()
		} else {

			if(this.board[x][y] === ' ') {
				this.board[x][y] = this.turn
				this.printPrettyBoard()
				if(this.checkWin(x,y)){
						console.log(this.turn + ' player wins !!!')
						startgame()
					} else {
						this.turn = this.turn == 'X' ? 'O' : 'X'
						this.turnCount++
						if(this.checkDraw()){
							console.log('its a draw !')
							startgame()
						} else {
							this.promptTurn()
						}
					}
			} else {
				console.log('spot is already occupied!')
				this.playerTurn()
			}
		}
	}

	checkDraw(){
		if(this.turnCount === this.num_rows * this.num_rows){
			return true
		} else {
			return false
		}

	}

	checkHorizontal(x,y){
		let horizontal = true
		for(let i = 0; i < this.num_rows; i++){
			if(this.board[x][i] !== this.turn){
				horizontal = false
			}
		}

		return horizontal
	}

	checkVertical(x,y){
		let vertical = true
		for(let j = 0; j < this.num_rows; j++){
			if(this.board[j][y] !== this.turn){
				vertical = false
			}
		}

		return vertical
	}

	checkDiagonal(x,y){
		let diagonal = true
		if(x === y || x + y === this.num_rows - 1) {
			let leftRight = true
			let RightLeft = true
			for(let k = 0; k < this.num_rows; k++){
				for(let l = 0; l < this.num_rows; l++){
					if(k === l && this.board[k][l] !== this.turn){
						leftRight = false
					}
					if(k + l === this.num_rows - 1 && this.board[k][l] != this.turn){
						RightLeft = false
					}
				}
			}
			diagonal = leftRight || RightLeft
		} else {
			diagonal = false
		}

		return diagonal
	}

	checkWin(x,y){	
		if(this.checkHorizontal(x,y) || this.checkVertical(x,y) || this.checkDiagonal(x,y)){
			return true
		} else {
			return false
		}
	}
}

startgame()




