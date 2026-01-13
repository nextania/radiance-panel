import { Show, type ParentProps } from "solid-js";
import { Navbar } from "./components/Navbar";
import { useTranslate } from "./i18n";
import Authenticated from "./components/Authenticated";

const App = ({ children }: ParentProps) => {
  const t = useTranslate();
  return (
    <Show when={t("generic")}>
      <Authenticated>
        <Navbar />
        {children}
      </Authenticated>
    </Show>
  )
};

export default App;
