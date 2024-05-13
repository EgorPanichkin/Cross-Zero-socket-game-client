import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
  const nav = useNavigate()

  const [data, setData] = useState({ user: "", room: "" })
  const handleSubmit = (e) => {
    if (data.user && data.room !== "") {
      e.preventDefault()
      nav(`/game?name=${data.user}&room=${data.room}`)
    }
    return
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        value={data.user}
        onChange={(e) => setData({ ...data, user: e.target.value.trim("") })}
        type="text"
        placeholder="Enter user name"
      />
      <input
        value={data.room}
        onChange={(e) => setData({ ...data, room: e.target.value.trim("") })}
        type="text"
        placeholder="Enter room"
      />
      <button type="submit">Login</button>
    </form>
  )
}
