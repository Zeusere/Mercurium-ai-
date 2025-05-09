globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createGetHeadings, a as createContentComponent, $ as $$Renderer, m as markdocConfig, b as assetsConfig } from './runtime-assets-config_Bvh4AQIs.mjs';
import { $ as $$BlogLatest, a as $$Testimonial, b as $$RecentWork, c as $$Services, d as $$Hero } from './BlogLatest_PMY9OgVi.mjs';
import { $ as $$Title, e as $$Container } from './prerender_BAq0E7vo.mjs';

markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };


const tagComponentMap = {"Hero": $$Hero,
"Container": $$Container,
"Services": $$Services,
"RecentWork": $$RecentWork,
"Testimonial": $$Testimonial,
"BlogLatest": $$BlogLatest,
};
const nodeComponentMap = {"heading": $$Title,
};

const options = undefined;

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[1,5],\"inline\":false,\"attributes\":{\"title\":\"We bring APPs that <b>growth</b> with <b>engange.</b>\",\"subtitle\":\"We create powerful, monetizable apps from simple ideas —  <span class=\\\"text-neutral-400\\\">designed to scale from day one.</span>\",\"buttons\":[{\"title\":\"Discover Mercurium\",\"href\":\"https:x.com/mercuriumai\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Hero\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"We bring APPs that <b>growth</b> with <b>engange.</b>\"},{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"We create powerful, monetizable apps from simple ideas —  <span class=\\\"text-neutral-400\\\">designed to scale from day one.</span>\"},{\"type\":\"attribute\",\"name\":\"buttons\",\"value\":[{\"title\":\"Discover Mercurium\",\"href\":\"https:x.com/mercuriumai\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":1},\"end\":{\"line\":5}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[6,7,22,23],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[8,11],\"inline\":false,\"attributes\":{\"title\":\"Launch fast. Grow faster. Every product we ship is built to attract users and drive revenue. <span class=\\\"text-neutral-400\\\">We're not an agency. We're a product machine.</span>\",\"services\":[{\"title\":\"Branding\",\"description\":\"We connect brand and UX, creating consistent digital identities across channels with strategic guidance to ensure seamless and cohesive brand representation.\",\"icon\":\"/src/assets/pages/homepage/marketing-service.png\"},{\"title\":\"Digital solutions\",\"description\":\"We create memorable enterprise and consumer products, ensuring exceptional user experiences and providing comprehensive design systems for easy iteration.\",\"icon\":\"/src/assets/pages/homepage/socialmedia-service.png\"},{\"title\":\"Paid Media\",\"description\":\"We craft impactful advertising campaigns, ensuring exceptional reach and engagement, and providing comprehensive strategies for seamless execution.\",\"icon\":\"/src/assets/pages/homepage/paidmedia-service.png\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Services\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Launch fast. Grow faster. Every product we ship is built to attract users and drive revenue. <span class=\\\"text-neutral-400\\\">We're not an agency. We're a product machine.</span>\"},{\"type\":\"attribute\",\"name\":\"services\",\"value\":[{\"title\":\"Branding\",\"description\":\"We connect brand and UX, creating consistent digital identities across channels with strategic guidance to ensure seamless and cohesive brand representation.\",\"icon\":\"/src/assets/pages/homepage/marketing-service.png\"},{\"title\":\"Digital solutions\",\"description\":\"We create memorable enterprise and consumer products, ensuring exceptional user experiences and providing comprehensive design systems for easy iteration.\",\"icon\":\"/src/assets/pages/homepage/socialmedia-service.png\"},{\"title\":\"Paid Media\",\"description\":\"We craft impactful advertising campaigns, ensuring exceptional reach and engagement, and providing comprehensive strategies for seamless execution.\",\"icon\":\"/src/assets/pages/homepage/paidmedia-service.png\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":8},\"end\":{\"line\":11}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[12,15],\"inline\":false,\"attributes\":{\"title\":\"Recent Works\",\"buttons\":[{\"title\":\"View all work\",\"href\":\"/works\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"RecentWork\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Recent Works\"},{\"type\":\"attribute\",\"name\":\"buttons\",\"value\":[{\"title\":\"View all work\",\"href\":\"/works\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":12},\"end\":{\"line\":15}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[16,19],\"inline\":false,\"attributes\":{\"testimonial\":\"[Company] built us an amazing website that turned all our traffic into new leads. Their work has boosted our business immensely!\",\"name\":\"Jane Doe\"},\"children\":[],\"type\":\"tag\",\"tag\":\"Testimonial\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"testimonial\",\"value\":\"[Company] built us an amazing website that turned all our traffic into new leads. Their work has boosted our business immensely!\"},{\"type\":\"attribute\",\"name\":\"name\",\"value\":\"Jane Doe\"}],\"slots\":{},\"location\":{\"start\":{\"line\":16},\"end\":{\"line\":19}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[20,21],\"inline\":false,\"attributes\":{\"title\":\"From Blog\"},\"children\":[],\"type\":\"tag\",\"tag\":\"BlogLatest\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"From Blog\"}],\"slots\":{},\"location\":{\"start\":{\"line\":20},\"end\":{\"line\":21}}}],\"type\":\"tag\",\"tag\":\"Container\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":6},\"end\":{\"line\":7}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

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
