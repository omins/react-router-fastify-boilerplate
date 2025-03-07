import { Environment, Network, RecordSource, Store } from "relay-runtime";

export function createRelayLoaderEnvironment() {
  const source = new RecordSource();
  const store = new Store(source);
  const network = Network.create(async (operation, variables, cacheConfig) => {
    const response = await fetch("http://127.0.0.1:8080/graphql", {
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
