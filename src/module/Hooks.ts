import { warn, error, debug, i18n } from "../foundryvtt-tokeneffects";
import { MODULE_NAME } from "./settings";

import {libWrapper} from './libs/shim.js'
//@ts-ignore
// import { CanvasAnimation } from ''; //TODO CHECK OUT PATH
import { Auras, tokenDrawHandler, tokenOnUpdateHandler } from "./Auras";
import { PointOfVision } from './point-of-vision';
import { getTokenByTokenID } from './helper';

export let readyHooks = async () => {

  // setup all the hooks
  if (game.settings.get(MODULE_NAME, "coloredEffectsEnabled")){

    libWrapper.register(MODULE_NAME, 'Token.prototype._drawOverlay', tokenDrawOverlayHandler, 'WRAPPER');
    libWrapper.register(MODULE_NAME, 'Token.prototype._drawEffect', tokenDrawEffectHandler, 'WRAPPER');

  }

  //libWrapper.register(MODULE_NAME, 'Token.prototype._onUpdate',  commonTokenOnUpdateHandler, 'WRAPPER');

  if (game.settings.get(MODULE_NAME, "aurasEnabled")){

    libWrapper.register(MODULE_NAME, 'Token.prototype.draw', tokenDrawHandler, 'WRAPPER');
    //libWrapper.register(MODULE_NAME, 'Token.prototype.drawAuras', tokenDrawAurasHandler, 'WRAPPER');
    libWrapper.register(MODULE_NAME, 'Token.prototype._onUpdate',  tokenOnUpdateHandler, 'WRAPPER');

  }

  if (game.settings.get(MODULE_NAME, "notokenanimEnabled")){
    libWrapper.register(MODULE_NAME, 'CanvasAnimation.animateLinear', canvasAnimationAnimateLinearHandler, 'WRAPPER');
  }

  if (game.settings.get(MODULE_NAME, "pointOfVisionEnabled")){
    //PointOfVision.init();
    libWrapper.register(MODULE_NAME, 'Token.prototype.getSightOrigin', PointOfVision.tokenPrototypeGetSightOriginHandler, 'WRAPPER');
    //libWrapper.register(MODULE_NAME, 'Token.prototype._onUpdate', PointOfVision.tokenPrototypeUpdateTokenHandler, 'WRAPPER');
  }

  Hooks.on("closeSettingsConfig",  () => {
    if (game.settings.get(MODULE_NAME, "coloredEffectsEnabled")){
      closeSettingsConfigHandler()
    }
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
  });

  Hooks.on("renderTokenConfigPF", (config, html) => {
    PointOfVision.renderTokenConfig(config);
  });

  Hooks.on("preUpdateActor", (actor, updateData) => {
    if (game.settings.get(MODULE_NAME, "sheetToTokenEnabled")){
      if ("img" in updateData) {
          actor.data.token.img = updateData.img;
      }
    }
  });

  Hooks.on("preUpdateToken", (scene, token, updateData, diff) => {
      if (game.settings.get(MODULE_NAME, "sheetToTokenEnabled")){
        if ("actorData" in updateData) {
            if ("img" in updateData.actorData) {
                updateData.img = updateData.actorData.img;
            }
        }
      }
      if (game.settings.get(MODULE_NAME, "pointOfVisionEnabled")){
        PointOfVision.preUpdateToken(scene, token, updateData, diff);
      }
  });

}

export let initHooks = () => {
  warn("Init Hooks processing");
}

// ==============================
// HANDLERS
// ================================

// const commonTokenOnUpdateHandler = async function (wrapped, ...args) {
//   if (game.settings.get(MODULE_NAME, "aurasEnabled")){
//     tokenOnUpdateHandler(wrapped, ...args);
//   }
//   if (game.settings.get(MODULE_NAME, "pointOfVisionEnabled")){
//     PointOfVision.tokenPrototypeUpdateTokenHandler(wrapped, ...args);
//   }
// }

// ==============================
// HANDLERS
// ================================

// ==============================
// COLORED EFFECTS
// ===============================

const closeSettingsConfigHandler = function(){
  let ownedTokens = canvas.getLayer("TokenLayer").ownedTokens;
  for (let t of ownedTokens) {
    t.drawEffects();
  }

}

const tokenDrawOverlayHandler = async function (wrapped, ...args) {
  const [src, tint] = args;
  if ( !src ){
    return;
  }
  let overlayAlpha = game.settings.get(MODULE_NAME, "overlayAlpha");
  let overlayColor = colorStringToHex(game.settings.get(MODULE_NAME, "overlayColor"));
  const tex = await loadTexture(src);
  const icon = new PIXI.Sprite(tex);
  const size = Math.min(this.w * 0.6, this.h * 0.6);
  icon.width = icon.height = size;
  icon.position.set((this.w - size) / 2, (this.h - size) / 2);
  if ( tint ) {
    icon.tint = tint;
    icon.alpha = 0.80;
  }else {
    icon.tint = overlayColor;
    icon.alpha = overlayAlpha;
  }
  this.effects.addChild(icon);
  return wrapped(...args);
}

