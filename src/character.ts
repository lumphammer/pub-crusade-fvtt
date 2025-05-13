import * as constants from "./constants";
import { PubCrusadeActor } from "./PubCrusadeActor";

import UpdateData = foundry.data.fields.SchemaField.UpdateData;
import { nanoid } from "nanoid";

import { systemLogger } from "./copiedFromInvestigator/functions/utilities";

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

interface CharacterActorUpdateData extends Exclude<Actor.UpdateData, "system"> {
  system: UpdateData<typeof characterSchema>;
}

export interface CharacterActor
  extends PubCrusadeActor<typeof constants.character> {
  update: (data: CharacterActorUpdateData) => Promise<this>;
}

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

  setTitle = async (title: string): Promise<void> => {
    assertCharacterActor(this.parent);
    // @ts-expect-error this should error on foo
    await this.parent.update({ system: { title, foo: 5 } });
  };

  setTitleDie = async (titleDie: string): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({ system: { titleDie } });
  };

  setOrder = async (order: string): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({ system: { order } });
  };

  setTenet = async (tenet: string): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({ system: { tenet } });
  };

  setOrderQuestName = async (orderQuestName: string): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({
      system: {
        orderQuest: { ...this.orderQuest, name: orderQuestName },
      },
    });
  };

  addDrink = async (): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({
      system: {
        drinks: [...this.drinks, { id: nanoid(), what: "", where: "" }],
      },
    });
  };

  setDrinkWhat = async (id: string, what: string): Promise<void> => {
    assertCharacterActor(this.parent);
    const index = this.drinks.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.parent.update({
      system: {
        drinks: [
          ...this.drinks.slice(0, index),
          { ...this.drinks[index], what },
          ...this.drinks.slice(index + 1),
        ],
      },
    });
  };

  setDrinkWhere = async (id: string, where: string): Promise<void> => {
    assertCharacterActor(this.parent);
    const index = this.drinks.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.parent.update({
      system: {
        drinks: [
          ...this.drinks.slice(0, index),
          { ...this.drinks[index], where },
          ...this.drinks.slice(index + 1),
        ],
      },
    });
  };

  deleteDrink = async (id: string): Promise<void> => {
    assertCharacterActor(this.parent);
    const index = this.drinks.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.parent.update({
      system: {
        drinks: [
          ...this.drinks.slice(0, index),
          ...this.drinks.slice(index + 1),
        ],
      },
    });
  };

  setOrderQuestCompleted = async (
    orderQuestCompleted: boolean,
  ): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({
      system: {
        orderQuest: {
          ...this.orderQuest,
          completed: orderQuestCompleted,
        },
      },
    });
  };

  setPersonalQuestName = async (personalQuestName: string): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({
      system: {
        personalQuest: {
          ...this.personalQuest,
          name: personalQuestName,
        },
      },
    });
  };

  setPersonalQuestCompleted = async (
    personalQuestCompleted: boolean,
  ): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({
      system: {
        personalQuest: {
          ...this.personalQuest,
          completed: personalQuestCompleted,
        },
      },
    });
  };

  roll = async (
    modifier: number,
    useTitleDie: boolean,
    lowOrHigh: "high" | "low",
  ): Promise<void> => {
    assertCharacterActor(this.parent);
    const die = useTitleDie ? this.titleDie : "d8";
    const rollExpression = `${die} + @modifier`;

    const roll = new Roll(rollExpression, { modifier });
    await roll.evaluate();
    systemLogger.log(roll);
    const total = roll.total;
    if (total === undefined) {
      throw new Error("total is undefined");
    }
    const isSuccess =
      lowOrHigh === "low"
        ? total < this.drinks.length || roll.dice[0].results[0].result === 1
        : total > this.drinks.length || roll.dice[0].results[0].result === 8;
    const isComplicated = total === this.drinks.length;

    const message = isComplicated
      ? "<div class='brilliant-catastrophe'>Brilliant Catastrophe</div>"
      : isSuccess
        ? "<div class='success'>Success</div>"
        : "<div class='failure'>Failure</div>";

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({
        actor: this.parent,
      }),
      content: `
        <div class="pub-crusade-roll">
          <div class="description">
            Tries to roll <span class="low-or-high">${lowOrHigh}</span>
            after <span class="drink-count">${this.drinks.length}</span> drinks.
          </div>
          <div class="formula">
            ${roll.formula} = <span class="total">${roll.total}</span>
          </div>
        ${message}
      `,
    });
  };

  addCondition = async (): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({
      system: {
        conditions: [...this.conditions, { id: nanoid() }],
      },
    });
  };

  setCondition = async (id: string, name: string): Promise<void> => {
    assertCharacterActor(this.parent);
    const index = this.conditions.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.parent.update({
      system: {
        conditions: [
          ...this.conditions.slice(0, index),
          { ...this.conditions[index], name },
          ...this.conditions.slice(index + 1),
        ],
      },
    });
  };

  deleteCondition = async (id: string): Promise<void> => {
    assertCharacterActor(this.parent);
    const index = this.conditions.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.parent.update({
      system: {
        conditions: [
          ...this.conditions.slice(0, index),
          ...this.conditions.slice(index + 1),
        ],
      },
    });
  };

  setNotes = async (notes: string): Promise<void> => {
    assertCharacterActor(this.parent);
    await this.parent.update({ system: { notes } });
  };
}
