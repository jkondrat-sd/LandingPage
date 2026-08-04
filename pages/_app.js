import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";
import Head from 'next/head';
ClassNameGenerator.configure((componentName) =>
  componentName.replace("Mui", "")
);

import "../styles/globals.css";
import "../styles/c404.css";
import { ThemeProvider } from "@mui/material/styles";

import theme from "MUI_theme.js";
import { DashboardContextProvider } from "context/dashboardContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="referrer" content="origin-when-cross-origin" />
      </Head>
      <ThemeProvider theme={theme}>
        <DashboardContextProvider>
          <Component {...pageProps} />
        </DashboardContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
