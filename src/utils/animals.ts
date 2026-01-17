// src/utils/animals.ts
import type { Lang } from "../data/questions";

export type ElementRu = "Воздух" | "Вода" | "Огонь" | "Земля";

export type AnimalCode =
    | "Wolf" | "Lion" | "Tiger" | "Lynx" | "Panther"
    | "Bear" | "Fox" | "Wolverine" | "Deer" | "Monkey"
    | "Rabbit" | "Buffalo" | "Ram" | "Capybara" | "Elephant"
    | "Horse" | "Eagle" | "Owl" | "Raven" | "Parrot"
    | "Snake" | "Crocodile" | "Turtle" | "Lizard";

export type Gender = "male" | "female" | "unspecified";

export const ELEMENT_TO_NUM: Record<ElementRu, 1 | 2 | 3 | 4> = {
    "Воздух": 1,
    "Вода": 2,
    "Огонь": 3,
    "Земля": 4,
};

export const ANIMAL_RU: Record<AnimalCode, { male: string; female: string }> = {
    Wolf: { male: "Волк", female: "Волчица" },
    Lion: { male: "Лев", female: "Львица" },
    Tiger: { male: "Тигр", female: "Тигрица" },
    Lynx: { male: "Рысь", female: "Рысь" },
    Panther: { male: "Пантера", female: "Пантера" },
    Bear: { male: "Медведь", female: "Медведица" },
    Fox: { male: "Койот", female: "Лиса" },
    Wolverine: { male: "Росомаха", female: "Росомаха" },
    Deer: { male: "Олень", female: "Лань" },
    Monkey: { male: "Обезьяна", female: "Обезьяна" },
    Rabbit: { male: "Кролик", female: "Кролик" },
    Buffalo: { male: "Буйвол", female: "Буйволица" },
    Ram: { male: "Баран", female: "Ибекса" },
    Capybara: { male: "Капибара", female: "Капибара" },
    Elephant: { male: "Слон", female: "Слониха" },
    Horse: { male: "Конь", female: "Лошадь" },
    Eagle: { male: "Орёл", female: "Орлица" },
    Owl: { male: "Филин", female: "Сова" },
    Raven: { male: "Ворон", female: "Ворона" },
    Parrot: { male: "Попугай", female: "Попугаиха" },
    Snake: { male: "Змей", female: "Змея" },
    Crocodile: { male: "Крокодил", female: "Крокодил" },
    Turtle: { male: "Черепаха", female: "Черепаха" },
    Lizard: { male: "Ящерица", female: "Ящерица" },
};

export const ELEMENT_NAMES: Record<Lang, Record<ElementRu, string>> = {
    ru: {
        "Воздух": "Воздух",
        "Вода": "Вода",
        "Огонь": "Огонь",
        "Земля": "Земля",
    },
    en: {
        "Воздух": "Air",
        "Вода": "Water",
        "Огонь": "Fire",
        "Земля": "Earth",
    },
    es: {
        "Воздух": "Aire",
        "Вода": "Agua",
        "Огонь": "Fuego",
        "Земля": "Tierra",
    },
    pt: {
        "Воздух": "Ar",
        "Вода": "Água",
        "Огонь": "Fogo",
        "Земля": "Terra",
    },
};

