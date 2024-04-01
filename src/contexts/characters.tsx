import React, { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { CharacterProviderProps, CharacterAction, CharacterState } from '../types/themes';

const CharacterStateContext = createContext<CharacterState | undefined>(undefined);
const CharacterDispatchContext = createContext<Dispatch<CharacterAction>>(() => {});

const reducer = (state: CharacterState, action: CharacterAction): CharacterState => {
  switch (action.type) {
    case 'ADD':
        return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case 'REMOVE_ALL':
      return {
        ...state,
        items: [] ,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
};

export const CharacterStateProvider: FC<CharacterProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  return (
    <CharacterStateContext.Provider value={state}>
      <CharacterDispatchContext.Provider value={dispatch}>
        {children}
      </CharacterDispatchContext.Provider>
    </CharacterStateContext.Provider>
  );
};

export const useCharacterState = (): CharacterState => {
  const context = useContext(CharacterStateContext);
  if (context === undefined) {
    throw new Error('useCharacterState must be used within a CharacterStateProvider');
  }
  return context;
};

export const useCharacterDispatch = (): Dispatch<CharacterAction> => {
  const context = useContext(CharacterDispatchContext);
  if (context === undefined) {
    throw new Error('useCharacterDispatch must be used within a CharacterStateProvider');
  }
  return context;
};
