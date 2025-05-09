globalThis.process ??= {}; globalThis.process.env ??= {};
const play = new Proxy({"src":"/_astro/play.1H6RW9qM.svg","width":250,"height":250,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/play.svg";
							}
							
							return target[name];
						}
					});

export { play as default };
