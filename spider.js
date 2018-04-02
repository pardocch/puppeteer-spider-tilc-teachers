const puppeteer = require('puppeteer');
const fs = require('fs');
let teacherArray = [];
let teacherId = 0;

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	try {
		await page.goto('http://stu.tilc.com.tw/');
		await page.type('input#TextBox_UserID', 'USERNAME'); // Enter your USERNAME
		await page.type('input#TextBox_Password', 'PASSWORD'); // Enter your PASSWORD
		await page.click('#ImageButton1');

		while (teacherId <= 5000) {
			await page.goto('http://stu.tilc.com.tw/TeacherStyle.aspx?Tid='+teacherId);
			let html = await page.evaluate(() => {
				const name = document.body.querySelector('#Label1').innerHTML;
				const background = document.body.querySelector('#Label2').innerHTML;
				const experience = document.body.querySelector('#Label3').innerHTML;
				const certificate = document.body.querySelector('#Label4').innerHTML;
				return {name: name, background: background, experience: experience, certificate: certificate};
			});
			const name = await html.name;
			const background = await html.background;
			const experience = await html.experience;
			const certificate = await html.certificate;
			const teacher = await new Object();
			if (name) {
				teacher.id = teacherId;
				teacher.name = name.replace(/<br>/g, ' ');
				teacher.background = background.replace(/<br>/g, ' ');
				teacher.experience = experience.replace(/<br>/g, ' ');
				teacher.certificate = certificate.replace(/<br>/g, ' ');
				teacherArray.push(JSON.stringify(teacher));
				console.log(JSON.stringify(teacher));
			}
			if (teacherId % 100 === 0) {
				new Promise(function(resolve, reject) {
				    fs.writeFile("data.json", '['+teacherArray+']', 'utf8', function(err) {
				        if (err) reject(err);
				        else resolve(teacherArray);
				    });
				});
				console.log(teacherArray);
			}
			teacherId++;
		}
		await browser.close();
	} catch (e) {
		teacherId++;
	}
})();