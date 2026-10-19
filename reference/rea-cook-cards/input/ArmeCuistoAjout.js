var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./ArmeADV"], function (require, exports, ArmeADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArmeCuistoAjout = (function (_super) {
        __extends(ArmeCuistoAjout, _super);
        function ArmeCuistoAjout() {
            return _super.call(this) || this;
        }
        ArmeCuistoAjout.prototype.activation = function () {
            this.mobile.creature.scale.y = 0.9;
            return true;
        };
        return ArmeCuistoAjout;
    }(ArmeADV_1.ArmeADV));
    exports.ArmeCuistoAjout = ArmeCuistoAjout;
    var ArmeCuistoSuppr = (function (_super) {
        __extends(ArmeCuistoSuppr, _super);
        function ArmeCuistoSuppr() {
            return _super.call(this) || this;
        }
        ArmeCuistoSuppr.prototype.activation = function () {
            this.mobile.creature.scale.y = 0.9;
            return true;
        };
        return ArmeCuistoSuppr;
    }(ArmeADV_1.ArmeADV));
    exports.ArmeCuistoSuppr = ArmeCuistoSuppr;
});
//# sourceMappingURL=ArmeCuistoAjout.js.map