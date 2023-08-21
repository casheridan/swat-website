---
layout: default
title: Making Changes
parent: Deployment
---

# Making Changes to the Website
In order to make changes to the website you will need to do a few things in order to get your changes from local to live quickly.

## Setup
Before you make any changes be sure to create a new branch with a name different than 'master' or 'main'. Try to keep it relevant to your changes in 1-4 words.

After creating a branch (either locally or pulled from remote) you can then start making changes and adding commits to your local branch. Here is an example of a small change made after creating the `small-change` branch.

1. `git add .` or `git add small_change.txt`
2. `git commit -m "did a small change"`
3. `git push` or `git push origin small-change`

After that you can now create a pull request or PR

## Creating a PR and doing a code review
> If you are looking to just add your code to the master branch and don't want to deploy master to live yet then follow these steps here. Otherwise skip to the "How to Deploy" section. Do please read this before attempting to deploy though.

When you push your changes on your local branch to remote (swat-website github repository) you will need to create a PR in order to get your changes applied to master. We need to get our code to the master branch as this is where our live site code resides. In order to do this you will need to go to the swat-website repo main github page and select the 'Pull requests' tab at the top. After that click the green button that says 'New pull request' or if there is a banner/alert that says your branch pushed some commits with a green button 'Compare & pull request' then click that. 

Then after all that fill in the pull request template and click 'Create pull request' and you will be taken to your new pull request. Next steps are to get your team members and your team lead to add there approval and when one with write access approves then you can click 'Squash and merge'.

## How to deploy
> Refer to "" in order to get to having a PR ready for this section.

Deployment to live has been made automated and more hands off as pushing code to the master branch is protected and can only be pushed to with approval from a user with write permissions. Once you create a PR, in order to trigger a deployment to live you will need to add a semver version to the title of your PR. Here is an example:
- `[1.23.4] Title of the pull request here`

After doing a code review and the branch is merged to master the github actions workflow should kick in and do two things, create a tag with the semver provided and deploy any code in master to the live site in firebase. You can revert a live push if you have access to the firebase console and know how to reverse it. DO NOT ATTEMPT THIS IF YOU DO NOT KNOW HOW.
