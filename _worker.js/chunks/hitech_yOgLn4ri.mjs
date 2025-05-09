globalThis.process ??= {}; globalThis.process.env ??= {};
const hitech = new Proxy({"src":"/_astro/hitech.DzqFSUEu.svg","width":308,"height":77,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/hitech.svg";
							}
							
							return target[name];
						}
					});

export { hitech as default };
