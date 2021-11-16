import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle `
    :root {
        -- maxWidth: 1280px;
        --white: #fff;
        --white: #000000;
        --lightGrey: #433434;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
    }
    * {
        box-sizing: border-box;
        font-family: Abhaya Libre ExtraBold;
    }
    body {
        margin: 0;
        padding: 0;
    }
    h1 {
        font-size: 2rem;
        font-weight: 600;
        color: var(--lightGrey)
    }
    h3 {
        font-size: 1.1rem;
        font-weight: 600;
    }
    p {
        font-size: 1rem;
        color: var(--black)
    }
`;