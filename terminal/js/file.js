const FILESYSTEM = {
	"home": {
		path: "/home",
		name: "home",
		type: "directory",
		children: {
			"Users": {
				path: "/home/Users",
				name: "Users",
				type: "directory",
				children: {
					"root": {
						path: "/home/Users/root",
						name: "root",
						type: "directory",
						children: {
							"Documents": {
								path: "/home/Users/root/Documents",
								name: "Documents",
								type: "directory",
								children: {},
							},
							"Downloads": {
								path:  "/home/Users/root/Downloads",
								name: "Downloads",
								type: "directory",
								children: {
									"file.txt": {
										name: "file.txt",
										type: "file",
										meta: "txt",
										data: "0123456789",
									},
								},
							},
						},
					},
					"MasterRyped": {
						path: "/home/Users/MasterRyped",
						name: "MasterRyped",
						type: "directory",
						children: {
							"Documents": {
								path: "/home/Users/MasterRyped/Documents",
								name: "Documents",
								type: "directory",
								children: {
									"html": {
										name: "html",
										type: "directory",
										children: {},
									},
								},
							},
							"Downloads": {
								path: "/home/Users/MasterRyped/Downloads",
								name: "Downloads",
								type: "directory",
								children: {
									"file.txt": {
										name: "file.txt",
										type: "file",
										meta: "txt",
										data: "0123456789",
									},
								},
							},
						},
					},
				},
			},
			"commands": {
				path: "/home/commands",
				name: "commands",
				type: "directory",
				children: {
					"cd": {
						path: "/home/commands/cd",
						name: "cd",
						type: "directory",
						children: {
							"cd.txt": {
								path: "/home/commands/cd/cd.txt",
								name: "cd.cmd",
								type: "file",
								meta: "cmd",
								data: "cd &ltdirectory&gt",
							},
							"cd.cmd": {
								path: "/home/commands/cd/cd.cmd",
								name: "cd.cmd",
								type: "file",
								meta: "cmd",
								data: 
									`
if (codeString[1] == "--help" || codeString[1] == "-h")
	text.push(...getItem(FILESYSTEM, "/home/commands/cd/cd.txt").data.split("\\n"));
else {
	let dirArray;
	if (codeString[1]) {
		dirArray = codeString[1].split("/");
		for (let i = dirArray.length - 1; i >= 0; i--)
			if (dirArray[i] == "")
				dirArray.splice(i, 1);
		for (let i = 0; i < dirArray.length; i++) {
			let dir = dirArray[i];
			if (dir == "..") {
				let currentDir = currentAddress.split("/");
				for (let i = currentDir.length - 1; i >= 0; i--)
					if (currentDir[i] == "")
						currentDir.splice(i, 1);
				currentDir.pop();
				currentAddress = "/" + currentDir.join('/') + "/";
			}
			else if (dir == "~") {
				currentAddress = "/home/Users/" + user + "/";
			}
			else if (dir != undefined) {
				let newDir = currentAddress;
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
				}
				else {
					if (getItem(FILESYSTEM, newDir).type == "directory")
						currentAddress = newDir;
					else
						text.push('<span style=\"color:red;\">No such directory: ' + dir + "</span>");
				}
			}
		}
	}
}
									`,
							},
						},
					},
					"ls": {
						path: "/home/commands/ls",
						name: "ls",
						type: "directory",
						children: {
							"ls.txt": {
								path: "/home/commands/ls/ls.txt",
								name: "ls.cmd",
								type: "file",
								meta: "cmd",
								data: "ls &ltdirectory&gt",
							},
							"ls.cmd": {
								path: "/home/commands/ls/ls.cmd",
								name: "ls.cmd",
								type: "file",
								meta: "cmd",
								data: `
if (codeString[1] == "--help" || codeString[1] == "-h")
	text.push(...getItem(FILESYSTEM, "/home/commands/ls/ls.txt").data.split("\\n"));
else {
	text.push(currentAddress);
	let spaces = {
		name: 13,
		type: 14,
		size: 10
	}
	text.push("Name         Type          Size(Bytes)");
	text.push("--------------------------------");
		let dirArray;
	let newAddress = currentAddress;
	if (codeString[1]) {
		dirArray = codeString[1].split("/");
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
				if (getItem(FILESYSTEM, newDir + "/") == null) {
					text.push('<span style=\"color:red;\">No such directory: ' + dir + "</span>");
				}
				else {
					if (getItem(FILESYSTEM, newDir).type == "directory")
						newAddress = newDir;
					else
						text.push('<span style=\"color:red;\">No such directory: ' + dir + "</span>");
				}
			}
		}
	}
	for (let itemName in getItem(FILESYSTEM, newAddress).children) {
		if (getItem(FILESYSTEM, newAddress + itemName).type == "file") {
			let item = getItem(FILESYSTEM, newAddress + itemName);
			let output = \`<span style="color:pink;">\${itemName}</span>\`;
			for (let i = 0; i < spaces.name - itemName.length; i++) {
				output += " ";
			}
			output += item.type;
			for (let i = 0; i < spaces.type - item.type.length; i++) {
				output += " ";
			}
			output += item.data.length;
			text.push(output);
		}
		else if (getItem(FILESYSTEM, newAddress + itemName).type == "directory") {
			let output = \`<span style="color:aqua;">\${itemName}</span>\`;
			text.push(output);
		}
	}
}
								`,
							},
						},
					},
					"cat": {
						path: "/home/commands/cat",
						name: "cat",
						type: "directory",
						children: {
							"cat.txt": {
								path: "/home/commands/cat/cat.txt",
								name: "cat.cmd",
								type: "file",
								meta: "cmd",
								data: "cat &ltfile&gt",
							},
							"cat.cmd": {
								path: "/home/commands/cat/cat.cmd",
								name: "cat.cmd",
								type: "file",
								meta: "cmd",
								data: `
if (codeString[1] == "--help" || codeString[1] == "-h")
	text.push(...getItem(FILESYSTEM, "/home/commands/cat/cat.txt").data.split("\\n"));
else {
	let dirArray;
	let newAddress = currentAddress;
	if (codeString[1]) {
		dirArray = codeString[1].split("/");
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
				if (getItem(FILESYSTEM, newDir + "/") == null) {
					text.push('<span style=\"color:red;\">No such file: ' + dir + "</span>");
				}
				else {
					if (getItem(FILESYSTEM, newDir).type == "file" || getItem(FILESYSTEM, newDir).type == "directory")
						newAddress = newDir;
					else
						text.push('<span style=\"color:red;\">No such directory: ' + dir + "</span>");
				}
			}
		}
	}
	let data = "";
	if(getItem(FILESYSTEM, newAddress).type == "file") data = getItem(FILESYSTEM, newAddress).data;
	else if (getItem(FILESYSTEM, newAddress).type == "directory")
		text.push('<span style=\"color:red;\">Cannot use \"cat\" with directory: ' + codeString[1] + "</span>");
	else text.push('<span style=\"color:red;\">Error: ' + codeString[1] + "</span>");
	text.push(data);
}
								`,
							},
						},
					},
					"clear": {
						path: "/home/commands/clear",
						name: "clear",
						type: "directory",
						children: {
							"clear.txt": {
								path: "/home/commands/clear/clear.txt",
								name: "clear.cmd",
								type: "file",
								meta: "cmd",
								data: "clear",
							},
							"clear.cmd": {
								path: "/home/commands/clear/clear.cmd",
								name: "clear.cmd",
								type: "file",
								meta: "cmd",
								data: `
if (codeString[1] == "--help" || codeString[1] == "-h")
	text.push(...getItem(FILESYSTEM, "/home/commands/clear/clear.txt").data.split("\\n"));
else 
	text = [];
								`,
							},
						},
					},
				},
			},
		},
	},
};
function getItem(fs, path){
	let pathArray = path.split("/");
	for (let i = pathArray.length - 1; i >= 0; i--)
		if (pathArray[i] == "")
			pathArray.splice(i, 1);
	try {
		let item = fs;
		for (p of pathArray){
			if (p == 'home') item = item[p];
			else item = item.children[p];
		}
		return item;
	} catch (e) {
		return null;
	}
}