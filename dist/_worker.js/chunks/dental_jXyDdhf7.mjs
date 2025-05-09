globalThis.process ??= {}; globalThis.process.env ??= {};
const dental = new Proxy({"src":"/_astro/dental.BMxMJG9E.svg","width":268,"height":504,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/dental.svg";
							}
							
							return target[name];
						}
					});

export { dental as default };
