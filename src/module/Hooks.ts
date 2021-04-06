import { warn, error, debug, i18n } from "../foundryvtt-tokeneffects";
import { MODULE_NAME } from "./settings";

import {libWrapper} from './libs/shim.js'
//@ts-ignore
// import { CanvasAnimation } from ''; //TODO CHECK OUT PATH
import { Auras, tokenDrawHandler, tokenOnUpdateHandler } from "./Auras";
import { PointOfVision } from './point-of-vision';
import { getTokenByTokenID } from './helper';
import { SheetToToken } from "./sheetToToken";
import { ColoredEffects } from "./coloredEffects";
import { NoTokenAnimation } from "./noTokenAnimation";
import { TokenVisionAnimationWorld } from "./tokenVisionAnimationWorld";
// import { TokenFactions, TokenFactiosHelper } from "./tokenFactions";
import { FloatingConditions } from './floatingConditions';

export let readyHooks = async () => {

  // setup all the hooks
  if (game.settings.get(MODULE_NAME, "coloredEffectsEnabled")){

    libWrapper.register(MODULE_NAME, 'Token.prototype._drawOverlay', ColoredEffects.tokenDrawOverlayHandler, 'WRAPPER');
    libWrapper.register(MODULE_NAME, 'Token.prototype._drawEffect', ColoredEffects.tokenDrawEffectHandler, 'WRAPPER');

  }

  if (game.settings.get(MODULE_NAME, "aurasEnabled")){

    libWrapper.register(MODULE_NAME, 'Token.prototype.draw', Auras.tokenDrawHandler, 'WRAPPER');
    //libWrapper.register(MODULE_NAME, 'Token.prototype.drawAuras', Auras.tokenDrawAurasHandler, 'WRAPPER');
    libWrapper.register(MODULE_NAME, 'Token.prototype._onUpdate',  Auras.tokenOnUpdateHandler, 'WRAPPER');

  }

  if (game.settings.get(MODULE_NAME, "notokenanimEnabled")){
    libWrapper.register(MODULE_NAME, 'CanvasAnimation.animateLinear', NoTokenAnimation.canvasAnimationAnimateLinearHandler, 'WRAPPER');
  }

  Hooks.on("closeSettingsConfig",  (token) => {
    if (game.settings.get(MODULE_NAME, "coloredEffectsEnabled")){
      ColoredEffects.closeSettingsConfigHandler()
    }
    // if (game.settings.get(MODULE_NAME, "tokenFactionsEnabled")){
    //   TokenFactions.updateTokens(token);
    // }
   
  });

  // if (game.settings.get(MODULE_NAME, "notokenanimEnabled")){
  //   CanvasAnimation.animateLinear = (function () {
  //     const cached = CanvasAnimation.animateLinear;
  //     return function (attributes, options:any = {}) {
  //       if (game.settings.get(MODULE_NAME, "notokenanimEnabled")
  //         && /Token\.[^.]+\.animateMovement/.test(options.name))
  //       {
  //         options.duration = 0;
  //       }

  //       return cached.apply(this, arguments);
  //     };
  //   })();
  // }


  Hooks.on('renderTokenConfig', (config, html) => {
    if (game.settings.get(MODULE_NAME, "aurasEnabled")){
      Auras.onConfigRender(config, html);
    }
    if (game.settings.get(MODULE_NAME, "pointOfVisionEnabled")){
      PointOfVision.renderTokenConfig(config);
    }
    // if (game.settings.get(MODULE_NAME, "tokenFactionsEnabled")){
    //   TokenFactions.renderTokenConfig(config, html);
    // }
  });

  Hooks.on("renderTokenConfigPF", (config, html) => {
    PointOfVision.renderTokenConfig(config);
  });

  Hooks.on("preUpdateActor", (actor, updateData) => {
    if (game.settings.get(MODULE_NAME, "sheetToTokenEnabled")){
      SheetToToken.preUpdateActorHandler(actor, updateData);
    }
  });

  Hooks.on("preUpdateToken", (scene, token, updateData, diff) => {
      if (game.settings.get(MODULE_NAME, "sheetToTokenEnabled")){
        SheetToToken.preUpdateTokenHandler(updateData);       
      }
      if (game.settings.get(MODULE_NAME, "pointOfVisionEnabled")){
        PointOfVision.preUpdateToken(scene, token, updateData, diff); // TODO TO CHECK
      }
  });

  if (game.settings.get(MODULE_NAME, "pointOfVisionEnabled")){
    // TODO TO CHECK
		//libWrapper.register(MODULE_NAME, 'Token.prototype.getSightOrigin', PointOfVision.tokenPrototypeGetSightOriginHandler, 'WRAPPER');
		//libWrapper.register(MODULE_NAME, 'Token.prototype._onUpdate', PointOfVision.tokenPrototypeUpdateTokenHandler, 'WRAPPER');
	}

	Hooks.on("updateToken", (scene, token, updateData, diff) => {
		if (game.settings.get(MODULE_NAME, "pointOfVisionEnabled")){
			PointOfVision.tokenPrototypeUpdateTokenHandler(token, updateData); // TODO TO CHECK
		}
    if (game.settings.get(MODULE_NAME, "floatingConditionsEnabled")){
      FloatingConditions.onUpdateToken(scene, token);
    }
	});

  if (game.settings.get(MODULE_NAME, "tokenVisionAnimationWorldEnabled")){
    TokenVisionAnimationWorld.readyOnceHandler();
  }

  // if (game.settings.get(MODULE_NAME, "tokenFactionsEnabled")){	
	// 	libWrapper.register(MODULE_NAME, 'Token.prototype.refresh', TokenFactiosHelper.tokenRefreshHandler, 'WRAPPER');
	// }
  
  Hooks.on('renderSettingsConfig', (sheet, html) => {
    // if (game.settings.get(MODULE_NAME, "tokenFactionsEnabled")){
    //   TokenFactions.renderSettingsConfig(sheet, html);
    // }
  });

  Hooks.on('updateActor', (tokenData) => {
    // if (game.settings.get(MODULE_NAME, "tokenFactionsEnabled")){
    //   TokenFactions.updateTokens(tokenData);
    // }
  });

  Hooks.on('updateFolder', (tokenData) => {
    // if (game.settings.get(MODULE_NAME, "tokenFactionsEnabled")){
    //   TokenFactions.updateTokens(tokenData);
    // }
  });

  Hooks.on('createToken', (scene, tokenData) => {
    if (game.settings.get(MODULE_NAME, "floatingConditionsEnabled")){
      FloatingConditions.onCreateToken(scene, tokenData);
    }
  });
 



}

export let initHooks = () => {
  warn("Init Hooks processing");

  if (game.settings.get(MODULE_NAME, "pointOfVisionEnabled")){
    // PointOfVision.init();
  }
  
  // if (game.settings.get(MODULE_NAME, "tokenFactionsEnabled")){
  //   TokenFactions.onInit();
  // }

  if (game.settings.get(MODULE_NAME, "floatingConditionsEnabled")){
    FloatingConditions.onInit();
  }


}