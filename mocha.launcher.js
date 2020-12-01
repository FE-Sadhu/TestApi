const Mocha = require("mocha");
const mocha = new Mocha()
/* 测试报告
const mocha = new Mocha({
    reporter: "mochawesome",
    reporterOptions: {
        reportDir: "docs/api"
    }
});
*/

const testFiles = [
    // "./test/beforeLogin.spec.js",
    "./test/loggedIn.spec.js"
]
// 添加测试规范文件
testFiles.forEach(testFile => {
    mocha.addFile(testFile);
});

mocha.run(function() {
    console.log("酷宅所有接口测试结束");
    process.exit();   // <- 这个非常重要，否则node不知道自己是否结束了
});