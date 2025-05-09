globalThis.process ??= {}; globalThis.process.env ??= {};
const rise = new Proxy({"src":"/_astro/rise.BzUg_Qyb.svg","width":244,"height":77,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/rise.svg";
							}
							
							return target[name];
						}
					});

export { rise as default };
