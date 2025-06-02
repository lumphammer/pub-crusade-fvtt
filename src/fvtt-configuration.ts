import { CharacterModel } from "./character";
import * as constants from "./constants";
import { systemLogger } from "./copiedFromInvestigator/functions/utilities";
import { CharacterSheetClass } from "./module/CharacterSheetClass";
import { PubCrusadeActor } from "./PubCrusadeActor";

declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    Actor: {
      character: typeof CharacterModel;
    };
  }
  // https://github.com/League-of-Foundry-Developers/foundry-vtt-types/releases/tag/v12.331.4-beta
  interface DocumentClassConfig {
    Actor: typeof PubCrusadeActor<Actor.SubType>;
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
  Actors.registerSheet(constants.systemId, CharacterSheetClass, {
    makeDefault: true,
    types: [constants.character],
  });
});

function _foo(actor: Actor.Implementation) {
  void actor.setName("");
}
