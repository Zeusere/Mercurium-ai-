globalThis.process ??= {}; globalThis.process.env ??= {};
const orthodontics = new Proxy({"src":"/_astro/orthodontics.DpWIZPwb.svg","width":64,"height":64,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/orthodontics.svg";
							}
							
							return target[name];
						}
					});

export { orthodontics as default };
