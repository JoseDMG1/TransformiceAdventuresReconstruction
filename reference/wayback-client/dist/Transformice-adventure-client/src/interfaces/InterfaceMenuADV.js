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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "./InterfaceOptionsADV", "../_tfmAdventure/TFMAdventure"], function (require, exports, I_Conteneur_1, Trad801_1, I_Bouton_1, InterfaceOptionsADV_1, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceMenuADV = (function (_super) {
        __extends(InterfaceMenuADV, _super);
        function InterfaceMenuADV() {
            var _this = _super.call(this, "colonne") || this;
            _this.defLargeurMin("10em").defLargeurMax("40vw").defHauteurMax("60vh").centrerAuto(0.5, 0.45);
            _this.modeFenetre(Trad801_1.default.trad("$texte.menu"), _this.retirer);
            _this.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$texte.options"), function () {
                InterfaceOptionsADV_1.default.afficher();
            }));
            _this.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.quitter"), function () {
                if (window.electron) {
                    window.quitter();
                }
                else {
                    window.location.reload();
                }
            }));
            return _this;
        }
        InterfaceMenuADV.afficher = function (OUI) {
            if (OUI === void 0) { OUI = true; }
            if (OUI) {
                if (!this.instance) {
                    this.instance = new InterfaceMenuADV();
                }
                TFMAdventure_1.default.instance.coucheInterface.appendChild(this.instance.elementHTML);
            }
            else {
                if (this.instance) {
                    this.instance.elementHTML.remove();
                }
            }
        };
        InterfaceMenuADV.estAffiche = function () {
            return Boolean(InterfaceMenuADV.instance && InterfaceMenuADV.instance.elementHTML.parentNode);
        };
        return InterfaceMenuADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceMenuADV;
});
//# sourceMappingURL=InterfaceMenuADV.js.map