# Color Your Code

[![Build Status](https://img.shields.io/travis/kcmr/color-your-code/master.svg)](https://travis-ci.org/kcmr/color-your-code) 
[![codecov](https://codecov.io/gh/kcmr/color-your-code/branch/master/graph/badge.svg)](https://codecov.io/gh/kcmr/color-your-code)

> A visual editor for Visual Studio Code themes

Color Your Code aims to make customizing VSCode themes easier through a native color picker that lets you change the color of the selected area of the editor. It works better in Chrome and OS X due to the inconsistent behavior across browsers and operating systems of the native `<input type="color">`. 

For now, only workbench customizations are allowed (not token colors).

<iframe width="560" height="315" src="https://www.youtube.com/embed/QcAsFIz4HoU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[![Color Your Code in Youtube](https://img.youtube.com/vi/QcAsFIz4HoU/0.jpg)](https://www.youtube.com/embed/QcAsFIz4HoU)

## Development

- Install dependencies without altering `package-lock.json` contents:
  ```
  npm ci
  ```

- Launch the app:
  ```
  npm start
  ```

- Create a new element or test file (the command will prompt you for the file type):
  ```
  npm run create:element
  ```

- Run the tests with coverage output:
  ```
  npm test
  ```

- Run the tests in the browser (all components):
  - Go to http://localhost:3000/test
  
- Run the tests of a single component:
  - Go to http://localhost:3000/test/index.html?only=[test-file-name.html]
