const codeEl = document.getElementById("code");
const lineEl = document.getElementById("rows");
const colsEl = document.getElementById("cols");
const cursorEl = document.getElementById("cursor");

let keywords1JS = ["if", "else", "for", "while", "return", "break", "const"]
let keywords2JS = ["let", "var"]

let user = "MasterRyped";
let currentAddress = "/home/Users/" + user + "/";
let pre = `<span style="color:#cce034;">${user}</span>:<span style="color:lightblue;">${(currentAddress == `/home/Users/${user}/` ? "~" : currentAddress)}</span>$`;

// Keypress handler
let cursorCol = 0;
let cursor = {
	line: 0,
	col: 0
}
let text = [];
let d = `<span style="color:#cce034;">${user}</span>:<span style="color:lightblue;">~</span>$`;
text.push((currentAddress == `/home/Users/${user}` ? d : pre));
let code = "";
let lineShow = "&#124";
let change = false;
window.addEventListener("keydown", function(event){
	switch(event.key){
		case "Backspace":
			if (cursorCol != 0){
				code = code.substring(0, cursorCol-1) + code.substring(cursorCol, code.length);
				cursorCol -= 1;
			}
			break;
		case "Shift":
			break;
		case "Enter":
			text[text.length-1] += " " + code;
			let d = `<span style="color:#cce034;">${user}</span>:<span style="color:lightblue;">~</span>$`;
			compileCode();
			pre = `<span style="color:#cce034;">${user}</span>:<span style="color:lightblue;">${currentAddress}</span>$`;
			text.push((currentAddress == `/home/Users/${user}/` ? d : pre));
			cursorCol = 0;
			code = "";
			break;
		case "Alt":
			break;
		case "Tab":
			event.preventDefault();
			break;
		case "Control":
			break;
		case "ArrowLeft":
			if (cursorCol != 0) cursorCol --;
			break;
		case "ArrowRight":
			if (cursorCol != code.length - 1) cursorCol ++;
			break;
		case "CapsLock":
			break;
		case "Escape":
			break;
		case "Meta":
			break;
		case " ":
			code = code.substring(0, cursorCol) + " " + code.substring(cursorCol, code.length);
			cursorCol ++;
			break;
		default :
			code = code.substring(0, cursorCol) + event.key + code.substring(cursor.column, code.length);
			cursorCol ++;
			break;
	}
	outputText();
});

function outputText() {
	let finalCode = "";
	for (let i = 0; i < text.length; i++){
		let finaltext = text[i];
		finalCode += finaltext +  (i == text.length - 1 ? "" : "\n");
	}
	codeEl.innerHTML = finalCode + " " + code;
	cursor.line = text.length - 1;
	cursor.column = user.length + (currentAddress == `/home/Users/${user}/` ? "~" : currentAddress).length + code.length + 3;

	let cursorText = "";
	for (let i = 0; i < cursor.line; i++) cursorText += "\n";
	for (let i = 0; i < cursor.column; i++) cursorText += " ";
	cursorText += "&#124";
	cursorEl.innerHTML = cursorText;
}
outputText();
