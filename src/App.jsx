import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { Game } from "./pages/Game"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "game",
    element: <Game />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
