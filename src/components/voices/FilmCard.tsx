"use client";

import { useState } from "react";
import { EVENTS, track } from "@/lib/analytics";
import { drivePlayer, voicePoster, type Voice } from "@/content/voices";

/**
 * A client film in reel format. Selected footage frames are stored as lightweight WebP previews;
 * the video stays on Drive and its player loads only when requested.
 */
export function FilmCard({ voice, modal = false }: { voice: Voice; modal?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const film = voice.film;
  if (!film) return null;

  return (
    <figure className="reel">
      <div className="reel-frame">
        {playing ? (
          <iframe
            src={drivePlayer(film.driveId)}
            title={`${voice.name}: ${film.label}`}
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <>
            <img src={voicePoster(voice)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
            <span className="reel-duration">{film.duration}</span>
            <button
              type="button"
              className={`reel-play${["manish", "renu", "difficult-year", "navleen", "finding-direction", "neha"].includes(voice.id) ? " reel-play-top" : ""}`}
              onClick={(event) => {
                track(EVENTS.filmPlay, { film: voice.id });
                // Phones watch full screen, like a reel; wider screens play in place.
                if (modal || window.matchMedia("(max-width: 680px)").matches) {
                  const detail = { id: film.driveId, title: `${voice.name}: ${film.label}`, from: event.currentTarget };
                  window.dispatchEvent(new CustomEvent("nng:film", { detail }));
                  return;
                }
                setPlaying(true);
              }}
              aria-label={`${voice.hook ?? film.label}. Watch their story: ${voice.name}, ${film.duration}`}
              data-title={`${voice.name}: ${film.label}`}
            >
              <span className="reel-hook">{voice.hook ?? film.label}</span>
              <span className="reel-play-icon" aria-hidden="true">
                <svg viewBox="0 0 12 14">
                  <path d="M0 0l12 7-12 7z" />
                </svg>
              </span>
              <span>Watch their story</span>
            </button>
          </>
        )}
      </div>
      <figcaption>
        <strong>{film.label}</strong>
        <span>
          {voice.name} · {voice.context}
        </span>
      </figcaption>
    </figure>
  );
}
