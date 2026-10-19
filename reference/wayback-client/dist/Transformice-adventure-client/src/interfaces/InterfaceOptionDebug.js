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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_BoutonEtat", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV"], function (require, exports, I_Conteneur_1, I_BoutonEtat_1, TFMAdventure_1, ProtoADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceOptionDebug = (function (_super) {
        __extends(InterfaceOptionDebug, _super);
        function InterfaceOptionDebug() {
            var _this = _super.call(this, "ligne") || this;
            _this.espacement(0);
            _this.centrerAuto("50%", "1em");
            var portee = new I_BoutonEtat_1.I_BoutonEtat("🏹", function (ACTIF) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.activerOptionDebug(1, ACTIF));
            });
            var invincible = new I_BoutonEtat_1.I_BoutonEtat("♻️ ", function (ACTIF) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.activerOptionDebug(2, ACTIF));
            });
            var invulnerable = new I_BoutonEtat_1.I_BoutonEtat("👮‍ ", function (ACTIF) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.activerOptionDebug(3, ACTIF));
            });
            var recuperationComp = new I_BoutonEtat_1.I_BoutonEtat("⚡️", function (ACTIF) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.activerOptionDebug(4, ACTIF));
            });
            _this.ajouterElement(portee, invincible, invulnerable, recuperationComp);
            return _this;
        }
        InterfaceOptionDebug.afficher = function () {
            if (!InterfaceOptionDebug.instance) {
                InterfaceOptionDebug.instance = new InterfaceOptionDebug();
            }
            TFMAdventure_1.default.ajouterInterface(InterfaceOptionDebug.instance);
        };
        InterfaceOptionDebug.fermer = function () {
            if (InterfaceOptionDebug.instance) {
                InterfaceOptionDebug.instance.elementHTML.remove();
            }
        };
        return InterfaceOptionDebug;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceOptionDebug = InterfaceOptionDebug;
});
//# sourceMappingURL=InterfaceOptionDebug.js.map