import { Theme } from '@aplinkosministerija/design-system';
import { createGlobalStyle } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DANGER = 'danger',
  SUCCESS = 'success',
  TRANSPARENT = 'transparent',
  DANGER_OUTLINE = 'dangerOutline',
  TEXT_ONLY = 'textOnly'
}

export const palette = {
  primary: '#FEBC1D',
  returned: '#FEBC1D',
  secondary: '#b55007',
  tertiary: '#7A7E9F',
  danger: '#FE5B78',
  transparent: 'transparent',
  success: '#4FB922',
  confirmed: '#4FB922',
  submitted: '#4FB922',
  tertiaryLight: '#F3F3F7',
  border: '#D3D2D2',
  label: '#231F20',
  error: '#FE5B78',
  white: '#ffffff',
  grey: '#B3B5C4',
  midnightBlue: '#121926',
  mistyCloud: '#CDD5DF',
};

export const theme: Theme = {
  colors: {
    ...palette,
    hover: {
      submitted: '#4FB922',
      confirmed: '#4FB922',
      success: '#4FB922',
      returned: '#FEBC1D',
      primary: '#FEBC1D',
      secondary: '#13C9E78F',
      tertiary: '#7A7E9F',
      danger: '#FE5B78E6',
    },
    fields: {
      borderFocus: '#FEBC1D',
    },
    text: {
      primary: palette.midnightBlue,
      focus: palette.secondary,
    },
    buttons: {
      [ButtonVariants.PRIMARY]: {
        background: palette.primary,
        text: palette.label,
        border: palette.transparent,
        hover: palette.primary,
        hoverText: palette.white,
        icon: palette.white,
        count: {
          background: palette.white,
          text: palette.primary,
        },
      },
      [ButtonVariants.TRANSPARENT]: {
        background: palette.transparent,
        text: palette.midnightBlue,
        border: palette.mistyCloud,
        hover: palette.transparent,
        hoverText: 'rgba(18, 25, 38, 0.5)',
        icon: palette.midnightBlue,
        count: {
          background: palette.grey,
          text: palette.white,
        },
      },
      [ButtonVariants.TEXT_ONLY]: {
        background: palette.transparent,
        text: palette.midnightBlue,
        border: palette.transparent,
        hover: palette.transparent,
        hoverText: palette.secondary,
        icon: palette.midnightBlue,
        count: {
          background: palette.grey,
          text: palette.white,
        },
      },
      [ButtonVariants.DANGER_OUTLINE]: {
        background: palette.transparent,
        text: palette.danger,
        border: palette.danger,
        hover: palette.transparent,
        hoverText: palette.secondary,
        hoverBorder: palette.secondary,
      },
      [ButtonVariants.DANGER]: {
        background: palette.danger,
        text: palette.white,
        border: palette.danger,
        hover: palette.danger + 'E6',
        hoverText: palette.white,
        icon: palette.white,
        count: {
          background: palette.white,
          text: palette.danger,
        },
      },
    },
  },
  height: {
    fields: 4,
    buttons: 4,
  },
  radius: {
    fields: 0.2,
  },
};

export const GlobalStyle = createGlobalStyle`

 *{
  box-sizing: border-box;
  font-family: Atkinson Hyperlegible;
 }

  html { 
        font-size: 62.5%; 
    width: 100vw;
    height: 100vh;
 
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #EEEBE5;
    font-size: 1.6rem;
    width: 100vw;
    height: 100vh;
    overflow:hidden;
  } 
  h1 {
    font-size: 3.2rem;
    color: "#121A55";
  }
  a {
    text-decoration: none;
  }
  button {
    outline: none;
    text-decoration: none;
    display: block;
    border: none;
    background-color: transparent;
  }
  #__next {
    height: 100%;
  }
  textarea {
    font-size: 1.6rem;
  }
`;

export const device = {
  mobileS: `(max-width: 320px)`,
  mobileM: `(max-width: 425px)`,
  mobileL: `(max-width: 788px)`,
  mobileXL: `(max-width: 1025px)`,
};
