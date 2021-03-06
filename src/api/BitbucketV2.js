import axios from 'axios'
import { getCleanURL, buildURL, parseQuery, buildQuery } from '../utils'

/**
 * @see https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html
 * @see https://developer.atlassian.com/bitbucket/api/2/reference/meta/authentication
 * @see https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues
 * @see https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues/%7Bissue_id%7D/comments
 * @see https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/issues/%7Bissue_id%7D/comments
 */
export default class BitbucketV2 {
  constructor ({
    owner,
    repo,
    clientId,
    clientSecret,
    state
  }) {
    this.owner = owner
    this.repo = repo

    this.clientId = clientId
    this.clientSecret = clientSecret
    this.state = state

    this.$http = axios.create({
      baseURL: 'https://api.bitbucket.org/2.0/',
      headers: {
        'Accept': 'application/json'
      }
    })
  }

  redirectAuthorize () {
    window.location.href = buildURL('https://bitbucket.org/site/oauth2/authorize', {
      client_id: this.clientId,
      redirect_uri: window.location.href,
      response_type: 'code'
    })
  }

  async handleAuthorize () {
    const query = parseQuery(window.location.search)
    if (query.code) {
      const code = query.code
      delete query.code
      const replaceURL = buildURL(getCleanURL(), query) + window.location.hash
      window.history.replaceState(null, null, replaceURL)
      const accessToken = await this.getAccessToken({ code })
      return accessToken
    }
    return null
  }

  async getAccessToken ({ code }) {
    const response = await this.$http.post(`https://cors-anywhere.herokuapp.com/${'https://bitbucket.org/site/oauth2/access_token'}`, buildQuery({
      grant_type: 'authorization_code',
      redirect_uri: window.location.href,
      code
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: this.clientId,
        password: this.clientSecret
      }
    })
    const accessToken = response.data.access_token
    return accessToken
  }

  async getUser ({ accessToken }) {
    const response = await this.$http.get('/user', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    const user = response.data
    return normalizeUser(user)
  }

  async getIssues () {
    const response = await this.$http.get(`repositories/${this.owner}/${this.repo}/issues`, {
      params: {
        // to avoid caching
        timestamp: Date.now()
      }
    })
    const issues = response.data.values
    return issues.map(normalizeIssue)
  }

  async getComments ({ issueId }) {
    const response = await this.$http.get(`repositories/${this.owner}/${this.repo}/issues/${issueId}/comments`, {
      params: {
        // to avoid caching
        timestamp: Date.now()
      },
      headers: {
        'Accept': [
          'application/vnd.github.v3.raw+json',
          'application/vnd.github.v3.html+json',
          'application/vnd.github.squirrel-girl-preview'
        ]
      }
    })
    const comments = response.data.values
    return comments.map(normalizeComment)
  }

  async createIssue ({
    title,
    content,
    accessToken
  }) {
    const response = await this.$http.post(`repositories/${this.owner}/${this.repo}/issues`, {
      title,
      content: {
        raw: content
      },
      priority: 'trivial',
      type: 'task'
    }, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    const issue = response.data
    return normalizeIssue(issue)
  }

  async createIssueComment ({
    issueId,
    content,
    accessToken
  }) {
    const response = await this.$http.post(`repositories/${this.owner}/${this.repo}/issues/${issueId}/comments`, {
      content: {
        raw: content
      }
    }, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    const comment = response.data
    return normalizeComment(comment)
  }

  async createIssueReaction ({
    issueId,
    reaction,
    accessToken
  }) {
    // no support
  }

  async createCommentReaction ({
    commentId,
    reaction,
    accessToken
  }) {
    // no support
  }
}

function normalizeUser (user) {
  return {
    username: user.username,
    avatar: user.links.avatar.href,
    homepage: user.links.html.href
  }
}

function normalizeIssue (issue) {
  return {
    id: issue.id,
    title: issue.title,
    content: issue.content.raw,
    commentsCount: null
  }
}

function normalizeComment (comment) {
  return {
    id: comment.id,
    content: comment.content.html,
    contentRaw: comment.content.raw,
    author: normalizeUser(comment.user),
    createdAt: comment.created_on,
    updatedAt: comment.updated_on,
    reactions: null
  }
}
