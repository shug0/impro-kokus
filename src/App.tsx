import { useEffect, useState } from "react";
import useRandom from "./hooks/useRandom";
import animals from "./data/animals.json";
import jobs from "./data/jobs.json";
import emotions from "./data/emotions.json";
import colors from "./data/colors.json";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const storedTheme = window.localStorage.getItem("kokus-theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

function App() {
  const [randomAnimal, getRandomAnimal] = useRandom(animals);
  const [randomJob, getRandomJob] = useRandom(jobs);
  const [randomEmotion, getRandomEmotion] = useRandom(emotions);
  const [randomColor, getRandomColor] = useRandom(colors);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDark = theme === "dark";

  const handleGetNewOne = () => {
    getRandomAnimal();
    getRandomJob();
    getRandomEmotion();
    getRandomColor();
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  useEffect(() => {
    handleGetNewOne();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("kokus-theme", theme);
  }, [theme]);

  const appTheme = isDark
    ? "bg-slate-950 text-white"
    : "bg-stone-50 text-slate-950";
  const headerTheme = isDark ? "text-slate-400" : "text-slate-500";
  const cardTheme = isDark
    ? "border-white/10 bg-white/[0.06] shadow-black/30"
    : "border-slate-200 bg-white shadow-slate-200";
  const labelTheme = isDark ? "text-slate-500" : "text-slate-400";
  const promptTheme = isDark ? "text-slate-300" : "text-slate-600";
  const highlightTheme = isDark
    ? "text-white decoration-violet-400/60"
    : "text-slate-950 decoration-violet-500/50";
  const subtleButtonTheme = isDark
    ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100";

  return (
    <div
      className={`
        min-h-screen
        px-5 py-6 sm:px-8 sm:py-10
        flex flex-col items-center
        transition-colors duration-300
        ${appTheme}
    `}
    >
      <header
        className={`mb-8 flex w-full max-w-lg items-center justify-between text-xs font-semibold uppercase tracking-[0.26em] ${headerTheme}`}
      >
        <p className="text-violet-500">Kokus</p>
        <button
          aria-label={`Passer en thème ${isDark ? "clair" : "sombre"}`}
          className={`rounded-full border px-4 py-2 tracking-normal transition ${subtleButtonTheme}`}
          onClick={toggleTheme}
          type="button"
        >
          {isDark ? "Clair" : "Sombre"}
        </button>
      </header>
      <main className="flex w-full max-w-lg flex-1 flex-col justify-center">
        <section
          className={`rounded-[2rem] border p-6 shadow-2xl transition-colors duration-300 sm:p-8 ${cardTheme}`}
        >
          <p
            className={`mb-5 text-sm font-semibold uppercase tracking-[0.22em] ${labelTheme}`}
          >
            Résultat
          </p>
          <p
            className={`text-4xl font-semibold leading-tight tracking-tight sm:text-6xl ${promptTheme}`}
          >
            Un·e{" "}
            <span
              className={`font-bold underline decoration-4 underline-offset-4 ${highlightTheme}`}
            >
              {randomJob}
            </span>{" "}
            ascendant{" "}
            <span
              className={`font-bold underline decoration-4 underline-offset-4 ${highlightTheme}`}
            >
              {randomAnimal}
            </span>
            , traversé·e par{" "}
            <span
              className={`font-bold underline decoration-4 underline-offset-4 ${highlightTheme}`}
            >
              {randomEmotion}
            </span>
            , dans une énergie{" "}
            <span
              className={`inline-flex items-center font-bold underline decoration-4 underline-offset-4 ${highlightTheme}`}
            >
              <span
                className="mr-2 h-6 w-6 shrink-0 rounded-full border border-current"
                style={{ backgroundColor: randomColor.value }}
              />
              {randomColor.name}
            </span>
            .
          </p>
        </section>
        <button
          className="mt-6 rounded-full bg-violet-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-400/40"
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
