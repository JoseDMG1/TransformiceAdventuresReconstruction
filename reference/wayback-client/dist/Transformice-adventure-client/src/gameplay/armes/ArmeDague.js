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
define(["require", "exports", "./ArmeADV", "../../_tfmAdventure/TFMAdventure", "../../_tfmAdventure/ProtoADV"], function (require, exports, ArmeADV_1, TFMAdventure_1, ProtoADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArmeDague = (function (_super) {
        __extends(ArmeDague, _super);
        function ArmeDague() {
            var _this = _super.call(this) || this;
            _this.desactivationAuto = _this.imageAttaque * 16.6666;
            return _this;
        }
        ArmeDague.prototype.activation = function () {
            this.mobile.animationAttaque(this.codeMain, this.recupCodeAnimAttaque());
            if (this.mobile.estJoueurPrincipal) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.animAttaque(this.mobile.estVersLaDroite, this.codeMain, this.dernierCodeAnim));
            }
            return true;
        };
        ArmeDague.prototype.interruption = function () {
            this.mobile.creature.jouerAnimation("statique", 0, true);
        };
        ArmeDague.prototype.desequipement = function () {
            _super.prototype.desequipement.call(this);
            this.mobile.creature.jouerAnimation("statique", 0, true);
        };
        ArmeDague.prototype.desactivation = function () {
            this.finAttaqueCorpsACorps();
        };
        return ArmeDague;
    }(ArmeADV_1.ArmeADV));
    exports.ArmeDague = ArmeDague;
});
//# sourceMappingURL=ArmeDague.js.map