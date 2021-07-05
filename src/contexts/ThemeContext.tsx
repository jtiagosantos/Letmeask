import { createContext, ReactNode, useState} from "react";

type ThemeContextProviderProps = {
    children: ReactNode;
};

type ThemeContextType = {
    theme: string;
    setTheme: (string: string) => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
    const [theme, setTheme] = useState('light');

    return(
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { props.children }
        </ThemeContext.Provider>
    );
};