globalThis.process ??= {}; globalThis.process.env ??= {};
const dentalImplant = new Proxy({"src":"/_astro/dental-implant.DvuLcDqE.svg","width":64,"height":64,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/dental-implant.svg";
							}
							
							return target[name];
						}
					});

export { dentalImplant as default };
