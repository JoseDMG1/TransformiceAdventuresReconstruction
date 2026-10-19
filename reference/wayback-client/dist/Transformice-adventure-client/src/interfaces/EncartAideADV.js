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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/interface/souruis/elements/I_Element"], function (require, exports, I_Conteneur_1, TFMAdventure_1, I_Texte_1, I_Element_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EncartAideADV = (function (_super) {
        __extends(EncartAideADV, _super);
        function EncartAideADV() {
            var _this = _super.call(this, "colonne") || this;
            _this.style.position = "absolute";
            _this.style.right = "0.5em";
            _this.style.bottom = "0.5em";
            _this.afficherFondUni("#000000DD")
                .defLargeurMin("8em")
                .defLargeurMax("15em");
            _this.champTexte = new I_Texte_1.I_Texte().defAlignement("center");
            _this.defCSS({
                border: "2px solid #ffd74f",
            });
            return _this;
        }
        EncartAideADV.afficher = function (INFO) {
            if (!EncartAideADV.instance) {
                EncartAideADV.instance = new EncartAideADV();
            }
            EncartAideADV.instance.initialisation(INFO);
            TFMAdventure_1.default.ajouterInterface(EncartAideADV.instance);
        };
        EncartAideADV.fermer = function (INFO) {
            if (EncartAideADV.instance) {
                if (!INFO || INFO == EncartAideADV.instance.dernierElement) {
                    EncartAideADV.instance.retirer();
                }
            }
        };
        EncartAideADV.prototype.initialisation = function (INFO) {
            if (this.dernierElement) {
                this.dernierElement.retirer();
                this.dernierElement = null;
            }
            if (INFO instanceof I_Element_1.I_Element) {
                this.dernierElement = INFO;
            }
            else {
                this.champTexte.defTexte(INFO);
                this.dernierElement = this.champTexte;
            }
            this.ajouterElement(this.dernierElement);
        };
        return EncartAideADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = EncartAideADV;
});
//# sourceMappingURL=EncartAideADV.js.map