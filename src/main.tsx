import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./shared/theme-provider/ThemeProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>

  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      defaultTheme="light"
      storageKey="vite-ui-theme"
    >
      {/* <HotkeysProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </HotkeysProvider> */}
    </ThemeProvider>
  </QueryClientProvider>
  //</React.StrictMode>
);