export const ANIMAL_NAMES: Record<Lang, Record<AnimalCode, { male: string; female: string }>> = {
    ru: ANIMAL_RU,
    en: {
        Wolf: { male: "Wolf", female: "Wolf" },
        Lion: { male: "Lion", female: "Lioness" },
        Tiger: { male: "Tiger", female: "Tigress" },
        Lynx: { male: "Lynx", female: "Lynx" },
        Panther: { male: "Panther", female: "Panther" },
        Bear: { male: "Bear", female: "Bear" },
        Fox: { male: "Fox", female: "Fox" },
        Wolverine: { male: "Wolverine", female: "Wolverine" },
        Deer: { male: "Deer", female: "Deer" },
        Monkey: { male: "Monkey", female: "Monkey" },
        Rabbit: { male: "Rabbit", female: "Rabbit" },
        Buffalo: { male: "Buffalo", female: "Buffalo" },
        Ram: { male: "Ram", female: "Ibex" },
        Capybara: { male: "Capybara", female: "Capybara" },
        Elephant: { male: "Elephant", female: "Elephant" },
        Horse: { male: "Horse", female: "Mare" },
        Eagle: { male: "Eagle", female: "Eagle" },
        Owl: { male: "Owl", female: "Owl" },
        Raven: { male: "Raven", female: "Raven" },
        Parrot: { male: "Parrot", female: "Parrot" },
        Snake: { male: "Snake", female: "Snake" },
        Crocodile: { male: "Crocodile", female: "Crocodile" },
        Turtle: { male: "Turtle", female: "Turtle" },
        Lizard: { male: "Lizard", female: "Lizard" },
    },
    es: {
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
        Ram: { male: "Carnero", female: "Íbice" },
        Capybara: { male: "Capibara", female: "Capibara" },
        Elephant: { male: "Elefante", female: "Elefanta" },
        Horse: { male: "Caballo", female: "Yegua" },
        Eagle: { male: "Águila", female: "Águila" },
        Owl: { male: "Búho", female: "Lechuza" },
        Raven: { male: "Cuervo", female: "Cuerva" },
        Parrot: { male: "Loro", female: "Loro" },
        Snake: { male: "Serpiente", female: "Serpiente" },
        Crocodile: { male: "Cocodrilo", female: "Cocodrilo" },
        Turtle: { male: "Tortuga", female: "Tortuga" },
        Lizard: { male: "Lagarto", female: "Lagarto" },
    },
    pt: {
        Wolf: { male: "Lobo", female: "Loba" },
        Lion: { male: "Leão", female: "Leoa" },
        Tiger: { male: "Tigre", female: "Tigresa" },
        Lynx: { male: "Lince", female: "Lince" },
        Panther: { male: "Pantera", female: "Pantera" },
        Bear: { male: "Urso", female: "Ursa" },
        Fox: { male: "Raposo", female: "Raposa" },
        Wolverine: { male: "Carcaju", female: "Carcaju" },
        Deer: { male: "Veado", female: "Cerva" },
        Monkey: { male: "Macaco", female: "Macaca" },
        Rabbit: { male: "Coelho", female: "Coelha" },
        Buffalo: { male: "Búfalo", female: "Búfala" },
        Ram: { male: "Carneiro", female: "Íbex" },
        Capybara: { male: "Capivara", female: "Capivara" },
        Elephant: { male: "Elefante", female: "Elefanta" },
        Horse: { male: "Cavalo", female: "Égua" },
        Eagle: { male: "Águia", female: "Águia" },
        Owl: { male: "Coruja", female: "Coruja" },
        Raven: { male: "Corvo", female: "Corvo" },
        Parrot: { male: "Papagaio", female: "Papagaia" },
        Snake: { male: "Serpente", female: "Serpente" },
        Crocodile: { male: "Crocodilo", female: "Crocodilo" },
        Turtle: { male: "Tartaruga", female: "Tartaruga" },
        Lizard: { male: "Lagarto", female: "Lagarto" },
    },
};

export function getElementName(element: ElementRu, lang: Lang) {
    return ELEMENT_NAMES[lang][element] ?? element;
}

export function getAnimalName(animal: AnimalCode, gender: Gender, lang: Lang) {
    const g: Gender = gender ?? "unspecified";
    const names = ANIMAL_NAMES[lang] ?? ANIMAL_RU;
    return g === "female" ? names[animal].female : names[animal].male;
}

export function getAnimalNameMap(lang: Lang) {
    const names = ANIMAL_NAMES[lang] ?? ANIMAL_RU;
    const map: Record<string, string> = {};
    (Object.keys(ANIMAL_RU) as AnimalCode[]).forEach((animal) => {
        const ruNames = ANIMAL_RU[animal];
        const localized = names[animal];
        map[ruNames.male] = localized.male;
        map[ruNames.female] = localized.female;
    });
    return map;
}

export function getElementNameMap(lang: Lang) {
    return ELEMENT_NAMES[lang];
}

// у этих зверей есть женская версия файла *_f.png
const FEMALE_IMAGE_SUPPORTED: ReadonlySet<AnimalCode> = new Set<AnimalCode>([
    "Deer",
    "Fox",
    "Lion",
    "Ram",
]);

export function getAnimalRuName(animal: AnimalCode, gender?: Gender | null) {
    const g: Gender = gender ?? "unspecified";
    return g === "female" ? ANIMAL_RU[animal].female : ANIMAL_RU[animal].male;
}

export type GetArchetypeImageArgs = {
    animal: AnimalCode;
    element: ElementRu;
    gender?: Gender | null;
};

/**
 * Возвращает require() на картинку архетипа.
 * Правила:
 * - Bear -> всегда BearX.png (без _f)
 * - Deer/Fox/Lion/Ram -> если gender=female -> *_f.png
 * - остальные -> без _f
 *
 * Файлы: Bear1.png ... Bear4.png, Lion4_f.png и т.д.
 */
