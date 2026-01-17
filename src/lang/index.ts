import ru from "./ru";
import en from "./en";
import es from "./es";
import pt from "./pt";
import type { Lang } from "../data/questions";

const translations = { ru, en, es, pt };

export const isLang = (value: string | null | undefined): value is Lang =>
    value === "ru" || value === "en" || value === "es" || value === "pt";

export const getTranslations = (lang?: Lang) => translations[lang ?? "ru"];

export type { Lang };