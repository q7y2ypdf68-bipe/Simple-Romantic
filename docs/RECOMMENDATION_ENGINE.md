# Recommendation Engine

## Purpose and correction record

This document is the permanent technical record for the Home finder. The correction was made on 2026-08-27. The previous implementation rendered one hard-coded “Piquenique ao pôr do sol” record after submit: it did not read the form, had no catalog, no filters, no score, and no tie-break. The fixed badges were therefore capable of contradicting every answer.

The old city field has been replaced by **ambiente**. There is no geographic data source in this project, and no external API is consulted. A free-form city could not honestly affect a recommendation; the new four-option radio group does.

## Architecture and catalog

`app/recommendations.mjs` is a pure, deterministic module. `app/page.tsx` collects the four radio values, calls `recommend(answers, language)`, and renders the returned copy and badges. Each of the 16 ideas has closed metadata: `environment`, `budget`, `duration`, and an `occasions` array, plus Portuguese and English title, description, and tip. The catalog is intentionally diverse (home, outdoor, and going-out experiences) and contains no new editorial pages or images.

Dimensions use these values:

- Environment: `home`, `outdoors`, `go-out`, `any`.
- Budget: `free`, `low`, `more`.
- Duration: `hour`, `afternoon`, `day`.
- Occasion: `casual`, `surprise`, `reconnect`.

## Compatibility, scoring, and fallback

Selection first removes hard incompatibilities: a concrete environment must match, the idea’s cost rank must not exceed the selected budget, and duration must match the selected duration. “Any” accepts all environments. Thus a free choice never receives a paid-only idea, and a one-hour choice never receives a longer idea.

Among compatible ideas, the score is auditable and ordered by product priority: environment match (or neutral score for “any”), exact duration, occasion tag, exact budget, then a small preference for the least expensive compatible idea. `reconnect` therefore favours ideas tagged for conversation/presence; `surprise` favours preparation and an unexpected detail; `casual` favours simple, low-pressure plans. The deterministic FNV-style hash of all four answers chooses only among equal-score candidates. `Math.random()` is not used.

The catalog currently has at least one exact duration/environment option for every hard matrix cell. If a future catalog removes one, the implementation must add an explicitly documented fallback rule and update tests; do not silently weaken compatibility.

## Badges and future maintenance

Badges are generated from the selected idea’s metadata, never from the selected answers or fixed copy. The three badges are the idea’s budget, duration, and concrete environment. To add an idea, add a unique `id`, all four metadata dimensions, both language copy tuples `[title, description, tip]`, and a test or coverage check if it introduces a new dimension. Do not classify with display strings.

To change weights, edit the single `score` function and run the full recommendation and rendered test suites. Keep hard filters before scoring, preserve deterministic tie-breaking, and inspect the distribution for dominance or badge contradictions.

## Regression matrix and observed distribution

`tests/recommendations.test.mjs` evaluates all **4 × 3 × 3 × 3 = 108** combinations. It covers hard compatibility, fallback availability, deterministic repeatability, varied human profiles, and badge coherence. The final distribution is:

| Idea | Selections |
| --- | ---: |
| Troquem bilhetes e uma bebida quente | 6 |
| Cozinhem uma receita nova juntos | 12 |
| Transformem a casa para um dia especial | 4 |
| Façam uma sessão de curta-metragens | 6 |
| Caminhada sem notificações | 12 |
| Piquenique ao pôr do sol | 4 |
| Explorem um parque ou trilha leve | 3 |
| Façam uma caça fotográfica a dois | 7 |
| Escolham um café para conversar | 12 |
| Visitem uma exposição ou biblioteca | 5 |
| Planejem um dia com uma atração especial | 1 |
| Sejam turistas no próprio bairro | 8 |
| Um dia sem pressa em casa | 6 |
| Dia de parque e sombra | 8 |
| Um dia de espaços públicos | 9 |
| Um dia de pequenas escolhas | 5 |

The most-selected idea accounts for 12/108 combinations; 16 ideas are used and no hard contradiction is present.

## Human regression cases

The four historical city cases (Rio de Janeiro, Barcelona, Praga, Lisboa) all previously produced the same fixed picnic because city, budget, time, and occasion were ignored. They are evidence of the old defect, not contracts for the new interface. The replacement environment values are now functional and deterministic.

## Risks and validation

The engine cannot make a recommendation local to a city, account for weather, or verify venue availability. Those would require new trusted data and are intentionally out of scope. Existing Home structure, visual system, accessibility pattern, light/dark themes, analytics, SEO, and editorial surfaces remain unchanged.

The final commit identifier is the Git commit that contains this document and is reported with the release record.