export function getArchetypeImage({ animal, element, gender }: GetArchetypeImageArgs) {
    const num = ELEMENT_TO_NUM[element];
    const g: Gender = gender ?? "unspecified";

    const useFemale =
        g === "female" &&
        animal !== "Bear" &&
        FEMALE_IMAGE_SUPPORTED.has(animal);

    const file = useFemale ? `${animal}${num}_f` : `${animal}${num}`;

    const img = IMAGE_MAP[file];
    if (!img) {
        throw new Error(`Image not found for key: ${file}. Check assets naming/path.`);
    }
    return img;
}

/**
 * ВАЖНО: require должен быть статическим для Metro.
 * Ключи: "Bear1", "Lion4_f" и т.д.
 */
const IMAGE_MAP: Record<string, any> = {
    // Wolf
    Wolf1: require("../../assets/images/archetype/Wolf1.png"),
    Wolf2: require("../../assets/images/archetype/Wolf2.png"),
    Wolf3: require("../../assets/images/archetype/Wolf3.png"),
    Wolf4: require("../../assets/images/archetype/Wolf4.png"),

    // Lion (+ female)
    Lion1: require("../../assets/images/archetype/Lion1.png"),
    Lion2: require("../../assets/images/archetype/Lion2.png"),
    Lion3: require("../../assets/images/archetype/Lion3.png"),
    Lion4: require("../../assets/images/archetype/Lion4.png"),
    Lion1_f: require("../../assets/images/archetype/Lion1_f.png"),
    Lion2_f: require("../../assets/images/archetype/Lion2_f.png"),
    Lion3_f: require("../../assets/images/archetype/Lion3_f.png"),
    Lion4_f: require("../../assets/images/archetype/Lion4_f.png"),

    // Tiger
    Tiger1: require("../../assets/images/archetype/Tiger1.png"),
    Tiger2: require("../../assets/images/archetype/Tiger2.png"),
    Tiger3: require("../../assets/images/archetype/Tiger3.png"),
    Tiger4: require("../../assets/images/archetype/Tiger4.png"),

    // Lynx
    Lynx1: require("../../assets/images/archetype/Lynx1.png"),
    Lynx2: require("../../assets/images/archetype/Lynx2.png"),
    Lynx3: require("../../assets/images/archetype/Lynx3.png"),
    Lynx4: require("../../assets/images/archetype/Lynx4.png"),

    // Panther
    Panther1: require("../../assets/images/archetype/Panther1.png"),
    Panther2: require("../../assets/images/archetype/Panther2.png"),
    Panther3: require("../../assets/images/archetype/Panther3.png"),
    Panther4: require("../../assets/images/archetype/Panther4.png"),

    // Bear (без _f)
    Bear1: require("../../assets/images/archetype/Bear1.png"),
    Bear2: require("../../assets/images/archetype/Bear2.png"),
    Bear3: require("../../assets/images/archetype/Bear3.png"),
    Bear4: require("../../assets/images/archetype/Bear4.png"),

    // Fox (+ female)
    Fox1: require("../../assets/images/archetype/Fox1.png"),
    Fox2: require("../../assets/images/archetype/Fox2.png"),
    Fox3: require("../../assets/images/archetype/Fox3.png"),
    Fox4: require("../../assets/images/archetype/Fox4.png"),
    Fox1_f: require("../../assets/images/archetype/Fox1_f.png"),
    Fox2_f: require("../../assets/images/archetype/Fox2_f.png"),
    Fox3_f: require("../../assets/images/archetype/Fox3_f.png"),
    Fox4_f: require("../../assets/images/archetype/Fox4_f.png"),

    // Wolverine
    Wolverine1: require("../../assets/images/archetype/Wolverine1.png"),
    Wolverine2: require("../../assets/images/archetype/Wolverine2.png"),
    Wolverine3: require("../../assets/images/archetype/Wolverine3.png"),
    Wolverine4: require("../../assets/images/archetype/Wolverine4.png"),

    // Deer (+ female)
    Deer1: require("../../assets/images/archetype/Deer1.png"),
    Deer2: require("../../assets/images/archetype/Deer2.png"),
    Deer3: require("../../assets/images/archetype/Deer3.png"),
    Deer4: require("../../assets/images/archetype/Deer4.png"),
    Deer1_f: require("../../assets/images/archetype/Deer1_f.png"),
    Deer2_f: require("../../assets/images/archetype/Deer2_f.png"),
    Deer3_f: require("../../assets/images/archetype/Deer3_f.png"),
    Deer4_f: require("../../assets/images/archetype/Deer4_f.png"),

    // Monkey
    Monkey1: require("../../assets/images/archetype/Monkey1.png"),
    Monkey2: require("../../assets/images/archetype/Monkey2.png"),
    Monkey3: require("../../assets/images/archetype/Monkey3.png"),
    Monkey4: require("../../assets/images/archetype/Monkey4.png"),

    // Rabbit
    Rabbit1: require("../../assets/images/archetype/Rabbit1.png"),
    Rabbit2: require("../../assets/images/archetype/Rabbit2.png"),
    Rabbit3: require("../../assets/images/archetype/Rabbit3.png"),
    Rabbit4: require("../../assets/images/archetype/Rabbit4.png"),

    // Buffalo
    Buffalo1: require("../../assets/images/archetype/Buffalo1.png"),
    Buffalo2: require("../../assets/images/archetype/Buffalo2.png"),
    Buffalo3: require("../../assets/images/archetype/Buffalo3.png"),
    Buffalo4: require("../../assets/images/archetype/Buffalo4.png"),

    // Ram (+ female)
    Ram1: require("../../assets/images/archetype/Ram1.png"),
    Ram2: require("../../assets/images/archetype/Ram2.png"),
    Ram3: require("../../assets/images/archetype/Ram3.png"),
    Ram4: require("../../assets/images/archetype/Ram4.png"),
    Ram1_f: require("../../assets/images/archetype/Ram1_f.png"),
    Ram2_f: require("../../assets/images/archetype/Ram2_f.png"),
    Ram3_f: require("../../assets/images/archetype/Ram3_f.png"),
    Ram4_f: require("../../assets/images/archetype/Ram4_f.png"),

    // Capybara
    Capybara1: require("../../assets/images/archetype/Capybara1.png"),
    Capybara2: require("../../assets/images/archetype/Capybara2.png"),
    Capybara3: require("../../assets/images/archetype/Capybara3.png"),
    Capybara4: require("../../assets/images/archetype/Capybara4.png"),

    // Elephant
    Elephant1: require("../../assets/images/archetype/Elephant1.png"),
    Elephant2: require("../../assets/images/archetype/Elephant2.png"),
    Elephant3: require("../../assets/images/archetype/Elephant3.png"),
    Elephant4: require("../../assets/images/archetype/Elephant4.png"),

    // Horse
    Horse1: require("../../assets/images/archetype/Horse1.png"),
    Horse2: require("../../assets/images/archetype/Horse2.png"),
    Horse3: require("../../assets/images/archetype/Horse3.png"),
    Horse4: require("../../assets/images/archetype/Horse4.png"),

    // Eagle
    Eagle1: require("../../assets/images/archetype/Eagle1.png"),
    Eagle2: require("../../assets/images/archetype/Eagle2.png"),
    Eagle3: require("../../assets/images/archetype/Eagle3.png"),
    Eagle4: require("../../assets/images/archetype/Eagle4.png"),

    // Owl
    Owl1: require("../../assets/images/archetype/Owl1.png"),
    Owl2: require("../../assets/images/archetype/Owl2.png"),
    Owl3: require("../../assets/images/archetype/Owl3.png"),
    Owl4: require("../../assets/images/archetype/Owl4.png"),

    // Raven
    Raven1: require("../../assets/images/archetype/Raven1.png"),
    Raven2: require("../../assets/images/archetype/Raven2.png"),
    Raven3: require("../../assets/images/archetype/Raven3.png"),
    Raven4: require("../../assets/images/archetype/Raven4.png"),

    // Parrot
    Parrot1: require("../../assets/images/archetype/Parrot1.png"),
    Parrot2: require("../../assets/images/archetype/Parrot2.png"),
    Parrot3: require("../../assets/images/archetype/Parrot3.png"),
    Parrot4: require("../../assets/images/archetype/Parrot4.png"),

    // Snake
    Snake1: require("../../assets/images/archetype/Snake1.png"),
    Snake2: require("../../assets/images/archetype/Snake2.png"),
    Snake3: require("../../assets/images/archetype/Snake3.png"),
    Snake4: require("../../assets/images/archetype/Snake4.png"),

    // Crocodile
    Crocodile1: require("../../assets/images/archetype/Crocodile1.png"),
    Crocodile2: require("../../assets/images/archetype/Crocodile2.png"),
    Crocodile3: require("../../assets/images/archetype/Crocodile3.png"),
    Crocodile4: require("../../assets/images/archetype/Crocodile4.png"),

    // Turtle
    Turtle1: require("../../assets/images/archetype/Turtle1.png"),
    Turtle2: require("../../assets/images/archetype/Turtle2.png"),
    Turtle3: require("../../assets/images/archetype/Turtle3.png"),
    Turtle4: require("../../assets/images/archetype/Turtle4.png"),

    // Lizard
    Lizard1: require("../../assets/images/archetype/Lizard1.png"),
    Lizard2: require("../../assets/images/archetype/Lizard2.png"),
    Lizard3: require("../../assets/images/archetype/Lizard3.png"),
    Lizard4: require("../../assets/images/archetype/Lizard4.png"),
};
