const cp = require('child_process');
let log = cp.execSync('git log --format="%H" -- assets/css/style.css', {encoding: 'utf8'}).trim().split('\n');
log.forEach(hash => {
    try {
        let c = cp.execSync(`git show ${hash}:assets/css/style.css`, {encoding: 'utf8'});
        let m = c.match(/--forest-green:\s*([^;]+);/);
        let m2 = c.match(/--emerald:\s*([^;]+);/);
        let m3 = c.match(/--gold:\s*([^;]+);/);
        if (m) console.log(hash.substring(0,7) + ' | forest: ' + m[1] + ' | emerald: ' + (m2?m2[1]:'?') + ' | gold: ' + (m3?m3[1]:'?'));
    } catch (e) {}
});
