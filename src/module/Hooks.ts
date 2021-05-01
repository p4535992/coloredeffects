import { warn, error, debug, i18n } from "../foundryvtt-tokeneffects";
import { MODULE_NAME } from "./settings";

import { Auras } from "./Auras";
import { PointOfVision } from './point-of-vision';
import { getTokenByTokenID } from './helper';
import { SheetToToken } from "./sheetToToken";
import { ColoredEffects } from "./coloredEffects";
import { NoTokenAnimation } from "./noTokenAnimation";
import { TokenVisionAnimationWorld } from "./tokenVisionAnimationWorld";
// import { TokenFactions, TokenFactiosHelper } from "./tokenFactions";
import { FloatingConditions } from './floatingConditions';
import { AlphaControl } from "./alphaControl";

export let readyHooks = async () => {

  // setup all the hooks
  if (game.settings.get(MODULE_NAME, "coloredEffectsEnabled")){
    //@ts-ignore
    libWrapper.register(MODULE_NAME, 'Token.prototype._drawOverlay', ColoredEffects.tokenDrawOverlayHandler, 'WRAPPER');
    //@ts-ignore
    libWrapper.register(MODULE_NAME, 'Token.prototype._drawEffect', ColoredEffects.tokenDrawEffectHandler, 'WRAPPER');

  }

  if (game.settings.get(MODULE_NAME, "aurasEnabled")){
    //@ts-ignore
    libWrapper.register(MODULE_NAME, 'Token.prototype.draw', Auras.tokenDrawHandler, 'WRAPPER');
    // REMOVED
    //libWrapper.register(MODULE_NAME, 'Token.prototype.drawAuras', Auras.tokenDrawAurasHandler, 'WRAPPER');
    //@ts-ignore
    libWrapper.register(MODULE_NAME, 'Token.prototype._onUpdate',  Auras.tokenOnUpdateHandler, 'WRAPPER');

  }

  if (game.settings.get(MODULE_NAME, "notokenanimEnabled")){
    //OLD 0.7.9
    //libWrapper.register(MODULE_NAME, 'CanvasAnimation.animateLinear', NoTokenAnimation.canvasAnimationAnimateLinearHandler, 'WRAPPER');
    //@ts-ignore
    libWrapper.register(MODULE_NAME, 'Token.prototype.animateMovement', NoTokenAnimation.TokenPrototypeAnimateMovementHandler, 'WRAPPER');
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


  Hooks.on('renderTokenConfig', (config, html,data) => {
    if (game.settings.get(MODULE_NAME, "aurasEnabled")){
      Auras.onConfigRender(config, html);
    }
    if (game.settings.get(MODULE_NAME, "pointOfVisionEnabled")){
      PointOfVision.renderTokenConfig(config);
    }
    // if (game.settings.get(MODULE_NAME, "tokenFactionsEnabled")){
    //   TokenFactions.renderTokenConfig(config, html);
    // }
    if (game.settings.get(MODULE_NAME, "alphaControlEnabled")){
      AlphaControl.injectControlAlphaOptions(config, html,data);
    }
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
 
  if (game.settings.get(MODULE_NAME, "alphaControlEnabled")){	
		//@ts-ignore
    libWrapper.register(MODULE_NAME, 'Token.prototype.refresh', AlphaControl.tokenPrototypeRefreshHandler, 'WRAPPER');
    //@ts-ignore
    libWrapper.register(MODULE_NAME, 'Tile.prototype.refresh', AlphaControl.tilePrototypeRefreshHanlder, 'WRAPPER');
    //@ts-ignore
    libWrapper.register(MODULE_NAME, 'TileConfig.prototype._onChangeInput', AlphaControl.tileConfigPrototypeOnChangeInputHandler, 'WRAPPER');
	}

  Hooks.on("renderTileConfig", (config, html,data) => {
    if (game.settings.get(MODULE_NAME, "alphaControlEnabled")){
      AlphaControl.injectControlAlphaOptions(config, html,data);
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