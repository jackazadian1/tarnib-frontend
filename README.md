# Tarnib Frontend

This repository contains the React/TypeScript frontend for the Tarnib card game project. It provides a user interface for interacting with the Tarnib game and communicates with the Laravel backend to manage game state.

## Table of Contents

- [Tarnib Frontend](#tarnib-frontend)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Formatting](#formatting)
  - [VS Code Extensions](#vs-code-extensions)

## Installation

1. Clone the repository:

```
git clone https://github.com/jackazadian1/tarnib-frontend.git
```

2. Change directory to the project folder:

```
cd tarnib-frontend
```

3. Install dependencies using npm:

```
npm install
```

4. Start the development server:

```
npm start
```

Now, the Tarnib frontend should be up and running at `http://localhost:3000`.

## Configuration

Update the `.env` file with your environment-specific configurations, such as the backend API URL and any other settings required by the application.

## Usage

Navigate to the Tarnib frontend in your web browser, and you will be able to interact with the game interface. To play the game, ensure that the Tarnib backend is also running and correctly configured.

## Formatting
To format your code, use the prettier config in the root directory:
```
// Install prettier
1. npm install --save-dev prettier 

// Run prettier for all the files under a directory
2. npx prettier --write "src/**/*.tsx"
```


## VS Code Extensions
VS Code is ugly and not so powerful out of the box, get the following extensions to fix this:

   1. `Material Icon Theme` -->  Give Icons to your files/folders
   2. `Rainbow Brackets` -->  Highlights matching brackets with different colors to help identify code blocks and make your code more readable.
   3. `Code Spell Checker` --> Checks your spelling as you type, helps you catch typos or spelling errors before they become a problem.
