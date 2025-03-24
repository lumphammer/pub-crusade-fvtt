import * as constants from "./constants";
import { PubCrusadeActor } from "./module/PubCrusadeActor";
import { CharacterSystemData } from "./types";

// this is all junk to allow us to start using v10's `.system` property

// /////////////////////////////////////////////////////////////////////////////
// ITEMS

// interface PubCrusadeItemSystem<Type extends string, SystemData>
//   extends PubCrusadeItem {
//   type: Type;
//   system: SystemData;
// }

// /////////////////////////////////////////////////////////////////////////////
// ACTORS

// interface PubCrusadeActorSystem<Type extends string, SystemData>
//   extends PubCrusadeActor {
//   type: Type;
//   system: SystemData;
// }

// export type CharacterActor = PubCrusadeActorSystem<
//   typeof constants.character,
//   CharacterSystemData
// >;

// export function isCharacterActor(actor: Actor | null): actor is CharacterActor {
//   return actor?.type === constants.character;
// }

// export function assertCharacterActor(
//   actor: Actor | null,
// ): asserts actor is CharacterActor {
//   if (!isCharacterActor(actor)) {
//     throw new Error("not a character actor");
//   }
// }

// declare global {
//   var isEmpty: typeof isObjectEmpty; // eslint-disable-line no-var
// }
