import React, { Component } from 'react';
import nextId from 'react-id-generator';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
	static defaultProps = {
		title               : 'Lights Out!',
		numRows             : 5,
		numCols             : 5,
		chanceLightStartsOn : 0.25
	};

	constructor(props) {
		super(props);

		this.state = {
			hasWon : false,
			board  : this.createBoard()
		};

		// Bind all class functions
		this.flipCellsAround = this.flipCellsAround.bind(this);
	}

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */

	createBoard() {
		let numCols = this.props.numCols;
		let numRows = this.props.numRows;
		let chanceOn = this.props.chanceLightStartsOn;
		let board = [];

		for (let i = 0; i < numRows; i++) {
			board.push([]);
			for (let j = 0; j < numCols; j++) {
				let rand = Math.random();
				let isOn = rand <= chanceOn;

				// Add new tile to board
				board[i].push(isOn);
			}
		}

		return board;
	}

	/** handle changing a cell: update board & determine if winner */

	flipCellsAround(coord) {
		let { numCols, numRows } = this.props;
		let board = this.state.board;
		let { x, y } = coord;

		console.log(x, y);

		function flipCell(y, x) {
			// if this coord is actually on board, flip it

			if (x >= 0 && x < numCols && y >= 0 && y < numRows) {
				board[x][y] = !board[x][y];
			}
		}

		// Flip this and cells around
		flipCell(x, y); // Flip this cell
		flipCell(x - 1, y); // Flip cell to left
		flipCell(x + 1, y); // Flip cell to right
		flipCell(x, y + 1); // Flip cell above
		flipCell(x, y - 1); // Flip cell below

		// win when every cell is turned off
		let hasWon = true;
		for (let i = 0; i < this.props.numRows; i++) {
			for (let j = 0; j < this.props.numCols; j++)
				if (board[i][j]) {
					hasWon = false;
				}
		}

		// Reset the state
		this.setState({ board: board, hasWon: hasWon });
	}

	/** Render game board or winning message. */

	render() {
		return this.state.hasWon ? (
			<div className='Board-Win-Center'>
				<p>
					<span className='neon-orange'>You</span>
					<span className='neon-blue'>Win!</span>
				</p>
			</div>
		) : (
			<div>
				<div className='Board-Title'>
					<div className='neon-orange'>Lights</div>
					<div className='neon-blue'>Out</div>
				</div>
				<table className='Board'>
					<tbody>
						{this.state.board.map((row, y) => {
							return (
								<tr key={nextId()}>
									{row.map((col, x) => {
										return (
											<Cell
												key={nextId()}
												isLit={col}
												flipCellsAroundMe={() => {
													this.flipCellsAround({ x: x, y: y });
												}}
											/>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Board;
