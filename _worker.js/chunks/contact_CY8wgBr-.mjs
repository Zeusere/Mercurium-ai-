globalThis.process ??= {}; globalThis.process.env ??= {};
const id = "it/contact.mdoc";
						const collection = "pages";
						const slug = "it/contact";
						const body = "\r\n{% Container %}\r\n\r\n{% Contact\r\n  title=\"Contattaci\"\r\n  fields=[\r\n    {title: \"Nome Completo\", placeholder: \"John Doe\", required: true, type: \"text\"},\r\n    {title: \"Email\", placeholder: \"contact@email.com\", required: true, type: \"email\"},\r\n    {title: \"Telefono\", placeholder: \"+1 345-678\", type: \"tel\"},\r\n    {title: \"Orario per ricevere la chiamata\", placeholder: \"10:00 AM to 4:00 PM\", type: \"text\"},\r\n    {title: \"Messaggio\", placeholder: \"Scrivi qui il tuo messaggio\", type: \"textarea\", width: 2},\r\n    {title: \"Invia\", type: \"submit\", width: 2}\r\n  ]\r\n/%}\r\n\r\n{% /Container %}\r\n";
						const data = {title:"Contattaci",type:"informational",lastUpdateDate:new Date(1709942400000),hideTitle:false,seo:{title:"Contatta Your Company Studio: Entra in Contatto per Soluzioni Web Innovative",description:"Contatta Your Company Studio per servizi esperti di web design e SEO. Connettiti con noi per discutere del tuo progetto ed esplorare soluzioni web all'avanguardia.",author:"Your Company"}};
						const _internal = {
							type: 'content',
							filePath: "C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/contact.mdoc",
							rawData: "\r\ntitle: Contattaci\r\ntype: informational\r\nlastUpdateDate: 2024-03-09\r\nhideTitle: false\r\naddPadding: false\r\nseo:\r\n  title: \"Contatta Your Company Studio: Entra in Contatto per Soluzioni Web Innovative\"\r\n  description: \"Contatta Your Company Studio per servizi esperti di web design e SEO. Connettiti con noi per discutere del tuo progetto ed esplorare soluzioni web all'avanguardia.\"\r\n  author: Your Company\r",
						};

export { _internal, body, collection, data, id, slug };
