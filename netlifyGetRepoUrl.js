import fetch from 'node-fetch'

const getPullRequestRepoUrl = async () => {
  if (process.env.PULL_REQUEST) {
    const repoUrl = process.env.REPOSITORY_URL
    const repoName = repoUrl.replace("https://github.com/", "")
    const branch = process.env.BRANCH
    const pullRequest = branch.replace("pull/", "").replace("/head", "")
    const response = await fetch(`https://api.github.com/repos/${repoName}/pulls/${pullRequest}`)
    const prInfo = await response.json()
    console.log(prInfo.head.repo.clone_url)
    return
  }
  console.log(process.env.HEAD)
}
getPullRequestRepoUrl()
