import { useEffect, useMemo } from "react";
import {
  graphql,
  loadQuery,
  useLazyLoadQuery,
  useRelayEnvironment,
} from "react-relay";
import { data, useLoaderData } from "react-router";
import { RecordSource } from "relay-runtime";
import type { homeQuery } from "../__relay__/homeQuery.graphql";
import { relayQueryLoader } from "../relay/relayQueryLoader";
import { useRelayQueryLoaderData } from "../relay/useRelayQueryLoaderData";
import type { Route } from "./+types/home";

const query = graphql`
  query homeQuery {
    ping
  }
`;

export const loader = relayQueryLoader<homeQuery>({
  query,
  variables: ({ request }) => ({}),
});

export default function Home() {
  const data = useRelayQueryLoaderData<typeof loader>(query);
  console.log(data);

  return <div>Home {data.ping}</div>;
}
