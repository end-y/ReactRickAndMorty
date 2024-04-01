import { FC, useCallback, useEffect } from "react"
import { useCharacterDispatch, useCharacterState } from "../../../contexts/characters"
import { useTheme } from "../../../contexts/themes"
import styles from "../../../styles/search.module.css"
import { SearchInputProps } from "../../../types/search"

const SearchInput:FC<SearchInputProps> = ({value, isChosen, handleChange, setIsChosen}) => {
    const {colors} = useTheme()
    const { items } = useCharacterState();
    const dispatch = useCharacterDispatch();
    const handleSetIsChosen = useCallback(() => {
        if (items.length === 0) {
            setIsChosen(true);
        }
    }, [items, setIsChosen]);

    useEffect(() => {
        handleSetIsChosen();
    }, [handleSetIsChosen]);

    
    return(      
    <div className={styles.card} style={{border:`1.5px solid ${colors.borderColor}`}}>
        { items && items.length !== 0 && 
            <>
                {items.length > 0 && items.length <= 1 ? 
                    <div key={items[0].id} className={styles.cardName} style={{backgroundColor:colors.highlightBGColor}}>
                        <p>{items[0].name}</p>
                        <span onClick={ () => dispatch({ type: "REMOVE_ALL"})} style={{backgroundColor:colors.closeButtonBGColor, color:colors.closeButtonColor}} className={["material-symbols-outlined",styles.cardCloseButton].join(" ")}>
                        close
                        </span>
                    </div> :
                    <div onClick={() => setIsChosen(!isChosen)} className={styles.cardName} style={{backgroundColor:colors.highlightBGColor, cursor:"pointer"}}>
                        <p>{items.length} characters</p>
                    </div>
                }
            </>
        }
        
        <input value={value} onChange={handleChange} className={styles.cardSearchInput} type={"search"} />
        <span style={{color: colors.inputButtonColor}} className={["material-symbols-outlined",styles.cardArrowDownIcon].join(" ")} >
            arrow_drop_down
        </span>
    </div>)
}

export default SearchInput