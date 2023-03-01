import { auth } from "../utils/firebaseClient";
import { useMemo, useEffect, useState } from "react";
import serverConfig from "server.config";
import { onAuthStateChanged } from "firebase/auth";
import { getAuthState } from "utils/browserCookieRead";

export const useAuthState = () => {
    const [isLoggedIn, setLoggedIn] = useState(getAuthState());

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, () => {
            console.log("auth changed");
            setLoggedIn(getAuthState());
        });

        return () => unsub();
    }, [isLoggedIn, setLoggedIn]);

    return [isLoggedIn, setLoggedIn];
};
