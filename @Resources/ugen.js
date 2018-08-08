const fs = require("fs");
const upgrades = require("./upgrades.json");

let out = "";

for (let i = 0; i < upgrades.length; i++) {
	let name = upgrades[i].n; let cname = upgrades[i].n.split(" ").join("");
	let iterator = upgrades[i].i;
	let required = upgrades[i].r;
	let gives = upgrades[i].g;

	out += `[${cname}Upgrade]
meter = Image
dynamicVariables = 1
x = 201
y = (((201 / 3) * ${i}) + #scroll#)
w = 201
h = (201 / 3)
solidColor = 0, 0, 0, 100
mouseOverAction = [!SetOption ${cname}Upgrade solidColor "55, 55, 55, 100"]
mouseLeaveAction = [!SetOption ${cname}Upgrade solidColor "0, 0, 0, 100"]
leftMouseUpAction = [!SetVariable ${iterator} "(#points# >= ${required} ? (#${iterator}# + ${gives}) : #${iterator}#)"][!SetVariable points "(#points# >= ${required} ? (#points# - ${required}) : #points#)"]

[${cname}UpgradeText]
meter = String
x = 221
y = ((201 / 3) / 2)r
w = 181
text = "${name}"
fontSize = 12
fontColor = 255, 255, 255
fontFace = #font#
stringAlign = leftcenter
antiAlias = 1\n\n`;
}

fs.writeFileSync("./u.ini", out);
