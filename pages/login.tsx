import React, { Component } from 'react';
import { RouterProps } from 'next/router';
import { inject, observer } from 'mobx-react';

import { StoreProps } from '@/lib/store';
import { requestOAuthWithAxiosRetry } from '@/lib/auth';

interface Props extends StoreProps {
  router: RouterProps<Record<string, string | string[] | undefined>>;
}

interface State {
  error: String;
}

@inject('login')
@observer
export default class IndexPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: 'Waiting login...' };
  }

  componentDidMount = () => {
    const { router } = this.props;
    const { type, code }: any = router.query || {};
    if (!type || !code) return this.setState({ error: 'Invalid request' });

    requestOAuthWithAxiosRetry(type, code).then(res => {
      if (this.props.login && this.props.login.login) this.props.login.login(res.token);
      window.close();
    });
  };

  render() {
    return <h3 style={{ fontWeight: 'normal', marginTop: 50, marginBottom: 50 }}>{this.state.error}</h3>;
  }
}
