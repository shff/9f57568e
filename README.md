# Comment Component

![Deploy](https://github.com/shff/9f57568ea/actions/workflows/deploy.yml/badge.svg?b=1)

This project hosts a Comments React component that stores components locally using IndexedDB.

🚨 To save time, a deployed version is accessible at [https://shff.github.io/9f57568ea/](https://shff.github.io/9f57568ea/).

![Screenshot](https://github.com/shff/9f57568ea/blob/main/sc.png?raw=true)

## The Main Challenge

The main code of the challenge can be observed in the `src/components/Comments` folder and `src/hooks`.

The challenge text did not specify whether it wanted a component in a reusable Node Module Library or inside a full app. I decided to create a full app to demonstrate the component in action, PWA caching support and broadcasting between tabs.

The project looks big, but the heavy lifting was done by Vite and by my personal template that adds linting, formatting, testing and precommit hooks. 99% of the time was spent creating components and tests.

After it was done I spent another hour crating tests to get 100% coverage. The only difficult part was testing the IndexedDB logic, but I managed to do it by mocking the IndexedDB API.

## Notable Features

### Tailwind

I've been using Tailwind for a while now and I'm really enjoying it. Before that I was using Tachyons, another helper-first CSS library.

### IndexedDB

The comments are stored locally using IndexedDB. This allows the comments to persist even after the page is reloaded, and even if the user closes the browser and opens it again. This is done with native IndexedDB code, without the need for any additional libraries.

We're using a custom hook to handle the IndexedDB logic. We use a custom hook to take advantage of hook composition. State is synced using `useState` inside our custom hook, so there's no need for the outer component to manage state by itself. It is almost as simple as using `useState` in a regular component.

```jsx
const { data, reload, add } = useIndexedDB<Comment>("DB1", "Comments");

<button onClick={() => add({ text: "Hello, World!" })}>Say hello</button>
{data.map((comment) => (
  <div key={comment.id}>{comment.text}</div>
))}
```

### BroadcastChannel

We use the `BroadcastChannel` feature to take care of broadcasting changes in comments to all tabs open in the same browser. This way, if the user opens the same page in multiple tabs, the comments will be synchronized between them. We don't broadcast to the same tab that originated the change, to avoid infinite loops.

We also use a hook for this feature. It uses a syntax similar to `useEffect`, where you pass a callback that will be called in other tabs when the dependencies on the third parameter change.

```jsx
useBroadcast("comments", () => alert("Comments updated elsewhere!"), [localComments]);
```

### PWA Support and Offline Mode

This project has partial PWA support. It has a service worker that caches the assets and the page itself. This way, the user can access the page even when offline.

The PWA support is available thanks to Vite's PWA plugin. The service worker is generated automatically when you build the project. Check `vite.config.ts` for more information.

### End-to-End Browser Tests

We have end-to-end tests using Playwright. These tests cover the main features of the project, such as adding and deleting comments, persisting changes and broadcasting changes to other tabs.

![Screenshot](https://github.com/shff/9f57568ea/blob/main/video.gif?raw=true)

### Tests and Coverage

We have a test suite that covers the main features of the project. We have 100% coverage on the client code.

![Coverage](https://github.com/shff/9f57568ea/blob/main/coverage.png?raw=true)

## How to Use

### Initialization and dependencies

This is a Node.js project. Make sure you have Node.js installed on your machine. We recommend using [NVM](https://github.com/nvm-sh/nvm) to manage your Node.js versions. Check the installation instructions on the NVM repository.

For package manage, we use Yarn. To download the dependencies, run:

```bash
yarn
```

### Running the project

We use Vite for development. To run the project in development mode, run:

```bash
yarn dev
```

The project should be running on `http://localhost:5173` or the next available port.

### Building the project

To build the project, run:

```bash
yarn build
```

The project should be built in the `dist` folder.

### Testing the project

This project uses Vitest to run unit tests.

To execute the test sute, run:

```bash
yarn test
```

To run end-to-end tests, run:

```bash
yarn test:e2e
```

### Linting and Formatting

We use ESLint and Prettier to lint and format the code. To run the linter, run:

```bash
yarn lint
```

To run the formatter, run:

```bash
yarn format
```

We also use simple-git-hooks and lint-staged to run the linter and formatter before committing. Git hooks should be installed automatically when you run `yarn` for the first time, but if you have any issues, you can install them manually by running:

```bash
yarn simple-git-hooks
```
