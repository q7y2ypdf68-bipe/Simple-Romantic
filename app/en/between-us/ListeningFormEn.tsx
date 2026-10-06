"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function ListeningFormEn() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending"); setError(""); setCopied(false);
    try {
      const response = await fetch("/api/listening", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ alias: data.get("alias"), need: data.get("need"), message: data.get("message"), publicationConsent: data.get("publicationConsent") === "on", adult: data.get("adult") === "on", consent: data.get("consent") === "on", website: data.get("website"), language: "en" }) });
      const payload = await response.json() as { accessCode?: string };
      if (!response.ok || !payload.accessCode) throw new Error("We couldn't send your story. Please check the fields and try again.");
      form.reset(); setCode(payload.accessCode); setState("success");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "We couldn't send it right now."); setState("error"); }
  }

  async function copyCode() { await navigator.clipboard.writeText(code); setCopied(true); }

  if (state === "success") return <div className="listening-success" role="status"><span aria-hidden="true">♥</span><p className="eyebrow">WE HAVE RECEIVED YOUR WORDS</p><h2>Thank you for trusting us.</h2><p>Keep this private code. You will need it to check for a reply:</p><button className="listening-code" type="button" onClick={copyCode}><strong>{code}</strong><small>{copied ? "Code copied" : "Tap to copy"}</small></button><p className="listening-code-warning">Do not post or share this code. Anyone who has it will be able to see our reply.</p><Link className="button primary" href={`/en/between-us/reply?code=${encodeURIComponent(code)}`}>Check later <span>→</span></Link></div>;

  return <form className="listening-form" onSubmit={submit}>
    <label><span>What would you like us to call you? <small>(optional)</small></span><input name="alias" maxLength={60} placeholder="A name, a nickname, or leave it blank" /></label>
    <fieldset><legend>What do you need right now?</legend><div className="listening-needs">
      <label><input type="radio" name="need" value="listen" defaultChecked /><span><strong>I just need to let it out</strong><small>I want to put it into words and have someone read it.</small></span></label>
      <label><input type="radio" name="need" value="comfort" /><span><strong>A word of support</strong><small>I would like to receive comfort and encouragement.</small></span></label>
      <label><input type="radio" name="need" value="reflection" /><span><strong>A thoughtful reflection</strong><small>I would like to hear another perspective on what I am sharing.</small></span></label>
    </div></fieldset>
    <label><span>Tell us what is on your heart</span><textarea name="message" minLength={80} maxLength={5000} rows={10} required placeholder="Write at your own pace. You don't have to put it all in order before you begin…" /><small>80 to 5,000 characters. Please don&apos;t include personal data or information that identifies other people.</small></label>
    <label className="listening-check optional"><input name="publicationConsent" type="checkbox" /><span><strong>Perhaps my experience could help someone.</strong> I allow it to be considered for anonymous publication, after review and without identifying details. This is optional and does not guarantee publication.</span></label>
    <label className="listening-check"><input name="adult" type="checkbox" required /><span>I confirm that I am 18 years old or older.</span></label>
    <label className="listening-check"><input name="consent" type="checkbox" required /><span>I expressly consent to the processing of this story, which may include intimate information, so that it can be read and, if I request it, answered. I am aware of the deletion periods, I know I can delete it earlier with my code, and I have read the <Link href="/en/terms">Terms</Link> and the <Link href="/en/privacy">Privacy Policy</Link>.</span></label>
    <label className="community-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending with care…" : "Send my story"}<span>→</span></button>
    <p className="listening-retention-note">Pending stories are kept for up to 180 days; after a reply, for up to 90 days. You can delete them earlier with your private code.</p>
    <p className="listening-form-message" role="status" aria-live="polite">{state === "error" ? error : ""}</p>
  </form>;
}
