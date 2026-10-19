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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../_tfmAdventure/ConfigADV", "../../../Souritheque-client/src/outils/UtilHTML"], function (require, exports, I_Conteneur_1, TFMAdventure_1, I_Image_1, ConfigADV_1, UtilHTML_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceLiensExternesADV = (function (_super) {
        __extends(InterfaceLiensExternesADV, _super);
        function InterfaceLiensExternesADV() {
            var _this = _super.call(this, "ligne") || this;
            _this.defPosition(10, 10);
            _this.ajouterBouton("KS", "https://www.kickstarter.com/projects/atelier801/transformice-adventures");
            _this.ajouterBouton("forum", "https://atelier801.com/section?f=841223&s=2");
            _this.ajouterBouton("discord", "https://discord.gg/tfmadventures");
            _this.ajouterBouton("twitter", "https://twitter.com/TransformiceADV");
            return _this;
        }
        InterfaceLiensExternesADV.prototype.ajouterBouton = function (IMAGE, LIEN) {
            if (LIEN === void 0) { LIEN = null; }
            var bouton = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/bouton-" + IMAGE + ".png");
            if (LIEN) {
                bouton.rendreCliquable(function () {
                    UtilHTML_1.default.ouvrirLien(LIEN);
                });
            }
            this.ajouterElement(bouton);
        };
        InterfaceLiensExternesADV.afficher = function () {
            if (!this.instance) {
                this.instance = new InterfaceLiensExternesADV();
            }
            TFMAdventure_1.default.instance.coucheInterface.appendChild(this.instance.elementHTML);
        };
        return InterfaceLiensExternesADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceLiensExternesADV;
});
//# sourceMappingURL=InterfaceLiensExternesADV.js.map