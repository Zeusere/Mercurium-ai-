globalThis.process ??= {}; globalThis.process.env ??= {};
const cactus = new Proxy({"src":"/_astro/cactus.hexwTmeY.svg","width":407,"height":110,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/cactus.svg";
							}
							
							return target[name];
						}
					});

export { cactus as default };
