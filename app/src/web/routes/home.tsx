import type { Route } from "./+types/home";

export async function loader({ request, params, context }: Route.LoaderArgs) {}

export default function Home() {
  return <div>Home</div>;
}
