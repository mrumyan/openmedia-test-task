import { createContext, useContext } from "react";

export type LinkContextType = string | undefined;

export const LinkContext = createContext<LinkContextType>(undefined);

export const useLink = () => {
    const context = useContext(LinkContext);

    if (context === undefined) {
        throw new Error("useLink must be used within a Provider");
    }

    return context;
};