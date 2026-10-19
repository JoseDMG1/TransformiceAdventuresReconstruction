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
define(["require", "exports", "../../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "../../_tfmAdventure/TFMAdventure", "./types/InfoCommuneElement", "../MondeADV", "../../../../Souritheque-client/src/outils/Mathematiques", "../../../../Souritheque-client/src/outils/UtilPIXI"], function (require, exports, ClipAnim_1, TFMAdventure_1, InfoCommuneElement_1, MondeADV_1, Mathematiques_1, UtilPIXI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AplatADV = (function (_super) {
        __extends(AplatADV, _super);
        function AplatADV() {
            var _this = _super.call(this, null) || this;
            _this.estVisible = false;
            _this.infoCommune = new InfoCommuneElement_1.InfoCommuneElement();
            _this.euler.x = Math.PI / 2;
            _this.anchor.set(0.5, 0.5);
            return _this;
        }
        AplatADV.prototype.boucle = function (TEMPS) {
            if (this.infoCommune.typeVent == 2) {
                if (!this.ventAlea) {
                    this.ventAlea = Math.random() * 20000;
                }
                this.scale3d.x = 1 + Mathematiques_1.default.cosRapide((this.ventAlea + TEMPS) / 1000) * 0.05;
                this.scale3d.y = 1 + Mathematiques_1.default.sinRapide((this.ventAlea + TEMPS) / 800) * 0.05;
                this.euler.z = this.infoCommune.rotation + Math.cos((this.ventAlea + TEMPS) / 4000) * 0.1;
                if (this.infoCommune.symetrie) {
                    this.scale3d.x *= -1;
                }
                var valeur = Math.min(Math.max(1.2 + Mathematiques_1.default.sinRapide(TEMPS / 5000), 0.4), 1);
                var rouge = 0x7F + (MondeADV_1.MondeADV.couleurCanopee >> 16 & 0xFF) * valeur;
                var vert = 0x7F + (MondeADV_1.MondeADV.couleurCanopee >> 8 & 0xFF) * valeur;
                var bleu = 0x7F + (MondeADV_1.MondeADV.couleurCanopee & 0xFF) * valeur;
                this.tint = (rouge << 16) | (vert << 8) | bleu;
            }
        };
        AplatADV.prototype.construction = function (IMAGE, POX, POY) {
            this.texture = TFMAdventure_1.default.recupTextureDistante(IMAGE);
            if (POX !== undefined) {
                this.majPosition(POX, POY);
            }
        };
        AplatADV.prototype.rendreCliquable = function (FONCTION, CLIQUE_DROIT) {
            UtilPIXI_1.default.rendreElementCliquable(this, FONCTION, CLIQUE_DROIT);
        };
        AplatADV.prototype.deserialisation = function (MSG) {
            this.identifiantMobile = MSG.l32s();
            this.indexTriage = MSG.l16();
            this.clip = new ClipAnim_1.ClipAnim(MSG);
            this.construction(this.clip.recupLienImageSimple(), MSG.lFloat(), MSG.lFloat());
            this.infoCommune.deserialisation(MSG);
            this.couche = MSG.l8();
            this.euler.z = this.infoCommune.rotation;
            if (this.infoCommune.teinture !== undefined) {
                this.tint = this.infoCommune.teinture;
                this.alpha = this.infoCommune.alpha;
            }
            if (this.infoCommune.symetrie) {
                this.scale3d.x = -1;
            }
        };
        AplatADV.prototype.majPosition = function (X, Y) {
            this.position3d.x = X;
            this.position3d.z = Y;
            this.codeLumiere = (X + Y) * 2;
        };
        return AplatADV;
    }(PIXI.projection.Sprite3d));
    exports.AplatADV = AplatADV;
});
//# sourceMappingURL=AplatADV.js.map