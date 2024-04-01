import { ChangeEvent, FC, useState } from "react"
import { URL } from "../../constants/constants";
import { debounce } from "../../constants/functions";
import { RickAndMortResponse } from "../../types/search";
import ErrorComponent from "../globals/components/error";
import NoData from "../globals/components/noData";
import LoadingSpinner from "../globals/components/spinner";
import SearchInput from "./components/searchInput"
import SearchList from "./components/searchList"

const Search:FC = () => {
    const [data, setData] = useState<RickAndMortResponse>();
    const [value, setValue] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [isChosen, setIsChosen] = useState<boolean>(true)
   
    const sendRequest = debounce(async (text) => {
        if(text.length > 2){
            try {
                const res = await fetch(URL + text)
                const json = await res.json() as RickAndMortResponse
                if(json && json.results && json.results.length > 0){
                    setData(json)
                }
            } catch (error) {
                setIsError(true)
            }
        }else{
            setData(undefined)
        }
    
    }, 1000);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        const text = e.target.value;
        setValue(text);
        sendRequest(text);
        setIsLoading(false)
    };
    return(
        <>
            <SearchInput isChosen={isChosen} setIsChosen={setIsChosen} handleChange={handleChange} value={value ?? ""} />
            {data && 
            <SearchList
                value={value ?? ""}
                chosen={isChosen}
                loading={isLoading}
                error={isError}
                onDataNotFound={<NoData />} 
                onLoading={<LoadingSpinner />} 
                onError={<ErrorComponent />}
                data={data}/> 
            }
        </>
    )
}

export default Search