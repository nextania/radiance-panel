import * as i18n from "@solid-primitives/i18n";

import type * as en from "./locales/en.json";
import { createMemo, createResource } from "solid-js";
import { usePreferences } from "../context";

export type Locale = "en" | "zh-CN";
export type RawDictionary = typeof en;
export type Dictionary = i18n.Flatten<RawDictionary>;

const fetchDictionary = async (locale: Locale): Promise<Dictionary> => {
  const dict: RawDictionary = (await import(`./locales/${locale}.json`));
  return i18n.flatten(dict);
}

export const useTranslate = () => {
  const [preferences] = usePreferences();
  const language = createMemo(() => preferences.locale || "en");

  const [dict] = createResource(language, fetchDictionary);
  
  return i18n.translator(dict, i18n.resolveTemplate);
};
