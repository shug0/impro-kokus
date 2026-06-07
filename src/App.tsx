import { useEffect, useState } from "react";
import useRandom from "./hooks/useRandom";
import animals from "./data/animals.json";
import jobs from "./data/jobs.json";
import emotions from "./data/emotions.json";
import colors from "./data/colors.json";

type Theme = "light" | "dark";
type ShowState = { job: boolean; animal: boolean; emotion: boolean; color: boolean };

const getInitialTheme = (): Theme => {
  const storedTheme = window.localStorage.getItem("kokus-theme");
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const TOGGLES: { key: keyof ShowState; label: string }[] = [
  { key: "job", label: "Métier" },
  { key: "animal", label: "Animal" },
  { key: "emotion", label: "Émotion" },
  { key: "color", label: "Couleur" },
];

function App() {
  const [randomAnimal, getRandomAnimal] = useRandom(animals);
  const [randomJob, getRandomJob] = useRandom(jobs);
  const [randomEmotion, getRandomEmotion] = useRandom(emotions);
  const [randomColor, getRandomColor] = useRandom(colors);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [show, setShow] = useState<ShowState>({
    job: true,
    animal: true,
    emotion: true,
    color: false,
  });
  const isDark = theme === "dark";

  const handleGetNewOne = () => {
    getRandomAnimal();
    getRandomJob();
    getRandomEmotion();
    getRandomColor();
  };

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  const toggleShow = (k: keyof ShowState) => setShow((p) => ({ ...p, [k]: !p[k] }));

  useEffect(() => {
    handleGetNewOne();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("kokus-theme", theme);
  }, [theme]);

  const hasPara1 = show.job || show.animal;
  const hasPara2 = show.emotion || show.color;

  const appTheme = isDark ? "bg-slate-950 text-white" : "bg-stone-50 text-slate-950";
  const headerTheme = isDark ? "text-slate-400" : "text-slate-500";
  const labelTheme = isDark ? "text-slate-500" : "text-slate-400";
  const promptTheme = isDark ? "text-slate-300" : "text-slate-600";
  const highlightTheme = isDark
    ? "text-white decoration-violet-400/60"
    : "text-slate-950 decoration-violet-500/50";
  const subtleButtonTheme = isDark
    ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100";
  const activeToggleTheme = "border-violet-600 bg-violet-600 text-white";
  const inactiveToggleTheme = isDark
    ? "border-white/10 bg-transparent text-slate-500"
    : "border-slate-200 bg-transparent text-slate-400";

  const textClass = `break-words text-[clamp(1.35rem,6.5vw,1.85rem)] font-semibold leading-[1.45] tracking-tight sm:text-6xl sm:leading-snug ${promptTheme}`;
  const spanClass = `font-bold underline decoration-4 underline-offset-4 ${highlightTheme}`;

  return (
    <div
      className={`
        h-dvh w-full overflow-hidden
        relative
        px-8 py-5 sm:px-14 sm:py-10
        flex flex-col items-center
        transition-colors duration-300
        ${appTheme}
    `}
    >
      <header
        className={`absolute left-8 right-8 top-5 mx-auto flex max-w-lg items-center justify-between text-xs font-semibold uppercase tracking-[0.26em] sm:left-14 sm:right-14 sm:top-10 ${headerTheme}`}
      >
        <p className="text-violet-500">Kokus</p>
        <button
          aria-label={`Passer en thème ${isDark ? "clair" : "sombre"}`}
          className={`rounded-full border px-3 py-1.5 tracking-normal transition sm:px-4 sm:py-2 ${subtleButtonTheme}`}
          onClick={toggleTheme}
          type="button"
        >
          {isDark ? "Clair" : "Sombre"}
        </button>
      </header>

      <main className="flex w-full max-w-lg flex-1 flex-col">
        {/* Feature toggles — positioned below the absolute header */}
        <div className="mt-10 flex gap-2 sm:mt-12">
          {TOGGLES.map(({ key, label }) => (
            <button
              key={key}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold tracking-normal transition sm:px-4 sm:py-2 ${show[key] ? activeToggleTheme : inactiveToggleTheme}`}
              onClick={() => toggleShow(key)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Result text — vertically centered in remaining space */}
        <div className="flex flex-1 flex-col justify-center">
          <section className="flex flex-col">
            <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.22em] sm:mb-6 sm:text-sm ${labelTheme}`}>
              Résultat
            </p>

            {/* Paragraph 1 : métier + animal */}
            {hasPara1 && (
              <p className={textClass}>
                {show.job && (
                  <>Un·e <span className={spanClass}>{randomJob}</span></>
                )}
                {show.animal && (
                  <>{" "}{show.job ? "ascendant " : "Ascendant "}
                  <span className={spanClass}>{randomAnimal}</span></>
                )}
                {!hasPara2 && "."}
              </p>
            )}

            {/* Paragraph 2 : émotion + couleur */}
            {hasPara2 && (
              <p className={`${hasPara1 ? "mt-3 sm:mt-5" : ""} ${textClass}`}>
                {show.emotion && (
                  <>{!hasPara1 ? "Traversé·e par " : "traversé·e par "}
                  <span className={spanClass}>{randomEmotion}</span></>
                )}
                {show.color && (
                  <>
                    {show.emotion
                      ? ", dans une énergie "
                      : !hasPara1
                      ? "Dans une énergie "
                      : "dans une énergie "}
                    <span className={`inline-flex items-center ${spanClass}`}>
                      <span
                        className="mr-2 h-5 w-5 shrink-0 rounded-full border border-current sm:h-6 sm:w-6"
                        style={{ backgroundColor: randomColor.value }}
                      />
                      {randomColor.name}
                    </span>
                  </>
                )}
                .
              </p>
            )}

            {/* Nothing selected */}
            {!hasPara1 && !hasPara2 && (
              <p className={`${textClass} opacity-25`}>—</p>
            )}
          </section>
        </div>

        <button
          className="rounded-full bg-violet-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-400/40 sm:py-5"
          onClick={handleGetNewOne}
          type="button"
        >
          Nouveau tirage
        </button>
      </main>
    </div>
  );
}

export default App;
