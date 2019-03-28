# React Portfolio

[![TravisCI](https://travis-ci.org/micalgenus/portfolio.svg?branch=develop)](https://travis-ci.org/micalgenus/portfolio)
[![Maintainability](https://api.codeclimate.com/v1/badges/b2ae90e1e78a22d63b79/maintainability)](https://codeclimate.com/github/micalgenus/portfolio/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b2ae90e1e78a22d63b79/test_coverage)](https://codeclimate.com/github/micalgenus/portfolio/test_coverage)

포트폴리오 제공용 홈페이지의 serverless GraphQL 서비스입니다. Google Cloud Functions, Google Cloud Datastore를 사용합니다.

## 사용법

```
yarn build && yarn start
```

### 필수 사항

#### .env

```
PORTFOLIO_GRAPHQL_URL=<graphql-uri>
```

PORTFOLIO_GRAPHQL_URL: API를 위한 서버 URL를 입력합니다.

#### GraphQL API Server

해당 프로젝트에서 사용하기 위한 API서버를 구축하여야 합니다.
API 서버: https://github.com/micalgenus/portfolio-serverless (GraphQL)
