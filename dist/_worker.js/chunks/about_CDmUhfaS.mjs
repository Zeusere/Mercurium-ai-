globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createGetHeadings, a as createContentComponent, $ as $$Renderer, m as markdocConfig, b as assetsConfig } from './runtime-assets-config_Bvh4AQIs.mjs';
import { $ as $$Title, e as $$Container } from './prerender_BAq0E7vo.mjs';
import { $ as $$About } from './About_CfpwkFtj.mjs';

markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };


const tagComponentMap = {"Container": $$Container,
"About": $$About,
};
const nodeComponentMap = {"heading": $$Title,
};

const options = undefined;

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[1,2,5,6],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[3,4],\"inline\":false,\"attributes\":{\"title\":\"Chi siamo\",\"subtitle\":\"In Company, offriamo servizi di web design, pubblicità, marketing e SEO su misura per le tue esigenze. Il nostro obiettivo è aiutare le imprese locali a prosperare con soluzioni durature che generano contatti e favoriscono la crescita.\",\"content\":\"<br/><br/><span class=\\\"text-neutral-400\\\">Crediamo in soluzioni uniche e creative e siamo impegnati nell'eccellenza e nell'integrità. Creando siti web visivamente straordinari, sviluppando campagne pubblicitarie strategiche e implementando tecniche SEO efficaci, garantiamo che la tua attività si distingua e raggiunga una crescita sostenibile. Il nostro team è dedicato a fornire servizi di altissimo livello che elevano il tuo brand e ampliano la tua portata. Unisciti a noi in un viaggio per trasformare la tua presenza digitale e ottenere un successo duraturo. Vivi la differenza di Company e vedi la tua attività crescere come mai prima d'ora.</span>\"},\"children\":[],\"type\":\"tag\",\"tag\":\"About\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Chi siamo\"},{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"In Company, offriamo servizi di web design, pubblicità, marketing e SEO su misura per le tue esigenze. Il nostro obiettivo è aiutare le imprese locali a prosperare con soluzioni durature che generano contatti e favoriscono la crescita.\"},{\"type\":\"attribute\",\"name\":\"content\",\"value\":\"<br/><br/><span class=\\\"text-neutral-400\\\">Crediamo in soluzioni uniche e creative e siamo impegnati nell'eccellenza e nell'integrità. Creando siti web visivamente straordinari, sviluppando campagne pubblicitarie strategiche e implementando tecniche SEO efficaci, garantiamo che la tua attività si distingua e raggiunga una crescita sostenibile. Il nostro team è dedicato a fornire servizi di altissimo livello che elevano il tuo brand e ampliano la tua portata. Unisciti a noi in un viaggio per trasformare la tua presenza digitale e ottenere un successo duraturo. Vivi la differenza di Company e vedi la tua attività crescere come mai prima d'ora.</span>\"}],\"slots\":{},\"location\":{\"start\":{\"line\":3},\"end\":{\"line\":4}}}],\"type\":\"tag\",\"tag\":\"Container\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":1},\"end\":{\"line\":2}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

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
