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
    var ArmeBouclier = (function (_super) {
        __extends(ArmeBouclier, _super);
        function ArmeBouclier() {
            var _this = _super.call(this) || this;
            _this.desactivationAuto = -1;
            return _this;
        }
        ArmeBouclier.prototype.activation = function () {
            this.mobile.modeParade(true, this.mainDroite);
            this.mobile.jouerSon("parade1", 0.5);
            return true;
        };
        ArmeBouclier.prototype.boucle = function () {
            _super.prototype.boucle.call(this);
            if (this.mobile.estJoueurPrincipal && !this.clicEnCours && this.mobile.paradeEnCours) {
                this.desactivationInterne();
            }
        };
        ArmeBouclier.prototype.desactivation = function () {
            this.mobile.modeParade(false, this.mainDroite);
        };
        return ArmeBouclier;
    }(ArmeADV_1.ArmeADV));
    exports.ArmeBouclier = ArmeBouclier;
});
//# sourceMappingURL=ArmeBouclier.js.map