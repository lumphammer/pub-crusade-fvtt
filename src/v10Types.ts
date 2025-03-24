import { PubCrusadeActor } from "./module/PubCrusadeActor";
import * as constants from "./constants";

const { HTMLField, StringField, SchemaField, BooleanField, ArrayField } =
  foundry.data.fields;

// https://foundryvtt.com/article/system-development/
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
