# Turing Game v1.1
Game of Turing Machine programming challenges. [Click here to play!](https://denizbasgoren.github.io/turing)

| **Available in English and Turkish!** |
| --- |


# Main Menu
![Screenshot 1](https://denizbasgoren.github.io/turing/screenshots/screenshot1.png)

# Tester Menu
![Screenshot 2](https://denizbasgoren.github.io/turing/screenshots/screenshot2.png)

# Editor Menu
![Screenshot 3](https://denizbasgoren.github.io/turing/screenshots/screenshot3.png)

# Simulator Menu
![Screenshot 4](https://denizbasgoren.github.io/turing/screenshots/screenshot4.png)


# How to Run Locally
Since this is a Web + NodeJS project, make sure you have the following software installed:

- NodeJS
- NPM
- An arbitrary http server

1. Clone the project, put it in a folder of your choice.

2. Delete the `dist` folder.

3. Go to `404.html` and change the following line:

- from `let urlPrefix = '/turing'`
- to `let urlPrefix = ''`

4. Go to `src/utils/init.js` and change the following line:

- from `let urlPrefix = '/turing'`
- to `let urlPrefix = ''`

5. Run the commands:

```
npm install
npm run build
```

6. Delete `index.html`

7. Now a folder named `dist` should appear in the root folder. Cut `dist/index.html` from this folder, and paste it inside the root folder.

8. Done! Run the http server from the root folder:

```
http-server .
```


# How to Play the Game

Please see the [Help Page](https://denizbasgoren.github.io/turing/help).
