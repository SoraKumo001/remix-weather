import { useSSR } from "@react-libraries/use-ssr";
import { Link, useParams } from "remix";

export interface Weather {
  publishingOffice: string;
  reportDatetime: Date;
  targetArea: string;
  headlineText: string;
  text: string;
}

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [state, setState] = useSSR<Weather | null | undefined>(
    ["weather", String(id)] /*CacheKeyName*/,
    async (state, setState) => {
      // When this function finishes, the server side will finish processing and SSR will be performed.
      if (state !== undefined) return;
      setState(null);
      const result = await fetch(
        `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${id}.json`
      )
        .then((r) => r.json())
        .catch(() => null);
      setState(result);
    }
  );
  return (
    <div>
      <button onClick={() => setState(undefined)}>Reload</button>
      {state && (
        <>
          <h1>{state.targetArea}</h1>
          <div>{new Date(state.reportDatetime).toLocaleString()}</div>
          <div>{state.headlineText}</div>
          <pre>{state.text}</pre>
        </>
      )}
      <div>
        <Link to="/">戻る</Link>
      </div>
    </div>
  );
};

export default Page;
