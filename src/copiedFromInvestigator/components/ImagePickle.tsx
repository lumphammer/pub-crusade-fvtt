import React, { Fragment, useCallback, useContext, useState } from "react";

import { getTokenizer } from "../functions/getTokenizer";
import { assertGame } from "../functions/utilities";
import { ThemeContext } from "../themes/ThemeContext";
import { ImagePickerLink } from "./ImagePickerLink";

const cover = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
} as const;

const transitionTime = "0.3s";

type ImagePickleProps = {
  subject: Actor | Item;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  application: ActorSheet;
  className?: string;
};

export const ImagePickle: React.FC<ImagePickleProps> = ({
  subject,
  application,
  className,
}: ImagePickleProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const theme = useContext(ThemeContext);
  assertGame(game);
  const user = game.user;
  const myLevel = user ? (subject.getUserLevel(user) ?? 0) : 0;
  // @ts-expect-error types still have DOCUMENT_PERMISSION_LEVELS
  const isOwner = myLevel >= CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;

  const onClickEdit = useCallback(() => {
    setShowOverlay(false);
    assertGame(game);
    const { tokenizerIsActive, tokenizerApi } = getTokenizer();
    const subjectIsActor = subject instanceof Actor;
    // if tokenizer is available and the subject is an actor, use tokenizer
    // see https://github.com/n3dst4/gumshoe-fvtt/issues/706
    if (tokenizerIsActive && tokenizerApi !== undefined && subjectIsActor) {
      tokenizerApi.tokenizeActor(subject);
    } else {
      // You can also launch the filepicker with
      // `application._onEditImage(event)` but 1. we don't care about event
      // objects for the most part, and 2. that way is tightly coupled to the
      // Foundry AppV1 model of imperative updates and does stuff like trying to
      // update the image in the DOM on completion.
      const fp = new FilePicker({
        type: "image",
        current: subject.img ?? undefined,
        callback: (path: string) => {
          void subject.update({
            img: path,
          });
        },
        top: (application.position.top ?? 0) + 40,
        left: (application.position.left ?? 0) + 10,
      });
      return fp.browse(subject.img ?? "");
    }
  }, [application.position.left, application.position.top, subject]);

  const showImage = useCallback(() => {
    const ip = new ImagePopout(subject.img ?? "", {
      title: subject.img,
      shareable: true,
    } as any);
    ip.render(true);
  }, [subject.img]);

  const onClickShow = useCallback(() => {
    setShowOverlay(false);
    showImage();
  }, [showImage]);

  const onClickImage = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      if (isOwner) {
        setShowOverlay(true);
        const clickListener = () => {
          setShowOverlay(false);
        };
        document.addEventListener("click", clickListener);

        return () => {
          document.removeEventListener("click", clickListener);
        };
      } else {
        showImage();
      }
    },
    [isOwner, showImage],
  );

  return (
    <div
      className={className}
      css={{
        borderRadius: "0.2em",
        boxShadow: "0em 0em 0.5em 0.1em rgba(0,0,0,0.5)",
        position: "relative",
      }}
      onClick={(e) => onClickImage(e)}
    >
      <div
        css={{
          ...cover,
          overflow: "hidden",
        }}
      >
        <div
          css={{
            ...cover,
            backgroundImage: `url("${subject.img}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: showOverlay ? "blur(0.7em)" : undefined,
            transition: `filter ${transitionTime} ease-in`,
          }}
        />
      </div>

      <div
        css={{
          ...cover,
          opacity: showOverlay ? 1 : 0,
          transition: `opacity ${transitionTime} ease-in`,
          background: theme.colors.backgroundSecondary,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {showOverlay && (
          <Fragment>
            <ImagePickerLink onClick={onClickShow}>Show</ImagePickerLink>
            <ImagePickerLink onClick={onClickEdit}>Edit</ImagePickerLink>
          </Fragment>
        )}
      </div>
    </div>
  );
};
