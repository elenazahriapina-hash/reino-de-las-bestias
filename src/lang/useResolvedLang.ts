import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { isLang, type Lang } from "./index";

export const useResolvedLang = (paramLang?: Lang) => {
    const [resolvedLang, setResolvedLang] = useState<Lang>(paramLang ?? "ru");

    useEffect(() => {
        if (paramLang) {
            setResolvedLang(paramLang);
            return;
        }

        let isActive = true;

        AsyncStorage.getItem("lang").then((saved) => {
            if (isActive && isLang(saved)) {
                setResolvedLang(saved);
            }
        });

        return () => {
            isActive = false;
        };
    }, [paramLang]);

    return resolvedLang;
};