# DailyDrip React Native App

This is the upcoming DailyDrip remote app, using React Native.

## Lint

We'd like to lint our application nicely for consistency, and to avoid stupid
bugs.  We have an eslint configuration.  You can run the linter like so:

```
npm run lint
```

Some potentially relevant links:

- [eslint](http://eslint.org/)
- [AirBnb Javascript Styleguide](https://github.com/airbnb/javascript)
- [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)

## Setup

```
npm install
npm install -g react-native-cli
brew install watchman
brew install flow

react-native run-ios
```

## Debugging

I'd suggest installing [React Native
Debugger](https://github.com/jhen0409/react-native-debugger):

```sh
# On a mac:
brew update && brew cask install react-native-debugger
```

Then you can just run the app and run the native debugger and debugging is
glorious.

### License

Distribution of this software is governed by the BSD 3-Clause license.  See
the LICENSE file for the text of the license.
