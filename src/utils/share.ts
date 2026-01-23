import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { NativeModules, Share as NativeShare } from "react-native";

import en from "../lang/en";
import es from "../lang/es";
import pt from "../lang/pt";
import ru from "../lang/ru";
import {
    getAnimalRuName,
    type AnimalCode,
    type ElementRu,
    type Gender,
} from "./animals";

export type Lang = "ru" | "en" | "es" | "pt";

type SharePayload = {
    message: string;
    url?: string;
};

const translations = { ru, en, es, pt };

const ELEMENT_KEY_BY_RU: Record<ElementRu, "air" | "water" | "fire" | "earth"> = {
    "Воздух": "air",
    "Вода": "water",
    "Огонь": "fire",
    "Земля": "earth",
};

const ELEMENT_GENITIVE_RU: Record<ElementRu, string> = {
    "Воздух": "Воздуха",
    "Вода": "Воды",
    "Огонь": "Огня",
    "Земля": "Земли",
};

const ANIMALS_ES: Record<AnimalCode, { male: string; female: string }> = {
    Wolf: { male: "Lobo", female: "Loba" },
    Lion: { male: "León", female: "Leona" },
    Tiger: { male: "Tigre", female: "Tigresa" },
    Lynx: { male: "Lince", female: "Lince" },
    Panther: { male: "Pantera", female: "Pantera" },
    Bear: { male: "Oso", female: "Osa" },
    Fox: { male: "Zorro", female: "Zorra" },
    Wolverine: { male: "Glotón", female: "Glotona" },
    Deer: { male: "Ciervo", female: "Cierva" },
    Monkey: { male: "Mono", female: "Mona" },
    Rabbit: { male: "Conejo", female: "Coneja" },
    Buffalo: { male: "Búfalo", female: "Búfala" },
    Ram: { male: "Carnero", female: "Oveja" },
    Capybara: { male: "Capibara", female: "Capibara" },
    Elephant: { male: "Elefante", female: "Elefanta" },
    Horse: { male: "Caballo", female: "Yegua" },
    Eagle: { male: "Águila", female: "Águila" },
    Owl: { male: "Búho", female: "Lechuza" },
    Raven: { male: "Cuervo", female: "Cuerva" },
    Parrot: { male: "Loro", female: "Lora" },
    Snake: { male: "Serpiente", female: "Serpiente" },
    Crocodile: { male: "Cocodrilo", female: "Cocodrilo" },
    Turtle: { male: "Tortuga", female: "Tortuga" },
    Lizard: { male: "Lagarto", female: "Lagarta" },
};

function getLocalizedAnimalName(
    lang: Lang,
    animalCode: AnimalCode,
    genderForm?: Gender
) {
    const gender = genderForm ?? "unspecified";

    if (lang === "ru") {
        return getAnimalRuName(animalCode, gender);
    }

    if (lang === "es") {
        const animal = ANIMALS_ES[animalCode];
        return gender === "female" ? animal.female : animal.male;
    }

    return animalCode;
}

function getLocalizedElementName(lang: Lang, elementCode: ElementRu) {
    if (lang === "ru") {
        return ELEMENT_GENITIVE_RU[elementCode] ?? elementCode;
    }

    const elementKey = ELEMENT_KEY_BY_RU[elementCode];
    const translation = translations[lang]?.elements?.[elementKey];

    return translation ?? elementCode;
}

export function formatArchetypeLine(
    lang: Lang,
    animalCode: AnimalCode,
    elementCode: ElementRu,
    genderForm?: Gender
) {
    const animal = getLocalizedAnimalName(lang, animalCode, genderForm);
    const element = getLocalizedElementName(lang, elementCode);

    return `${animal} ${element}`;
}

export function buildShareMessage(options: {
    lang: Lang;
    animalCode: AnimalCode;
    elementCode: ElementRu;
    genderForm?: Gender;
    appUrl?: string;
}) {
    const { lang, animalCode, elementCode, genderForm, appUrl } = options;
    const archetypeLine = formatArchetypeLine(
        lang,
        animalCode,
        elementCode,
        genderForm
    );
    const prompt = translations[lang]?.shareWhoAreYou ?? "";
    const lines = [archetypeLine, prompt].filter(Boolean);

    if (appUrl) {
        lines.push(appUrl);
    }

    return lines.join("\n");
}

export async function getShareImageUri(imageModule: number) {
    const asset = Asset.fromModule(imageModule);
    await asset.downloadAsync();

    const sourceUri = asset.localUri ?? asset.uri;
    const extension = sourceUri.split(".").pop()?.split("?")[0] ?? "png";
    const baseDir = FileSystem.cacheDirectory ?? FileSystem.documentDirectory;
    if (!baseDir) {
        throw new Error("No cache or document directory available");
    }

    const destination = `${baseDir}archetype-share-${Date.now()}.${extension}`;
    await FileSystem.copyAsync({ from: sourceUri, to: destination });

    return destination;
}

export async function shareResult(options: {
    message: string;
    imageModule?: number | null;
}) {
    const { message, imageModule } = options;
    const url = imageModule ? await getShareImageUri(imageModule) : undefined;
    const payload: SharePayload = url ? { message, url } : { message };

    // react-native-share offers better image+text sharing, but requires an EAS dev build.
    // Fallback to the core Share API when it isn't available (e.g. Expo Go).
    const canUseNativeShare = Boolean(NativeModules?.RNShare);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const shareModule = canUseNativeShare ? require("react-native-share") : null;
    const shareApi = shareModule?.default ?? shareModule;

    if (shareApi?.open) {
        await shareApi.open(payload);
        return;
    }

    await NativeShare.share(payload);
}