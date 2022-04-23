import React, { useContext, useReducer } from 'react'

const initModalState = {
    modal: {
        showing: false,
        content: '',
    }
}

const ModalContext = React.createContext(initModalState)

function reducer(state, action) {
    switch (action.type){
        case 'SHOW':
            return {
                ...state,
                modal: action.payload
            }
        default:
            return state
    }
}

export default function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initModalState)

    return (
        <ModalContext.Provider value={{state, dispatch}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext)
}