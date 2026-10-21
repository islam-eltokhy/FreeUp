import {
  Backpack,
  Bike,
  Camera,
  Coffee,
  Dumbbell,
  Flame,
  Footprints,
  Gamepad2,
  Glasses,
  Headphones,
  Lamp,
  Shirt,
  ShoppingBag,
  Speaker,
  Umbrella,
  Watch,
} from "lucide-react";

/** Icons available for generated product tiles, keyed by a serialisable name. */
export const productIcons = {
  backpack: Backpack,
  bike: Bike,
  camera: Camera,
  coffee: Coffee,
  dumbbell: Dumbbell,
  flame: Flame,
  footprints: Footprints,
  gamepad: Gamepad2,
  glasses: Glasses,
  headphones: Headphones,
  lamp: Lamp,
  shirt: Shirt,
  bag: ShoppingBag,
  speaker: Speaker,
  umbrella: Umbrella,
  watch: Watch,
} as const;

export type ProductIcon = keyof typeof productIcons;
