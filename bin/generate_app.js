const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');


// step 1 : check if name of the project given or not

if (process.argv.length < 3) {
	console.log("You need to provide the name of the app");
	console.log("create-boilerplate my-app");
	process.exit(1);
}

// step 2 : check if the project name is valid or not

const projectName = process.argv[2];
const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);
const gitRepo = 'https://github.com/SamirDhoke/react-boilerplate.git';

try {
	
	fs.makeDirSync(projectDir);

} catch (e) {

	if (e.code === 'EEXIST') {
		console.log('A project with this name already exist in current directory')
	} else {
		console.log(e.message);
	}

	process.exit(1);
}

async function main() {

	try {

		// step 3 : clone our boilerplate into the project directory
		console.log("downloading files...")
		execSync(`git clone ${gitRepo} ${projectName}`);

		// step 4 : install all the dependencies
		console.log("installing dependencies...")
		process.chdir(projectDir);

		execSync('npm install');

		// step 5 : remove unnecessarry files
		console.log("removing unnecessarry files...")
		execSync('rm -rf ./.git');
		execSync('rm -rf ./bin');		
	
	} catch (e) {

		console.log(e.message);
		process.exit(1);
	
	}

}

main();