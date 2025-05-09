globalThis.process ??= {}; globalThis.process.env ??= {};
const mercuriumLogo = new Proxy({"src":"/_astro/mercurium-logo.DyyJxxRW.png","width":500,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/global/navigation/mercurium-logo.png";
							}
							
							return target[name];
						}
					});

export { mercuriumLogo as default };
