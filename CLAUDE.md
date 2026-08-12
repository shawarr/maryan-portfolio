# maryan-portfolio

Mechanical engineering portfolio site for Maryan. Vite + React + Three.js, built to static files.

## Who you're working with

**The person making content changes to this site (Maryan) is non-technical.** They may not
know git, terminal, CI/CD, or why "I edited the file but the site still looks the same."
Assume no prior knowledge of any of this when helping them:

- If they say changes aren't showing up, the most common cause is simply that the deploy
  pipeline hasn't run yet or failed — check the GitHub Actions tab on the repo first
  (https://github.com/shawarr/maryan-portfolio/actions), don't assume they broke something.
- Explain git/GitHub concepts in plain language if they ask ("push" = "save your changes to
  the live version", etc). Don't assume they'll understand jargon like "rebase" or "force push."
- Be conservative: this is their real, live, public site. Don't run destructive git operations
  on their behalf without explaining what will happen in plain terms first.
- If something breaks the live site, prioritize getting it back to a working state over
  explaining root cause first — explain after.

## How this is deployed

Live at **https://maryanbakir.com** (TLS via certbot, auto-renews). This is the real,
canonical address — use it in anything user-facing.

Three older names (`mepnahportfolio.shawar.xyz`, `maryanbakir.shawar.xyz`,
`maryan.shawar.xyz`) still resolve to the same container. They are duplicates as far as
search engines are concerned, which is why `index.html` carries a canonical tag pointing
at maryanbakir.com — don't remove it. Ideally the three would 301-redirect to the real
domain, but that needs root on the host nginx, which this user does not have.

- Server: the "ahmad" box, reachable to Claude Code sessions running there as user `maryan`
  (no sudo except one narrowly-scoped script, see below).
- App source + build lives at `~/apps/mepnahportfolio` on that server, `origin` remote
  points to `git@github.com-mepnahportfolio:shawarr/maryan-portfolio.git` (custom SSH host
  alias in `~/.ssh/config`, using a repo-scoped deploy key — not the account's normal identity).
- Runs as a static build (`npm run build` → `dist/`) served by an **nginx:alpine Docker
  container** (rootless Docker, no root needed) named `mepnahportfolio`, bound to
  `127.0.0.1:8093`, `--restart unless-stopped`.
- The **host's system nginx** (root-owned, shared with other `*.shawar.xyz` sites on this
  box) reverse-proxies `mepnahportfolio.shawar.xyz` → `127.0.0.1:8093` and terminates TLS.
  Config: `/etc/nginx/sites-available/mepnahportfolio.shawar.xyz`.

## Redeploy

**Automatic:** every push to `main` on GitHub triggers `.github/workflows/deploy.yml`, which
SSHs into the server with a CI-only deploy key. That key is restricted server-side (forced
command in `authorized_keys`) to run exactly one thing: `scripts/redeploy.sh` — it cannot do
anything else, even if the GitHub secret ever leaked.

**Manual** (if you're a Claude session on the server and need to redeploy by hand, e.g. CI
is failing or someone asks you to "just push the update"):

```bash
~/apps/mepnahportfolio/scripts/redeploy.sh
```

This does `git pull --ff-only`, `npm install`, `npm run build`, `docker restart mepnahportfolio`.

## Search engines

- `public/robots.txt` + `public/sitemap.xml`; `index.html` carries the title, description,
  canonical, Open Graph and JSON-LD (`WebSite` + `Person`). The `WebSite` name is what
  stops Google printing a lowercase site name derived from the domain.
- **IndexNow key**: `public/b8eb15e5362058bd2e1918b6c9c8e629.txt`. Don't regenerate it —
  the filename *is* the key and it must stay reachable at the domain root. Notify Bing
  (and so DuckDuckGo) of updates with the curl command in commit `95d5639`.
- Google does not support IndexNow; it needs Search Console, which requires Maryan's
  own Google account.

## Media pipeline (photos, video, CAD)

Originals live in `~/portfolio_drive`, outside the repo. Only processed output is committed.

- **Photos** → `public/projects/<id>/<n>.png|jpg`, numbered in display order. Backgrounds
  are removed with rembg on CAD renders and isolated objects, but deliberately **not** on
  scene shots (expo stand, robot in its arena, underwater) — the cutout leaves debris and
  throws away the context — nor on screenshots and plots.
- **Video** → re-encoded to H.264/AAC MP4 with `+faststart`, plus an `<n>-poster.jpg`
  still. Source `.mov`/`.avi` will not play in browsers, so never copy them across raw.
- **CAD** → STEP converted to GLB with `cascadio`, then compressed with
  `@gltf-transform/cli` using **meshopt** (not Draco: drei's `useGLTF` enables the meshopt
  decoder by default, so nothing loads from a CDN). Two files per project:
  `<id>.glb` full detail for the detail view, and `<id>-preview.glb` simplified to under
  400 KB for the spinning card preview.

## Access model (read before touching permissions)

- User `maryan` on the server has **no general sudo**. The one exception is a fixed,
  root-owned, argument-less script (`/usr/local/sbin/mepnahportfolio-setup.sh`, used only
  for initial nginx vhost + certbot setup) via a scoped `NOPASSWD` sudoers rule. Don't try
  to widen this — if a task seems to need more root access, stop and ask the human instead
  of finding a workaround.
- Two separate SSH keypairs exist for a reason — don't collapse them into one:
  - `~/.ssh/id_ed25519_maryan_portfolio_deploy` — repo push/pull (GitHub deploy key, write
    access). Private half never leaves the server.
  - `~/.ssh/id_ed25519_ci_redeploy` — public half only lives on the server, locked to the
    forced command above. Private half is a GitHub Actions secret (`DEPLOY_SSH_KEY`).
- If you ever need to regenerate or rotate either key, keep the same scoping — don't grant
  a plain shell-access key "for convenience."
