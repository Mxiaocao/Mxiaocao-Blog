<script lang="ts">
import { musicPlayerConfig } from "@/config/musicConfig";
import { musicPlayerStore } from "@/stores/musicPlayerStore";
import { getMusicLinks } from "@/utils/music-links";
import type { Song } from "../types";

const { song }: { song: Song | null } = $props();
const links = $derived(getMusicLinks(musicPlayerConfig, song));

function pausePlayback() {
	musicPlayerStore.pause();
}
</script>

{#if links.songUrl || links.playlistUrl}
	<div class="music-source-links">
		{#if links.songUrl}
			<a href={links.songUrl} target="_blank" rel="noopener noreferrer" onclick={pausePlayback} aria-label={`去网易云听《${song?.title ?? "当前歌曲"}》完整版（新窗口）`}>去网易云听完整版 ↗</a>
		{/if}
		{#if links.playlistUrl}
			<a href={links.playlistUrl} target="_blank" rel="noopener noreferrer" onclick={pausePlayback} aria-label="打开网易云歌单（新窗口）">查看歌单 ↗</a>
		{/if}
	</div>
{/if}

<style>
	.music-source-links { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.25rem 0.75rem; margin-top: 0.5rem; font-size: 0.75rem; color: var(--primary); }
	a { padding: 0.35rem 0; }
	a:hover { text-decoration: underline; }
	a:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; border-radius: 3px; }
</style>
