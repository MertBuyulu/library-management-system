
Requirements for running
1. [Git](https://github.com/git-guides/install-git)
2. [Node.js](https://nodejs.org)
3. [NPM](https://www.npmjs.com/)
4. [Yarn](https://yarnpkg.com/)

Instructions for running
1. Clone Code
	1. Open Terminal
	2. [Install Git](https://github.com/git-guides/install-git)
	3. Go to directory 
	4. `git clone https://github.com/sai-k02/library-management-system.git`
		1. Note: This will make a folder called "library-management-system"

2. Install Dependencies
	1. Install [Node.js](https://nodejs.org)
	2. Install [Yarn](https://yarnpkg.com/) 

3. Run Server
	1. Go to Server Directory
	2. Install Dependencies
		1. `yarn` 
	3. Run Server
		1. `yarn start`

4. Run Client
	1. Split Terminal
	2. Go to Client Directory
	3. Install Dependencies
		1. `yarn` 
	4. Run Client
		1. `yarn start`

Yarn config
	1. Server: 
		1. Include .env
		2. npx generate
		3. npx prisma db pull
	2. Client:
		1. Inspect -> Apllication -> Local Storage -> Clear (localhost:3000)
