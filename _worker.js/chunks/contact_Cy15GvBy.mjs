globalThis.process ??= {}; globalThis.process.env ??= {};
const id = "en/contact.mdoc";
						const collection = "pages";
						const slug = "en/contact";
						const body = "\r\n{% Container %}\r\n\r\n{% Contact\r\n  title=\"Get in touch\"\r\n  fields=[\r\n    {title: \"Full Name\", placeholder: \"John Doe\", required: true, type: \"text\"},\r\n    {title: \"Email\", placeholder: \"contact@email.com\", required: true, type: \"email\"},\r\n    {title: \"Phone\", placeholder: \"+1 345-678\", type: \"tel\"},\r\n    {title: \"Schedule to receive call\", placeholder: \"10:00 AM to 4:00 PM\", type: \"text\"},\r\n    {title: \"Message\", placeholder: \"Type your message here\", type: \"textarea\", width: 2},\r\n    {title: \"Contact us\", type: \"submit\", width: 2}\r\n  ]\r\n/%}\r\n\r\n{% /Container %}\r\n";
						const data = {title:"Contact us",type:"informational",lastUpdateDate:new Date(1709942400000),hideTitle:false,seo:{title:"Contact Us: Get in Touch for Innovative Web Solutions",description:"Reach out to [Company] Studio for expert web design and SEO services. Connect with us to discuss your project and explore cutting-edge web solutions.",author:"Your company"}};
						const _internal = {
							type: 'content',
							filePath: "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/contact.mdoc",
							rawData: "\r\ntitle: Contact us\r\ntype: informational\r\nlastUpdateDate: 2024-03-09\r\nhideTitle: false\r\nseo:\r\n  title: \"Contact Us: Get in Touch for Innovative Web Solutions\"\r\n  description: \"Reach out to [Company] Studio for expert web design and SEO services. Connect with us to discuss your project and explore cutting-edge web solutions.\"\r\n  author: Your company\r",
						};

export { _internal, body, collection, data, id, slug };
