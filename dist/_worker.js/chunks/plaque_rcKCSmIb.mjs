globalThis.process ??= {}; globalThis.process.env ??= {};
const plaque = new Proxy({"src":"/_astro/plaque.CZJFxiHW.svg","width":128,"height":128,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/plaque.svg";
							}
							
							return target[name];
						}
					});

export { plaque as default };
