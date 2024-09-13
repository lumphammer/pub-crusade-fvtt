// enabling this rule because ts 5.5.x is having some issues with deep types
// that seem to come out here
/* eslint "@typescript-eslint/explicit-function-return-type": "error" */

export class PubCrusadeActor extends Actor {
  setName = (name: string): Promise<this | undefined> => {
    return this.update({ name });
  };
}

declare global {
  interface DocumentClassConfig {
    Actor: typeof PubCrusadeActor;
  }
}
