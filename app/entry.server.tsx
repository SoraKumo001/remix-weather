import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";
import { getDataFromTree, Provider } from "@react-libraries/use-ssr";
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = await getDataFromTree(
    <RemixServer context={remixContext} url={request.url} />
  );
  const markup = renderToString(
    <Provider value={cache}>
      <RemixServer context={remixContext} url={request.url} />
      <script
        id="__REMIX_DATA"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cache) }}
      />
    </Provider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
