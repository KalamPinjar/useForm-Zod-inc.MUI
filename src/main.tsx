import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./v2/App";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "dark",
          },
        })}
      >
        <CssBaseline />

        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
