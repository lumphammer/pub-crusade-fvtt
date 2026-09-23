import { assertGame } from "./utilities";

interface confirmADoodleDoArgs {
  message: string;
  confirmText: string;
  cancelText: string;
  confirmIconClass: string;
}

/**
 * Pop up a foundry confirmation box. Returns a promise that resolves `true`
 * when the user clicks the confirm button.
 * The default behaviour is to not resolve at all if the user clicks `cancel`,
 * sine most commonly you want to just do nothing, but if you specify
 * `resolveFalseOnCancel: true` it will resolve `false` in that case.
 */
export const confirmADoodleDo = ({
  message,
  confirmText,
  cancelText,
  confirmIconClass,
}: confirmADoodleDoArgs) => {
  assertGame(game);
  const promise = new Promise<boolean>((resolve) => {
    const onConfirm = () => {
      resolve(true);
    };
    const onCancel = () => {
      resolve(false);
    };
    const d = new foundry.applications.api.DialogV2({
      window: {
        title: "Confirm",
      },
      content: `<p>${message}</p>`,
      buttons: [
        {
          label: cancelText,
          callback: onCancel,
          icon: "fas fa-ban",
          action: "cancel",
          default: true,
        },
        {
          label: confirmText,
          callback: onConfirm,
          icon: `fas ${confirmIconClass}`,
          action: "confirm",
        },
      ],
    });
    void d.render({ force: true });
  });
  return promise;
};
