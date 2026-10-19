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
define(["require", "exports", "../../../../Souritheque-client/src/outils/limonadmin/Limonadmin", "../../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../EditeurCreature", "../../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../_monde/_mobile/MobileADV", "../../_tfmAdventure/ProtoADV", "../../_tfmAdventure/TFMAdventure", "../../_monde/MondeADV", "../../../../Souritheque-client/src/outils/controles/Clavier"], function (require, exports, Limonadmin_1, I_Conteneur_1, I_ChampTexte_1, I_Image_1, I_Bouton_1, EditeurCreature_1, I_Texte_1, MobileADV_1, ProtoADV_1, TFMAdventure_1, MondeADV_1, Clavier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdminMonstre = (function (_super) {
        __extends(AdminMonstre, _super);
        function AdminMonstre() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdminMonstre.prototype.editerElement = function (ELEMENT) {
            var _this = this;
            var conteneur = new I_Conteneur_1.I_Conteneur();
            conteneur.modeFenetre("Monstre", function () {
                conteneur.elementHTML.remove();
            });
            conteneur.defLargeurMin(300);
            conteneur.centrerAuto();
            var conteneurImage = new I_Conteneur_1.I_Conteneur();
            conteneurImage.flexAlignement("center");
            conteneurImage.margeAuto();
            conteneurImage.defLargeurMax(200);
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
            conteneur.ajouterElement(new I_ChampTexte_1.I_ChampTexte("Comportement").defTexte(ELEMENT.comportement).defChangement(function (TEXTE) {
                ELEMENT.comportement = TEXTE;
            }));
            conteneur.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Hauteur clip nom"));
                LIGNE.ajouterElement(new I_ChampTexte_1.I_ChampTexte("Hauteur clip nom").defTexte(ELEMENT.hauteurClipNom).defChangement(function (TEXTE) {
                    ELEMENT.hauteurClipNom = Number(TEXTE);
                }).etirer());
            });
            conteneur.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Largeur ombre"));
                LIGNE.ajouterElement(new I_ChampTexte_1.I_ChampTexte("").defTexte(ELEMENT.largeurOmbre).defChangement(function (TEXTE) {
                    ELEMENT.largeurOmbre = Number(TEXTE);
                }).etirer());
            });
            conteneur.nouvelleLigne(function (LIGNE) {
                var champSon = new I_ChampTexte_1.I_ChampTexte("Son boucle").defTexte(ELEMENT.sonBoucle).defChangement(function (TEXTE) {
                    ELEMENT.sonBoucle = TEXTE;
                });
                champSon.etirer();
                var champVolume = new I_ChampTexte_1.I_ChampTexte("Volume").defChangement(function (TEXTE) {
                    ELEMENT.volumeSon = TEXTE;
                });
                champVolume.defTexte(ELEMENT.volumeSon ? ELEMENT.volumeSon : "100");
                LIGNE.ajouterElement(champSon, champVolume);
            });
            conteneur.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Son"));
                LIGNE.ajouterElement(new I_ChampTexte_1.I_ChampTexte("Code bibliothèque").defTexte(ELEMENT.bibliothequeSon).defChangement(function (TEXTE) {
                    ELEMENT.bibliothequeSon = parseInt(TEXTE);
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
        AdminMonstre.prototype.recupClipElementListe = function (ELEMENT) {
            var _this = this;
            var conteneur = new I_Conteneur_1.I_Conteneur();
            conteneur.style.position = "relative";
            conteneur.defLargeurMax(100).defHauteurMax(100);
            conteneur.defLargeurMin(100).defHauteurMin(100);
            conteneur.afficherFondUni("#000000" + "50");
            var conteneurImage = this.recupInterfaceClipAnim(ELEMENT.clipAnim);
            conteneur.ajouterElement(conteneurImage);
            conteneurImage.rendreCliquable(function () {
                if (Clavier_1.Clavier.controleEnCours) {
                    var fenetre_1 = new I_Conteneur_1.I_Conteneur();
                    fenetre_1.defLargeurMin(150);
                    fenetre_1.centrerAuto();
                    fenetre_1.afficherFondUni("#000000" + "7F");
                    fenetre_1.ajouterElement(new I_ChampTexte_1.I_ChampTexte("Identifiant").defActionEntree(function (TEXTE) {
                        fenetre_1.elementHTML.remove();
                        ELEMENT.identifiant = parseInt(TEXTE);
                        _this.ajouterModifierElement(ELEMENT);
                    }));
                    fenetre_1.ajouterElement(new I_Bouton_1.I_Bouton("Annuler", function () {
                        fenetre_1.elementHTML.remove();
                    }));
                    TFMAdventure_1.default.ajouterInterface(fenetre_1.elementHTML);
                }
                else {
                    var mobile_1 = new MobileADV_1.MobileADV();
                    mobile_1.defCreature(ELEMENT.clipAnim.cloner());
                    MondeADV_1.MondeADV.instance.defCurseur(mobile_1, function () {
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.spawnMonstre(ELEMENT.identifiant, mobile_1.positionServeur.x, mobile_1.positionServeur.y));
                    });
                }
            });
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
            var equiper = new I_Image_1.I_Image("famfamfam/user.png");
            equiper.style.position = "absolute";
            equiper.style.right = "20px";
            equiper.style.bottom = "2px";
            equiper.rendreCliquable(function () {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.incarnerMonstre(ELEMENT.identifiant));
            });
            conteneur.appendChild(equiper);
            return conteneur;
        };
        return AdminMonstre;
    }(Limonadmin_1.Limonadmin));
    exports.AdminMonstre = AdminMonstre;
});
//# sourceMappingURL=AdminMonstre.js.map