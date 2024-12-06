import React, { useState, useEffect } from 'react';
import NavBar from "../components/NavBar"; // Importando o NavBar corretamente
import { Link } from "react-router-dom";

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);

    return (
        <>
            <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* Passando darkMode e toggleDarkMode */}
            <div className="home">
                <h1 className="title-home">Tenha mais gestão e qualidade com o LhaBath!</h1>
                <img src="./src/assets/banheiros.png" alt="Imagem de banheiros" />
                <Link to={'/login'}><button>Entrar</button></Link>
                <Link to={'/cadastro'}><button>Criar conta</button>  </Link>          
            </div>
        </>
    );
}
