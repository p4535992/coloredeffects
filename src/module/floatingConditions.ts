import { MODULE_NAME } from "./settings";
import { getCanvas } from './settings';

export const FloatingConditions = (() => {
    /* ---- private methods and fields ---- */

    const MODULE = MODULE_NAME;//'floating-conditions';

    const ENABLED_CONDITIONS:any[] = [
      'blinded',
      'charmed',
      'concentrating',
      'confused',
      'deafened',
      'frightened',
      'grappled',
      'incapacitated',
      'invisible',
      'paralyzed',
      'poisoned',
      'prone',
      'restrained',
      'stunned',
      'unconscious',
    ];

    const conditionTextures = {};

    const tokenFromId = (id) => {
      const tokens = getCanvas().tokens.placeables;

      return tokens.find((token) => token.data._id === id);
    };

    const clearFloatingConditions = (token) => {
      if (token.floatingConditions) token.floatingConditions.destroy();

      token.floatingConditions = token.addChildAt(
        new PIXI.Container(),
        token.getChildIndex(token.icon) + 1,
      );
    };

    const renderFloatingConditions = (token) => {
      const tokenItems = token?.actor?.items || [];
      const conditions = tokenItems
        .filter((item) => item.type === 'condition')
        .map((item) => item.name.toLowerCase());

      for (const condition of conditions) {
        if (ENABLED_CONDITIONS.includes(condition)) {
          const image = new PIXI.Sprite(conditionTextures[condition]);
          image.anchor.set(0.0, 0.0);
          image.width = getCanvas().grid.grid.w;
          image.height = getCanvas().grid.grid.h;
          token.floatingConditions.addChild(image);
        }
      }
    };

    const drawFloatingConditions = (token) => {
      if (token) {
        clearFloatingConditions(token);
        renderFloatingConditions(token);
      }
    };

    const loadTextures = async () => {
      for (const condition of ENABLED_CONDITIONS) {
        conditionTextures[condition] = await loadTexture(
          `modules/${MODULE}/assets/conditions/${condition}.png`,
        );
      }
    };

    /* ---- public API ---- */

    return class FloatingConditions {
      static async onInit() {
        await loadTextures();
      }

      static onCreateToken(scene, tokenData) {
        drawFloatingConditions(tokenFromId(tokenData._id));
      }

      static onUpdateToken(scene, tokenData) {
        drawFloatingConditions(tokenFromId(tokenData._id));
      }
    };
  })();

//   Hooks.once('init', FloatingConditions.onInit);

//   Hooks.on('createToken', FloatingConditions.onCreateToken);
//   Hooks.on('updateToken', FloatingConditions.onUpdateToken);
