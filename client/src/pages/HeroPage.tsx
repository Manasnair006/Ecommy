import Hero from '../assets/Sunrise.jpg'
import "../styles/tailwind.css"

function HeroPage() {
  return (
    <main>
      <section className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-slate-900 px-4 py-16">
        <img 
          src={Hero} 
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          alt="Sunrise over a mountain landscape"
        />
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center rounded-3xl bg-white/85 px-5 py-9 text-center shadow-2xl backdrop-blur-sm sm:px-12 sm:py-14">
          <p className="text-sm font-bold tracking-[0.24em] text-brand uppercase">Everything, simply</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">Welcome to Ecommy</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">Find the products you love, with a shopping experience made for everyday life.</p>
          <button className="mt-7 rounded-xl bg-accent px-6 py-3 font-bold text-slate-950 shadow-sm transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            Open Ecommy
          </button>
        </div>
      </section>
    </main>
  )
}

export default HeroPage
