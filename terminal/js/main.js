let myString = prompt("Whelll hello there!");
let myStringArray = [""];
let index = 0;
let start = false;
let quote = false;

for (let i = 0; i < myString.length; i++) {
	let l = myString[i];
	if (l == "\"") {
		quote = !quote;
	}
	else if (quote) {
		myStringArray[index] += l;
	}
	if (!quote) {
		if (/[\w\.]/g.test(l)) {
			myStringArray[index] += l;
			start = true;
		}
		else if (/\s/g.test(l)) {
			start = false;
			myStringArray.push("");
			index++;
		}
	}
}
console.log(myStringArray);
