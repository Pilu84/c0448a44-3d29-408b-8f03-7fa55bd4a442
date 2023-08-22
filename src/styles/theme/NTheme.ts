import { createTheme, Theme } from "@mui/material";

export const NTheme: Theme = createTheme(
    {
        palette: {
            primary: {
                main: '#fff'
            }
        },
        typography: {
            h3: {
                fontSize: '1.1rem',
                fontWeight: 600
            }
        }
    }
)