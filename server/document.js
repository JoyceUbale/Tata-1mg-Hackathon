import React from 'react';
import { Head, Body } from "catalyst";

function Document(props) {
  return (
    <html lang="en">
      <Head {...props}>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Smart Home Controller powered by Catalyst Framework" />
        <meta name="keywords" content="smart home, IoT, home automation" />
        <meta name="author" content="Tata 1mg" />
        <title>Smart Home Controller - Catalyst Framework</title>
      </Head>
      <Body {...props} />
    </html>
  );
}

export default Document;
