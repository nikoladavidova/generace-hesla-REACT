import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import * as React from "react";
import {useState, useReducer, useContext, createContext} from "react";
type PasswordState = {
    password: string;
    length: number;
    lowerCase:boolean;
    upperCase: boolean;
    numbers: boolean;
    symbols: boolean;
};


type Action =
    | { type: 'setLength'; payload: number }
    | { type: 'setLowercase' }
    | { type: 'setUppercase' }
    | { type: 'setNumbers' }
    | { type: 'setSymbols' }
    | { type: 'generate' };




const initialState: PasswordState = {
    password: '',
    length: 10,
    lowerCase:true,
    upperCase: true,
    numbers: true,
    symbols: true,
};


function reducer(state: PasswordState, action: Action): PasswordState {
    switch (action.type) {
        case 'setLength':
            return { ...state, length: action.payload };
        case 'setLowercase':
            return { ...state, lowerCase: !state.lowerCase };
        case 'setUppercase':
            return { ...state, upperCase: !state.upperCase };
        case 'setNumbers':
            return { ...state, numbers: !state.numbers };
        case 'setSymbols':
            return { ...state, symbols: !state.symbols };
        case 'generate':
            let abc = 'abcdefghijklmnopqrstuvwxyz';
            let ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let num = '0123456789';
            let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            let password = '';
            let charSet='';


            if (state.lowerCase) {
                charSet += abc;
            }
            if (state.upperCase) {
                charSet += ABC;
            }
            if (state.numbers) {
                charSet += num;
            }
            if (state.symbols) {
                charSet += symbols;
            }
            for (let i = 0; i < state.length; i++) {
                let randomIndex = Math.floor(Math.random() * charSet.length);
                password += charSet[randomIndex];
            }
            return { ...state, password: password };
        default:
            return state;
    }
}


const PasswordContext = createContext<{
    state: PasswordState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});




function PasswordGenerator() {
    const { state, dispatch } = useContext(PasswordContext);


    function handleLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: 'setLength', payload: parseInt(e.target.value) });
    }


    function handleLowerCaseCheck() {
        dispatch({ type: 'setLowercase' });
    }
    function handleUpperCaseCheck() {
        dispatch({ type: 'setUppercase' });
    }


    function handleNumbersCheck() {
        dispatch({ type: 'setNumbers' });
    }


    function handleSymbolsCheck() {
        dispatch({ type: 'setSymbols' });
    }


    function handleGeneratePassword() {
        dispatch({ type: 'generate' });
    }


    return (
        <div>
            <ul>
                <li> <label>
                    <p>Delka:</p>
                    <input
                        type="number"
                        value={state.length}
                        onChange={handleLengthChange}
                    />
                </label></li>


                <li> <label>
                    <input
                        type="checkbox"
                        checked={state.lowerCase}
                        onChange={handleLowerCaseCheck}
                    /> <p>:Mala pismena</p>
                </label></li>


                <li><label>
                    <input
                        type="checkbox"
                        checked={state.upperCase}
                        onChange={handleUpperCaseCheck}
                    /><p>:Velka pismena</p>
                </label></li>




                <li> <label> <input
                    type="checkbox"
                    checked={state.numbers
                    }
                    onChange={handleNumbersCheck}
                /><p>:Cisla</p>
                </label></li>
                <li><label>
                    <input
                        type="checkbox"
                        checked={state.symbols}
                        onChange={handleSymbolsCheck}
                    /><p>:Symboly</p>
                </label></li>
                <li><button onClick={handleGeneratePassword} className="rounded-full bg-cyan-500">Generovat</button></li>


                <li> <h3>{state.password}</h3></li>
            </ul>








        </div>
    );
}




function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <PasswordContext.Provider value={{ state, dispatch }}>
            <PasswordGenerator />
        </PasswordContext.Provider>
    );
}


export default Home;
