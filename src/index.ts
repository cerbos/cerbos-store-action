// Copyright 2021-2026 Zenauth Ltd.
// SPDX-License-Identifier: Apache-2.0

import * as core from '@actions/core'
import * as common from 'cerbos-actions-common'
import {HttpsProxyAgent} from 'https-proxy-agent'
import {Octokit} from 'octokit'

async function run(): Promise<void> {
  const githubToken = core.getInput('github_token')
  if (githubToken === '') {
    core.warning(
      `The action input 'github_token' is unavailable. Stricter rate limiting will be applied by GitHub.`
    )
  }

  const storeID = core.getInput('store_id')
  const clientID = core.getInput('client_id')
  const clientSecret = core.getInput('client_secret')
  if (storeID === '' || (clientID === '' && clientSecret === '')) {
    core.setFailed(
      "The action input 'store_id', 'client_id' and 'client_secret' must be specified"
    )
    process.exit(1)
  }

  const octokit = new Octokit({
    auth: githubToken,
    request: {
      agent: process.env.http_proxy
        ? new HttpsProxyAgent(process.env.http_proxy)
        : undefined,
      fetch
    },
    userAgent: process.env['GITHUB_REPOSITORY']
      ? process.env['GITHUB_REPOSITORY']
      : 'cerbos-store-action'
  })

  await common.setup({
    binaries: ['cerbosctl'],
    octokit: octokit,
    version: core.getInput('version')
  })

  await common.upload({
    apiEndpoint: core.getInput('api_endpoint'),
    clientID: clientID,
    clientSecret: clientSecret,
    storeID: storeID,
    fromRevision: core.getInput('from_revision'),
    toRevision: core.getInput('to_revision'),
    subDir: core.getInput('subdir')
  })
}

run()
