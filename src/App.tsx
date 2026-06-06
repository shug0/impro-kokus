import { useEffect } from "react";
import useRandom from "./hooks/useRandom";
import animals from "./data/animals.json";
import jobs from "./data/jobs.json";
import emotions from "./data/emotions.json";
import colors from "./data/colors.json";

function App() {
  const [randomAnimal, getRandomAnimal] = useRandom(animals);
  const [randomJob, getRandomJob] = useRandom(jobs);
  const [randomEmotion, getRandomEmotion] = useRandom(emotions);
  const [randomColor, getRandomColor] = useRandom(colors);

  const handleGetNewOne = () => {
    getRandomAnimal();
    getRandomJob();
    getRandomEmotion();
    getRandomColor();
  };

  useEffect(() => {
    handleGetNewOne();
  }, []);

  return (
    <div
      className={`
        min-h-screen
        px-5 py-8 sm:px-8 sm:py-12
        text-center text-slate-100
        flex flex-col items-center justify-center
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
        from-slate-700 via-slate-950 to-black
    `}
    >
      <header className="mb-10 max-w-xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          Kokus
        </p>
        <h1 className="mb-4 text-4xl font-light leading-tight text-white sm:text-6xl">
          Générateur de personnages pour impros audacieuses
        </h1>
        <p className="text-base leading-7 text-slate-300 sm:text-lg">
          Incarne un personnage inattendu, tire une contrainte, puis lance la
          scène.
        </p>
      </header>
      <main className="w-full max-w-md">
        <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            Ton personnage
          </p>
          <div className="space-y-5 text-left">
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                Métier
              </p>
              <p className="text-3xl font-semibold leading-tight text-white">
                Un·e {randomJob}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                Animal intérieur
              </p>
              <p className="text-2xl font-semibold leading-tight text-primary">
                ascendant {randomAnimal}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                Émotion dominante
              </p>
              <p className="text-2xl font-semibold leading-tight text-white">
                animé·e par {randomEmotion}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                Couleur
              </p>
              <p className="flex items-center text-2xl font-semibold leading-tight text-white">
                <span
                  className="mr-3 h-7 w-7 shrink-0 rounded-full border border-white/30"
                  style={{ backgroundColor: randomColor.value }}
                />
                énergie {randomColor.name}
              </p>
            </div>
          </div>
        </section>
        <button
          className="btn btn-primary mt-6 w-full rounded-full text-sm font-semibold normal-case tracking-wide"
          onClick={handleGetNewOne}
        >
          Générer une nouvelle idée
        </button>
        <p className="mt-5 text-sm leading-6 text-slate-400">
          Utilise ce prompt comme point de départ, pas comme règle stricte.
        </p>
      </main>
    </div>
  );
}

export default App;
