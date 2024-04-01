import { Mode, Themes } from "../types/themes"

export const themes:Themes<Mode> = {
    light:{
        borderColor : "rgb(131 146 170)",
        highlightBGColor:"rgb(220 226 237)",
        closeButtonBGColor:"rgb(131,146,170)",
        closeButtonColor: "white",
        inputButtonColor:"rgb(55 67 86)",
        textMdColor: "rgb(55 67 86)",
        textSmColor:"rgb(82,96,120)"
    },
    dark:{
        borderColor : "rgb(131 146 170)",
        highlightBGColor:"rgb(220 226 237)",
        closeButtonBGColor:"rgb(131,146,170)",
        closeButtonColor: "white",
        inputButtonColor:"rgb(55 67 86)",
        textMdColor: "rgb(55 67 86)",
        textSmColor:"rgb(82,96,120)"
    }

}

export const fontSize ={
    sm: 12,
    md: 14,
    lg: 18,
    xl: 24,
    xxl: 32,
}

export const URL = "https://rickandmortyapi.com/api/character/?name="