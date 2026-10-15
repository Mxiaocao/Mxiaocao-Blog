/** Fetch metadata only; each provider's signed media URLs must stay intact. */
export async function fetchMetingTracks(
	apis: string[],
	server: string,
	type: string,
	id: string,
	timeoutMs = 8000,
): Promise<Record<string, unknown>[]> {
	for (const api of new Set(apis.filter(Boolean))) {
		const apiUrl = api
			.replace(":server", encodeURIComponent(server))
			.replace(":type", encodeURIComponent(type))
			.replace(":id", encodeURIComponent(id))
			.replace(":auth", "")
			.replace(":r", Date.now().toString());
		try {
			const response = await fetch(apiUrl, {
				signal: AbortSignal.timeout(timeoutMs),
			});
			if (!response.ok) {
				continue;
			}
			const data: unknown = await response.json();
			if (!Array.isArray(data)) {
				continue;
			}
			const tracks = data.filter(
				(song): song is Record<string, unknown> =>
					!!song &&
					typeof song === "object" &&
					typeof song.url === "string" &&
					song.url.trim().length > 0,
			);
			if (tracks.length > 0) {
				return tracks;
			}
		} catch {
			// Network, CORS, timeout and malformed JSON all try the next provider.
		}
	}
	throw new Error("No Meting provider returned a playable playlist");
}
