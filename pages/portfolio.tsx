import React, { Component } from 'react';
import { Query, QueryResult } from 'react-apollo';

import { getUserInfoQuery } from '@/lib/graphql/query';

import { Router, LinkIconsGroup, CategoryTemplate, ItemTemplate } from '@/components';
import { PageProps, LinkItem, Category } from '@/interfaces';

interface Props extends PageProps {}

export default class PortfolioPage extends Component<Props> {
  renderProfile = (username: string, description?: string, email?: string, github?: string, linkedin?: string) => {
    const links: LinkItem[] = [];

    if (email) links.push({ icon: 'mail', href: `mailto:${email}`, color: 'black' });
    if (github) links.push({ icon: 'github', href: `https://github.com/${github}/`, color: 'black' });
    if (linkedin) links.push({ icon: 'linkedin', href: `https://linkedin.com/in/${linkedin}/`, color: 'blue' });

    return (
      <div>
        <h1>
          {username}
          <LinkIconsGroup links={links} />
        </h1>
        {description ? <p>{description}</p> : null}
      </div>
    );
  };

  render() {
    return (
      <Query query={getUserInfoQuery} variables={{ id: this.props.router.query.id }}>
        {({ loading, error, data }: QueryResult) => {
          if (error) return <div>{Router.push('/') && null}</div>;
          if (loading) return <div>Loading</div>;

          const { username, description, email, github, linkedin, categories } = data.getUserInfo;

          return (
            <>
              {this.renderProfile(username, description, email, github, linkedin)}
              {categories &&
                categories.map((v: Category) => (
                  <CategoryTemplate key={v._id} category={v.name || ''}>
                    {v.items && v.items.map(i => (i.name ? <ItemTemplate key={i._id} title={i.name} description={i.description || ''} /> : null))}
                  </CategoryTemplate>
                ))}
            </>
          );
        }}
      </Query>
    );
  }
}
