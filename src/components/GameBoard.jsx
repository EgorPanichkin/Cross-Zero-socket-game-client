import { Cross } from "./Cross"
import { Zero } from "./Zero"

export const GameBoard = ({ socket, id, board, setBoard, shape, active }) => {
  const handleTurn = (target) => {
    const isClear = board[target.id] === ""
    if (active && isClear) {
      const newBoard = [...board]
      newBoard[target.id] = shape
      setBoard(newBoard)
      socket.emit("turn", { board: newBoard, id })
    }
  }

  return (
    <div className="board">
      {board.map((item, index) => {
        return (
          <div
            id={index}
            className={`cell ${active === true && item === "" ? "active" : null}`}
            onClick={(event) => handleTurn(event.target)}
            key={index}
          >
            {item === "X" && <Cross />}
            {item === "O" && <Zero />}
          </div>
        )
      })}
    </div>
  )
}
