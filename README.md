# Cerbos Store Action

A GitHub action to upload [Cerbos](https://github.com/cerbos/cerbos) policies to [Cerbos Hub](https://hub.cerbos.cloud/) stores.

Cerbos helps you super-charge your authorization implementation by writing context-aware access control policies for your application resources. Find out more about Cerbos using the following resources:

- [Cerbos website](https://cerbos.dev)
- [Cerbos documentation](https://docs.cerbos.dev)
- [Cerbos GitHub repository](https://github.com/cerbos/cerbos)
- [Cerbos Slack community](http://go.cerbos.io/slack)

## Usage

This action automatically installs `cerbosctl` if it doesn't already exist or if the installed version (via [cerbos-setup-action](https://github.com/cerbos/cerbos-setup-action)) doesn't match the specified `version`.

### Upload new local git repository changes relative to the remote store's current version

```yaml
- name: Upload cerbos policies
  uses: cerbos/cerbos-store-action@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    store_id: ${{ secrets.CERBOS_HUB_STORE_ID }}
    client_id: ${{ secrets.CERBOS_HUB_CLIENT_ID }}
    client_secret: ${{ secrets.CERBOS_HUB_CLIENT_SECRET }}
    subdir: policies # optional subdirectory of Cerbos policies
```

### Upload new local git repository changes between `from_revision` and `to_revision`

```yaml
- name: Upload cerbos policies
  uses: cerbos/cerbos-store-action@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    store_id: ${{ secrets.CERBOS_HUB_STORE_ID }}
    client_id: ${{ secrets.CERBOS_HUB_CLIENT_ID }}
    client_secret: ${{ secrets.CERBOS_HUB_CLIENT_SECRET }}
    from_revision: main
    to_revision: HEAD
    subdir: policies # optional subdirectory of Cerbos policies
```

## Development

### Prerequisites

You'll need to install

- Node.js, matching the version specified in our [.node-version](../.node-version) file
  - A version manager that supports this file is recommended, for example [n](https://github.com/tj/n#readme).
    Note that [nvm](https://github.com/nvm-sh/nvm) [does not](https://github.com/nvm-sh/nvm/issues/794).

- pnpm, matching the version specified in our [package.json](./package.json) file
  - After installing Node.js, you can enable [Corepack](https://nodejs.org/api/corepack.html) to transparently install the correct `pnpm` version:
    ```console
    $ corepack enable
    ```

### Build

```
pnpm run build
```
