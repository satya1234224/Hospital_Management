import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Dynamic color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        // Vibrant colors for dark mode
        grey: {
          100: "#f5f5f5",
          200: "#e0e0e0",
          300: "#bdbdbd",
          400: "#9e9e9e",
          500: "#757575",
          600: "#616161",
          700: "#424242",
          800: "#212121",
          900: "#121212",
        },
        primary: {
          100: "#ffccbc", // Peach
          200: "#ffab91",
          300: "#ff8a65",
          400: "#ff7043",
          500: "#f4511e", // Vibrant orange
          600: "#e64a19",
          700: "#d84315",
          800: "#bf360c",
          900: "#8d2b0b",
        },
        secondary: {
          100: "#d1c4e9", // Lavender
          200: "#b39ddb",
          300: "#9575cd",
          400: "#7e57c2",
          500: "#673ab7", // Deep purple
          600: "#5e35b1",
          700: "#512da8",
          800: "#4527a0",
          900: "#311b92",
        },
        accent: {
          100: "#c8e6c9", // Mint green
          200: "#a5d6a7",
          300: "#81c784",
          400: "#66bb6a",
          500: "#4caf50", // Forest green
          600: "#43a047",
          700: "#388e3c",
          800: "#2e7d32",
          900: "#1b5e20",
        },
        background: {
          sidebar: "#fff9c4", // Light yellow
          main: "linear-gradient(45deg, #b3e5fc, #81c784)", // Blue-green gradient
        },
      }
    : {
        // Bright and fresh colors for light mode
        grey: {
          100: "#fafafa",
          200: "#f5f5f5",
          300: "#eeeeee",
          400: "#e0e0e0",
          500: "#bdbdbd",
          600: "#9e9e9e",
          700: "#757575",
          800: "#616161",
          900: "#424242",
        },
        primary: {
          100: "#c8e6f6", // Sky blue
          200: "#90caf9",
          300: "#64b5f6",
          400: "#42a5f5",
          500: "#2196f3", // Bright blue
          600: "#1e88e5",
          700: "#1976d2",
          800: "#1565c0",
          900: "#0d47a1",
        },
        secondary: {
          100: "#fff59d", // Sunshine yellow
          200: "#fff176",
          300: "#ffee58",
          400: "#ffeb3b",
          500: "#fdd835",
          600: "#fbc02d",
          700: "#f9a825",
          800: "#f57f17",
          900: "#ef6c00",
        },
        accent: {
          100: "#ffebee", // Coral pink
          200: "#ffcdd2",
          300: "#ef9a9a",
          400: "#e57373",
          500: "#ef5350", // Bright red
          600: "#e53935",
          700: "#d32f2f",
          800: "#c62828",
          900: "#b71c1c",
        },
        background: {
          sidebar: "#ffecb3", // Pale gold
          main: "linear-gradient(45deg, #e3f2fd, #fce4ec)", // Blue-pink gradient
        },
      }),
});

// MUI Theme Settings
export const ThemeContext = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: { main: colors.primary[500] },
            secondary: { main: colors.secondary[500] },
            accent: { main: colors.accent[500] },
            background: {
              default: colors.background.main,
              paper: colors.background.sidebar,
            },
          }
        : {
            primary: { main: colors.primary[500] },
            secondary: { main: colors.secondary[500] },
            accent: { main: colors.accent[500] },
            background: {
              default: colors.background.main,
              paper: colors.background.sidebar,
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: { fontSize: 40 },
      h2: { fontSize: 32 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
  };
};

// Context for Color Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(ThemeContext(mode)), [mode]);
  return [theme, colorMode];
};
