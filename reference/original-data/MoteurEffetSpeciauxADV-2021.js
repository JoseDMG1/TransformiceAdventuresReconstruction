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
define(["require", "exports", "../_tfmAdventure/TFMAdventure", "./_mobile/MobileADV", "../../../Souritheque-client/src/outils/Mathematiques"], function (require, exports, TFMAdventure_1, MobileADV_1, Mathematiques_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MoteurEffetSpeciauxADV = (function () {
        function MoteurEffetSpeciauxADV(MONDE) {
            this.monde = MONDE;
        }
        MoteurEffetSpeciauxADV.prototype.afficherEffet = function (MSG) {
            var code = MSG.l16();
            var x = MSG.l16s();
            var y = MSG.l16s();
            var rayon = MSG.l16();
            if (code == 1) {
                var _loop_1 = function (i) {
                    var clip = TFMAdventure_1.default.recupFX(9);
                    clip.pausePendant(i * 30, true);
                    var mobile = new MobileFX(clip, 0.5 + 0.5 * Math.random());
                    clip.declencheurFinAnim(function () {
                        mobile.destructionRequise = true;
                        mobile.visible = false;
                    });
                    var angle = Math.PI * 2 * Math.random();
                    var rayonAlea = rayon * Math.random();
                    mobile.positionServeur.x = mobile.positionVirtuelle.x = x + Mathematiques_1.default.cosRapide(angle) * rayonAlea;
                    mobile.positionServeur.y = mobile.positionVirtuelle.y = y + Mathematiques_1.default.sinRapide(angle) * rayonAlea;
                    this_1.monde.ajouterMobile(mobile);
                };
                var this_1 = this;
                for (var i = 0; i < 15; i++) {
                    _loop_1(i);
                }
                return;
            }
        };
        return MoteurEffetSpeciauxADV;
    }());
    exports.MoteurEffetSpeciauxADV = MoteurEffetSpeciauxADV;
    var MobileFX = (function (_super) {
        __extends(MobileFX, _super);
        function MobileFX(CLIP, ECHELLE) {
            var _this = _super.call(this) || this;
            _this.defCreature(CLIP);
            _this.echelle = ECHELLE;
            _this.creature.scale.set(ECHELLE);
            return _this;
        }
        MobileFX.prototype.boucle = function (TEMPS, DELTA, SECONDE) {
            _super.prototype.boucle.call(this, TEMPS, DELTA, SECONDE);
            this.creature.scale.set(this.echelle);
        };
        return MobileFX;
    }(MobileADV_1.MobileADV));
});
//# sourceMappingURL=MoteurEffetSpeciauxADV.js.map