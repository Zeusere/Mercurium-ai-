globalThis.process ??= {}; globalThis.process.env ??= {};
import { a7 as bold, a8 as red, y as yellow, a9 as dim, aa as blue } from './chunks/astro_zoPij4u1.mjs';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    var isSafe = function (value) {
        for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
            var char = delimiter_1[_i];
            if (value.indexOf(char) > -1)
                return true;
        }
        return false;
    };
    var safePattern = function (prefix) {
        var prev = result[result.length - 1];
        var prevText = prefix || (prev && typeof prev === "string" ? prev : "");
        if (prev && !prevText) {
            throw new TypeError("Must have text between two parameters, missing text after \"".concat(prev.name, "\""));
        }
        if (!prevText || isSafe(prevText))
            return "[^".concat(escapeString(delimiter), "]+?");
        return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || safePattern(prefix),
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/cloudflare","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"redirect","isIndex":false,"route":"/admin","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"/admin","pathname":"/admin","prerender":false,"redirect":"/keystatic","fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://mizar.majestico.co","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/pages/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/pages/it/post/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/pages/post/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/pages/it/work/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/pages/work/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/footers/Footer.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/layouts/BaseLayout.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/layouts/PageLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/layouts/PostLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/it/post/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/post/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/layouts/WorkLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/it/work/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/work/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/sections/BlogLatest.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/homepage.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/homepage.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/homepage.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/homepage.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/sections/News.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/news.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/news.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/news.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/news.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/sections/RecentWork.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/sections/Works.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/works.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/works.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/works.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/works.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/lib/collection-helpers.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/pages/[...slug]/og.png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...slug]/og.png@_@ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/primitives/LoadingIndicator.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/primitives/Widget.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/node_modules/@astrojs/markdoc/components/Renderer.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/node_modules/@astrojs/markdoc/components/index.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/en/giulio-zanchetta.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/en/giulio-zanchetta.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/it/giulio-zanchetta.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/it/giulio-zanchetta.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/about.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/about.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/contact.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/contact.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/about.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/about.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/contact.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/contact.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-urban-farming-with-smart-technology.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-urban-farming-with-smart-technology.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-virtual-reality-gaming-development.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-virtual-reality-gaming-development.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/nexacore.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/nexacore.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/quantumflow.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/quantumflow.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/skywardtech.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/skywardtech.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/vortextech.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/vortextech.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/nexacore.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/nexacore.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/quantumflow.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/quantumflow.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/skywardtech.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/skywardtech.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/vortextech.mdoc",{"propagation":"in-tree","containsHead":false}],["C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/vortextech.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro":"chunks/pages/keystatic-astro-page_BJqD6tdZ.mjs","\u0000@astrojs-manifest":"manifest_C55CdAPP.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DttHLxnu.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"chunks/keystatic-api_CFMK55d_.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"chunks/keystatic-astro-page_CqZpf5Ow.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_L8qbt93k.mjs","\u0000@astro-page:src/pages/it/post/[...slug]/index@_@astro":"chunks/index_D958w-su.mjs","\u0000@astro-page:src/pages/it/work/[...slug]/index@_@astro":"chunks/index_BB_c8vQY.mjs","\u0000@astro-page:src/pages/post/[...slug]/index@_@astro":"chunks/index_DeQc0un1.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"chunks/rss_D4WaTMYv.mjs","\u0000@astro-page:src/pages/work/[...slug]/index@_@astro":"chunks/index_Bs4f9sEl.mjs","\u0000@astro-page:src/pages/[...slug]/og.png@_@ts":"chunks/og_CP21BAux.mjs","\u0000@astro-page:src/pages/[...slug]/index@_@astro":"chunks/index_BioByEAR.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/global/navigation/logo.svg":"chunks/logo_Dw36Zj_x.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/global/navigation/mercurium-logo.png":"chunks/mercurium-logo_BYJ92go0.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/en/giulio-zanchetta.mdoc?astroContentCollectionEntry=true":"chunks/giulio-zanchetta_D1m-Ex2w.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/it/giulio-zanchetta.mdoc?astroContentCollectionEntry=true":"chunks/giulio-zanchetta_C3AEQ7n4.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/about.mdoc?astroContentCollectionEntry=true":"chunks/about_CRn1jk3d.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/contact.mdoc?astroContentCollectionEntry=true":"chunks/contact_Cy15GvBy.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/homepage.mdoc?astroContentCollectionEntry=true":"chunks/homepage_Dbe-XWHQ.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/news.mdoc?astroContentCollectionEntry=true":"chunks/news_BvIEBnbr.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/works.mdoc?astroContentCollectionEntry=true":"chunks/works_CjohZBP8.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/about.mdoc?astroContentCollectionEntry=true":"chunks/about_Bu_UFfwh.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/contact.mdoc?astroContentCollectionEntry=true":"chunks/contact_CY8wgBr-.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/homepage.mdoc?astroContentCollectionEntry=true":"chunks/homepage_BM1LqwxM.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/news.mdoc?astroContentCollectionEntry=true":"chunks/news_CLw5dL0y.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/works.mdoc?astroContentCollectionEntry=true":"chunks/works_C9A8HVIq.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc?astroContentCollectionEntry=true":"chunks/mastering-email-marketing-campaigns-for-ecommerce-success_DEPDXELy.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-urban-farming-with-smart-technology.mdoc?astroContentCollectionEntry=true":"chunks/revolutionizing-urban-farming-with-smart-technology_CuGMHrxR.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-virtual-reality-gaming-development.mdoc?astroContentCollectionEntry=true":"chunks/revolutionizing-virtual-reality-gaming-development_DV4E7Jox.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc?astroContentCollectionEntry=true":"chunks/mastering-email-marketing-campaigns-for-ecommerce-success_er72v0kG.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc?astroContentCollectionEntry=true":"chunks/revolutionizing-urban-farming-with-smart-technology_B_OIGX1N.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc?astroContentCollectionEntry=true":"chunks/revolutionizing-virtual-reality-gaming-development_8ORHgNj0.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/nexacore.mdoc?astroContentCollectionEntry=true":"chunks/nexacore_BvvAiQFA.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/quantumflow.mdoc?astroContentCollectionEntry=true":"chunks/quantumflow_CD2a2KGn.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/skywardtech.mdoc?astroContentCollectionEntry=true":"chunks/skywardtech_Bp_aBnrJ.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/vortextech.mdoc?astroContentCollectionEntry=true":"chunks/vortextech_BMttoYld.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/nexacore.mdoc?astroContentCollectionEntry=true":"chunks/nexacore_DG_e5RQ0.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/quantumflow.mdoc?astroContentCollectionEntry=true":"chunks/quantumflow_YRMXdDCZ.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/skywardtech.mdoc?astroContentCollectionEntry=true":"chunks/skywardtech_DwEHYu3j.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/vortextech.mdoc?astroContentCollectionEntry=true":"chunks/vortextech_hg2yKeqD.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/global/contacts.json?astroDataCollectionEntry=true":"chunks/contacts_Co3lcrM_.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/global/en/footer.json?astroDataCollectionEntry=true":"chunks/footer_Dg308g6w.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/global/en/header.json?astroDataCollectionEntry=true":"chunks/header_xcJrRjcp.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/global/en/seo.json?astroDataCollectionEntry=true":"chunks/seo_BTv0DUac.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/global/it/footer.json?astroDataCollectionEntry=true":"chunks/footer_BUVMdQto.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/global/it/header.json?astroDataCollectionEntry=true":"chunks/header_CO2Im6N7.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/global/it/seo.json?astroDataCollectionEntry=true":"chunks/seo_BAF52udw.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/global/style.json?astroDataCollectionEntry=true":"chunks/style_CqSW0QZo.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/global/widget.json?astroDataCollectionEntry=true":"chunks/widget_Cm218gII.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/en/giulio-zanchetta.mdoc?astroPropagatedAssets":"chunks/giulio-zanchetta_DLXUWgrb.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/it/giulio-zanchetta.mdoc?astroPropagatedAssets":"chunks/giulio-zanchetta_BKFWkEBk.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/about.mdoc?astroPropagatedAssets":"chunks/about_DCzaZjtD.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/contact.mdoc?astroPropagatedAssets":"chunks/contact_DrzeSkxX.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/homepage.mdoc?astroPropagatedAssets":"chunks/homepage_BdLkkPVB.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/news.mdoc?astroPropagatedAssets":"chunks/news_CeJw9Tc9.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/works.mdoc?astroPropagatedAssets":"chunks/works_CjV0zKzQ.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/about.mdoc?astroPropagatedAssets":"chunks/about_wDyZiETm.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/contact.mdoc?astroPropagatedAssets":"chunks/contact_DFiG_obu.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/homepage.mdoc?astroPropagatedAssets":"chunks/homepage_BsZRBUuo.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/news.mdoc?astroPropagatedAssets":"chunks/news_BI2D8MhM.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/works.mdoc?astroPropagatedAssets":"chunks/works_Bq1bCQJm.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc?astroPropagatedAssets":"chunks/mastering-email-marketing-campaigns-for-ecommerce-success_HGn8w1On.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-urban-farming-with-smart-technology.mdoc?astroPropagatedAssets":"chunks/revolutionizing-urban-farming-with-smart-technology_BlnldUsP.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-virtual-reality-gaming-development.mdoc?astroPropagatedAssets":"chunks/revolutionizing-virtual-reality-gaming-development_C2pB5r8N.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc?astroPropagatedAssets":"chunks/mastering-email-marketing-campaigns-for-ecommerce-success_CVpktoph.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc?astroPropagatedAssets":"chunks/revolutionizing-urban-farming-with-smart-technology_CbqLRUar.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc?astroPropagatedAssets":"chunks/revolutionizing-virtual-reality-gaming-development_Brtsc8lc.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/nexacore.mdoc?astroPropagatedAssets":"chunks/nexacore_CFl7fErM.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/quantumflow.mdoc?astroPropagatedAssets":"chunks/quantumflow_Cx3Rt9KC.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/skywardtech.mdoc?astroPropagatedAssets":"chunks/skywardtech_DlUT-uas.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/vortextech.mdoc?astroPropagatedAssets":"chunks/vortextech_CZ7Lgyl7.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/nexacore.mdoc?astroPropagatedAssets":"chunks/nexacore_zLZQOOZq.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/quantumflow.mdoc?astroPropagatedAssets":"chunks/quantumflow_RSmPb58M.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/skywardtech.mdoc?astroPropagatedAssets":"chunks/skywardtech_gcpVBxn5.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/vortextech.mdoc?astroPropagatedAssets":"chunks/vortextech_B9OMuHkj.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/node_modules/yoga-wasm-web/dist/asm.js":"chunks/asm_CG2Xu2zF.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/en/giulio-zanchetta.mdoc":"chunks/giulio-zanchetta_BEFCWq_2.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/authors/it/giulio-zanchetta.mdoc":"chunks/giulio-zanchetta_C-alMNcH.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/about.mdoc":"chunks/about_eb-pTRRw.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/contact.mdoc":"chunks/contact_CyCkQ35s.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/homepage.mdoc":"chunks/homepage_DYJrE-e7.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/news.mdoc":"chunks/news_BjgoLhek.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/en/works.mdoc":"chunks/works_CCXVeAvu.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/about.mdoc":"chunks/about_CDmUhfaS.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/contact.mdoc":"chunks/contact_DkA7Z8ln.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/homepage.mdoc":"chunks/homepage_mk_gXKDb.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/news.mdoc":"chunks/news_Cj27SMxG.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/pages/it/works.mdoc":"chunks/works_Bnd1X1q5.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc":"chunks/mastering-email-marketing-campaigns-for-ecommerce-success_BdAWW9xd.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-urban-farming-with-smart-technology.mdoc":"chunks/revolutionizing-urban-farming-with-smart-technology_BpRkl1jC.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/en/revolutionizing-virtual-reality-gaming-development.mdoc":"chunks/revolutionizing-virtual-reality-gaming-development_O3LqnIqj.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc":"chunks/mastering-email-marketing-campaigns-for-ecommerce-success_ggdZDlzh.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc":"chunks/revolutionizing-urban-farming-with-smart-technology_RMubjBhh.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc":"chunks/revolutionizing-virtual-reality-gaming-development_BLRhznKD.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/nexacore.mdoc":"chunks/nexacore_CpSZ9HD6.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/quantumflow.mdoc":"chunks/quantumflow_BHvUtqCy.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/skywardtech.mdoc":"chunks/skywardtech_PVAzwp1W.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/en/vortextech.mdoc":"chunks/vortextech_B8j_U7WP.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/nexacore.mdoc":"chunks/nexacore_CqyQiva8.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/quantumflow.mdoc":"chunks/quantumflow_BN45weN4.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/skywardtech.mdoc":"chunks/skywardtech_DqkwZewK.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/content/works/it/vortextech.mdoc":"chunks/vortextech_B7oM1oby.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/cactus.svg":"chunks/cactus_B9SzVkag.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/clean-teeth.svg":"chunks/clean-teeth_O8dE_GZT.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/dental-check-up-schedule.svg":"chunks/dental-check-up-schedule_CWU1fZpo.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/dental-filling.svg":"chunks/dental-filling_CkE0kwdB.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/dental-implant.svg":"chunks/dental-implant_DMLW9twC.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/dental.svg":"chunks/dental_jXyDdhf7.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/hitech.svg":"chunks/hitech_yOgLn4ri.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/marketing-service.png":"chunks/marketing-service_BC6rfkp5.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/orthodontics.svg":"chunks/orthodontics_Bk_2RrB5.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/paidmedia-service.png":"chunks/paidmedia-service_Gr4cS9HK.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/plaque.svg":"chunks/plaque_rcKCSmIb.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/play.svg":"chunks/play_tiQT_Z4p.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/rise.svg":"chunks/rise_DiWjUJGf.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/socialmedia-service.png":"chunks/socialmedia-service_BdVBjQ6i.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/teeth-whitening.svg":"chunks/teeth-whitening_c8Cz4JZz.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/terra.svg":"chunks/terra_DSlIXTPL.mjs","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/assets/pages/homepage/vision.svg":"chunks/vision_lrMNUNhA.mjs","/astro/hoisted.js?q=2":"_astro/hoisted.l0sNRNKZ.js","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/sections/Blob.astro?astro&type=script&index=0&lang.ts":"_astro/Blob.astro_astro_type_script_index_0_lang.DBkltbLO.js","/astro/hoisted.js?q=1":"_astro/hoisted.BXKaiWFu.js","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/node_modules/workbox-window/build/workbox-window.prod.es5.mjs":"_astro/workbox-window.prod.es5.B9K5rw8f.js","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/src/components/sections/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.D7TIqd5B.js","astro:scripts/page.js":"_astro/page.BvKxy2Uc.js","@astrojs/react/client.js":"_astro/client.Cuyrj2uf.js","C:/Users/polbu/DEV/mercuriumlandingpage/mercuriumlandingpage/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.CGaHGGj9.js","/astro/hoisted.js?q=0":"_astro/hoisted.CzUQP_GZ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/cover.CAofn85-.jpg","/_astro/cover.CRnTnJHi.jpg","/_astro/cover.BXS4cjWA.jpg","/_astro/cover.D_pAC8Fx.jpg","/_astro/cover.DRo88hYF.jpg","/_astro/cover.BZ5o4vAQ.jpg","/_astro/cover.D_pWQcN_.jpg","/_astro/logo.CpQhccnf.svg","/_astro/mercurium-logo.DyyJxxRW.png","/_astro/google-white.Jo_8AMLF.png","/_astro/clean-teeth.CLb1VonB.svg","/_astro/cactus.hexwTmeY.svg","/_astro/dental-filling.Bm25Bgv8.svg","/_astro/dental-check-up-schedule.vMcSbxAk.svg","/_astro/dental-implant.DvuLcDqE.svg","/_astro/hitech.DzqFSUEu.svg","/_astro/dental.BMxMJG9E.svg","/_astro/orthodontics.DpWIZPwb.svg","/_astro/marketing-service.C59SZwBD.png","/_astro/paidmedia-service.DMHLmxRd.png","/_astro/plaque.CZJFxiHW.svg","/_astro/play.1H6RW9qM.svg","/_astro/rise.BzUg_Qyb.svg","/_astro/socialmedia-service.DzVhx38z.png","/_astro/about.D3UQkeX3.png","/_astro/teeth-whitening.3SxMHWM4.svg","/_astro/terra.DLjiMQMd.svg","/_astro/vision.D-JVPNgr.svg","/_astro/promo.8ev6z6da.webm","/_astro/index.BM4czTD7.css","/favicon.svg","/manifest.webmanifest","/sw.js","/workbox-e3490c72.js","/_worker.js/index.js","/_worker.js/manifest.webmanifest","/_worker.js/renderers.mjs","/_worker.js/_noop-middleware.mjs","/_astro/Blob.astro_astro_type_script_index_0_lang.DBkltbLO.js","/_astro/client.Cuyrj2uf.js","/_astro/gsap-blur.D4ZTb8iO.js","/_astro/Hero.astro_astro_type_script_index_0_lang.D7TIqd5B.js","/_astro/hoisted.BXKaiWFu.js","/_astro/hoisted.CzUQP_GZ.js","/_astro/index.B8TIwkLO.js","/_astro/keystatic-page.CGaHGGj9.js","/_astro/lifecycle-manager.B4AsVc_v.js","/_astro/page.BvKxy2Uc.js","/_astro/workbox-window.prod.es5.B9K5rw8f.js","/_worker.js/_astro/about.D3UQkeX3.png","/_worker.js/_astro/cactus.hexwTmeY.svg","/_worker.js/_astro/clean-teeth.CLb1VonB.svg","/_worker.js/_astro/cover.BXS4cjWA.jpg","/_worker.js/_astro/cover.BZ5o4vAQ.jpg","/_worker.js/_astro/cover.CAofn85-.jpg","/_worker.js/_astro/cover.CRnTnJHi.jpg","/_worker.js/_astro/cover.DRo88hYF.jpg","/_worker.js/_astro/cover.D_pAC8Fx.jpg","/_worker.js/_astro/cover.D_pWQcN_.jpg","/_worker.js/_astro/dental-check-up-schedule.vMcSbxAk.svg","/_worker.js/_astro/dental-filling.Bm25Bgv8.svg","/_worker.js/_astro/dental-implant.DvuLcDqE.svg","/_worker.js/_astro/dental.BMxMJG9E.svg","/_worker.js/_astro/google-white.Jo_8AMLF.png","/_worker.js/_astro/hitech.DzqFSUEu.svg","/_worker.js/_astro/index.BM4czTD7.css","/_worker.js/_astro/logo.CpQhccnf.svg","/_worker.js/_astro/marketing-service.C59SZwBD.png","/_worker.js/_astro/mercurium-logo.DyyJxxRW.png","/_worker.js/_astro/orthodontics.DpWIZPwb.svg","/_worker.js/_astro/paidmedia-service.DMHLmxRd.png","/_worker.js/_astro/plaque.CZJFxiHW.svg","/_worker.js/_astro/play.1H6RW9qM.svg","/_worker.js/_astro/promo.8ev6z6da.webm","/_worker.js/_astro/rise.BzUg_Qyb.svg","/_worker.js/_astro/socialmedia-service.DzVhx38z.png","/_worker.js/_astro/teeth-whitening.3SxMHWM4.svg","/_worker.js/_astro/terra.DLjiMQMd.svg","/_worker.js/_astro/vision.D-JVPNgr.svg","/_worker.js/chunks/404_L8qbt93k.mjs","/_worker.js/chunks/about_Bu_UFfwh.mjs","/_worker.js/chunks/about_CDmUhfaS.mjs","/_worker.js/chunks/About_CfpwkFtj.mjs","/_worker.js/chunks/about_CRn1jk3d.mjs","/_worker.js/chunks/about_DCzaZjtD.mjs","/_worker.js/chunks/about_eb-pTRRw.mjs","/_worker.js/chunks/about_wDyZiETm.mjs","/_worker.js/chunks/asm_CG2Xu2zF.mjs","/_worker.js/chunks/astro_zoPij4u1.mjs","/_worker.js/chunks/BlogLatest_PMY9OgVi.mjs","/_worker.js/chunks/BlogPreview_CFtw1QQe.mjs","/_worker.js/chunks/cactus_B9SzVkag.mjs","/_worker.js/chunks/clean-teeth_O8dE_GZT.mjs","/_worker.js/chunks/contacts_Co3lcrM_.mjs","/_worker.js/chunks/contact_Cy15GvBy.mjs","/_worker.js/chunks/contact_CY8wgBr-.mjs","/_worker.js/chunks/contact_CyCkQ35s.mjs","/_worker.js/chunks/contact_DFiG_obu.mjs","/_worker.js/chunks/contact_DkA7Z8ln.mjs","/_worker.js/chunks/contact_DrzeSkxX.mjs","/_worker.js/chunks/Contact_DTS72qTE.mjs","/_worker.js/chunks/dental-check-up-schedule_CWU1fZpo.mjs","/_worker.js/chunks/dental-filling_CkE0kwdB.mjs","/_worker.js/chunks/dental-implant_DMLW9twC.mjs","/_worker.js/chunks/dental_jXyDdhf7.mjs","/_worker.js/chunks/footer_BUVMdQto.mjs","/_worker.js/chunks/footer_Dg308g6w.mjs","/_worker.js/chunks/generic_DttHLxnu.mjs","/_worker.js/chunks/giulio-zanchetta_BEFCWq_2.mjs","/_worker.js/chunks/giulio-zanchetta_BKFWkEBk.mjs","/_worker.js/chunks/giulio-zanchetta_C-alMNcH.mjs","/_worker.js/chunks/giulio-zanchetta_C3AEQ7n4.mjs","/_worker.js/chunks/giulio-zanchetta_D1m-Ex2w.mjs","/_worker.js/chunks/giulio-zanchetta_DLXUWgrb.mjs","/_worker.js/chunks/header_CO2Im6N7.mjs","/_worker.js/chunks/header_xcJrRjcp.mjs","/_worker.js/chunks/hitech_yOgLn4ri.mjs","/_worker.js/chunks/homepage_BdLkkPVB.mjs","/_worker.js/chunks/homepage_BM1LqwxM.mjs","/_worker.js/chunks/homepage_BsZRBUuo.mjs","/_worker.js/chunks/homepage_Dbe-XWHQ.mjs","/_worker.js/chunks/homepage_DYJrE-e7.mjs","/_worker.js/chunks/homepage_mk_gXKDb.mjs","/_worker.js/chunks/index_BB_c8vQY.mjs","/_worker.js/chunks/index_BioByEAR.mjs","/_worker.js/chunks/index_Bs4f9sEl.mjs","/_worker.js/chunks/index_D958w-su.mjs","/_worker.js/chunks/index_DeQc0un1.mjs","/_worker.js/chunks/keystatic-api_CFMK55d_.mjs","/_worker.js/chunks/keystatic-astro-page_CqZpf5Ow.mjs","/_worker.js/chunks/logo_Dw36Zj_x.mjs","/_worker.js/chunks/marketing-service_BC6rfkp5.mjs","/_worker.js/chunks/mastering-email-marketing-campaigns-for-ecommerce-success_BdAWW9xd.mjs","/_worker.js/chunks/mastering-email-marketing-campaigns-for-ecommerce-success_CVpktoph.mjs","/_worker.js/chunks/mastering-email-marketing-campaigns-for-ecommerce-success_DEPDXELy.mjs","/_worker.js/chunks/mastering-email-marketing-campaigns-for-ecommerce-success_er72v0kG.mjs","/_worker.js/chunks/mastering-email-marketing-campaigns-for-ecommerce-success_ggdZDlzh.mjs","/_worker.js/chunks/mastering-email-marketing-campaigns-for-ecommerce-success_HGn8w1On.mjs","/_worker.js/chunks/mercurium-logo_BYJ92go0.mjs","/_worker.js/chunks/news_BI2D8MhM.mjs","/_worker.js/chunks/news_BjgoLhek.mjs","/_worker.js/chunks/news_BvIEBnbr.mjs","/_worker.js/chunks/news_CeJw9Tc9.mjs","/_worker.js/chunks/news_Cj27SMxG.mjs","/_worker.js/chunks/news_CLw5dL0y.mjs","/_worker.js/chunks/News_sVpyKFjw.mjs","/_worker.js/chunks/nexacore_BvvAiQFA.mjs","/_worker.js/chunks/nexacore_CFl7fErM.mjs","/_worker.js/chunks/nexacore_CpSZ9HD6.mjs","/_worker.js/chunks/nexacore_CqyQiva8.mjs","/_worker.js/chunks/nexacore_DG_e5RQ0.mjs","/_worker.js/chunks/nexacore_zLZQOOZq.mjs","/_worker.js/chunks/nm_react-dom__DCU9DDF7.mjs","/_worker.js/chunks/nm_react__DE-H6m9v.mjs","/_worker.js/chunks/og_CP21BAux.mjs","/_worker.js/chunks/orthodontics_Bk_2RrB5.mjs","/_worker.js/chunks/paidmedia-service_Gr4cS9HK.mjs","/_worker.js/chunks/plaque_rcKCSmIb.mjs","/_worker.js/chunks/play_tiQT_Z4p.mjs","/_worker.js/chunks/prerender_BAq0E7vo.mjs","/_worker.js/chunks/quantumflow_BHvUtqCy.mjs","/_worker.js/chunks/quantumflow_BN45weN4.mjs","/_worker.js/chunks/quantumflow_CD2a2KGn.mjs","/_worker.js/chunks/quantumflow_Cx3Rt9KC.mjs","/_worker.js/chunks/quantumflow_RSmPb58M.mjs","/_worker.js/chunks/quantumflow_YRMXdDCZ.mjs","/_worker.js/chunks/revolutionizing-urban-farming-with-smart-technology_BlnldUsP.mjs","/_worker.js/chunks/revolutionizing-urban-farming-with-smart-technology_BpRkl1jC.mjs","/_worker.js/chunks/revolutionizing-urban-farming-with-smart-technology_B_OIGX1N.mjs","/_worker.js/chunks/revolutionizing-urban-farming-with-smart-technology_CbqLRUar.mjs","/_worker.js/chunks/revolutionizing-urban-farming-with-smart-technology_CuGMHrxR.mjs","/_worker.js/chunks/revolutionizing-urban-farming-with-smart-technology_RMubjBhh.mjs","/_worker.js/chunks/revolutionizing-virtual-reality-gaming-development_8ORHgNj0.mjs","/_worker.js/chunks/revolutionizing-virtual-reality-gaming-development_BLRhznKD.mjs","/_worker.js/chunks/revolutionizing-virtual-reality-gaming-development_Brtsc8lc.mjs","/_worker.js/chunks/revolutionizing-virtual-reality-gaming-development_C2pB5r8N.mjs","/_worker.js/chunks/revolutionizing-virtual-reality-gaming-development_DV4E7Jox.mjs","/_worker.js/chunks/revolutionizing-virtual-reality-gaming-development_O3LqnIqj.mjs","/_worker.js/chunks/rise_DiWjUJGf.mjs","/_worker.js/chunks/rss_D4WaTMYv.mjs","/_worker.js/chunks/runtime-assets-config_Bvh4AQIs.mjs","/_worker.js/chunks/seo_BAF52udw.mjs","/_worker.js/chunks/seo_BTv0DUac.mjs","/_worker.js/chunks/skywardtech_Bp_aBnrJ.mjs","/_worker.js/chunks/skywardtech_DlUT-uas.mjs","/_worker.js/chunks/skywardtech_DqkwZewK.mjs","/_worker.js/chunks/skywardtech_DwEHYu3j.mjs","/_worker.js/chunks/skywardtech_gcpVBxn5.mjs","/_worker.js/chunks/skywardtech_PVAzwp1W.mjs","/_worker.js/chunks/socialmedia-service_BdVBjQ6i.mjs","/_worker.js/chunks/style_CqSW0QZo.mjs","/_worker.js/chunks/teeth-whitening_c8Cz4JZz.mjs","/_worker.js/chunks/terra_DSlIXTPL.mjs","/_worker.js/chunks/vision_lrMNUNhA.mjs","/_worker.js/chunks/vortextech_B7oM1oby.mjs","/_worker.js/chunks/vortextech_B8j_U7WP.mjs","/_worker.js/chunks/vortextech_B9OMuHkj.mjs","/_worker.js/chunks/vortextech_BMttoYld.mjs","/_worker.js/chunks/vortextech_CZ7Lgyl7.mjs","/_worker.js/chunks/vortextech_hg2yKeqD.mjs","/_worker.js/chunks/widget_Cm218gII.mjs","/_worker.js/chunks/WorkPreview_GOGQT8Ig.mjs","/_worker.js/chunks/works_Bnd1X1q5.mjs","/_worker.js/chunks/works_Bq1bCQJm.mjs","/_worker.js/chunks/works_C9A8HVIq.mjs","/_worker.js/chunks/works_CCXVeAvu.mjs","/_worker.js/chunks/works_CjohZBP8.mjs","/_worker.js/chunks/works_CjV0zKzQ.mjs","/_worker.js/chunks/Works_DSjjfPes.mjs","/_worker.js/chunks/astro/assets-service_Cfwp-SPn.mjs","/_worker.js/chunks/pages/generic_DPF46I8o.mjs","/_worker.js/chunks/pages/keystatic-api_B5KH4Nkg.mjs","/_worker.js/chunks/pages/keystatic-astro-page_BJqD6tdZ.mjs","/_astro/page.BvKxy2Uc.js","/404.html","/rss.xml"],"i18n":{"strategy":"pathname-prefix-other-locales","locales":["en","it"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
