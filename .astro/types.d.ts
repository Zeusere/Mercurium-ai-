declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"authors": {
"en/giulio-zanchetta.mdoc": {
	id: "en/giulio-zanchetta.mdoc";
  slug: "en/giulio-zanchetta";
  body: string;
  collection: "authors";
  data: any
} & { render(): Render[".mdoc"] };
"it/giulio-zanchetta.mdoc": {
	id: "it/giulio-zanchetta.mdoc";
  slug: "it/giulio-zanchetta";
  body: string;
  collection: "authors";
  data: any
} & { render(): Render[".mdoc"] };
};
"pages": {
"en/about.mdoc": {
	id: "en/about.mdoc";
  slug: "en/about";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/contact.mdoc": {
	id: "en/contact.mdoc";
  slug: "en/contact";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/homepage.mdoc": {
	id: "en/homepage.mdoc";
  slug: "en/homepage";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/news.mdoc": {
	id: "en/news.mdoc";
  slug: "en/news";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/works.mdoc": {
	id: "en/works.mdoc";
  slug: "en/works";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"it/about.mdoc": {
	id: "it/about.mdoc";
  slug: "it/about";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"it/contact.mdoc": {
	id: "it/contact.mdoc";
  slug: "it/contact";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"it/homepage.mdoc": {
	id: "it/homepage.mdoc";
  slug: "it/homepage";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"it/news.mdoc": {
	id: "it/news.mdoc";
  slug: "it/news";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"it/works.mdoc": {
	id: "it/works.mdoc";
  slug: "it/works";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
};
"posts": {
"en/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc": {
	id: "en/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc";
  slug: "en/mastering-email-marketing-campaigns-for-ecommerce-success";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"en/revolutionizing-urban-farming-with-smart-technology.mdoc": {
	id: "en/revolutionizing-urban-farming-with-smart-technology.mdoc";
  slug: "en/revolutionizing-urban-farming-with-smart-technology";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"en/revolutionizing-virtual-reality-gaming-development.mdoc": {
	id: "en/revolutionizing-virtual-reality-gaming-development.mdoc";
  slug: "en/revolutionizing-virtual-reality-gaming-development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc": {
	id: "it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc";
  slug: "it/mastering-email-marketing-campaigns-for-ecommerce-success";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"it/revolutionizing-urban-farming-with-smart-technology.mdoc": {
	id: "it/revolutionizing-urban-farming-with-smart-technology.mdoc";
  slug: "it/revolutionizing-urban-farming-with-smart-technology";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"it/revolutionizing-virtual-reality-gaming-development.mdoc": {
	id: "it/revolutionizing-virtual-reality-gaming-development.mdoc";
  slug: "it/revolutionizing-virtual-reality-gaming-development";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
};
"services": {
};
"works": {
"en/nexacore.mdoc": {
	id: "en/nexacore.mdoc";
  slug: "en/nexacore";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"en/quantumflow.mdoc": {
	id: "en/quantumflow.mdoc";
  slug: "en/quantumflow";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"en/skywardtech.mdoc": {
	id: "en/skywardtech.mdoc";
  slug: "en/skywardtech";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"en/vortextech.mdoc": {
	id: "en/vortextech.mdoc";
  slug: "en/vortextech";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"it/nexacore.mdoc": {
	id: "it/nexacore.mdoc";
  slug: "it/nexacore";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"it/quantumflow.mdoc": {
	id: "it/quantumflow.mdoc";
  slug: "it/quantumflow";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"it/skywardtech.mdoc": {
	id: "it/skywardtech.mdoc";
  slug: "it/skywardtech";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"it/vortextech.mdoc": {
	id: "it/vortextech.mdoc";
  slug: "it/vortextech";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
};

	};

	type DataEntryMap = {
		"global": {
"contacts": {
	id: "contacts";
  collection: "global";
  data: any
};
"en/footer": {
	id: "en/footer";
  collection: "global";
  data: any
};
"en/header": {
	id: "en/header";
  collection: "global";
  data: any
};
"en/seo": {
	id: "en/seo";
  collection: "global";
  data: any
};
"it/footer": {
	id: "it/footer";
  collection: "global";
  data: any
};
"it/header": {
	id: "it/header";
  collection: "global";
  data: any
};
"it/seo": {
	id: "it/seo";
  collection: "global";
  data: any
};
"style": {
	id: "style";
  collection: "global";
  data: any
};
"widget": {
	id: "widget";
  collection: "global";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../src/content/config.js");
}
