import { useEffect, useState } from "react"
import { GameBoard } from "../components/GameBoard"
import io from "socket.io-client"
import { useLocation } from "react-router-dom"

const socket = io.connect("http://localhost:5000")

export const Game = () => {
  const { search } = useLocation()
  const [room, setRoom] = useState("")
  const [id, setId] = useState(null)
  const [users, setUsers] = useState([])
  const [players, setPlayers] = useState({
    player1: { name: "...waiting", shape: "", turn: false },
    player2: { name: "...waiting", shape: "", turn: false },
  })
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [result, setResult] = useState("Waiting players...")

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    setRoom(searchParams.room)
    socket.emit("join", searchParams)
  }, [])

  useEffect(() => {
    socket.on("users", ({ users }) => {
      console.log(users)
      setUsers(users)
    })
    socket.on("start", (choose) => {
      const state = { ...players }
      console.log(choose.id)
      state[choose.id].name = choose.name
      state[choose.id].shape = choose.shape
      state[choose.id].turn = choose.turn
      setPlayers(state)
    })
    socket.on("turn", ({ board, id, turn }) => {
      const state = { ...players }
      state[id].turn = turn
      setResult("")
      setPlayers(state)
      setBoard(board)
    })
    socket.on("result", ({ board, id }) => {
      setBoard(board)
      console.log(id)
      setResult(`Player ${players[id].name} win`)
      console.log(board, id)
      const state = { ...players }
      state.player1.turn = false
      state.player2.turn = false
      console.log(state)
      setPlayers(state)
    })
  }, [])

  const handleChoosingSide = (choose) => {
    setId(choose.id)
    socket.emit("start", { choose })
  }

  return (
    <>
      <ul className="userList">
        {users.map((u, i) => {
          return <li key={i}>{u.name}</li>
        })}
      </ul>
      <h1 className="header">Комната: {room}</h1>
      <h2 className="header">{result}</h2>
      <div className="container">
        <div onClick={() => handleChoosingSide({ id: "player1", shape: "X" })} className="player">
          <p>Player 1</p>
          <p>shape: X</p>
          <p>{players.player1.name}</p>
        </div>
        <GameBoard
          socket={socket}
          id={id}
          board={board}
          setBoard={setBoard}
          shape={players[id]?.shape}
          active={players[id]?.turn}
        />
        <div onClick={() => handleChoosingSide({ id: "player2", shape: "O" })} className="player">
          <p>Player 2</p>
          <p>shape: O</p>
          <p>{players.player2.name}</p>
        </div>
      </div>
    </>
  )
}
