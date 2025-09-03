// import { createTheme, ThemeOptions, TypographyVariantsOptions } from '@mui/material/styles';
// import { PaletteMode } from '@mui/material';

// const lightPalette = {
//   primary: {
//     main: '#6a2ea9',    // Rich violet
//     light: '#9a55d9',   // Lighter violet
//     dark: '#4c1f77',    // Deeper violet
//     contrastText: '#ffffff',
//   },
//   secondary: {
//     main: '#b469de',    // Lavender
//     light: '#e0b3ff',   // Light lavender
//     dark: '#8344a8',    // Dark lavender
//     contrastText: '#ffffff',
//   },
//   background: {
//     default: '#f5f5ff',  // Very light violet tint
//     paper: '#ffffff',
//   },
//   text: {
//     primary: '#33224b',  // Dark violet-tinted text
//     secondary: '#665588', // Medium violet-tinted text
//   },
//   error: {
//     main: '#d32f8f',     // Violet-tinted red
//   },
//   warning: {
//     main: '#c273ff',     // Violet-tinted orange
//   },
//   info: {
//     main: '#7a4fe9',     // Violet-tinted blue
//   },
//   success: {
//     main: '#6c8fda',     // Violet-tinted green
//   },
// };

// const darkPalette = {
//   primary: {
//     main: '#8b3dff',     // Vibrant violet
//     light: '#b78fff',    // Light violet
//     dark: '#5e23b5',     // Deep violet
//     contrastText: '#ffffff',
//   },
//   secondary: {
//     main: '#d490ff',     // Bright lavender
//     light: '#f2ccff',    // Very light lavender
//     dark: '#a05ec7',     // Deep lavender
//     contrastText: '#000000',
//   },
//   background: {
//     default: '#1a1025',  // Very dark violet
//     paper: '#2d2042',    // Dark violet
//   },
//   text: {
//     primary: '#e9d5ff',  // Light violet text
//     secondary: '#b69edb', // Medium violet text
//   },
//   error: {
//     main: '#ff5fb6',     // Violet-tinted red
//   },
//   warning: {
//     main: '#d89aff',     // Violet-tinted yellow
//   },
//   info: {
//     main: '#a78fff',     // Violet-tinted blue
//   },
//   success: {
//     main: '#9ac2ff',     // Violet-tinted cyan
//   },
// };

// const typography: TypographyVariantsOptions = {
//   fontFamily: [
//     'Roboto',
//     'Arial',
//     'sans-serif',
//     'monospace',
//   ].join(','),
//   h1: {
//     fontWeight: 500,
//     fontSize: '2.5rem',
//     lineHeight: 1.2,
//     fontFamily: 'monospace',
//   },
//   h2: {
//     fontWeight: 500,
//     fontSize: '2rem',
//     lineHeight: 1.2,
//     fontFamily: 'monospace',
//   },
//   h3: {
//     fontWeight: 500,
//     fontSize: '1.75rem',
//     lineHeight: 1.2,
//     fontFamily: 'monospace',
//   },
//   h4: {
//     fontWeight: 500,
//     fontSize: '1.5rem',
//     lineHeight: 1.2,
//     fontFamily: 'monospace',
//   },
//   h5: {
//     fontWeight: 500,
//     fontSize: '1.25rem',
//     lineHeight: 1.2,
//     fontFamily: 'monospace',
//   },
//   h6: {
//     fontWeight: 500,
//     fontSize: '1.1rem',
//     lineHeight: 1.2,
//     fontFamily: 'monospace',
//   },
//   subtitle1: {
//     fontSize: '1rem',
//     lineHeight: 1.5,
//   },
//   subtitle2: {
//     fontSize: '0.875rem',
//     lineHeight: 1.5,
//     fontWeight: 500,
//   },
//   body1: {
//     fontSize: '1rem',
//     lineHeight: 1.5,
//   },
//   body2: {
//     fontSize: '0.875rem',
//     lineHeight: 1.5,
//   },
//   button: {
//     fontSize: '0.875rem',
//     fontWeight: 500,
//     textTransform: 'none',
//   },
//   caption: {
//     fontSize: '0.75rem',
//     lineHeight: 1.5,
//   },
//   overline: {
//     fontSize: '0.75rem',
//     fontWeight: 500,
//     textTransform: 'uppercase',
//     letterSpacing: '0.08em',
//   },
// };


