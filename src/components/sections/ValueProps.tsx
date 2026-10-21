import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const props = [
  {
    icon: BadgeCheck,
    title: "100% authentic",
    body: "Every item is sourced directly from the brand or an authorised partner and checked by hand.",
  },
  {
    icon: Truck,
    title: "Out the door in 48h",
    body: "Orders ship within two working days. Free over $60, tracked all the way to your door.",
  },
  {
    icon: RotateCcw,
    title: "30-day easy returns",
    body: "Changed your mind? Print a label, drop it off, get refunded. No quizzes, no fuss.",
  },
  {
    icon: ShieldCheck,
    title: "Full warranty",
    body: "Open-box tech keeps its full manufacturer warranty. Outlet price, full-price peace of mind.",
  },
];

export function ValueProps() {
  return (
    <section className="container-x py-20">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {props.map((p) => (
          <div
            key={p.title}
            className="group rounded-3xl border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream-2 text-ink transition group-hover:bg-lime">
              <p.icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h3 className="font-display mt-5 text-xl font-bold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
