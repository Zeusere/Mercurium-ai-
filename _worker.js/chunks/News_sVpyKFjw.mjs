globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, e as createComponent, m as maybeRenderHead, i as renderComponent, r as renderTemplate } from './astro_zoPij4u1.mjs';
import { i as getCollection } from './prerender_BAq0E7vo.mjs';
import { $ as $$BlogPreview } from './BlogPreview_CFtw1QQe.mjs';

const $$Astro = createAstro("https://mizar.majestico.co");
const $$News = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$News;
  const currentLocale = Astro2.currentLocale;
  const posts = await getCollection("posts");
  const allPosts = posts.map((post) => {
    const [lang, ...slug] = post.slug.split("/");
    return {
      ...post,
      lang,
      slug: post.slug.startsWith("/") ? post.slug : `/${post.slug}`
    };
  }).filter((post) => post.lang === currentLocale && !post.data.hidden).sort(
    (a, b) => a.data.lastUpdateDate.getTime() - b.data.lastUpdateDate.getTime()
  );
  return renderTemplate`${maybeRenderHead()}<div class="gap-x-[1.88rem] text-sm font-medium auto-cols-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-[auto] gap-y-10 grid pb-40"> ${allPosts.map((post) => renderTemplate`${renderComponent($$result, "BlogPreview", $$BlogPreview, { "post": post })}`)} </div>`;
}, "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/sections/News.astro", void 0);

export { $$News as $ };
