import { createContext } from "react";
import { TemplateThemeModeContextType } from ".";

export const SidebarSelectedMenuTitleContext =
    createContext({ menuTitle: '', setMenuTitle: (menuTitle: string) => { } });

export const TemplateThemeModeContext = createContext<TemplateThemeModeContextType | null>(null);