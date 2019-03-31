import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Router, LinkIconsGroup, CategoryTemplate } from '@/components';
import { PageProps, LinkItem } from '@/interfaces';

const graqhqlQuery = gql`
  query getUserInfo($id: String!) {
    getUserInfo(id: $id) {
      username
      email
      github
      linkedin
      description
    }
  }
`;

interface Props extends PageProps {}

export default class PortfolioPage extends Component<Props> {
  renderProfile = (username: string, description?: string, email?: string, github?: string, linkedin?: string) => {
    const links: LinkItem[] = [];

    if (email) links.push({ icon: 'mail', href: `mailto:${email}`, color: 'black' });
    if (github) links.push({ icon: 'github', href: `https://github.com/${github}/`, color: 'black' });
    if (linkedin) links.push({ icon: 'linkedin', href: `"https://linkedin.com/in/${linkedin}/`, color: 'blue' });

    return (
      <div>
        <h1>
          {username}
          <LinkIconsGroup links={links} />
        </h1>
        {description ? <p>{description}</p> : null}
        {/* {children} */}
      </div>
    );
  };

  render() {
    return (
      <Query query={graqhqlQuery} variables={{ id: this.props.router.query.id }}>
        {({ loading, error, data }) => {
          if (error) return <div>{Router.push('/') && null}</div>;
          if (loading) return <div>Loading</div>;

          const { username, description, email, github, linkedin } = data.getUserInfo;

          return (
            <>
              {this.renderProfile(username, description, email, github, linkedin)}
              {/* <CategoryTemplate category={v.category} description={v.description} links={v.links}>
                {v.items && v.items.map((item: DataItem, index: number) => <ItemTemplate key={index} {...item} />)}
              </CategoryTemplate> */}
            </>
          );
        }}
      </Query>
    );
  }
}
