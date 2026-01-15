
import { Navigate } from "@solidjs/router";
import Authenticated from "../components/Authenticated";

const Root = () => {
  return (
    <Authenticated>
      <Navigate href="/dashboard" />
    </Authenticated>
  )
};

export default Root;
