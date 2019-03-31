import App, { Container, NextAppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';

import Layout from '@/containers/Layout';

import { Store } from '@/lib';

export default class NextAppLayout extends App {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return pageProps.statusCode === 404 ? (
      <Component {...pageProps} />
    ) : (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{pageProps.title || 'Portfolio'}</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
        </Head>
        <Store>
          <Layout>
            <Component router={router} {...pageProps} />
          </Layout>
        </Store>
      </Container>
    );
  }
}
