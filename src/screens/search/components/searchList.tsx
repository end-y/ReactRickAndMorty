import { FC, useEffect, useRef, useState } from "react";
import { fontSize } from "../../../constants/constants";
import { useCharacterDispatch, useCharacterState } from "../../../contexts/characters";
import { useTheme } from "../../../contexts/themes";
import styles from "../../../styles/search.module.css"
import { Result, SearchListProps } from "../../../types/search";

const SearchList:FC<SearchListProps> = ({
    data, 
    chosen, 
    loading, 
    value, 
    error, 
    onLoading, 
    onError, 
    onDataNotFound
}) => {
    const { colors } = useTheme()
    const { items } = useCharacterState();
    const dispatch = useCharacterDispatch();
    
    const [tab, setTab] = useState(-1)
    const ref = useRef(null)

    let result = chosen ? [...items.filter(a => !data.results.map(e => e.id).includes(a.id)), ...data.results] : items
    
    const handleKeyDown = (event:any) => {
        if(["Tab", "ArrowDown", "ArrowUp", "Enter"].includes(event.key)){
            event.preventDefault();
        }
        if(event.key === "Tab" || event.key === 'ArrowDown'){
            setTab((prevIndex) => Math.min(prevIndex + 1, result.length - 1));
        }else if (event.key === 'ArrowUp') {
            setTab((prevIndex) => Math.max(prevIndex - 1, 0));
        }else if(event.key === "Enter"){
            const isSelected = result.map(e => e.id).includes(items[tab]?.id) ?? false
            handleChange(result[tab]);
        }
        if(tab >= 0 && event.key !== "Enter"){
            ref.current && (ref.current as any).scrollIntoView({ behavior: 'smooth' })
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
    // bu iki öğeye de bakılması gerekiyor
    // eslint-disable-next-line
    }, [tab, items]);
    const handleChange = ( item:Result) => {
        const isExisting = items.find((existingItem: Result) => existingItem.id === item.id);
        if (isExisting) {
            dispatch({ type: 'REMOVE', payload: item });
        } else  {
            dispatch({ type: 'ADD', payload: item });
        }
    }
    if(error) return <>{onError}</>
    if(loading) return <>{onLoading}</>
    if(data.results.length === 0) return <>{onDataNotFound}</>

    return( 
        <div className={styles.cardSearchList} style={{border:`1.5px solid ${colors.borderColor}`}}>
            {result && result.length !== 0 && result.map((item:Result, i) => {
                const highlightedText = item.name.replace(
                    new RegExp(`(${value})`, 'gi'),
                    '<strong>$1</strong>'
                );
                const formattedText=  <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
                return(
                    <div className={styles.cardCharacter} style={i !== data.results.length-1 ? { borderBottom:`1.5px solid ${colors.borderColor}`} : {}}>
                        <div style={{position:"relative"}}>
                            <input checked={items.some(e => e.id === item.id)} onChange={(e) => handleChange(item)} style={{marginInline:10}} type={"checkbox"} />
                            {tab === i && <div ref={ref} className={styles.cardSelect}></div>}
                        </div>
                        <img alt={"image"+i} src={item.image} className={styles.cardImage} width={50} height={50} />
                        <div>
                            <p style={{fontSize:fontSize.md, color:colors.textMdColor}} >{formattedText}</p>
                            <p style={{fontSize:fontSize.sm, color:colors.textSmColor}}>{item.episode.length} Episodes</p>
                        </div>
                    </div>)
                })}
        </div>
    )
}

export default SearchList