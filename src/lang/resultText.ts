import { getTranslations, type Lang } from "./index";
import { getAnimalNameMap, getElementNameMap } from "../utils/animals";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const replaceAllByMap = (input: string, map: Record<string, string>) => {
    let output = input;
    Object.entries(map).forEach(([from, to]) => {
        if (!from || !to || from === to) {
            return;
        }
        output = output.replace(new RegExp(escapeRegExp(from), "g"), to);
    });
    return output;
};

export const normalizeResultText = (text: string, lang: Lang) => {
    const cleaned = text.replace(/^#{1,6}\s*/gm, "");
    if (lang === "ru") {
        return cleaned;
    }

    const t = getTranslations(lang);

    const labelMap: Record<string, string> = {
        "Архетип": t.archetype,
        "Стихия": t.element,
        "Ценности": t.values,
        "Заключение": t.conclusion,
        "Профиль": t.profile,
        "Энергия": t.energy,
        "Темп": t.tempo,
        "Социальность": t.sociality,
        "Мышление": t.thinking,
        "Конфликты": t.conflicts,
        "Открытые вопросы": t.openQuestions,
    };

    let output = replaceAllByMap(cleaned, labelMap);
    output = replaceAllByMap(output, getElementNameMap(lang));
    output = replaceAllByMap(output, getAnimalNameMap(lang));

    return output;
};