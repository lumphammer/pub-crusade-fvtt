import { CharacterModel } from "./character";
import * as constants from "./constants";
import { systemLogger } from "./copiedFromInvestigator/functions/utilities";
import { CharacterSheetClass } from "./module/CharacterSheetClass";
import { PubCrusadeActor } from "./PubCrusadeActor";

declare global {
  interface DataModelConfig {
    Actor: {
      character: typeof CharacterModel;
    };
  }

  interface DocumentClassConfig {
    Actor: typeof PubCrusadeActor;
  }
}

declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    Actor: typeof PubCrusadeActor<Actor.SubType>; // Make sure to provide your generics here.
  }
  interface ConfiguredActor<SubType extends Actor.SubType> {
    document: PubCrusadeActor<SubType>;
  }
}

Hooks.once("init", () => {
  systemLogger.log("Initializing");

  // data models
  CONFIG.Actor.dataModels[constants.character] = CharacterModel;

  // document classes
  CONFIG.Actor.documentClass = PubCrusadeActor;

  // sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(constants.systemId, CharacterSheetClass, {
    makeDefault: true,
    types: [constants.character],
  });
});
