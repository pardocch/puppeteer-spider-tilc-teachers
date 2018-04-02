const fs = require('fs');
const datas = fs.readFileSync('data.json');
const dataArray = JSON.parse(datas);
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
let getloop = function () {
	rl.question("0: 查老師資料, 1: 查總共幾個老師, exit: 離開, 輸入: ", (answer) => {
		if(answer == 'exit') rl.close();
		else getTeacher(answer);
	});
}
function getTeacher(answer) {
	switch (answer){
		case '0':
			rl.question("請輸入老師名字: ", (answer2) => {
				let key = new RegExp(answer2, "i");
				dataArray.forEach(function(data){
					if(key.test(String(data.name))) {
						console.log(data)
					}
				});
				getloop();
			});
			break;
		case '1':
			console.log(dataArray.length+'位');
			getloop();
			break;
	}
}
getloop();