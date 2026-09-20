"use client";

import { useState } from "react";
import { Button } from "@aramon/ui/button";
import { FieldError, FieldHint, FieldLabel, Input } from "@aramon/ui/input";
import { MaterialBackground } from "@aramon/ui/material-background";

export function IdentityProof() {
  const [submitted, setSubmitted] = useState(false);
  return <div className="identity-proof">
    <MaterialBackground className="identity-material" poster="/aramon/material/material-background.webp" sources={[{ src: "/aramon/material/material-background.webm", type: "video/webm" }, { src: "/aramon/material/material-background.mp4", type: "video/mp4" }]}>
      <div className="identity-material-copy"><span>Aramon Identity</span><strong>Your place is ready.</strong><p>One secure entry point for the Aramon learning environment.</p></div>
    </MaterialBackground>
    <form className="identity-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <header><h2>{submitted ? "Check your inbox." : "Continue to Aramon"}</h2><p>{submitted ? "We sent a confirmation link to nabil@aramon.ma." : "Use your school address to continue."}</p></header>
      {submitted ? <div className="confirmation-mark" aria-label="Confirmation sent">✓</div> : <><FieldLabel>Email<Input type="email" defaultValue="nabil@aramon" aria-invalid="true" aria-describedby="entry-error" /><FieldError id="entry-error">Enter a complete email address.</FieldError></FieldLabel><FieldLabel>Password<Input type="password" defaultValue="material-memory" /><FieldHint>At least 12 characters.</FieldHint></FieldLabel><Button type="submit" energy="lamp">Continue</Button><Button>Use a passkey</Button></>}
    </form>
  </div>;
}
