import type { ParentProps } from "solid-js"
import { Navbar } from "./components/Navbar/Navbar"

function App({ children }: ParentProps) {
  return (
    <div class="app-container">
      <Navbar />
      {children}
    </div>
  )
}

export default App
