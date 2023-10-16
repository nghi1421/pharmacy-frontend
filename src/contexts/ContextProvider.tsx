import { useState } from "react";
import { 
    SidebarSelectedMenuTitleContext,  
    TemplateThemeModeContext
} from "./Context";

interface ContextProviderProps{
    children: React.ReactNode
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [isDark, setIsDark] = useState<boolean>(true);
    const toggleThemeMode = () => {
        setIsDark(!isDark)
    }
    const [menuTitle, setMenuTitle] = useState<string>('Home');
    
    return (
        <TemplateThemeModeContext.Provider value={{ isDark, toggleThemeMode }}>
                <SidebarSelectedMenuTitleContext.Provider value={{ menuTitle, setMenuTitle }}>
                    {children}
                </SidebarSelectedMenuTitleContext.Provider>
        </TemplateThemeModeContext.Provider>
    );
  };