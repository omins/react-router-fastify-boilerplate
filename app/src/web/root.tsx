import { useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { createRelayRenderEnvironment } from "./relay/createRelayRenderEnvironment";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const environment = useMemo(() => createRelayRenderEnvironment(), []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Outlet />
    </RelayEnvironmentProvider>
  );
}
