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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../_tfmAdventure/ConfigADV"], function (require, exports, I_Conteneur_1, I_Texte_1, Trad801_1, ConfigADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceDecoADV = (function (_super) {
        __extends(InterfaceDecoADV, _super);
        function InterfaceDecoADV(PAS_DE_CONNEXION) {
            var _this = _super.call(this) || this;
            _this.modeFenetre("🧀 Transformice Adventures v" + ConfigADV_1.default.VERSION);
            _this.centrerAuto();
            _this.afficherFondCadre()
                .defLargeurMin(200)
                .defLargeurMax("25em")
                .defHauteurMin(100);
            var champ;
            if (PAS_DE_CONNEXION) {
                champ = new I_Texte_1.I_Texte("Transformice Adventures' server has melted or is under maintenance. Sorry, we'll come back soon!");
            }
            else {
                champ = new I_Texte_1.I_Texte(Trad801_1.default.trad("$connexion.interrompue")).defAlignement("center");
                Trad801_1.default.definirTraduction(champ.elementHTML, "$connexion.interrompue");
            }
            champ.defAlignement("center");
            champ.margeAuto();
            _this.ajouterElement(champ);
            return _this;
        }
        InterfaceDecoADV.afficher = function (PAS_DE_CONNEXION) {
            if (!InterfaceDecoADV.instance) {
                InterfaceDecoADV.instance = new InterfaceDecoADV(PAS_DE_CONNEXION);
            }
            document.body.appendChild(InterfaceDecoADV.instance.elementHTML);
        };
        InterfaceDecoADV.fermer = function () {
            if (InterfaceDecoADV.instance) {
                InterfaceDecoADV.instance.elementHTML.remove();
            }
        };
        return InterfaceDecoADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceDecoADV = InterfaceDecoADV;
});
//# sourceMappingURL=InterfaceDecoADV.js.map