// export const getTheme = (mode: PaletteMode) => {
//   const themeOptions: ThemeOptions = {
//     palette: {
//       mode,
//       ...(mode === 'light' ? lightPalette : darkPalette),
//     },
//     typography,
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: 8,
//             padding: '8px 16px',
//             boxShadow: 'none',
//             '&:hover': {
//               boxShadow: mode === 'light' ? '0px 2px 4px rgba(0,0,0,0.1)' : '0px 2px 4px rgba(255,255,255,0.1)',
//             },
//           },
//           contained: {
//             '&.MuiButton-containedPrimary': {
//               backgroundColor: mode === 'light' ? lightPalette.primary?.main : darkPalette.primary?.main,
//               '&:hover': {
//                 backgroundColor: mode === 'light' ? lightPalette.primary?.dark : darkPalette.primary?.dark,
//               },
//             },
//             '&.MuiButton-containedSecondary': {
//               backgroundColor: mode === 'light' ? lightPalette.secondary?.main : darkPalette.secondary?.main,
//               '&:hover': {
//                 backgroundColor: mode === 'light' ? lightPalette.secondary?.dark : darkPalette.secondary?.dark,
//               },
//             },
//           },
//         },
//       },
//       MuiAppBar: {
//         styleOverrides: {
//           root: {
//             boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
//             backgroundColor: mode === 'light' ? lightPalette.primary?.main : darkPalette.primary?.main,
//           },
//         },
//       },
//       MuiPaper: {
//         styleOverrides: {
//           root: {
//             borderRadius: 8,
//             boxShadow: mode === 'light'
//               ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
//               : '0px 2px 4px rgba(0, 0, 0, 0.2)',
//           },
//           elevation1: {
//             boxShadow: mode === 'light'
//               ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
//               : '0px 2px 4px rgba(0, 0, 0, 0.2)',
//           },
//           elevation2: {
//             boxShadow: mode === 'light'
//               ? '0px 3px 6px rgba(0, 0, 0, 0.08)'
//               : '0px 3px 6px rgba(0, 0, 0, 0.3)',
//           },
//           elevation3: {
//             boxShadow: mode === 'light'
//               ? '0px 4px 8px rgba(0, 0, 0, 0.1)'
//               : '0px 4px 8px rgba(0, 0, 0, 0.4)',
//           },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           root: {
//             borderBottom: mode === 'light'
//               ? '1px solid rgba(0, 0, 0, 0.1)'
//               : '1px solid rgba(255, 255, 255, 0.1)',
//           },
//           head: {
//             fontWeight: 600,
//             backgroundColor: mode === 'light'
//               ? 'rgba(0, 0, 0, 0.02)'
//               : 'rgba(255, 255, 255, 0.05)',
//           },
//         },
//       },
//       MuiAccordion: {
//         styleOverrides: {
//           root: {
//             borderRadius: 8,
//             boxShadow: mode === 'light'
//               ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
//               : '0px 2px 4px rgba(0, 0, 0, 0.2)',
//             '&:before': {
//               display: 'none',
//             },
//             '&.Mui-expanded': {
//               margin: '16px 0',
//             },
//           },
//         },
//       },
//       MuiAccordionSummary: {
//         styleOverrides: {
//           root: {
//             borderRadius: '8px 8px 0 0',
//             backgroundColor: mode === 'light'
//               ? 'rgba(0, 0, 0, 0.02)'
//               : 'rgba(255, 255, 255, 0.05)',
//           },
//         },
//       },
//       MuiAccordionDetails: {
//         styleOverrides: {
//           root: {
//             padding: '16px',
//           },
//         },
//       },
//       MuiInputBase: {
//         styleOverrides: {
//           root: {
//             borderRadius: 8,
//           },
//         },
//       },
//     },
//   };

//   return createTheme(themeOptions);
// };

// const theme = getTheme('light');
// export default theme;


