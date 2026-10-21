import { Banknote, RefreshCcw, Store, Truck } from "lucide-react";

const props = [
  {
    icon: Truck,
    title: "Delivery across Egypt",
    body: "Cairo and Giza in 1 to 3 days, every other governorate in 2 to 5. Free over 1,500 EGP.",
  },
  {
    icon: Banknote,
    title: "Cash on delivery",
    body: "Pay the courier at your door, or pay by card or Instapay at checkout. Your call.",
  },
  {
    icon: RefreshCcw,
    title: "14-day exchanges",
    body: "Wrong size? Exchange it in store or arrange a courier swap within 14 days, tags on.",
  },
  {
    icon: Store,
    title: "Try it on in store",
    body: "Reserve online, try on at Zoweil Plaza Mall. Our stylists will build the whole look with you.",
  },
];

export function ValueProps() {
  return (
    <section className="container-x py-20">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {props.map((p) => (
          <div key={p.title} className="group rounded-3xl border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-blush text-brand transition group-hover:bg-brand group-hover:text-white">
              <p.icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h3 className="font-display mt-5 text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
