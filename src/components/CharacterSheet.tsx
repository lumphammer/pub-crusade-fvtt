import { loveYaLikeASister } from "../constants";
import { absoluteCover } from "../copiedFromInvestigator/components/absoluteCover";
import { CSSReset } from "../copiedFromInvestigator/components/CSSReset";
import { ImagePickle } from "../copiedFromInvestigator/components/ImagePickle";
import { pubTheme } from "../themes/pubTheme";
import { CharacterActor } from "../v10Types";
import { DrinksCounter } from "./DrinksCounter";
import { Panel } from "./Panel";
import { Roll } from "./Roll";
import { blackboard } from "./styles";
import { Tabs } from "./Tabs";
import { TopBits } from "./TopBits";

interface CharacterSheetProps {
  actor: CharacterActor;
  foundryApplication: ActorSheet;
}

export const CharacterSheet = ({
  actor,
  foundryApplication,
}: CharacterSheetProps) => {
  return (
    <CSSReset
      theme={pubTheme}
      mode="large"
      css={{
        "&&": {
          select: {
            background: pubTheme.colors.backgroundSecondary,
            accentColor: pubTheme.colors.accent,
            option: {
              background: "unset",
              color: "unset",
            },
            ":focus": {
              borderColor: pubTheme.colors.accent,
              outline: "none",
              boxShadow: `0 0 0.5em ${pubTheme.colors.glow}`,
            },
          },
        },
      }}
    >
      <div
        className="css-reset"
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // backgroundColor: "#ecb692",
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
            ...blackboard,
            padding: "0 0 0 0.5em",
            textAlign: "center",
            gridColumn: "2/-1",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            font: loveYaLikeASister.fontFamily,
            fontSize: "4em",
            fontVariant: "small-caps",
            fontWeight: "bold",
            transform: "rotateZ(0.5deg)",
            boxShadow: "0 0 0.2em #fffb",
          }}
        >
          Pub Crusade
        </Panel>
        <TopBits
          actor={actor}
          css={{
            gridColumn: "1/-1",
            gridRow: "top",
            // transform: "rotateZ(-0.5deg)",
          }}
        />
        <Roll
          css={{
            gridColumn: "1/3",
            gridRow: "roll",
            // transform: "rotateZ(0.5deg)",
          }}
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
          css={{
            gridColumn: "5/7",
            gridRow: "roll",
            // transform: "rotateZ(0.5deg)",
          }}
          title="Roll high"
          description="(social, precision, be sensible)"
          actor={actor}
          lowOrHigh="high"
        />
        <div
          css={{
            gridColumn: "1/-1",
            gridRow: "tabs",
            position: "relative",
            // transform: "rotateZ(0.5deg)",
          }}
        >
          <Tabs actor={actor} css={{ gridColumn: "1/-1", gridRow: "tabs" }} />
        </div>
      </div>
    </CSSReset>
  );
};

CharacterSheet.displayName = "CharacterSheet";
