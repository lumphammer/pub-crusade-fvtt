import * as constants from "./constants";
import { PubCrusadeActor } from "./PubCrusadeActor";

const { HTMLField, StringField, SchemaField, BooleanField, ArrayField } =
  foundry.data.fields;

// https://foundryvtt.com/article/system-development/
// https://foundryvtt.com/article/system-data-models/
export const characterSchema = {
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

export type CharacterActor = PubCrusadeActor<typeof constants.character>;

export function isCharacterActor(
  actor: Actor.Implementation | null,
): actor is CharacterActor {
  return actor?.type === constants.character;
}

// I'd use a class method for this but https://github.com/microsoft/TypeScript/issues/36931
export function assertCharacterActor(
  actor: Actor.Implementation | null,
): asserts actor is CharacterActor {
  if (!isCharacterActor(actor)) {
    throw new Error("not a Dictator actor");
  }
}

export class CharacterModel extends foundry.abstract.TypeDataModel<
  typeof characterSchema,
  PubCrusadeActor<"character">
> {
  static defineSchema(): typeof characterSchema {
    return characterSchema;
  }

  setName = (name: string) => {
    return this.parent.update({ name });
  };

  setTitle = async (title: string) => {
    await this.parent.update({
      system: {
        title,
      },
    });
  };
}
