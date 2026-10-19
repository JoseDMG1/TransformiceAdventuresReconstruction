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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte"], function (require, exports, I_Conteneur_1, Trad801_1, I_Bouton_1, TFMAdventure_1, ProtoADV_1, I_Texte_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceSortieDonjonADV = (function (_super) {
        __extends(InterfaceSortieDonjonADV, _super);
        function InterfaceSortieDonjonADV(TERMINE, GAGNE) {
            var _this = _super.call(this, "ligne") || this;
            if (!TERMINE) {
                _this.modeFenetre(Trad801_1.default.trad("$DonjonSortir"), function () {
                    InterfaceSortieDonjonADV.fermer();
                });
            }
            if (!GAGNE) {
                _this.modeFenetre(Trad801_1.default.trad("$DonjonPerdu"));
            }
            else {
                _this.modeFenetre(Trad801_1.default.trad("$DonjonTermine"));
            }
            _this.defLargeur(300);
            _this.centrerAuto(0.5, 0.1);
            _this.etirerContenu();
            var bouton = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$Sortir"), function () {
                if (TERMINE) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeSortieDonjon());
                    InterfaceSortieDonjonADV.fermer();
                }
                else {
                    var popup_1 = new I_Conteneur_1.I_Conteneur("colonne");
                    popup_1.defLargeur(500);
                    popup_1.modeFenetre(Trad801_1.default.trad("$DonjonSortir"), function () {
                        if (popup_1.elementHTML) {
                            popup_1.elementHTML.remove();
                        }
                        InterfaceSortieDonjonADV.fermer();
                    });
                    popup_1.centrerAuto();
                    var texte = new I_Texte_1.I_Texte(Trad801_1.default.trad("$ConfirmationSortirDonjon"));
                    texte.multiligne(true);
                    texte.defLargeur(500);
                    texte.defAlignement("justify");
                    popup_1.ajouterElement(texte);
                    popup_1.nouvelleLigne(function (LIGNE) {
                        var boutonOui = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$Oui"), function () {
                            if (popup_1.elementHTML) {
                                popup_1.elementHTML.remove();
                            }
                            TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeSortieDonjon());
                            InterfaceSortieDonjonADV.fermer();
                        });
                        boutonOui.style.flexGrow = "1";
                        var boutonNon = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$Non"), function () {
                            if (popup_1.elementHTML) {
                                popup_1.elementHTML.remove();
                            }
                        });
                        boutonNon.style.flexGrow = "1";
                        LIGNE.ajouterElement(boutonOui, boutonNon);
                    });
                    popup_1.etirerContenu();
                    TFMAdventure_1.default.ajouterInterface(popup_1.elementHTML);
                }
            });
            _this.ajouterElement(bouton);
            return _this;
        }
        InterfaceSortieDonjonADV.afficher = function (TERMINE, GAGNE) {
            if (InterfaceSortieDonjonADV.instance) {
                this.fermer();
            }
            InterfaceSortieDonjonADV.instance = new InterfaceSortieDonjonADV(TERMINE, GAGNE);
            TFMAdventure_1.default.ajouterInterface(InterfaceSortieDonjonADV.instance.elementHTML);
        };
        InterfaceSortieDonjonADV.fermer = function () {
            if (InterfaceSortieDonjonADV.instance.elementHTML != null) {
                InterfaceSortieDonjonADV.instance.elementHTML.remove();
            }
        };
        return InterfaceSortieDonjonADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceSortieDonjonADV = InterfaceSortieDonjonADV;
});
//# sourceMappingURL=InterfaceSortieDonjonADV.js.map