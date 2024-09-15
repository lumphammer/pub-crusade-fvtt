import React from "react";

import { absoluteCover } from "../copiedFromInvestigator/components/absoluteCover";
import { CSSReset } from "../copiedFromInvestigator/components/CSSReset";
import { ImagePickle } from "../copiedFromInvestigator/components/ImagePickle";
import { loveYaLikeASister } from "../copiedFromInvestigator/themes/constants";
import { pubTheme } from "../copiedFromInvestigator/themes/pubTheme";
import { CharacterActor } from "../v10Types";
import { DrinksCounter } from "./DrinksCounter";
import { Panel } from "./Panel";
import { Roll } from "./Roll";
import { Tabs } from "./Tabs";
import { TopBits } from "./TopBits";

interface CharacterSheetProps {
  actor: CharacterActor;
  foundryApplication: ActorSheet;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({
  actor,
  foundryApplication,
}) => {
  return (
    <CSSReset theme={pubTheme} mode="large">
      <div
        className="css-reset"
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // backgroundColor: "#ecb692",
          backgroundColor: "#dbb9a2",
          padding: "1em",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows:
            "min-content [top] min-content [roll] min-content [tabs] 1fr [end]",
          rowGap: "0.5em",
          columnGap: "0.5em",
        }}
      >
        <div
          css={{
            gridColumn: "1/2",
            display: "flex",
            flexDirection: "row",
            position: "relative",
          }}
        >
          <ImagePickle
            subject={actor}
            application={foundryApplication}
            css={{ ...absoluteCover, transform: "rotateZ(-2deg)" }}
          />
        </div>
        <Panel
          css={{
            padding: "0 0 0 0.5em",
            background: `
              radial-gradient(closest-side, #fff3 0%, #fff0 100%),
              linear-gradient(180deg, #444 0%, #000 100%)`,
            boxShadow: "0 0 1em 0 #fff3 inset",
            borderStyle: "solid",
            borderWidth: "4px",
            borderRadius: "0.1em",
            borderColor: "#111 #666 #666 #111",
            textShadow: "0 0 0.5em #aaa",
            transform: "rotateZ(0.5deg)",
            color: "#eee",
            textAlign: "center",
            gridColumn: "2/-1",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            font: loveYaLikeASister.fontFamily,
            fontSize: "4em",
            fontVariant: "small-caps",
            fontWeight: "bold",
          }}
        >
          Pub Crusade
        </Panel>
        <TopBits actor={actor} css={{ gridColumn: "1/-1", gridRow: "top" }} />
        <Roll
          css={{ gridColumn: "1/3", gridRow: "roll" }}
          title="Roll low"
          description="(violence, escalation, tomfoolery)"
          actor={actor}
          lowOrHigh="low"
        />
        <DrinksCounter
          actor={actor}
          css={{ gridColumn: "3/5", gridRow: "roll" }}
        />
        <Roll
          css={{ gridColumn: "5/7", gridRow: "roll" }}
          title="Roll high"
          description="(social, precision, be sensible)"
          actor={actor}
          lowOrHigh="high"
        />
        <div
          css={{ gridColumn: "1/-1", gridRow: "tabs", position: "relative" }}
        >
          <Tabs actor={actor} css={{ gridColumn: "1/-1", gridRow: "tabs" }} />
        </div>
      </div>
    </CSSReset>
  );
};

CharacterSheet.displayName = "CharacterSheet";
