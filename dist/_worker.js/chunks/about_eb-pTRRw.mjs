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

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[1,2,5,6],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[3,4],\"inline\":false,\"attributes\":{\"title\":\"About us\",\"subtitle\":\"At [Your Company], we provide web design, advertising, marketing, and SEO services tailored to your needs. Our goal is to help local businesses thrive with lifetime solutions that generate leads and drive growth.\",\"content\":\"<br/><br/><span class=\\\"text-neutral-400\\\">We believe in unique, creative solutions and are committed to excellence and integrity. By crafting visually stunning websites, developing strategic ad campaigns, and implementing effective SEO techniques, we ensure your business stands out and achieves sustainable growth. Our team is dedicated to providing top-notch services that elevate your brand and expand your reach. Join us on a journey to transform your digital presence and achieve lasting success. Experience the [Your Company] difference and see your business grow like never before.</span>\"},\"children\":[],\"type\":\"tag\",\"tag\":\"About\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"About us\"},{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"At [Your Company], we provide web design, advertising, marketing, and SEO services tailored to your needs. Our goal is to help local businesses thrive with lifetime solutions that generate leads and drive growth.\"},{\"type\":\"attribute\",\"name\":\"content\",\"value\":\"<br/><br/><span class=\\\"text-neutral-400\\\">We believe in unique, creative solutions and are committed to excellence and integrity. By crafting visually stunning websites, developing strategic ad campaigns, and implementing effective SEO techniques, we ensure your business stands out and achieves sustainable growth. Our team is dedicated to providing top-notch services that elevate your brand and expand your reach. Join us on a journey to transform your digital presence and achieve lasting success. Experience the [Your Company] difference and see your business grow like never before.</span>\"}],\"slots\":{},\"location\":{\"start\":{\"line\":3},\"end\":{\"line\":4}}}],\"type\":\"tag\",\"tag\":\"Container\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":1},\"end\":{\"line\":2}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

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
