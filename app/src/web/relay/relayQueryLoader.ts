import { loadQuery } from "react-relay";
import type { LoaderFunctionArgs } from "react-router";
import type { GraphQLTaggedNode, OperationType } from "relay-runtime";
import { createRelayLoaderEnvironment } from "./createRelayLoaderEnvironment";

export type RelayQueryLoaderArgs<Query extends OperationType> = {
  query: GraphQLTaggedNode;
  variables?: (
    loaderArgs: LoaderFunctionArgs,
  ) => Query extends OperationType ? Query["variables"] : object;
};

export type RelayQueryLoaderResponse<Query extends OperationType> = {
  recordMap: { [key: string]: {} };
  variables: Query["variables"];
  " $queryType": Query;
};

export function relayQueryLoader<Query extends OperationType>(
  args: RelayQueryLoaderArgs<Query>,
) {
  return async (
    loaderArgs: LoaderFunctionArgs,
  ): Promise<RelayQueryLoaderResponse<Query>> => {
    const variables = args.variables?.(loaderArgs) ?? {};

    const relayEnvironment = createRelayLoaderEnvironment();

    const queryRef = loadQuery(relayEnvironment, args.query, variables);
    await queryRef.source?.toPromise();

    const recordMap = relayEnvironment.getStore().getSource().toJSON();

    return {
      recordMap,
      variables,
      " $queryType": null as any,
    };
  };
}
