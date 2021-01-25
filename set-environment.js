const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';

// `environment.ts` file structure
const envConfigFile = `export const environment = {
  production: ${process.env.PRODUCTION},
  backendHost: '${process.env.BACKEND_HOST}'
};
`;

console.log('===> Production: ', process.env.PRODUCTION);
console.log('===> The file `environment.ts` will be written with the following content: \n');
console.log(envConfigFile);

fs.writeFile(targetPath, envConfigFile, err => {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`===> Angular environment.ts file generated correctly at ${targetPath} \n`);
  }
});
