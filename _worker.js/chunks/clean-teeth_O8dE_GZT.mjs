globalThis.process ??= {}; globalThis.process.env ??= {};
const cleanTeeth = new Proxy({"src":"/_astro/clean-teeth.CLb1VonB.svg","width":512,"height":512,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/clean-teeth.svg";
							}
							
							return target[name];
						}
					});

export { cleanTeeth as default };
