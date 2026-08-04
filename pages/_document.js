/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="id">
        <Head>
          <meta
            name="description"
            content="Sistem Informasi Kewaspadaan Pangan dan Gizi "
          />
          <meta property="og:image" content="/meta/Aplikasi.svg" />
          <meta property="og:image:type" content="image/svg" />
          <meta property="og:image:width" content="1024" />
          <meta property="og:image:height" content="1024" />

          <link rel="icon" href={`/simawas_pagi_icon.svg`} />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lora&display=optional"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          ></link>
          {/* <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap" rel="stylesheet"></link> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
