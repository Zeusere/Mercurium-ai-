globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, e as createComponent, m as maybeRenderHead, i as renderComponent, r as renderTemplate, h as addAttribute } from './astro_zoPij4u1.mjs';
import { f as $$Button } from './prerender_BAq0E7vo.mjs';

const $$Astro = createAstro("https://mizar.majestico.co");
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  const { title, fields } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="items-center gap-x-[6.25rem] pb-40 auto-cols-fr justify-center flex"> <div class="col-span-1 row-span-1 w-full max-w-3xl"> <h2 class="text-[2.13rem] leading-9 font-semibold mb-1"> ${title} </h2> <div class="mt-8"> <div class="mt-0 mx-0 mb-3.5"> <form data-static-form-name="contact" class="items-center auto-cols-fr grid-cols-1 sm:grid-cols-2 grid-rows-[auto] grid gap-8"> ${fields?.map((field) => {
    if (field.type === "submit") {
      return renderTemplate`${renderComponent($$result, "Button", $$Button, { "type": "submit", "class:list": [field.width == 2 && "sm:col-span-2"] }, { "default": ($$result2) => renderTemplate`${field.title}` })}`;
    } else if (field.type === "textarea") {
      return renderTemplate`<div${addAttribute(["text-base", field.width == 2 && "sm:col-span-2"], "class:list")}> <p class="text-black font-semibold max-w-full mb-3"> ${field.title} </p> <textarea${addAttribute(field.required, "required")}${addAttribute(field.placeholder, "placeholder")} class="text-zinc-800 cursor-text py-4 w-full border-2 border-black border-solid rounded-md m-0" ,></textarea> </div>`;
    } else {
      return renderTemplate`<div${addAttribute(["text-base", field.width == 2 && "sm:col-span-2"], "class:list")}> <p class="text-black font-semibold max-w-full mb-3"> ${field.title} </p> <input${addAttribute(field.type, "type")}${addAttribute(field.required, "required")}${addAttribute(field.placeholder, "placeholder")} class="text-zinc-800 cursor-text py-4 w-full h-14 min-h-[3.50rem] border-2 border-black border-solid rounded-md m-0"> </div>`;
    }
  })} </form></div> </div> </div> </div>`;
}, "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/sections/Contact.astro", void 0);

export { $$Contact as $ };
