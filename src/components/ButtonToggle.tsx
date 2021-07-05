import { useContext } from 'react';

import { ThemeContext} from '../contexts/ThemeContext';

import { IconWrapper } from '../styles/button-toggle';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

type ButtonToggleProps = {
    top: number;
    right: number;
};

export function ButtonToggle(props: ButtonToggleProps) {
    const { theme, setTheme } = useContext(ThemeContext);

    function switchTheme() {
        if(theme === 'dark') {
            setTheme('light');
            toast('MODO CLARO!',
                {
                    position: "top-center",
                    style: {
                    borderRadius: '10px',
                    background: '#fff',
                    color: '#333',
                    },
                }
            );
        }else {
            setTheme('dark');
            toast('MODO ESCURO!',
                {
                    position: "top-center",
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
            );
        }
    };
    
    return (
        <> 
            { theme === 'light' ? (
                <IconWrapper 
                    onClick={ switchTheme } 
                    top={ props.top } 
                    right={ props.right }
                    borderColor={`#1d1d1f`}
                    shadowColor={`#1d1d1f`}>
                    <FontAwesomeIcon icon={faMoon} size="2x"/>
                </IconWrapper>
            ) : (
                <IconWrapper 
                    onClick={ switchTheme } 
                    top={ props.top } 
                    right={ props.right }
                    borderColor={`#fff`}
                    shadowColor={`#fff`}>
                    <FontAwesomeIcon icon={faSun} size="2x" color="#f7e13b"/>
                </IconWrapper>
            )}
        </>
    );
};

