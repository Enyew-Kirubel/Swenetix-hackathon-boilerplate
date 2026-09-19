import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* =========================
          HERO
      ========================== */}
      <section className="relative">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="absolute -left-40 top-[450px] h-[400px] w-[400px] rounded-full bg-violet-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-24">
          {/* Left side */}
          <div>
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
              Community-powered lost & found
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
              Lost something?
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Let&apos;s bring it home.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              Report lost and found items, discover nearby reports, and help
              reconnect people with the things that matter to them.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/reports/new")}
                className="group inline-flex h-14 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition duration-200 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-2xl"
              >
                Report an item
                <span className="ml-4 text-lg transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/reports")}
                className="h-14 rounded-2xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50"
              >
                Browse reports
              </button>
            </div>

            {/* Trust */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex pl-2">
                <div className="-ml-2 grid h-9 w-9 place-items-center rounded-full border-2 border-slate-50 bg-indigo-100 text-xs font-bold text-indigo-700">
                  W
                </div>

                <div className="-ml-2 grid h-9 w-9 place-items-center rounded-full border-2 border-slate-50 bg-violet-100 text-xs font-bold text-violet-700">
                  A
                </div>

                <div className="-ml-2 grid h-9 w-9 place-items-center rounded-full border-2 border-slate-50 bg-emerald-100 text-xs font-bold text-emerald-700">
                  M
                </div>

                <div className="-ml-2 grid h-9 w-9 place-items-center rounded-full border-2 border-slate-50 bg-slate-200 text-xs font-bold text-slate-600">
                  +
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-700">
                  Built for the community
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  People helping people find what they lost.
                </p>
              </div>
            </div>
          </div>

          {/* Right side visual */}
          <div className="relative mx-auto h-[430px] w-full max-w-[520px] lg:h-[540px]">
            {/* Main visual */}
            <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-100 bg-gradient-to-br from-indigo-100/80 via-white to-violet-100/70 shadow-[0_30px_100px_rgba(79,70,229,0.12)] sm:h-[420px] sm:w-[420px]">
              {/* Rings */}
              <div className="absolute inset-[13%] rounded-full border border-dashed border-indigo-200" />
              <div className="absolute inset-[28%] rounded-full border border-indigo-100" />

              {/* Center */}
              <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28px] bg-slate-950 text-4xl text-white shadow-2xl shadow-slate-950/25">
                ⌖
              </div>

              {/* Map points */}
              <div className="absolute left-[21%] top-[31%] h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_0_7px_rgba(99,102,241,0.10)]" />

              <div className="absolute right-[20%] top-[42%] h-3 w-3 rounded-full bg-violet-500 shadow-[0_0_0_7px_rgba(139,92,246,0.10)]" />

              <div className="absolute bottom-[20%] left-[30%] h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_7px_rgba(16,185,129,0.10)]" />

              {/* Connection lines */}
              <div className="absolute left-[24%] top-[34%] h-px w-[130px] rotate-[25deg] bg-indigo-200/70" />

              <div className="absolute bottom-[29%] left-[34%] h-px w-[120px] -rotate-[35deg] bg-indigo-200/70" />
            </div>

            {/* Found card */}
            <div className="absolute right-0 top-10 z-10 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
                ✓
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">Found nearby</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Phone • 2 min ago
                </p>
              </div>
            </div>

            {/* Match card */}
            <div className="absolute bottom-10 left-0 z-10 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
                ↗
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  Possible match
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  92% similarity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          QUICK ACTIONS
      ========================== */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div>
            <p className="text-xs font-extrabold tracking-[0.18em] text-indigo-600">
              GET STARTED
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              What happened?
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {/* Lost */}
            <button
              type="button"
              onClick={() => navigate("/reports/new")}
              className="group relative min-h-[230px] overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 text-left transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100"
            >
              <div className="absolute right-7 top-7 grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl text-indigo-600 shadow-sm">
                −
              </div>

              <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-indigo-100/60 blur-2xl transition duration-500 group-hover:scale-125" />

              <div className="relative flex h-full flex-col justify-end">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-500">
                  Lost
                </p>

                <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                  I lost something
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Tell the community what you lost, where it happened, and add
                  details that can help someone recognize it.
                </p>

                <span className="mt-6 text-sm font-bold text-indigo-600">
                  Create a lost report →
                </span>
              </div>
            </button>

            {/* Found */}
            <button
              type="button"
              onClick={() => navigate("/reports/new")}
              className="group relative min-h-[230px] overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 text-left transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-100"
            >
              <div className="absolute right-7 top-7 grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl text-emerald-600 shadow-sm">
                +
              </div>

              <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-100/60 blur-2xl transition duration-500 group-hover:scale-125" />

              <div className="relative flex h-full flex-col justify-end">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-500">
                  Found
                </p>

                <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                  I found something
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Report an item you found and give its owner a chance to
                  discover it.
                </p>

                <span className="mt-6 text-sm font-bold text-emerald-600">
                  Create a found report →
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================== */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold tracking-[0.18em] text-indigo-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              From lost to found in three steps.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              A simple community workflow designed to make reunions easier.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative border-t border-slate-200 pt-7">
              <span className="text-xs font-extrabold tracking-widest text-indigo-600">
                01
              </span>

              <h3 className="mt-8 text-xl font-extrabold text-slate-950">
                Report
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Add the item&apos;s details, location, date, and photos so the
                community can identify it.
              </p>

              <div className="absolute left-0 top-0 h-0.5 w-12 bg-indigo-600" />
            </div>

            {/* Step 2 */}
            <div className="relative border-t border-slate-200 pt-7">
              <span className="text-xs font-extrabold tracking-widest text-indigo-600">
                02
              </span>

              <h3 className="mt-8 text-xl font-extrabold text-slate-950">
                Discover
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Search reports using categories, locations, keywords, and useful
                item details.
              </p>

              <div className="absolute left-0 top-0 h-0.5 w-12 bg-indigo-600" />
            </div>

            {/* Step 3 */}
            <div className="relative border-t border-slate-200 pt-7">
              <span className="text-xs font-extrabold tracking-widest text-indigo-600">
                03
              </span>

              <h3 className="mt-8 text-xl font-extrabold text-slate-950">
                Reconnect
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Potential matches help connect lost items with the people
                looking for them.
              </p>

              <div className="absolute left-0 top-0 h-0.5 w-12 bg-indigo-600" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================== */}
      <section className="px-6 pb-20 pt-10 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 overflow-hidden rounded-[32px] bg-slate-950 px-7 py-12 shadow-2xl shadow-slate-900/20 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-16">
          <div>
            <p className="text-xs font-extrabold tracking-[0.18em] text-indigo-300">
              ONE COMMUNITY. FEWER LOST ITEMS.
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
              Someone might have found what you&apos;re looking for.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
              Search the community and discover recently reported lost and found
              items.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/reports")}
            className="group inline-flex h-14 shrink-0 items-center justify-center rounded-2xl bg-white px-6 text-sm font-bold text-slate-950 transition duration-200 hover:-translate-y-1 hover:bg-slate-100"
          >
            Explore reports
            <span className="ml-4 text-lg transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