const tokenDrawEffectHandler = async function (wrapped, ...args) {
  const [src, i, bg, w, tint] = args;
  let statusColor = colorStringToHex(game.settings.get(MODULE_NAME, "statusColor"));
  let statusAlpha = game.settings.get(MODULE_NAME, "statusAlpha");
  let bgColor = colorStringToHex(game.settings.get(MODULE_NAME, "statusBackgroundColor"));
  let bgAlpha = game.settings.get(MODULE_NAME, "statusBackgroundAlpha");
  let bgBorderWidth = game.settings.get(MODULE_NAME, "statusBorderWidth");
  let bgBorderColor = colorStringToHex(game.settings.get(MODULE_NAME, "statusBorderColor"));
  bg.beginFill(bgColor, bgAlpha).lineStyle(bgBorderWidth, bgBorderColor);
  let tex = await loadTexture(src);
  let icon = this.effects.addChild(new PIXI.Sprite(tex));
  icon.width = icon.height = w;
  icon.x = Math.floor(i / 5) * w;
  icon.y = (i % 5) * w;
  if ( tint ) {
    icon.tint = tint;
  }else {
    icon.tint = statusColor;
    icon.alpha = statusAlpha;
  }
  bg.drawRoundedRect(icon.x + 1, icon.y + 1, w - 2, w - 2, 2);
  this.effects.addChild(icon);
  return wrapped(...args);
}

// =============================================
// TOKEN AURA
// =============================================

// const tokenDrawHandler = function (wrapped, ...args) {
// 	//const cached = Token.prototype.draw;
// 	//return function () {
// 		//const p = cached.apply(this, arguments);
//     //cached.apply(this, arguments);
// 		this.auras = this.addChildAt(new PIXI.Container(), 0);
// 		this.drawAurasHandler();
// 		//return p;
//     return wrapped(...args);
// 	//};
// }

// const tokenDrawAurasHandler = function (wrapped, ...args) {
//   const [token] = args;
//   if(!token.auras){
//     token.auras = {};
//   }
//   if(token.auras){
// 	  token.auras.removeChildren().forEach(c => c.destroy());
//   }
// 	const auras = Auras.getAllAuras(token).filter(a => a.distance);
// 	if (auras.length) {
// 		const gfx = token.auras.addChild(new PIXI.Graphics());
// 		const squareGrid = canvas.scene.data.gridType === 1;
// 		const dim = canvas.dimensions;
// 		const unit = dim.size / dim.distance;
// 		const [cx, cy] = [token.w / 2, token.h / 2];
// 		const {width, height} = token.data;

// 		auras.forEach(aura => {
// 			let w, h;

// 			if (aura.square) {
// 				w = aura.distance * 2 + (width * dim.distance);
// 				h = aura.distance * 2 + (height * dim.distance);
// 			} else {
// 				[w, h] = [aura.distance, aura.distance];

// 				if (squareGrid) {
// 					w += width * dim.distance / 2;
// 					h += height * dim.distance / 2;
// 				} else {
// 					w += (width - 1) * dim.distance / 2;
// 					h += (height - 1) * dim.distance / 2;
// 				}
// 			}

// 			w *= unit;
// 			h *= unit;
// 			gfx.beginFill(colorStringToHex(aura.colour), aura.opacity);

// 			if (aura.square) {
// 				const [x, y] = [cx - w / 2, cy - h / 2];
// 				gfx.drawRect(x, y, w, h);
// 			} else {
// 				gfx.drawEllipse(cx, cy, w, h);
// 			}

// 			gfx.endFill();
// 		});
// 	}
//   return wrapped(...args);
// };



// const tokenOnUpdateHandler = function (wrapped, ...args) {
// 	//const cached = Token.prototype['_onUpdate'];
// 	//return function (data) {
// 		//cached.apply(this, arguments);
//     const [data] = args;
// 		const aurasUpdated =
// 			data.flags && data.flags[MODULE_NAME]
// 			&& ['aura1', 'aura2', 'auras']
// 				.some(k => typeof data.flags[MODULE_NAME][k] === 'object');

// 		if (aurasUpdated || String(aurasUpdated)=="true") {
// 			//this.drawAuras();
//       let token = getTokenByTokenID(data._id);
//       tokenDrawAurasHandler(wrapped, token, args);
// 		}
//     return wrapped(...args);
// 	//};
// }

// ===========================================
// NO TOKEN ANIMATION
// =============================================

const canvasAnimationAnimateLinearHandler = function (wrapped, ...args) {
    //const cached = CanvasAnimation.animateLinear;
    //return function (attributes, options:any = {}) {
      const [options] = args;
      if (game.settings.get(MODULE_NAME, "notokenanimEnabled")
        && /Token\.[^.]+\.animateMovement/.test(options.name))
      {
        options.duration = 0;
      }

      //return cached.apply(this, arguments);
      //cached.apply(this, arguments);
      return wrapped(...args);
    //};
}
