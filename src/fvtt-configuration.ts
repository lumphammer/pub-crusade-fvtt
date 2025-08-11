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
  namespace Hooks {
    interface HookConfig {
      foo: () => void;
      "PopOut:popout": (
        poppedApp: foundry.applications.api.ApplicationV2,
        newWindow: Window,
      ) => void;
      "PopOut:dialog": (
        dialoggedApp: foundry.applications.api.ApplicationV2,
        info: PopOut.DialogHookInfo,
      ) => void;
    }
  }
}

Hooks.once("init", () => {
  systemLogger.log("Initializing");

  // data models
  CONFIG.Actor.dataModels[constants.character] = CharacterModel;

  // document classes
  CONFIG.Actor.documentClass = PubCrusadeActor;

  // sheets
  foundry.documents.collections.Actors.registerSheet(
    constants.systemId,
    CharacterSheetClass,
    {
      makeDefault: true,
      types: [constants.character],
    },
  );
});
