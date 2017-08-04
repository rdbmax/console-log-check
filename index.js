const Shell = require('shelljs');

console.log('\n\n> Check console.log\n\n');

const { stdout: fileName } = Shell.exec('git diff --name-only', { silent: true });

let numberFileFailed = 0;
const arrayFileName = fileName.split('\n');
arrayFileName.pop();

arrayFileName.map(file => {
    const { stdout: diff } = Shell.exec(`git diff ${file}`, { silent: true });
    if (diff.includes('console.log')) {
        console.log(`  FAIL -- ${file}\n`);
        numberFileFailed += 1;
    } else
        console.log(`  PASS -- ${file}\n`);
});

if (numberFileFailed > 0) {
    console.log(`\n Error:\t ${numberFileFailed} failed, ${arrayFileName.length - numberFileFailed} passed, ${arrayFileName.length - numberFileFailed} of ${arrayFileName.length} total`);
    console.log(' Please remove console.log before commit');
} else
    console.log(`\n Passed:\t ${arrayFileName.length} passed, ${arrayFileName.length} of ${arrayFileName} total\n`);
