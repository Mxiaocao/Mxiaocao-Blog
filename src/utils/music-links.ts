interface MusicSource {
	mode?: string;
	server?: string;
	type?: string;
	id?: string;
}

export function getMusicLinks(
	config: MusicSource,
	song?: { id: number; url: string } | null,
): { songUrl?: string; playlistUrl?: string } {
	if (config.mode !== "meting" || config.server !== "netease") return {};
	const playlistUrl = config.type === "playlist" && /^\d+$/.test(config.id ?? "")
		? `https://music.163.com/#/playlist?id=${config.id}`
		: undefined;
	let songId: string | undefined;
	if (song?.url) {
		try {
			// Meting 歌单通常不返回 id，从音频接口地址提取网易云歌曲 ID。
			const params = new URL(song.url).searchParams;
			const id = params.get("id");
			if (params.get("server") === "netease" && params.get("type") === "url" && id && /^[1-9]\d*$/.test(id)) {
				songId = id;
			}
		} catch { /* 本地或无效地址不生成歌曲链接。 */ }
	}
	if (!songId && song && Number.isSafeInteger(song.id) && song.id > 0) {
		songId = String(song.id);
	}
	return {
		playlistUrl,
		songUrl: songId ? `https://music.163.com/#/song?id=${songId}` : undefined,
	};
}
