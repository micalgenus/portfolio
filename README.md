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
PORTFOLIO_OAUTH_URL=<oauth-uri>
GOOGLE_ANALYTICS_KEY=<google-anaytics-key>
GITHUB_OAUTH_CLIENT_ID=<github-auth-client-id>
```

PORTFOLIO_GRAPHQL_URL: GraphQL API를 위한 서버 URL을 입력합니다.
PORTFOLIO_OAUTH_URL: OAuth API를 위한 서버 URL을 입력합니다.
GOOGLE_ANALYTICS_KEY: Google Analytics를 이용하기 위한 키를 입력합니다. (선택)
GITHUB_OAUTH_CLIENT_ID: Github OAuth을 위한 client id를 입력합니다. (선택)

#### GraphQL & OAuth API Server

해당 프로젝트에서 사용하기 위한 API서버를 구축하여야 합니다.
API 서버: https://github.com/micalgenus/portfolio-serverless (GraphQL + OAuth)

#### Google App Engine

해당 프로젝트를 Google App Engine에 deploy하기 위해서 키가 필요합니다.
travis-ci를 이용하여 자동으로 deploy하기 위해서는 `keyfile.json`이 필요하며, 해당 설정에 맞게 `.traivs.yml`파일 수정이 필요합니다.

```
$ travis encrypt-file keyfile.json --add
```