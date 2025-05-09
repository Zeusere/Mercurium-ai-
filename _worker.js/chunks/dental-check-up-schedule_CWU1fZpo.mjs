globalThis.process ??= {}; globalThis.process.env ??= {};
const dentalCheckUpSchedule = new Proxy({"src":"/_astro/dental-check-up-schedule.vMcSbxAk.svg","width":100,"height":100,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/dental-check-up-schedule.svg";
							}
							
							return target[name];
						}
					});

export { dentalCheckUpSchedule as default };
