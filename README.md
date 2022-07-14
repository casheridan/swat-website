[![Deploy to Live Channel](https://github.com/casheridan/swat-website/actions/workflows/deploy-prod.yml/badge.svg)](https://github.com/casheridan/swat-website/actions/workflows/deploy-prod.yml) [![Deploy to Firebase Hosting on PR](https://github.com/casheridan/swat-website/actions/workflows/firebase-hosting-pull-request.yml/badge.svg)](https://github.com/casheridan/swat-website/actions/workflows/firebase-hosting-pull-request.yml)

# S.W.A.T. Website

This is the FRC 1806 S.W.A.T. repository for the official website. This website has the ability to clock in students and
track their time data. This also has a newsletter system allowing for super easy updating of timely newsletters.

## Set Up (Installs)

To get setup with working on this project you will need to download the repo, Git, Node, and the Firebase CLI

- Git: https://git-scm.com/
- Node: https://nodejs.org/en/
- Visual Studio Code: https://code.visualstudio.com/download
- Firebase CLI: `npm install -g firebase-tools`
  > reference: https://firebase.google.com/docs/cli#windows-npm

## Setting Up the Project (React)

    Make sure you have everything installed in the Set Up (Installs) section before you continue
    1. Clone the repo with git: `git clone https://github.com/casheridan/swat-website.git`
    2. Open cloned repo in Visual Studio Code
    3. Open a terminal in 'Terminal > New Terminal' or `CTRL + SHIFT + \``
    3. Install the required node modules with `npm install` in a terminal in the directory of the project
    4. Start the website with `npm start`
     - This should build and run the site on a localhost port (usually 5000)
     - Any changes saved will immediately show up on the localhost site

## Make Changes

1. Follow the Setting up Project
2. Login to firebase through terminal `firebase login`
3. Follow contributing process | Process can be found in [the wiki](https://github.com/casheridan/swat-website/wiki/Contributing-Process), [the contributing file](https://github.com/casheridan/swat-website/blob/master/CONTRIBUTING.md), or [the github page](https://casheridan.github.io/swat-website/docs/deployment/making-changes)
4. Follow deployment procedure | Procedure can be found in [repo wiki](https://github.com/casheridan/swat-website/wiki/Deployment), or [github page](https://casheridan.github.io/swat-website/docs/deployment/live-site-deployment)
5. Cleanup (if any)

## Built with

- Frontend: **[React JS](https://reactjs.org/)**
- Backend API: **[Firebase SDK](https://firebase.google.com/)**
- Styling: **Cascading Style Sheets(CSS)**

## Authors

- **Christian Sheridan** - _concept, design, and programming_ - [Github Profile](https://github.com/casheridan) 2016-2020

See also the list of [contributors](https://github.com/casheridan/swat-website/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/casheridan/swat-website/blob/master/LICENSE.md) file for details

## Acknowledgments

- All of this was made possible by Google Firebase

- [FIRST | For Inspiration and Recognition of Science and Technology](https://www.firstinspires.org/)

- I got this idea from the fact that we just had paper signing in and the way to get off the books wasn't
  efficient and we would miss people and or not know how many hours they had put into actually attending robotics.
  Also we needed to get the name of Team 1806 S.W.A.T. out to the public and a way to give people that support S.W.A.T.
  and easier way to keep in contact or information.
