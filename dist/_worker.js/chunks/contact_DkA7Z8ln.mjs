globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createGetHeadings, a as createContentComponent, $ as $$Renderer, m as markdocConfig, b as assetsConfig } from './runtime-assets-config_Bvh4AQIs.mjs';
import { $ as $$Title, e as $$Container } from './prerender_BAq0E7vo.mjs';
import { $ as $$Contact } from './Contact_DTS72qTE.mjs';

markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };


const tagComponentMap = {"Container": $$Container,
"Contact": $$Contact,
};
const nodeComponentMap = {"heading": $$Title,
};

const options = undefined;

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[1,2,15,16],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[3,14],\"inline\":false,\"attributes\":{\"title\":\"Contattaci\",\"fields\":[{\"title\":\"Nome Completo\",\"placeholder\":\"John Doe\",\"required\":true,\"type\":\"text\"},{\"title\":\"Email\",\"placeholder\":\"contact@email.com\",\"required\":true,\"type\":\"email\"},{\"title\":\"Telefono\",\"placeholder\":\"+1 345-678\",\"type\":\"tel\"},{\"title\":\"Orario per ricevere la chiamata\",\"placeholder\":\"10:00 AM to 4:00 PM\",\"type\":\"text\"},{\"title\":\"Messaggio\",\"placeholder\":\"Scrivi qui il tuo messaggio\",\"type\":\"textarea\",\"width\":2},{\"title\":\"Invia\",\"type\":\"submit\",\"width\":2}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Contact\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Contattaci\"},{\"type\":\"attribute\",\"name\":\"fields\",\"value\":[{\"title\":\"Nome Completo\",\"placeholder\":\"John Doe\",\"required\":true,\"type\":\"text\"},{\"title\":\"Email\",\"placeholder\":\"contact@email.com\",\"required\":true,\"type\":\"email\"},{\"title\":\"Telefono\",\"placeholder\":\"+1 345-678\",\"type\":\"tel\"},{\"title\":\"Orario per ricevere la chiamata\",\"placeholder\":\"10:00 AM to 4:00 PM\",\"type\":\"text\"},{\"title\":\"Messaggio\",\"placeholder\":\"Scrivi qui il tuo messaggio\",\"type\":\"textarea\",\"width\":2},{\"title\":\"Invia\",\"type\":\"submit\",\"width\":2}]}],\"slots\":{},\"location\":{\"start\":{\"line\":3},\"end\":{\"line\":14}}}],\"type\":\"tag\",\"tag\":\"Container\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":1},\"end\":{\"line\":2}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

const getHeadings = createGetHeadings(stringifiedAst, markdocConfig);
const Content = createContentComponent(
	$$Renderer,
	stringifiedAst,
	markdocConfig,
  options,
	tagComponentMap,
	nodeComponentMap,
);

export { Content, getHeadings };
