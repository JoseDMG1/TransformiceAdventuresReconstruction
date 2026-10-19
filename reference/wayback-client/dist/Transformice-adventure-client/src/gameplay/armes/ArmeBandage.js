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
    var ArmeBandage = (function (_super) {
        __extends(ArmeBandage, _super);
        function ArmeBandage() {
            var _this = _super.call(this) || this;
            _this.tempsIncantation = 1000;
            _this.interruptableEnDeplacement = true;
            return _this;
        }
        ArmeBandage.prototype.incantation = function () {
            this.mobile.creature.jouerAnimation("incantation1", 10, true);
            return true;
        };
        ArmeBandage.prototype.interruption = function () {
            this.mobile.creature.jouerAnimation("statique", 0, true);
        };
        ArmeBandage.prototype.finIncantation = function () {
            this.activationInterne();
        };
        ArmeBandage.prototype.activation = function () {
            this.desactivationAuto = 15 * 16.6666;
            this.mobile.creature.jouerAnimation(this.mainDroite ? "ambi_comp1" : "ambi_compG1", 10, true).animationSuivante("statique");
            return true;
        };
        return ArmeBandage;
    }(ArmeADV_1.ArmeADV));
    exports.ArmeBandage = ArmeBandage;
});
//# sourceMappingURL=ArmeBandage.js.map