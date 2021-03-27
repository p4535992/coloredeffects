import { MODULE_NAME } from "./settings";

export const NoTokenAnimation = {
    canvasAnimationAnimateLinearHandler : function (wrapped, ...args) {
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
}