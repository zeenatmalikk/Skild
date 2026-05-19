import { ClerkProvider, useUser } from "@clerk/tanstack-react-start";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import Crosshair from "#/components/Crosshair";
import Navbar from "#/components/Navbar";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Skild - The registry for Agentic Intelligence",
			},
			{
				name: "description",
				content:
					"Skild is the registry for Agentic Intelligence, a collection of agents and tools that can be used to build intelligent applications.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function PostHogIdentifier() {
	const { user, isLoaded } = useUser();
	const posthog = usePostHog();

	useEffect(() => {
		if (!isLoaded) return;
		if (user) {
			posthog.identify(user.id, {
				email: user.primaryEmailAddress?.emailAddress ?? undefined,
				name: user.fullName ?? undefined,
			});
		} else {
			posthog.reset();
		}
	}, [isLoaded, user, posthog]);

	return null;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased wrap-anywhere">
				<PostHogProvider
					apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
					options={{
						api_host: "/ingest",
						ui_host:
							import.meta.env.VITE_PUBLIC_POSTHOG_HOST ||
							"https://us.posthog.com",
						defaults: "2025-05-24",
						capture_exceptions: true,
						debug: import.meta.env.DEV,
					}}
				>
					<ClerkProvider>
						<div id="root-layout">
							<header>
								<div className="frame">
									<Navbar />
									<Crosshair />
									<Crosshair />
								</div>
							</header>
							<main>
								<div className="frame">{children}</div>
							</main>
						</div>
						<TanStackDevtools
							config={{
								position: "bottom-right",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
								TanStackQueryDevtools,
							]}
						/>
						<PostHogIdentifier />
					</ClerkProvider>
				</PostHogProvider>
				<Scripts />
			</body>
		</html>
	);
}
