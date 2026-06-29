// Importing the .glb files through Vite gives them content-hashed URLs
// (e.g. /assets/churro-a1b2c3.glb). That means whenever a model changes, its
// URL changes too — so the 1-year immutable cache never serves a stale model.
import waffleUrl from "./assets/models/churro.glb?url";
import chineseUrl from "./assets/models/chinese.glb?url";
import fastfoodUrl from "./assets/models/fastfood.glb?url";
import type { Category } from "./data/menu";

export const MODEL_URLS: Record<Category, string> = {
  waffle: waffleUrl,
  chinese: chineseUrl,
  fastfood: fastfoodUrl,
};

export const ALL_MODEL_URLS: string[] = [waffleUrl, chineseUrl, fastfoodUrl];
