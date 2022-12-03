# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.1.0] - 2022-12-03

### Updated

- Bump `@types/jest` from `27.0.1` to `29.2.3`
- Bump `@types/node` from `16.7.10` to `18.11.10`
- Bump `@typescript-eslint/eslint-plugin` from `4.31.0` to `5.45.0`
- Bump `@typescript-eslint/parser` from `4.31.0` to `5.45.0`
- Bump `eslint-config-semistandard` from `16.0.0` to `17.0.0`
- Bump `eslint-config-standard` from `16.0.3` to `17.0.0`
- Bump `eslint-plugin-import` from `2.24.2` to `2.26.0`
- Bump `eslint-plugin-promise` from `5.1.0` to `6.1.1`
- Bump `eslint-plugin-simple-import-sort` from `7.0.0` to `8.0.0`
- Bump `eslint` from `7.32.0` to `8.29.0`
- Bump `husky` from `8.0.1` to `8.0.2`
- Bump `jest` from `27.1.0` to `29.3.1`
- Bump `lint-staged` from `13.0.0` to `13.0.4`
- Bump `ts-jest` from `27.0.5` to `29.0.3`
- Bump `ts-node` from `10.2.1` to `10.9.1`
- Bump `typescript` from `4.4.2` to `4.9.3`
- Folder structures, now uses api folder to store each api endpoint's request and response.
- Jest now uses typescript configuration file.

### Added

- Add `clean` script, to clean the project (remove node_modules and typescript build files).
- Add `lint-staged` and `husky` support.

## [v1.0.1] - 2020-09-06

### Updated

- Bump `@types/jest` from `25.1.0` to `27.0.1`
- Bump `@types/node` from `14.0.5` to `16.7.10`
- Bump `@typescript-eslint/eslint-plugin` from `2.18.0` to `4.31.0`
- Bump `@typescript-eslint/parser` from `2.18.0` to `4.31.0`
- Bump `eslint-config-semistandard` from `15.0.0` to `16.0.0`
- Bump `eslint-config-standard` from `14.1.0` to `16.0.3`
- Bump `eslint-plugin-import` from `2.20.0` to `2.24.2`
- Bump `eslint-plugin-node` from `11.0.0` to `11.1.0`
- Bump `eslint-plugin-promise` from `4.2.1` to `5.1.0`
- Bump `eslint` from `6.8.0` to `7.32.0`
- Bump `jest` from `25.1.0` to `27.1.0`
- Bump `semistandard` from `14.2.0` to `16.0.1`
- Bump `ts-jest` from `25.0.0` to `27.0.5`
- Bump `ts-node` from `8.6.2` to `10.2.1`
- Bump `typescript` from `3.7.5` to `4.4.2`
- Change license to *MIT*

### Added

- Added `husky` and `lint-staged`.
- Added strict linter (`@ivyhjk/eslint-config-typescript`)

### Removed

- Removed `eslint-plugin-standard`, `eslint-config-standard >= 16.0.0` no longer require the `eslint-plugin-standard` package.

## [v1.0.0] - 2020-05-25

Initial release

[unreleased]: https://github.com/ivyhjk/khipu-client-nodejs/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ivyhjk/khipu-client-nodejs/releases/tag/v1.0.0
