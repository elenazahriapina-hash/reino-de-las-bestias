export type Lang = "ru" | "en" | "es" | "pt";

export type ChoiceOption = "A" | "B" | "C" | "D";

export type Question =
    | {
        id: number;
        type: "choice";
        text: Record<Lang, string>;
        options: Record<Lang, Partial<Record<ChoiceOption, string>>>;
    }
    | {
        id: number;
        type: "open";
        text: Record<Lang, string>;
        placeholder: Record<Lang, string>;
        inputType?: "number";
    };

export const questions: Question[] = [

    // основные данные

    {
        id: 1,
        type: "choice",
        text: {
            ru: "Укажите ваш пол:",
            en: "Please indicate your gender:",
            es: "Indique su género:",
            pt: "Indique o seu género:",
        },
        options: {
            ru: {
                A: "Мужчина",
                B: "Женщина",
                C: "Предпочитаю не указывать",
            },
            en: {
                A: "Male",
                B: "Female",
                C: "Prefer not to say",
            },
            es: {
                A: "Hombre",
                B: "Mujer",
                C: "Prefiero no decirlo",
            },
            pt: {
                A: "Homem",
                B: "Mulher",
                C: "Prefiro não indicar",
            },
        },
    },

    {
        id: 2,
        type: "open",
        inputType: "number",
        text: {
            ru: "Укажите ваш возраст (полных лет):",
            en: "Please enter your age (full years):",
            es: "Indique su edad (en años completos):",
            pt: "Indique a sua idade (em anos completos):",
        },
        placeholder: {
            ru: "Например, 32",
            en: "For example, 32",
            es: "Por ejemplo, 32",
            pt: "Por exemplo, 32",
        },
    },

    // КОНФЛИКТЫ

    {
        id: 3,
        type: "choice",
        text: {
            ru: "Если человек рушит ваши планы в последний момент, вы скорее…",
            en: "If someone ruins your plans at the last moment, you are more likely to…",
            es: "Si alguien arruina tus planes en el último momento, tú…",
            pt: "Se alguém estraga os seus planos no último momento, você tende a…",
        },
        options: {
            ru: {
                A: "Спокойно подстроюсь",
                B: "Скажу, что мне неудобно",
                C: "Раздражусь, но промолчу",
                D: "Могу вспылить",
            },
            en: {
                A: "Calmly adapt",
                B: "Say it’s inconvenient",
                C: "Get annoyed but stay silent",
                D: "May lose my temper",
            },
            es: {
                A: "Me adapto con calma",
                B: "Digo que me resulta incómodo",
                C: "Me irrito pero callo",
                D: "Puedo explotar",
            },
            pt: {
                A: "Adaptar-me com calma",
                B: "Dizer que me é inconveniente",
                C: "Ficar irritado/a, mas calar-me",
                D: "Posso perder a paciência",
            },

        },
    },

    {
        id: 4,
        type: "choice",
        text: {
            ru: "Если вам говорят, что вы неправы, как вы реагируете?",
            en: "If you are told that you are wrong, how do you react?",
            es: "Si le dicen que está equivocado/a, ¿cómo reacciona?",
            pt: "Se lhe dizem que está errado/a, como reage?",

        },
        options: {
            ru: {
                A: "Принимаю и проверяю",
                B: "Спокойно обсуждаю",
                C: "Защищаюсь",
                D: "Спорю до конца",
            },
            en: {
                A: "I accept it and check",
                B: "I discuss it calmly",
                C: "I defend myself",
                D: "I argue until the end",
            },
            es: {
                A: "Lo acepto y lo verifico",
                B: "Lo hablo con calma",
                C: "Me defiendo",
                D: "Discuto hasta el final",
            },
            pt: {
                A: "Aceito e verifico",
                B: "Discuto com calma",
                C: "Defendo-me",
                D: "Discuto até ao fim",
            },

        },
    },

    {
        id: 5,
        type: "choice",
        text: {
            ru: "Если человек нарушает вашу личную границу (критикует, лезет с советами), вы…",
            en: "If someone crosses your personal boundaries (criticizes you or gives unsolicited advice), you…",
            es: "Si una persona invade su espacio personal (critica o da consejos no solicitados), usted…",
            pt: "Se alguém ultrapassa os seus limites pessoais (critica ou dá conselhos não solicitados), você…",

        },
        options: {
            ru: {
                A: "Игнорирую",
                B: "Мягко объясняю",
                C: "Жёстко обозначаю границы",
                D: "Вступаю в конфликт",
            },
            en: {
                A: "I ignore it",
                B: "I explain it gently",
                C: "I set firm boundaries",
                D: "I engage in conflict",
            },
            es: {
                A: "Lo ignoro",
                B: "Lo explico con suavidad",
                C: "Establezco límites de forma firme",
                D: "Entro en conflicto",
            },
            pt: {
                A: "Ignoro",
                B: "Explico de forma suave",
                C: "Defino limites de forma firme",
                D: "Entro em conflito",
            },

        },
    },

    {
        id: 6,
        type: "choice",
        text: {
            ru: "Когда кто-то пытается продавить своё решение через давление, вы…",
            en: "When someone tries to push their decision through pressure, you…",
            es: "Cuando alguien intenta imponer su decisión mediante presión, usted…",
            pt: "Quando alguém tenta impor a sua decisão através de pressão, você…",

        },
        options: {
            ru: {
                A: "Уступаю",
                B: "Ищу компромисс",
                C: "Отстаиваю своё",
                D: "Противостояние лоб в лоб",
            },
            en: {
                A: "I give in",
                B: "I seek a compromise",
                C: "I stand my ground",
                D: "I confront head-on",
            },
            es: {
                A: "Cedo",
                B: "Busco un compromiso",
                C: "Defiendo mi posición",
                D: "Me enfrento directamente",
            },
            pt: {
                A: "Cedo",
                B: "Procuro um compromisso",
                C: "Defendo a minha posição",
                D: "Enfrento diretamente",
            },

        },
    },

    // ЭНЕРГИЯ

    {
        id: 7,
        type: "choice",
        text: {
            ru: "Как вы чувствуете себя в течение дня?",
            en: "How do you feel throughout the day?",
            es: "¿Cómo se siente a lo largo del día?",
            pt: "Como se sente ao longo do dia?",

        },
        options: {
            ru: {
                A: "Спокойно, стабильно",
                B: "Ровная энергия",
                C: "Волнами",
                D: "Очень высокий уровень энергии",
            },
            en: {
                A: "Calm and stable",
                B: "Steady energy",
                C: "In waves",
                D: "A very high level of energy",
            },
            es: {
                A: "Tranquilo/a, estable",
                B: "Energía constante",
                C: "En oleadas",
                D: "Un nivel de energía muy alto",
            },
            pt: {
                A: "Calmo/a e estável",
                B: "Energia constante",
                C: "Em ondas",
                D: "Um nível de energia muito elevado",
            },

        },
    },

    {
        id: 8,
        type: "choice",
        text: {
            ru: "Как реагируете на стресс?",
            en: "How do you react to stress?",
            es: "¿Cómo reacciona ante el estrés?",
            pt: "Como reage ao stress?",

        },
        options: {
            ru: {
                A: "Закрываюсь",
                B: "Сдерживаюсь",
                C: "Активизируюсь",
                D: "Вхожу в режим максимальной активности",
            },
            en: {
                A: "I withdraw",
                B: "I hold myself back",
                C: "I become more active",
                D: "I enter a state of maximum activity",
            },
            es: {
                A: "Me cierro",
                B: "Me contengo",
                C: "Me activo",
                D: "Entro en un estado de máxima actividad",
            },
            pt: {
                A: "Fecho-me",
                B: "Contenho-me",
                C: "Activo-me",
                D: "Entro num estado de máxima actividade",
            },

        },
    },

    {
        id: 9,
        type: "choice",
        text: {
            ru: "Как действует вдохновение?",
            en: "How does inspiration affect you?",
            es: "¿Cómo actúa la inspiración?",
            pt: "Como actua a inspiração?",

        },
        options: {
            ru: {
                A: "Слабо влияет",
                B: "Даёт небольшой подъём",
                C: "Включает креатив",
                D: "Взрывной поток энергии",
            },
            en: {
                A: "Has little influence",
                B: "Gives a slight boost",
                C: "Activates creativity",
                D: "An explosive flow of energy",
            },
            es: {
                A: "Influye débilmente",
                B: "Da un pequeño impulso",
                C: "Activa la creatividad",
                D: "Un flujo explosivo de energía",
            },
            pt: {
                A: "Tem pouca influência",
                B: "Dá um pequeno impulso",
                C: "Activa a criatividade",
                D: "Um fluxo explosivo de energia",
            },

        },
    },

    {
        id: 10,
        type: "choice",
        text: {
            ru: "Как вы восстанавливаетесь?",
            en: "How do you recover?",
            es: "¿Cómo se recupera?",
            pt: "Como recupera?",

        },
        options: {
            ru: {
                A: "Очень медленно",
                B: "Постепенно",
                C: "Быстро",
                D: "Мгновенно",
            },
            en: {
                A: "Very slowly",
                B: "Gradually",
                C: "Quickly",
                D: "Instantly",
            },
            es: {
                A: "Muy lentamente",
                B: "De forma gradual",
                C: "Rápidamente",
                D: "De inmediato",
            },
            pt: {
                A: "Muito lentamente",
                B: "De forma gradual",
                C: "Rapidamente",
                D: "De imediato",
            },

        },
    },

    // ТЕМП

    {
        id: 11,
        type: "choice",
        text: {
            ru: "Ваш рабочий ритм?",
            en: "What is your work pace?",
            es: "¿Cuál es su ritmo de trabajo?",
            pt: "Qual é o seu ritmo de trabalho?",

        },
        options: {
            ru: {
                A: "Медленный",
                B: "Ровный",
                C: "Быстрый",
                D: "Очень быстрый",
            },
            en: {
                A: "Slow",
                B: "Steady",
                C: "Fast",
                D: "Very fast",
            },
            es: {
                A: "Lento",
                B: "Constante",
                C: "Rápido",
                D: "Muy rápido",
            },
            pt: {
                A: "Lento",
                B: "Constante",
                C: "Rápido",
                D: "Muito rápido",
            },

        },
    },

    {
        id: 12,
        type: "choice",
        text: {
            ru: "Как быстро принимаете решения?",
            en: "How quickly do you make decisions?",
            es: "¿Cómo de rápido toma decisiones?",
            pt: "Com que rapidez toma decisões?",

        },
        options: {
            ru: {
                A: "Долго думаю",
                B: "Нужна структура",
                C: "Быстро оцениваю и решаю",
                D: "Мгновенно",
            },
            en: {
                A: "I think for a long time",
                B: "I need structure",
                C: "I assess quickly and decide",
                D: "Immediately",
            },
            es: {
                A: "Pienso durante mucho tiempo",
                B: "Necesito estructura",
                C: "Evalúo rápido y decido",
                D: "De inmediato",
            },
            pt: {
                A: "Penso durante muito tempo",
                B: "Preciso de estrutura",
                C: "Avalio rapidamente e decido",
                D: "De imediato",
            },

        },
    },

    {
        id: 13,
        type: "choice",
        text: {
            ru: "Ваш способ входить в новое?",
            en: "How do you approach something new?",
            es: "¿Cómo entra en algo nuevo?",
            pt: "Qual é a sua forma de entrar em algo novo?",

        },
        options: {
            ru: {
                A: "Осторожно",
                B: "Постепенно",
                C: "Быстро включаюсь",
                D: "Сразу прыгаю в процесс",
            },
            en: {
                A: "Cautiously",
                B: "Gradually",
                C: "I get involved quickly",
                D: "I jump straight into the process",
            },
            es: {
                A: "Con cautela",
                B: "De forma gradual",
                C: "Me involucro rápidamente",
                D: "Me lanzo directamente al proceso",
            },
            pt: {
                A: "Com cautela",
                B: "De forma gradual",
                C: "Envolvo-me rapidamente",
                D: "Mergulho logo no processo",
            },

        },
    },

    {
        id: 14,
        type: "choice",
        text: {
            ru: "Как реагируете на многозадачность?",
            en: "How do you react to multitasking?",
            es: "¿Cómo reacciona ante la multitarea?",
            pt: "Como reage à multitarefa?",

        },
        options: {
            ru: {
                A: "Плохо",
                B: "Справляюсь",
                C: "Хорошо",
                D: "Лечу на максималках",
            },
            en: {
                A: "Poorly",
                B: "I manage",
                C: "Well",
                D: "I operate at full throttle",
            },
            es: {
                A: "Mal",
                B: "Me las arreglo",
                C: "Bien",
                D: "Funciono al máximo",
            },
            pt: {
                A: "Mal",
                B: "Dou conta do recado",
                C: "Bem",
                D: "Funciono no máximo",
            },
        },


    },

    // СОЦИАЛЬНОСТЬ

    {
        id: 15,
        type: "choice",
        text: {
            ru: "Как вы чувствуете себя в компании людей?",
            en: "How do you feel in the company of others?",
            es: "¿Cómo se siente en compañía de otras personas?",
            pt: "Como se sente na companhia de outras pessoas?",

        },
        options: {
            ru: {
                A: "Предпочитаю одиночество",
                B: "Маленькие группы",
                C: "Большие группы",
                D: "Обожаю внимание",
            },
            en: {
                A: "I prefer being alone",
                B: "Small groups",
                C: "Large groups",
                D: "I love attention",
            },
            es: {
                A: "Prefiero estar solo/a",
                B: "Grupos pequeños",
                C: "Grupos grandes",
                D: "Me encanta la atención",
            },
            pt: {
                A: "Prefiro estar sozinho/a",
                B: "Grupos pequenos",
                C: "Grupos grandes",
                D: "Adoro atenção",
            },

        },
    },

    {
        id: 16,
        type: "choice",
        text: {
            ru: "Как предпочитаете общаться?",
            en: "How do you prefer to communicate?",
            es: "¿Cómo prefiere comunicarse?",
            pt: "Como prefere comunicar?",

        },
        options: {
            ru: {
                A: "Мало и по делу",
                B: "Спокойные беседы",
                C: "Активное общение",
                D: "Шумные компании, драйв",
            },
            en: {
                A: "Brief and to the point",
                B: "Calm conversations",
                C: "Active communication",
                D: "Loud groups and excitement",
            },
            es: {
                A: "Poco y al grano",
                B: "Conversaciones tranquilas",
                C: "Comunicación activa",
                D: "Ambientes ruidosos y energía",
            },
            pt: {
                A: "Pouco e objectivamente",
                B: "Conversas tranquilas",
                C: "Comunicação activa",
                D: "Ambientes ruidosos e energia",
            },

        },
    },

    {
        id: 17,
        type: "choice",
        text: {
            ru: "Как часто вам нужно общение?",
            en: "How often do you need social interaction?",
            es: "¿Con qué frecuencia necesita interacción social?",
            pt: "Com que frequência precisa de interacção social?",

        },
        options: {
            ru: {
                A: "Очень мало",
                B: "Умеренно",
                C: "Часто",
                D: "Постоянно",
            },
            en: {
                A: "Very rarely",
                B: "Moderately",
                C: "Often",
                D: "Constantly",
            },
            es: {
                A: "Muy poco",
                B: "De forma moderada",
                C: "Con frecuencia",
                D: "Constantemente",
            },
            pt: {
                A: "Muito pouco",
                B: "De forma moderada",
                C: "Com frequência",
                D: "Constantemente",
            },

        },
    },

    {
        id: 18,
        type: "choice",
        text: {
            ru: "Как реагируете на новых людей?",
            en: "How do you react to new people?",
            es: "¿Cómo reacciona ante personas nuevas?",
            pt: "Como reage a pessoas novas?",

        },
        options: {
            ru: {
                A: "Недоверие",
                B: "Спокойно",
                C: "Открыто",
                D: "Очень активно",
            },
            en: {
                A: "With distrust",
                B: "Calmly",
                C: "Openly",
                D: "Very actively",
            },
            es: {
                A: "Con desconfianza",
                B: "Con calma",
                C: "De forma abierta",
                D: "Muy activamente",
            },
            pt: {
                A: "Com desconfiança",
                B: "Com calma",
                C: "De forma aberta",
                D: "Muito activamente",
            },

        },
    },

    // МЫШЛЕНИЕ

    {
        id: 19,
        type: "choice",
        text: {
            ru: "Как решаете задачи?",
            en: "How do you solve tasks?",
            es: "¿Cómo resuelve las tareas?",
            pt: "Como resolve tarefas?",

        },
        options: {
            ru: {
                A: "По инструкции",
                B: "По принципам",
                C: "Ищу нестандартные подходы",
                D: "Интуитивно",
            },
            en: {
                A: "By following instructions",
                B: "By principles",
                C: "I look for unconventional approaches",
                D: "Intuitively",
            },
            es: {
                A: "Siguiendo instrucciones",
                B: "Según principios",
                C: "Busco enfoques no convencionales",
                D: "De forma intuitiva",
            },
            pt: {
                A: "Seguindo instruções",
                B: "Com base em princípios",
                C: "Procuro abordagens fora do comum",
                D: "De forma intuitiva",
            },

        },
    },

    {
        id: 20,
        type: "choice",
        text: {
            ru: "Как воспринимаете информацию?",
            en: "How do you perceive information?",
            es: "¿Cómo percibe la información?",
            pt: "Como percebe a informação?",

        },
        options: {
            ru: {
                A: "Чёткие инструкции",
                B: "Нужна структура",
                C: "Через аналогии",
                D: "Через образы",
            },
            en: {
                A: "Clear instructions",
                B: "I need structure",
                C: "Through analogies",
                D: "Through images",
            },
            es: {
                A: "Instrucciones claras",
                B: "Necesito estructura",
                C: "A través de analogías",
                D: "A través de imágenes",
            },
            pt: {
                A: "Instruções claras",
                B: "Preciso de estrutura",
                C: "Através de analogias",
                D: "Através de imagens",
            },

        },
    },

    {
        id: 21,
        type: "choice",
        text: {
            ru: "Действия в неопределённости?",
            en: "How do you act in uncertainty?",
            es: "¿Cómo actúa ante la incertidumbre?",
            pt: "Como actua em situações de incerteza?",

        },
        options: {
            ru: {
                A: "Жду ясности",
                B: "Собираю информацию",
                C: "Действую без полной ясности",
                D: "Двигаюсь уверенно в хаосе",
            },
            en: {
                A: "I wait for clarity",
                B: "I gather information",
                C: "I act without full clarity",
                D: "I move confidently in chaos",
            },
            es: {
                A: "Espero claridad",
                B: "Recojo información",
                C: "Actúo sin claridad total",
                D: "Avanzo con confianza en el caos",
            },
            pt: {
                A: "Espero por clareza",
                B: "Recolho informação",
                C: "Actuo sem clareza total",
                D: "Avanço com confiança no caos",
            },

        },
    },

    {
        id: 22,
        type: "choice",
        text: {
            ru: "Как планируете работу?",
            en: "How do you plan your work?",
            es: "¿Cómo planifica su trabajo?",
            pt: "Como planeia o trabalho?",

        },
        options: {
            ru: {
                A: "Чёткий план",
                B: "План + гибкость",
                C: "Ориентир, без плана",
                D: "Не планирую",
            },
            en: {
                A: "A clear plan",
                B: "A plan with flexibility",
                C: "A general direction, no plan",
                D: "I don’t plan",
            },
            es: {
                A: "Un plan claro",
                B: "Plan con flexibilidad",
                C: "Un marco general, sin plan",
                D: "No planifico",
            },
            pt: {
                A: "Plano claro",
                B: "Plano com flexibilidade",
                C: "Um rumo geral, sem plano",
                D: "Não planeio",
            },

        },
    },

    {
        id: 23,
        type: "choice",
        text: {
            ru: "Как приходят идеи?",
            en: "How do ideas come to you?",
            es: "¿Cómo surgen las ideas?",
            pt: "Como surgem as ideias?",

        },
        options: {
            ru: {
                A: "Анализ",
                B: "Размышления",
                C: "Ассоциации",
                D: "Интуитивные вспышки",
            },
            en: {
                A: "Through analysis",
                B: "Through reflection",
                C: "Through associations",
                D: "Intuitive flashes",
            },
            es: {
                A: "A través del análisis",
                B: "A través de la reflexión",
                C: "A través de asociaciones",
                D: "Destellos intuitivos",
            },
            pt: {
                A: "Através da análise",
                B: "Através da reflexão",
                C: "Através de associações",
                D: "Eclosões intuitivas",
            },
        },


    },

    // ОТКРЫТЫЕ ВОПРОСЫ

    {
        id: 24,
        type: "open",
        text: {
            ru: "Расскажите про вашего начальника, руководителя или другого человека, который оказывает на вас влияние. Кто он, как вы можете его описать?",
            en: "Tell us about your boss, manager, or another person who influences you. Who are they, and how would you describe them?",
            es: "Cuéntenos sobre su jefe, supervisor u otra persona que tenga influencia en usted. ¿Quién es y cómo lo describiría?",
            pt: "Fale-nos sobre o seu chefe, responsável ou outra pessoa que exerce influência sobre si. Quem é essa pessoa e como a descreveria?",

        },
        placeholder: {
            ru: "Напишите здесь…",
            en: "Write here…",
            es: "Escribe aquí…",
            pt: "Escreva aqui…",

        },
    },

    {
        id: 25,
        type: "open",
        text: {
            ru: "Вспомните момент, когда вам было по-настоящему хорошо и «на своём месте». Где вы были и что делали?",
            en: "Recall a moment when you truly felt good and in the right place. Where were you and what were you doing?",
            es: "Recuerde un momento en el que se sintió realmente bien y en su lugar. ¿Dónde estaba y qué estaba haciendo?",
            pt: "Recorde um momento em que se sentiu verdadeiramente bem e no seu lugar. Onde estava e o que estava a fazer?",

        },
        placeholder: {
            ru: "Напишите здесь…",
            en: "Write here…",
            es: "Escribe aquí…",
            pt: "Escreva aqui…",

        },
    },

    {
        id: 26,
        type: "open",
        text: {
            ru: "Оказавшись в новом месте, что вы замечаете в первую очередь: людей, детали или общую атмосферу?",
            en: "When you find yourself in a new place, what do you notice first: people, details, or the overall atmosphere?",
            es: "Al encontrarse en un lugar nuevo, ¿qué nota primero: a las personas, los detalles o la atmósfera general?",
            pt: "Ao chegar a um lugar novo, o que nota primeiro: as pessoas, os detalhes ou a atmosfera geral?",

        },
        placeholder: {
            ru: "Напишите здесь…",
            en: "Write here…",
            es: "Escribe aquí…",
            pt: "Escreva aqui…",

        },
    },

    {
        id: 27,
        type: "open",
        text: {
            ru: "Представьте, что через год у вас всё сложилось идеально. Какая это жизнь? Что вы делаете, какие люди рядом?",
            en: "Imagine that in a year everything has worked out perfectly for you. What is your life like? What are you doing, and who is around you?",
            es: "Imagine que dentro de un año todo ha salido perfectamente para usted. ¿Cómo es esa vida? ¿Qué está haciendo y qué personas lo rodean?",
            pt: "Imagine que daqui a um ano tudo correu na perfeição. Como é essa vida? O que está a fazer e que pessoas estão consigo?",

        },
        placeholder: {
            ru: "Напишите здесь…",
            en: "Write here…",
            es: "Escribe aquí…",
            pt: "Escreva aqui…",

        },
    },

    {
        id: 28,
        type: "open",
        text: {
            ru: "Вспомните любой момент из фильма, сериала, книги, видео, статьи или из жизни, который вам особенно запомнился. Что именно это было и почему вы это запомнили?",
            en: "Recall any moment from a movie, series, book, video, article, or real life that particularly stayed with you. What was it, and why did you remember it?",
            es: "Recuerde cualquier momento de una película, serie, libro, video, artículo o de su vida que le haya quedado especialmente grabado. ¿Qué fue y por qué lo recuerda?",
            pt: "Recorde qualquer momento de um filme, série, livro, vídeo, artigo ou da sua vida que lhe tenha ficado especialmente marcado. O que foi e porque se lembra disso?",

        },
        placeholder: {
            ru: "Напишите здесь…",
            en: "Write here…",
            es: "Escribe aquí…",
            pt: "Escreva aqui…",

        },
    },

    {
        id: 29,
        type: "open",
        text: {
            ru: "Что важнее — порядок или гибкость?",
            en: "What is more important: order or flexibility?",
            es: "¿Qué es más importante: el orden o la flexibilidad?",
            pt: "O que é mais importante: ordem ou flexibilidade?",

        },
        placeholder: {
            ru: "Напишите здесь…",
            en: "Write here…",
            es: "Escribe aquí…",
            pt: "Escreva aqui…",

        },
    },

    {
        id: 30,
        type: "open",
        text: {
            ru: "Что чаще всего мешает людям доводить дела до конца?",
            en: "What most often prevents people from finishing what they start?",
            es: "¿Qué es lo que con más frecuencia impide a las personas terminar lo que empiezan?",
            pt: "O que mais frequentemente impede as pessoas de levar as coisas até ao fim?",

        },
        placeholder: {
            ru: "Напишите здесь…",
            en: "Write here…",
            es: "Escribe aquí…",
            pt: "Escreva aqui…",

        },
    },

    {
        id: 31,
        type: "open",
        text: {
            ru: "Есть ли что-то важное о себе, что вы хотели бы дополнительно рассказать? Что вас волнует? Любая деталь может помочь лучше понять ваш внутренний мир.",
            en: "Is there anything important about yourself that you would like to share additionally? What concerns you? Any detail may help better understand your inner world.",
            es: "¿Hay algo importante sobre usted que le gustaría contar adicionalmente? ¿Qué le preocupa? Cualquier detalle puede ayudar a comprender mejor su mundo interior.",
            pt: "Há algo importante sobre si que gostaria de acrescentar? O que o/a preocupa? Qualquer detalhe pode ajudar a compreender melhor o seu mundo interior.",

        },
        placeholder: {
            ru: "Напишите здесь…",
            en: "Write here…",
            es: "Escribe aquí…",
            pt: "Escreva aqui…",

        },
    },

];