import { createTheme, ThemeOptions, TypographyVariantsOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const lightPalette = {
  primary: {
    main: '#6a2ea9',    // Rich violet
    light: '#9a55d9',   // Lighter violet
    dark: '#4c1f77',    // Deeper violet
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#b469de',    // Lavender
    light: '#e0b3ff',   // Light lavender
    dark: '#8344a8',    // Dark lavender
    contrastText: '#ffffff',
  },
  background: {
    default: '#f5f5ff',  // Very light violet tint
    paper: '#ffffff',
  },
  text: {
    primary: '#33224b',  // Dark violet-tinted text
    secondary: '#665588', // Medium violet-tinted text
  },
  error: {
    main: '#d32f8f',     // Violet-tinted red
  },
  warning: {
    main: '#c273ff',     // Violet-tinted orange
  },
  info: {
    main: '#7a4fe9',     // Violet-tinted blue
  },
  success: {
    main: '#6c8fda',     // Violet-tinted green
  },
};

const darkPalette = {
  primary: {
    main: '#8b3dff',     // Vibrant violet
    light: '#b78fff',    // Light violet
    dark: '#5e23b5',     // Deep violet
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#d490ff',     // Bright lavender
    light: '#f2ccff',    // Very light lavender
    dark: '#a05ec7',     // Deep lavender
    contrastText: '#000000',
  },
  background: {
    default: '#1a1025',  // Very dark violet
    paper: '#2d2042',    // Dark violet
  },
  text: {
    primary: '#e9d5ff',  // Light violet text
    secondary: '#b69edb', // Medium violet text
  },
  error: {
    main: '#ff5fb6',     // Violet-tinted red
  },
  warning: {
    main: '#d89aff',     // Violet-tinted yellow
  },
  info: {
    main: '#a78fff',     // Violet-tinted blue
  },
  success: {
    main: '#9ac2ff',     // Violet-tinted cyan
  },
};

const typography: TypographyVariantsOptions = {
  fontFamily: [
    'Roboto',
    'Arial',
    'sans-serif',
    'monospace',
  ].join(','),
  h1: {
    fontWeight: 500,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    fontFamily: 'monospace',
  },
  h2: {
    fontWeight: 500,
    fontSize: '2rem',
    lineHeight: 1.2,
    fontFamily: 'monospace',
  },
  h3: {
    fontWeight: 500,
    fontSize: '1.75rem',
    lineHeight: 1.2,
    fontFamily: 'monospace',
  },
  h4: {
    fontWeight: 500,
    fontSize: '1.5rem',
    lineHeight: 1.2,
    fontFamily: 'monospace',
  },
  h5: {
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.2,
    fontFamily: 'monospace',
  },
  h6: {
    fontWeight: 500,
    fontSize: '1.1rem',
    lineHeight: 1.2,
    fontFamily: 'monospace',
  },
  subtitle1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    fontWeight: 500,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
};


export const getTheme = (mode: PaletteMode) => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette),
    },
    typography,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: mode === 'light' ? '0px 2px 4px rgba(0,0,0,0.1)' : '0px 2px 4px rgba(255,255,255,0.1)',
            },
          },
          contained: {
            '&.MuiButton-containedPrimary': {
              backgroundColor: mode === 'light' ? lightPalette.primary?.main : darkPalette.primary?.main,
              '&:hover': {
                backgroundColor: mode === 'light' ? lightPalette.primary?.dark : darkPalette.primary?.dark,
              },
            },
            '&.MuiButton-containedSecondary': {
              backgroundColor: mode === 'light' ? lightPalette.secondary?.main : darkPalette.secondary?.main,
              '&:hover': {
                backgroundColor: mode === 'light' ? lightPalette.secondary?.dark : darkPalette.secondary?.dark,
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
            backgroundColor: mode === 'light' ? lightPalette.primary?.main : darkPalette.primary?.main,
            borderRadius: 0, // Remove border radius from AppBar
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: mode === 'light'
              ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
              : '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
          elevation1: {
            boxShadow: mode === 'light'
              ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
              : '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
          elevation2: {
            boxShadow: mode === 'light'
              ? '0px 3px 6px rgba(0, 0, 0, 0.08)'
              : '0px 3px 6px rgba(0, 0, 0, 0.3)',
          },
          elevation3: {
            boxShadow: mode === 'light'
              ? '0px 4px 8px rgba(0, 0, 0, 0.1)'
              : '0px 4px 8px rgba(0, 0, 0, 0.4)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: mode === 'light'
              ? '1px solid rgba(0, 0, 0, 0.1)'
              : '1px solid rgba(255, 255, 255, 0.1)',
          },
          head: {
            fontWeight: 600,
            backgroundColor: mode === 'light'
              ? 'rgba(0, 0, 0, 0.02)'
              : 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: mode === 'light'
              ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
              : '0px 2px 4px rgba(0, 0, 0, 0.2)',
            '&:before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              margin: '16px 0',
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            borderRadius: '8px 8px 0 0',
            backgroundColor: mode === 'light'
              ? 'rgba(0, 0, 0, 0.02)'
              : 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: '16px',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

const theme = getTheme('light');
export default theme;