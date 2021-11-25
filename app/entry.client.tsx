import { createCache } from "@react-libraries/use-ssr";
import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

const cache = document.querySelector("script#__REMIX_DATA")?.innerHTML;
cache && createCache(JSON.parse(cache));
hydrate(<RemixBrowser />, document);
