import type { ParentProps } from "solid-js";
import { Navbar } from "./components/Navbar";

const App = ({ children }: ParentProps) => {
  return (
    <>
      <Navbar />
      {children}
    </> 
  )
};

export default App;
