import { CharacterModel } from "./character";
import { systemLogger } from "./copiedFromInvestigator/functions/utilities";
import { CharacterSheetClass } from "./module/CharacterSheetClass";
import { PubCrusadeActor } from "./PubCrusadeActor";
import * as constants from "./constants";

declare global {
  interface DocumentClassConfig {
    Actor: typeof PubCrusadeActor;
  }
}

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
