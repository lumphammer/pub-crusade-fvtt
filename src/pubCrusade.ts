import * as constants from "./constants";
import { systemLogger } from "./copiedFromInvestigator/functions/utilities";
import { CharacterSheetClass } from "./module/CharacterSheetClass";
import { PubCrusadeActor } from "./module/PubCrusadeActor";
import processedStyles from "./sass/pub-crusade.scss?inline";

// https://foundryvtt.com/article/system-development/

const { HTMLField, StringField, SchemaField, BooleanField, ArrayField } =
  foundry.data.fields;

// https://foundryvtt.com/article/system-data-models/
export const characterDataSchema = {
  title: new StringField(),
  titleDie: new StringField({ initial: "d6" }),
  notes: new HTMLField(),
  order: new StringField(),
  tenet: new StringField(),
  personalQuest: new SchemaField({
    name: new StringField(),
    completed: new BooleanField(),
  }),
  orderQuest: new SchemaField({
    name: new StringField(),
    completed: new BooleanField(),
  }),
  conditions: new ArrayField(
    new SchemaField({
      id: new StringField({ required: true }),
      name: new StringField({ required: true }),
    }),
  ),
  drinks: new ArrayField(
    new SchemaField({
      id: new StringField({ required: true }),
      what: new StringField({ required: true }),
      where: new StringField({ required: true }),
    }),
  ),
};

export type CharacterSchema = typeof characterDataSchema;

export type CharacterSystemData =
  foundry.data.fields.SchemaField.PersistedData<CharacterSchema>;

export class CharacterModel extends foundry.abstract.TypeDataModel<
  CharacterSchema,
  Actor
> {
  static defineSchema(): CharacterSchema {
    return characterDataSchema;
  }

  // printTell() {
  //   console.log(this.tell);
  // }
}

export type CharacterActor = PubCrusadeActor & { system: CharacterModel };

export function isCharacterActor(actor: Actor | null): actor is CharacterActor {
  // @ts-expect-error - this is okay?
  return actor?.type === constants.character;
}

// I'd use a class method for this but https://github.com/microsoft/TypeScript/issues/36931
export function assertCharacterActor(
  actor: Actor | null,
): asserts actor is CharacterActor {
  if (!isCharacterActor(actor)) {
    throw new Error("not a Dictator actor");
  }
}

// Inject CSS
// normal css imports don't work in foundry because the html is loaded from
// foundry itself and vite's css injection never kicks in. So we have to
// import the css as a string and inject it ourselves.
const styleElement = document.createElement("style");
styleElement.innerHTML = processedStyles;
document.head.appendChild(styleElement);

console.log("Pub Crusade loading");

Hooks.once("init", () => {
  systemLogger.log("Initializing");

  // data models
  CONFIG.Actor.dataModels["character"] = CharacterModel;

  // document classes
  CONFIG.Actor.documentClass = PubCrusadeActor;

  // sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(constants.systemId, CharacterSheetClass, {
    makeDefault: true,
    types: [constants.character],
  });
});
