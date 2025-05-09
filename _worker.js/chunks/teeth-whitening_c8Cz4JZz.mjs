globalThis.process ??= {}; globalThis.process.env ??= {};
const teethWhitening = new Proxy({"src":"/_astro/teeth-whitening.3SxMHWM4.svg","width":32,"height":32,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/teeth-whitening.svg";
							}
							
							return target[name];
						}
					});

export { teethWhitening as default };
