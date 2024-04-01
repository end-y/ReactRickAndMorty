import { ChangeEventHandler, Dispatch, ReactNode, SetStateAction } from "react";

export interface RickAndMortResponse {
    info:    Info;
    results: Result[];
}

export interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export interface Result {
    id:       number;
    name:     string;
    status:   Status;
    species:  Species;
    type:     string;
    gender:   Gender;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
}

export interface Location {
    name: string;
    url:  string;
}

export enum Species {
    Alien = "Alien",
    Cronenberg = "Cronenberg",
    Human = "Human",
    Humanoid = "Humanoid",
}

export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}

export type SearchInputProps = {
    value:string 
    isChosen:boolean
    handleChange:ChangeEventHandler<HTMLInputElement>
    setIsChosen:Dispatch<SetStateAction<boolean>>
}

export type SearchListProps = {
    data:RickAndMortResponse
    loading:boolean
    value:string 
    chosen:boolean
    error:boolean
    onLoading:JSX.Element
    onDataNotFound:JSX.Element
    onError:JSX.Element
}
