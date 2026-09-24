"use client";

import { EVENTS, track } from "@/lib/analytics";
import { voicePoster, type Voice } from "@/content/voices";

/** Keep the source recording one tap away from a written excerpt. */
export function VoiceFilmButton({ voice }: { voice: Voice }) {
  const film = voice.film;
  if (!film) return null;
  return (
    <button
      type="button"
      className={`voice-preview${["manish", "renu"].includes(voice.id) ? " voice-preview-top" : ""}`}
      onClick={(event) => {
        track(EVENTS.filmPlay, { film: voice.id });
        window.dispatchEvent(new CustomEvent("nng:film", {
          detail: { id: film.driveId, title: `${voice.name}: ${film.label}`, from: event.currentTarget },
        }));
      }}
    >
      <img src={voicePoster(voice)} alt="" loading="lazy" decoding="async" />
      <span className="voice-preview-shade" aria-hidden="true" />
      <span className="voice-preview-copy">
        <span className="voice-preview-hook">{voice.hook ?? film.label}</span>
        <span className="voice-preview-action"><span className="thumbnail-play" aria-hidden="true">▶</span> Watch their story <span>{film.duration}</span></span>
      </span>
      <span className="visually-hidden">: {voice.name}</span>
    </button>
  );
}
