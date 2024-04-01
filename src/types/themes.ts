import { Result } from "./search";

export interface ThemeProviderProps {
    children: React.ReactNode;
}
export interface CharacterProviderProps {
    children: React.ReactNode;
}
export interface ThemeContextType {
    colors: Colors;
    toggleTheme: () => void;
}
export type Mode = "light" | "dark"

export type Themes<M extends Mode> = {
    [key in M]: Colors;
}

export type Colors = {
    borderColor : string,
    highlightBGColor:string,
    closeButtonBGColor:string,
    closeButtonColor: string,
    inputButtonColor:string,
    textMdColor: string,
    textSmColor:string
}

  
  export interface CharacterState {
    items: Result[];
  }
  
  export type CharacterAction =
    | { type: 'ADD'; payload: Result }
    | { type: 'REMOVE'; payload: { id: number } }
    | { type: 'REMOVE_ALL'}
  
  // CharacterStateProvider bileşeni için props
  export interface CharacterProviderProps {
    children: React.ReactNode;
  }