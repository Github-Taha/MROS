function compileCode() {
	outputText();
	let codeString = [""];
	let index = 0;
	let quote = false;

	for (let i = 0; i < code.length; i++) {
		let l = code[i];
		if (l == "\"") {
			quote = !quote;
		}
		else if (quote) {
			codeString[index] += l;
		}
		if (!quote) {
			if (/[/\w\.-]/g.test(l)) {
				codeString[index] += l;
			}
			else if (/\s/g.test(l)) {
				codeString.push("");
				index++;
			}
		}
	}
	for (let i = codeString.length - 1; i >= 0; i--)
		if (codeString[i] == "")
			codeString.splice(i, 1);

	let command = codeString[0];
	let foundItem = false;
	for (item in getItem(FILESYSTEM, "/home/commands/").children) {
		if (command == item) {
			eval(getItem(FILESYSTEM, "/home/commands/" + item + "/" + item + ".cmd").data);
			foundItem = true;
			break;
		}
	}
	if (!foundItem) {
			text.push("<span style=\"color:red;\">Unknown command: " + command + "</span>");
	}
	switch(command) {
		case "mkdir":
			if (false) {
				
			}
			else {
				let newAddress = currentAddress;
				if (codeString[1]) {
					let pass = true;
					let dirArray = codeString[1].split("/");
					for (let i = dirArray.length - 1; i >= 0; i--)
						if (dirArray[i] == "")
							dirArray.splice(i, 1);
					let newDirectory = dirArray.pop();
					for (let i = 0; i < dirArray.length; i++) {
						let dir = dirArray[i];
						if (dir == "..") {
							let currentDir = newAddress.split("/");
							for (let i = currentDir.length - 1; i >= 0; i--)
								if (currentDir[i] == "")
									currentDir.splice(i, 1);
							currentDir.pop();
							newAddress = "/" + currentDir.join('/') + "/";
						}
						else if (dir == "~") {
							newAddress = "/home/Users/" + user + "/";
						}
						else if (dir != undefined) {
							let newDir = newAddress;
							if (dir.split("/")[0] == "home") {
								newDir = "/" + dir + "/";
							}
							else {
								if (dir[dir.length - 1] == "/") {
									newDir += dir;
								}
								else {
									newDir += dir + "/";
								}
							}
							if (getItem(FILESYSTEM, newDir + "/") == null) {
								text.push('<span style=\"color:red;\">No such directory: ' + dir + "</span>");
								pass = false;
							}
							else {
								if (getItem(FILESYSTEM, newDir).type == "directory")
									newAddress = newDir;
								else {
									text.push('<span style=\"color:red;\">No such directory: ' + dir + "</span>");
									pass = false;
								}
							}
						}
					}
					if (pass) {
						if (getItem(FILESYSTEM, newAddress + newDirectory + "/") == null) {
							let newItem = {
								name: newDirectory,
								type: "directory",
								children: {},
								data: ""
							};
							getItem(FILESYSTEM, newAddress).children[newDirectory] = newItem;
							text.push('<span style=\"color:#50d647;\">Directory created</span>');
						}
						else {
							text.push('<span style=\"color:red;\">Directory already exists</span>');
						}
					}
				}
				else {
					text.push('<span style=\"color:red;\">Enter a Directory Address</span>');
				}
			}
			break;
		case "rmdir":
			if (false) {
				
			}
			else {
				let newAddress = currentAddress;
				if (codeString[1]) {
					let pass = true;
					let dirArray = codeString[1].split("/");
					for (let i = dirArray.length - 1; i >= 0; i--)
						if (dirArray[i] == "")
							dirArray.splice(i, 1);
					for (let i = 0; i < dirArray.length; i++) {
						let dir = dirArray[i];
						if (dir == "..") {
							let currentDir = newAddress.split("/");
							for (let i = currentDir.length - 1; i >= 0; i--)
								if (currentDir[i] == "")
									currentDir.splice(i, 1);
							currentDir.pop();
							newAddress = "/" + currentDir.join('/') + "/";
						}
						else if (dir == "~") {
							newAddress = "/home/Users/" + user + "/";
						}
						else if (dir != undefined) {
							let newDir = newAddress;
							if (dir.split("/")[0] == "home") {
								newDir = "/" + dir + "/";
							}
							else {
								if (dir[dir.length - 1] == "/") {
									newDir += dir;
								}
								else {
									newDir += dir + "/";
								}
							}
							if (getItem(FILESYSTEM, newDir) == null) {
								text.push('<span style=\"color:red;\">No such directory1: ' + dir + "</span>");
								pass = false;
							}
							else {
								if (getItem(FILESYSTEM, newDir).type == "directory")
									newAddress = newDir;
								else {
									text.push('<span style=\"color:red;\">No such directory2: ' + dir + "</span>");
									pass = false;
								}
							}
						}
					}
					if (pass) {
						if (getItem(FILESYSTEM, newAddress) != null) {
							let scode = `delete FILESYSTEM`;
							let pathArray = newAddress.split("/");
							for (let i = pathArray.length - 1; i >= 0; i--)
								if (pathArray[i] == "")
									pathArray.splice(i, 1);
							let item = FILESYSTEM;
							for (p of pathArray){
								if (p == 'home') {
									item = item[p];
									scode += `["${p}"]`;
								}
								else {
									item = item.children[p];
									scode += `.children["${p}"]`;
								}
							}
							eval(scode);
							text.push('<span style=\"color:#50d647;\">Directory deleted</span>');
						}
						else {
							text.push('<span style=\"color:red;\">No such directory3: ' + dirArray[dirArray.length - 1] + "</span>");
						}
					}
				}
				else {
					text.push('<span style=\"color:red;\">Enter a Directory Address</span>');
				}
			}
			break;
		case "mkfl":
			if (false) {

			}
			else {
				let newAddress = currentAddress;
				if (codeString[1]) {
					let pass = true;
					let dirArray = codeString[1].split("/");
					for (let i = dirArray.length - 1; i >= 0; i--)
						if (dirArray[i] == "")
							dirArray.splice(i, 1);
					let newFile = dirArray.pop();
					for (let i = 0; i < dirArray.length; i++) {
						let dir = dirArray[i];
						if (dir == "..") {
							let currentDir = newAddress.split("/");
							for (let i = currentDir.length - 1; i >= 0; i--)
								if (currentDir[i] == "")
									currentDir.splice(i, 1);
							currentDir.pop();
							newAddress = "/" + currentDir.join('/') + "/";
						}
						else if (dir == "~") {
							newAddress = "/home/Users/" + user + "/";
						}
						else if (dir != undefined) {
							let newDir = newAddress;
							if (dir.split("/")[0] == "home") {
								newDir = "/" + dir + "/";
							}
							else {
								if (dir[dir.length - 1] == "/") {
									newDir += dir;
								}
								else {
									newDir += dir + "/";
								}
							}
							if (getItem(FILESYSTEM, newDir + "/") == null) {
								text.push('<span style=\"color:red;\">No such directory: ' + dir + "</span>");
								pass = false;
							}
							else {
								if (getItem(FILESYSTEM, newDir).type == "directory")
									newAddress = newDir;
								else {
									text.push('<span style=\"color:red;\">Not a Directory: ' + dir + "</span>");
									pass = false;
								}
							}
						}
					}
					if (pass) {
						console.log(newFile.split("."));
						if (newFile.split(".")[newFile.length - 1]
					) {
							text.push('<span style=\"color:red;\">Enter a File Extension</span>');
							pass = false;
						}
						else {
							if (getItem(FILESYSTEM, newAddress + newFile + "/") == null) {
								let newItem = {
									path: newAddress + newFile + "/",
									name: newFile,
									type: "file",
									meta: newFile.split(".")[newFile.length - 1],
									data: "",
								};
								getItem(FILESYSTEM, newAddress).children[newFile] = newItem;
								text.push('<span style=\"color:#50d647;\">File created</span>');
							}
							else {
								text.push('<span style=\"color:red;\">File already exists</span>');
							}
						}
					}
				}
				else {
					text.push('<span style=\"color:red;\">Enter a File Address</span>');
				}
			}
			break;
		case "rmfl":
			if (false) {

			}
			else {
				let newAddress = currentAddress;
				if (codeString[1]) {
					let pass = true;
					let dirArray = codeString[1].split("/");
					for (let i = dirArray.length - 1; i >= 0; i--)
						if (dirArray[i] == "")
							dirArray.splice(i, 1);
					let delFile = dirArray.pop();
					for (let i = 0; i < dirArray.length; i++) {
						let dir = dirArray[i];
						if (dir == "..") {
							let currentDir = newAddress.split("/");
							for (let i = currentDir.length - 1; i >= 0; i--)
								if (currentDir[i] == "")
									currentDir.splice(i, 1);
							currentDir.pop();
							newAddress = "/" + currentDir.join('/') + "/";
						}
						else if (dir == "~") {
							newAddress = "/home/Users/" + user + "/";
						}
						else if (dir != undefined) {
							let newDir = newAddress;
							if (dir.split("/")[0] == "home") {
								newDir = "/" + dir + "/";
							}
							else {
								if (dir[dir.length - 1] == "/") {
									newDir += dir;
								}
								else {
									newDir += dir + "/";
								}
							}
							if (getItem(FILESYSTEM, newDir + "/") == null) {
								text.push('<span style=\"color:red;\">No such directory: ' + dir + "</span>");
								pass = false;
							}
							else {
								if (getItem(FILESYSTEM, newDir).type == "directory")
									newAddress = newDir;
								else {
									text.push('<span style=\"color:red;\">Not a Directory: ' + dir + "</span>");
									pass = false;
								}
							}
						}
					}
					if (pass) {
						console.log(newFile.split("."));
						if (newFile.split(".")[newFile.length - 1]) {
							text.push('<span style=\"color:red;\">Enter a File Extension</span>');
							pass = false;
						}
						else {
							if (getItem(FILESYSTEM, newAddress + newFile + "/") == null) {
								text.push('<span style=\"color:red;\">File does not exist</span>');
							}
							else {
								delete getItem(FILESYSTEM, newAddress + newFile + "/");
								text.push('<span style=\"color:#50d647;\">File deleted</span>');
							}
						}
					}
				}
				else {
					text.push('<span style=\"color:red;\">Enter a File Address</span>');
				}
			}
			break;
		default:
			if (command == null) break;
			text.push("<span style=\"color:red;\">Unknown command: " + command + "</span>");
			break;
	}
	outputText();
}