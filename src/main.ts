(() => {
  const $ = <T extends HTMLElement>(sel: string): T =>
    document.querySelector<T>(sel)!;
  const ESC: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };
  const esc = (s: string): string => s.replace(/[&<>]/g, (c) => ESC[c] ?? c);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- progress (saved in this browser) ----------
  const KEY = "pg-solved-v1";
  const loadSolved = (): string[] => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  };
  const solved = new Set<string>(loadSolved());
  const saveSolved = (): void => {
    try {
      localStorage.setItem(KEY, JSON.stringify([...solved]));
    } catch {
      /* storage unavailable: progress lasts for this visit only */
    }
  };

  // ---------- state ----------
  let topic: Topic | "all" = "all";
  let query = "";
  let current: string = PROBLEMS[0]!.id;
  const byId = (id: string): Problem =>
    PROBLEMS.find((p) => p.id === id) ?? PROBLEMS[0]!;

  // ---------- syntax highlighting ----------
  const TOKEN =
    /(\/\/.*$)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(const|let|var|return|if|else|for|while|of|in|new|throw|break|continue|try|catch)\b|(\b\d+(?:\.\d+)?\b)|(=>)/gm;
  const highlight = (src: string): string => {
    let out = "";
    let last = 0;
    for (const m of src.matchAll(TOKEN)) {
      const i = m.index ?? 0;
      out += esc(src.slice(last, i));
      const cls = m[1] ? "c" : m[2] ? "s" : m[3] ? "k" : m[4] ? "n" : "o";
      out += `<span class="t-${cls}">${esc(m[0])}</span>`;
      last = i + m[0].length;
    }
    return out + esc(src.slice(last));
  };
  const dedent = (src: string): string => {
    const lines = src.split("\n");
    const indents = lines
      .slice(1)
      .filter((l) => l.trim())
      .map((l) => l.match(/^ */)![0].length);
    const cut = indents.length ? Math.min(...indents) : 0;
    return lines.map((l, i) => (i === 0 ? l : l.slice(cut))).join("\n");
  };
  const sourceOf = (p: Problem): string =>
    `const ${p.name} = ${dedent(p.solve.toString())};`;

  // ---------- list + chips ----------
  const visible = (): Problem[] =>
    PROBLEMS.filter(
      (p) =>
        (topic === "all" || p.topic === topic) &&
        (!query ||
          `${p.title} ${p.brief} ${TOPICS[p.topic].label}`
            .toLowerCase()
            .includes(query)),
    );

  function renderChips(): void {
    const chips = [
      `<button class="chip" data-topic="all" aria-pressed="${topic === "all"}">All <b>${PROBLEMS.length}</b></button>`,
      ...(Object.keys(TOPICS) as Topic[]).map((t) => {
        const count = PROBLEMS.filter((p) => p.topic === t).length;
        return `<button class="chip" style="--c:${TOPICS[t].color}" data-topic="${t}" aria-pressed="${topic === t}"><i></i>${TOPICS[t].label} <b>${count}</b></button>`;
      }),
    ];
    $("#chips").innerHTML = chips.join("");
  }

  function renderList(): void {
    const items = visible();
    $("#list").innerHTML = items.length
      ? items
          .map(
            (
              p,
            ) => `<button class="item" role="option" style="--c:${TOPICS[p.topic].color}" data-id="${p.id}" aria-current="${p.id === current}">
              <i></i><span class="item-main"><strong>${esc(p.title)}</strong><small>${TOPICS[p.topic].label} · ${p.level}</small></span>
              ${solved.has(p.id) ? '<span class="done" aria-label="Solved">✓</span>' : ""}</button>`,
          )
          .join("")
      : `<p class="empty">Nothing matches “${esc(query)}”. Clear the search or choose another topic.</p>`;
  }

  // ---------- workbench ----------
  function renderBench(): void {
    const p = byId(current);
    const t = TOPICS[p.topic];
    $("#bench").style.setProperty("--c", t.color);
    $("#bench").innerHTML = `
      <div class="bench-head">
        <span class="badge"><i></i>${t.label}</span><span class="level">${p.level}</span>
      </div>
      <h2>${esc(p.title)}</h2>
      <p class="brief">${esc(p.brief)}</p>

      <label class="field" for="args">Arguments <span>JSON array, one item per parameter</span></label>
      <textarea id="args" rows="2" spellcheck="false" autocomplete="off">${esc(p.sample)}</textarea>
      <div class="actions">
        <button class="btn primary" id="run">Run solution <kbd>Ctrl</kbd><kbd>↵</kbd></button>
        <button class="btn" id="reset">Reset input</button>
        <button class="btn" id="next">Next problem</button>
      </div>

      <div class="out" id="out" aria-live="polite" data-state="idle">
        <div class="out-bar"><span id="out-label">Result</span><span id="out-meta"></span></div>
        <pre id="out-body">Press Run to see what the solution returns.</pre>
      </div>

      <div class="code">
        <div class="code-bar"><span>Solution (compiled from TypeScript)</span><button class="btn small" id="copy">Copy</button></div>
        <pre><code>${highlight(sourceOf(p))}</code></pre>
      </div>`;

    $("#run").addEventListener("click", () => run());
    $("#reset").addEventListener("click", () => {
      $<HTMLTextAreaElement>("#args").value = p.sample;
      run();
    });
    $("#next").addEventListener("click", () => {
      const list = visible();
      const idx = list.findIndex((x) => x.id === current);
      const nextItem =
        list.find((x, i) => i > idx && !solved.has(x.id)) ??
        list[(idx + 1) % list.length];
      if (nextItem) select(nextItem.id);
    });
    $("#copy").addEventListener("click", async (e) => {
      const btn = e.currentTarget as HTMLButtonElement;
      try {
        await navigator.clipboard.writeText(sourceOf(p));
        btn.textContent = "Copied";
      } catch {
        btn.textContent = "Select and copy manually";
      }
      setTimeout(() => (btn.textContent = "Copy"), 1600);
    });
  }

  const show = (
    state: "ok" | "error",
    label: string,
    body: string,
    meta = "",
  ): void => {
    const out = $("#out");
    out.dataset["state"] = state;
    $("#out-label").textContent = label;
    $("#out-meta").textContent = meta;
    $("#out-body").textContent = body;
    out.classList.remove("flash");
    void out.offsetWidth; // restart the animation
    out.classList.add("flash");
  };

  const format = (v: unknown): string => {
    if (v === undefined) return "undefined";
    const compact = JSON.stringify(v);
    return compact !== undefined && compact.length <= 72
      ? compact
      : JSON.stringify(v, null, 2);
  };

  function run(auto = false): void {
    const p = byId(current);
    let args: unknown;
    try {
      args = JSON.parse($<HTMLTextAreaElement>("#args").value);
    } catch {
      show(
        "error",
        "Input isn't valid JSON",
        'Use double quotes for text and wrap everything in square brackets, like ["hello"].',
      );
      return;
    }
    if (!Array.isArray(args)) {
      show(
        "error",
        "Input must be an array",
        "Wrap your arguments in square brackets: write [2024] instead of 2024.",
      );
      return;
    }
    const start = performance.now();
    try {
      const result = p.solve(...args);
      const ms = performance.now() - start;
      const kind = Array.isArray(result)
        ? `array(${result.length})`
        : result === null
          ? "null"
          : typeof result;
      show(
        "ok",
        "Result",
        format(result),
        `${kind} · ${ms < 0.1 ? "<0.1" : ms.toFixed(1)} ms`,
      );
      if (!auto && !solved.has(p.id)) {
        solved.add(p.id);
        saveSolved();
        renderList();
        updateProgress();
      }
    } catch (err) {
      show(
        "error",
        "The solution threw an error",
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  function select(id: string): void {
    current = id;
    renderList();
    renderBench();
    if (innerWidth < 960)
      $("#bench").scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
  }

  // ---------- progress + count-up ----------
  function countUp(el: HTMLElement, to: number): void {
    if (reduceMotion || to === 0) {
      el.textContent = String(to);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number): void => {
      const k = Math.min(1, (now - t0) / 900);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function updateProgress(): void {
    const total = PROBLEMS.length;
    const done = solved.size;
    $("#ring").style.setProperty("--p", String(done / total));
    $("#progress-text").textContent = `${done} of ${total} solved`;
    $("#stat-solved").textContent = String(done);
  }

  // ---------- wiring ----------
  $("#chips").addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-topic]");
    if (!btn) return;
    topic = btn.dataset["topic"] as Topic | "all";
    renderChips();
    renderList();
  });
  $("#list").addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-id]");
    if (btn?.dataset["id"]) select(btn.dataset["id"]);
  });
  $<HTMLInputElement>("#search").addEventListener("input", (e) => {
    query = (e.target as HTMLInputElement).value.trim().toLowerCase();
    renderList();
  });
  $("#reset-progress").addEventListener("click", () => {
    solved.clear();
    saveSolved();
    renderList();
    updateProgress();
  });
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    } else if (
      e.key === "/" &&
      document.activeElement?.tagName !== "TEXTAREA" &&
      document.activeElement?.tagName !== "INPUT"
    ) {
      e.preventDefault();
      $("#search").focus();
    }
  });

  // light that follows the pointer across the workbench
  let raf = 0;
  document.addEventListener("pointermove", (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    });
  });

  // ---------- first paint ----------
  renderChips();
  renderList();
  renderBench();
  updateProgress();
  countUp($("#stat-problems"), PROBLEMS.length);
  countUp($("#stat-topics"), Object.keys(TOPICS).length);
  setTimeout(() => run(true), reduceMotion ? 0 : 700); // opening moment: the first solution runs itself
})();
