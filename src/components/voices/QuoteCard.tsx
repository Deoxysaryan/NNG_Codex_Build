import { type Voice } from "@/content/voices";
import { VoiceFilmButton } from "./VoiceFilmButton";

/** Client words lead; editorial headlines never masquerade as another quote. */
export function QuoteCard({ voice, quote }: { voice: Voice; quote?: string }) {
  return (
    <article className="testimonial">
      <span className="testimonial-tag">{voice.context}</span>
      <blockquote>
        <p>“{quote ?? voice.quote}”</p>
      </blockquote>
      <footer className="client">
        <div>
          {voice.name}
          {voice.translated && <small>Translated from Hindi</small>}
        </div>
      </footer>
      <VoiceFilmButton voice={voice} />
    </article>
  );
}

/** One quote, large, for the moment on an inner page where proof matters most. */
export function QuoteBand({ voice, quote }: { voice: Voice; quote?: string }) {
  return (
    <figure className="quote-band">
      <span className="quote-mark" aria-hidden="true">
        “
      </span>
      <blockquote>
        <p>{quote ?? voice.quote}</p>
      </blockquote>
      <figcaption className="client">
        <div>
          {voice.name}
          <small>
            {voice.context}
            {voice.translated ? " · Translated from Hindi" : ""}
          </small>
        </div>
      </figcaption>
    </figure>
  );
}
