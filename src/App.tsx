import { Show, type ParentProps } from "solid-js";
import { Navbar } from "./components/Navbar";
import { useTranslate } from "./i18n";

const App = ({ children }: ParentProps) => {
  const t = useTranslate();
  return (
    <Show when={t("generic")}>
      <Navbar />
      {children}
    </Show>
  )
};

export default App;
