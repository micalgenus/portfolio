import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';

import Layout from '@/containers/Layout';

import Store from '@/stores';

export default class NextAppLayout extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>{pageProps.title || 'Hello Next !'}</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
        </Head>
        <Store>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Store>
      </Container>
    );
  }
}
