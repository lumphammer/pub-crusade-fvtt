// enabling this rule because ts 5.5.x is having some issues with deep types
// that seem to come out here
/* eslint "@typescript-eslint/explicit-function-return-type": "error" */

import { nanoid } from "nanoid";

import { systemLogger } from "./copiedFromInvestigator/functions/utilities";
import { assertCharacterActor, CharacterModel } from "./character";

export class PubCrusadeActor<
  SubType extends Actor.SubType,
> extends Actor<SubType> {
  setName = (name: string): Promise<this | undefined> => {
    return this.update({ name });
  };

  setTitle = async (title: string): Promise<void> => {
    assertCharacterActor(this);
    await this.update({ system: { title, foo: 5 } });
  };

  setTitleDie = async (titleDie: string): Promise<void> => {
    assertCharacterActor(this);
    await this.update({ system: { titleDie } });
  };

  setOrder = async (order: string): Promise<void> => {
    assertCharacterActor(this);
    await this.update({ system: { order } });
  };

  setTenet = async (tenet: string): Promise<void> => {
    assertCharacterActor(this);
    await this.update({ system: { tenet } });
  };

  setOrderQuestName = async (orderQuestName: string): Promise<void> => {
    assertCharacterActor(this);
    await this.update({
      system: {
        orderQuest: { ...this.system.orderQuest, name: orderQuestName },
      },
    });
  };

  addDrink = async (): Promise<void> => {
    assertCharacterActor(this);
    await this.update({
      system: {
        drinks: [...this.system.drinks, { id: nanoid(), what: "", where: "" }],
      },
    });
  };

  setDrinkWhat = async (id: string, what: string): Promise<void> => {
    assertCharacterActor(this);
    const index = this.system.drinks.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.update({
      system: {
        drinks: [
          ...this.system.drinks.slice(0, index),
          { ...this.system.drinks[index], what },
          ...this.system.drinks.slice(index + 1),
        ],
      },
    });
  };

  setDrinkWhere = async (id: string, where: string): Promise<void> => {
    assertCharacterActor(this);
    const index = this.system.drinks.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.update({
      system: {
        drinks: [
          ...this.system.drinks.slice(0, index),
          { ...this.system.drinks[index], where },
          ...this.system.drinks.slice(index + 1),
        ],
      },
    });
  };

  deleteDrink = async (id: string): Promise<void> => {
    assertCharacterActor(this);
    const index = this.system.drinks.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.update({
      system: {
        drinks: [
          ...this.system.drinks.slice(0, index),
          ...this.system.drinks.slice(index + 1),
        ],
      },
    });
  };

  setOrderQuestCompleted = async (
    orderQuestCompleted: boolean,
  ): Promise<void> => {
    assertCharacterActor(this);
    await this.update({
      system: {
        orderQuest: {
          ...this.system.orderQuest,
          completed: orderQuestCompleted,
        },
      },
    });
  };

  setPersonalQuestName = async (personalQuestName: string): Promise<void> => {
    assertCharacterActor(this);
    await this.update({
      system: {
        personalQuest: {
          ...this.system.personalQuest,
          name: personalQuestName,
        },
      },
    });
  };

  setPersonalQuestCompleted = async (
    personalQuestCompleted: boolean,
  ): Promise<void> => {
    assertCharacterActor(this);
    await this.update({
      system: {
        personalQuest: {
          ...this.system.personalQuest,
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
    assertCharacterActor(this);
    const die = useTitleDie ? this.system.titleDie : "d8";
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
        ? total < this.system.drinks.length ||
          roll.dice[0].results[0].result === 1
        : total > this.system.drinks.length ||
          roll.dice[0].results[0].result === 8;
    const isComplicated = total === this.system.drinks.length;

    const message = isComplicated
      ? "<div class='brilliant-catastrophe'>Brilliant Catastrophe</div>"
      : isSuccess
        ? "<div class='success'>Success</div>"
        : "<div class='failure'>Failure</div>";

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({
        actor: this,
      }),
      content: `
        <div class="pub-crusade-roll">
          <div class="description">
            Tries to roll <span class="low-or-high">${lowOrHigh}</span>
            after <span class="drink-count">${this.system.drinks.length}</span> drinks.
          </div>
          <div class="formula">
            ${roll.formula} = <span class="total">${roll.total}</span>
          </div>
        ${message}
      `,
    });
  };

  addCondition = async (): Promise<void> => {
    assertCharacterActor(this);
    await this.update({
      system: {
        conditions: [...this.system.conditions, { id: nanoid() }],
      },
    });
  };

  setCondition = async (id: string, name: string): Promise<void> => {
    assertCharacterActor(this);
    const index = this.system.conditions.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.update({
      system: {
        conditions: [
          ...this.system.conditions.slice(0, index),
          { ...this.system.conditions[index], name },
          ...this.system.conditions.slice(index + 1),
        ],
      },
    });
  };

  deleteCondition = async (id: string): Promise<void> => {
    assertCharacterActor(this);
    const index = this.system.conditions.findIndex(({ id: i }) => i === id);
    if (index === -1) {
      throw new Error("invalid drink id");
    }
    await this.update({
      system: {
        conditions: [
          ...this.system.conditions.slice(0, index),
          ...this.system.conditions.slice(index + 1),
        ],
      },
    });
  };

  setNotes = async (notes: string): Promise<void> => {
    assertCharacterActor(this);
    await this.update({ system: { notes } });
  };
}
