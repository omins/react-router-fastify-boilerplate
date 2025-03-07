import { Environment, Network, RecordSource, Store } from "relay-runtime";

export function createRelayRenderEnvironment() {
  const source = new RecordSource();
  const store = new Store(source);
  const network = Network.create(async (operation, variables, cacheConfig) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        query: operation?.text,
        variables,
      }),
      signal: cacheConfig.metadata?.signal as AbortSignal,
    });

    const json = await response.json();
    return json;
  });

  return new Environment({ store, network });
}
