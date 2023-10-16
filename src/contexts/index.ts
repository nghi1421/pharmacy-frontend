import { 
    SidebarSelectedMenuTitleContext, 
    TemplateThemeModeContext,
 } from './Context';
import { ContextProvider } from './ContextProvider';

export interface TemplateThemeModeContextType {
    isDark: boolean;
    toggleThemeMode: () => void;
}

export { 
    SidebarSelectedMenuTitleContext, 
    TemplateThemeModeContext, 
    ContextProvider 
}