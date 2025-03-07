import { useMemo } from "react";
import { useLazyLoadQuery, useRelayEnvironment } from "react-relay";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import {
  type GraphQLTaggedNode,
  type OperationType,
  RecordSource,
} from "relay-runtime";
import type { RelayQueryLoaderResponse } from "./relayQueryLoader";

export function useRelayQueryLoaderData<Loader>(query: GraphQLTaggedNode) {
  type Query = Loader extends (
    loaderArgs: LoaderFunctionArgs,
  ) => Promise<RelayQueryLoaderResponse<infer Q>>
    ? Q
    : OperationType;
  const { recordMap, variables } = useLoaderData();

  const environment = useRelayEnvironment();

  useMemo(() => {
    environment.getStore().publish(new RecordSource(recordMap));
  }, [environment, recordMap]);

  return useLazyLoadQuery<Query>(query, variables);
}
