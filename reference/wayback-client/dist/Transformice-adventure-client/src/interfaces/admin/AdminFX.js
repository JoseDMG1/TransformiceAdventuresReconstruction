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
define(["require", "exports", "../../../../Souritheque-client/src/outils/limonadmin/Limonadmin", "../../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../EditeurCreature", "../../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../../Souritheque-client/src/interface/souruis/elements/I_BoutonEtat", "../../_tfmAdventure/TFMAdventure"], function (require, exports, Limonadmin_1, I_Conteneur_1, I_ChampTexte_1, I_Image_1, I_Bouton_1, EditeurCreature_1, I_Texte_1, I_BoutonEtat_1, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdminFX = (function (_super) {
        __extends(AdminFX, _super);
        function AdminFX() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdminFX.prototype.editerElement = function (ELEMENT) {
            var _this = this;
            var conteneur = new I_Conteneur_1.I_Conteneur();
            conteneur.modeFenetre("FX", function () {
                conteneur.elementHTML.remove();
            });
            conteneur.defLargeurMin(300);
            conteneur.centrerAuto();
            var conteneurImage = new I_Conteneur_1.I_Conteneur();
            conteneurImage.flexAlignement("center");
            conteneurImage.margeAuto();
            conteneurImage.defLargeurMax(400);
            conteneur.ajouterElement(conteneurImage);
            conteneur.ajouterElement(new I_Bouton_1.I_Bouton("Apparence", function () {
                EditeurCreature_1.EditeurCreature.afficher(ELEMENT ? ELEMENT.clipAnim : null, function (CLIP) {
                    ELEMENT.clipAnim = CLIP;
                    conteneurImage.vider();
                    conteneurImage.appendChild(_this.recupInterfaceClipAnim(ELEMENT.clipAnim));
                });
            }));
            if (ELEMENT) {
                conteneur.ajouterElement(new I_Bouton_1.I_Bouton("Supprimer", function () {
                    conteneur.elementHTML.remove();
                    _this.supprimerElement(ELEMENT);
                }).ajouterIcone(new I_Image_1.I_Image("famfamfam/cancel.png")));
            }
            conteneur.ajouterElement(new I_ChampTexte_1.I_ChampTexte("Catégorie").defTexte(ELEMENT.categorie).defChangement(function (TEXTE) {
                ELEMENT.categorie = TEXTE;
            }));
            conteneur.ajouterElement(new I_BoutonEtat_1.I_BoutonEtat("Orientable", function (ACTIF) {
                ELEMENT.orientable = ACTIF;
            }).cocher(ELEMENT ? ELEMENT.orientable : false));
            var conteneurEtirement = conteneur.nouvelleColonne();
            conteneurEtirement.afficherFondUni("#000000" + "80");
            conteneurEtirement.ajouterElement(new I_BoutonEtat_1.I_BoutonEtat("Étirable", function (ACTIF) {
                ELEMENT.etirable = ACTIF;
            }).cocher(ELEMENT ? ELEMENT.etirable : false));
            conteneurEtirement.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Décalage étirement"));
                LIGNE.ajouterElement(new I_ChampTexte_1.I_ChampTexte("").defTexte(ELEMENT.decalageEtirement).defChangement(function (TEXTE) {
                    ELEMENT.decalageEtirement = Number(TEXTE);
                }).etirer());
            });
            conteneurEtirement.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Largeur"));
                LIGNE.ajouterElement(new I_ChampTexte_1.I_ChampTexte("").defTexte(ELEMENT.largeur).defChangement(function (TEXTE) {
                    ELEMENT.largeur = Number(TEXTE);
                }).etirer());
            });
            conteneur.ajouterElement(new I_Bouton_1.I_Bouton("Valider", function () {
                conteneur.elementHTML.remove();
                _this.ajouterModifierElement(ELEMENT);
            }));
            conteneur.ajouterElement(new I_Bouton_1.I_Bouton("Annuler", function () {
                conteneur.elementHTML.remove();
            }));
            TFMAdventure_1.default.ajouterInterface(conteneur.elementHTML);
        };
        AdminFX.prototype.recupClipElementListe = function (ELEMENT) {
            var _this = this;
            var conteneur = new I_Conteneur_1.I_Conteneur();
            conteneur.defLargeurMax(100).defHauteurMax(100);
            conteneur.defLargeurMin(100).defHauteurMin(100);
            conteneur.afficherFondUni("#000000" + "50");
            conteneur.ajouterElement(this.recupInterfaceClipAnim(ELEMENT.clipAnim));
            conteneur.style.position = "relative";
            var texteId = new I_Texte_1.I_Texte(ELEMENT.identifiant);
            texteId.style.position = "absolute";
            texteId.style.left = "4px";
            texteId.style.top = "2px";
            conteneur.appendChild(texteId);
            var crayon = new I_Image_1.I_Image("famfamfam/picture_edit.png");
            crayon.style.position = "absolute";
            crayon.style.right = "2px";
            crayon.style.bottom = "2px";
            crayon.rendreCliquable(function () {
                _this.editerElement(ELEMENT);
            });
            conteneur.appendChild(crayon);
            return conteneur;
        };
        return AdminFX;
    }(Limonadmin_1.Limonadmin));
    exports.AdminFX = AdminFX;
});
//# sourceMappingURL=AdminFX.js.map