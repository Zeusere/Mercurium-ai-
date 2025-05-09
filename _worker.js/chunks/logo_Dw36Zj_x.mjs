globalThis.process ??= {}; globalThis.process.env ??= {};
const logo = new Proxy({"src":"/_astro/logo.CpQhccnf.svg","width":300,"height":300,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/global/navigation/logo.svg";
							}
							
							return target[name];
						}
					});

export { logo as default };
