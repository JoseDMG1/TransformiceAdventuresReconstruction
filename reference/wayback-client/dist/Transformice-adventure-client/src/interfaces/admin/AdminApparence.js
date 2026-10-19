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
define(["require", "exports", "../../../../Souritheque-client/src/outils/limonadmin/Limonadmin", "../../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../_tfmAdventure/ProtoADV", "../../_tfmAdventure/TFMAdventure", "../../../../Souritheque-client/src/interface/souruis/elements/I_BoutonEtat", "../../../../Souritheque-client/src/outils/affichage/animation/Look", "../../../../Souritheque-client/src/interface/souruis/elements/I_ImagePixi"], function (require, exports, Limonadmin_1, I_Conteneur_1, I_ChampTexte_1, I_Image_1, I_Bouton_1, I_Texte_1, ProtoADV_1, TFMAdventure_1, I_BoutonEtat_1, Look_1, I_ImagePixi_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdminApparence = (function (_super) {
        __extends(AdminApparence, _super);
        function AdminApparence() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.indexEquipementTest = {};
            _this.listeImagePixi = [];
            return _this;
        }
        AdminApparence.prototype.editerElement = function (ELEMENT) {
            InterfaceEquipement.afficher(ELEMENT, this);
        };
        AdminApparence.prototype.changementCategorie = function () {
            for (var _i = 0, _a = this.listeImagePixi; _i < _a.length; _i++) {
                var image = _a[_i];
                image.detruire();
            }
            this.listeImagePixi = [];
        };
        AdminApparence.prototype.recupClipElementListe = function (ELEMENT) {
            var _this = this;
            var conteneur = new I_Conteneur_1.I_Conteneur();
            conteneur.style.position = "relative";
            conteneur.defLargeur(100).defHauteur(100);
            conteneur.afficherFondUni("#000000" + "80");
            var clipAnim = TFMAdventure_1.default.indexMonstre[2].cloner();
            clipAnim.jouerAnimation("statique");
            clipAnim.ajouterElementLook(this.indexElement[2].elementLook);
            clipAnim.ajouterElementLook(ELEMENT.elementLook);
            clipAnim.stop(0);
            var imagePixi = new I_ImagePixi_1.I_ImagePixi(100, 100);
            imagePixi.activerSouris(true);
            imagePixi.style.borderRadius = "10px";
            imagePixi.style.backgroundColor = "#000000" + "50";
            imagePixi.margeAuto();
            imagePixi.ajouterBoucle(function () {
            });
            imagePixi.scene.addChild(clipAnim);
            conteneur.ajouterElement(imagePixi);
            clipAnim.position.set(100 / 2, 100 * 0.95);
            this.listeImagePixi.push(imagePixi);
            var texteId = new I_Texte_1.I_Texte(ELEMENT.elementLook.identifiant);
            texteId.style.position = "absolute";
            texteId.style.right = "2px";
            texteId.style.top = "2px";
            conteneur.appendChild(texteId);
            var conteneurOption = new I_Conteneur_1.I_Conteneur();
            conteneurOption.espacement(0);
            conteneurOption.style.position = "absolute";
            conteneurOption.style.right = "2px";
            conteneurOption.style.bottom = "2px";
            conteneurOption.modeLigne(true, true);
            var btnEditer = new I_Texte_1.I_Texte("✏️");
            btnEditer.rendreCliquable(function () {
                InterfaceEquipement.afficher(ELEMENT, _this);
            });
            var btnEquiper = new I_BoutonEtat_1.I_BoutonEtat("", function (ACTIF) {
                if (ACTIF) {
                    _this.indexEquipementTest[ELEMENT.elementLook.identifiant] = true;
                }
                else {
                    delete _this.indexEquipementTest[ELEMENT.elementLook.identifiant];
                }
                var liste = [];
                for (var code in _this.indexEquipementTest) {
                    liste.push(code);
                }
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.equiperEquipement(liste));
            });
            btnEquiper.cocher(this.indexEquipementTest[ELEMENT.elementLook.identifiant]);
            conteneurOption.ajouterElement(btnEditer, btnEquiper);
            conteneur.appendChild(conteneurOption);
            return conteneur;
        };
        AdminApparence.prototype.recupLargeur = function () {
            return 430;
        };
        AdminApparence.prototype.trierElement = function (LISTE) {
            LISTE.sort(function (E1, E2) {
                return E1.nom < E2.nom ? 1 : -1;
            });
        };
        return AdminApparence;
    }(Limonadmin_1.Limonadmin));
    exports.AdminApparence = AdminApparence;
    var InterfaceEquipement = (function (_super) {
        __extends(InterfaceEquipement, _super);
        function InterfaceEquipement(ADMIN) {
            var _this = _super.call(this) || this;
            _this.admin = ADMIN;
            _this.modeFenetre("Apparence", InterfaceEquipement.fermer);
            _this.defLargeurMin(400);
            _this.centrerAuto();
            _this.champNom = new I_ChampTexte_1.I_ChampTexte("Nom");
            _this.champNom.etirer(2);
            _this.champNom.defChangement(function (TEXTE) {
                _this.infoApparence.nom = TEXTE;
            });
            _this.ajouterElement(_this.champNom);
            _this.champIdentifiant = new I_ChampTexte_1.I_ChampTexte("Identifiant");
            _this.champIdentifiant.etirer();
            _this.champIdentifiant.defChangement(function (TEXTE) {
                _this.infoApparence.elementLook.identifiant = parseInt(TEXTE);
            });
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.alignementEnfants("center");
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Identifiant"), _this.champIdentifiant);
            });
            _this.nouvelleLigne(function (LIGNE) {
                _this.champOrdre = new I_ChampTexte_1.I_ChampTexte("-125...125");
                _this.champOrdre.etirer(2);
                _this.champOrdre.defChangement(function (TEXTE) {
                    var valeur = parseInt(TEXTE);
                    _this.infoApparence.elementLook.ordre = Math.min(Math.max(valeur, -125), 125);
                });
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Ordre d'affichage"), _this.champOrdre);
            });
            _this.champCategorie = new I_ChampTexte_1.I_ChampTexte("Catégorie").defChangement(function (TEXTE) {
                _this.infoApparence.categorie = TEXTE;
            });
            _this.ajouterElement(_this.champCategorie);
            _this.champAuto = new I_ChampTexte_1.I_ChampTexte("Remplissage auto").defChangement(function (TEXTE) {
                _this.champAuto.defTexte("");
                _this.infoApparence.elementLook.listeMorceaux.length = 0;
                var liste = TEXTE.split(";");
                for (var _i = 0, liste_1 = liste; _i < liste_1.length; _i++) {
                    var info = liste_1[_i];
                    var liste2 = info.split(",");
                    var morceau = {};
                    morceau.nom = liste2[0].substring(1);
                    morceau.x = parseInt(liste2[1]);
                    morceau.y = parseInt(liste2[2]);
                    var remplacement = false;
                    for (var _a = 0, _b = _this.infoApparence.elementLook.listeMorceaux; _a < _b.length; _a++) {
                        var ancienMorceau = _b[_a];
                        if (ancienMorceau.nom == morceau.nom) {
                            remplacement = true;
                            ancienMorceau.x = morceau.x;
                            ancienMorceau.y = morceau.y;
                        }
                    }
                    if (!remplacement) {
                        _this.infoApparence.elementLook.listeMorceaux.push(morceau);
                    }
                }
                _this.majListeMorceau();
                _this.conteneurMorceau.defilementBas();
            });
            _this.ajouterElement(_this.champAuto);
            _this.conteneurMorceau = new I_Conteneur_1.I_Conteneur();
            _this.conteneurMorceau.defHauteurMax(300);
            _this.conteneurMorceau.afficherFondUni("#000000" + "30");
            _this.conteneurMorceau.espacement(0);
            _this.conteneurMorceau.activerAscenseur();
            _this.ajouterElement(_this.conteneurMorceau);
            _this.btnSupprimer = new I_Bouton_1.I_Bouton("❌  Supprimer", function () {
                var validation = new I_Conteneur_1.I_Conteneur();
                validation.defLargeurMin(250);
                validation.modeFenetre("Êtes vous sûrs ?");
                validation.centrerAuto();
                validation.ajouterElement(new I_Bouton_1.I_Bouton("Supprimer", function () {
                    InterfaceEquipement.fermer();
                    _this.admin.supprimerElement(_this.infoApparence);
                    validation.elementHTML.remove();
                }));
                validation.ajouterElement(new I_Bouton_1.I_Bouton("Annuler", function () {
                    validation.elementHTML.remove();
                }));
                TFMAdventure_1.default.ajouterInterface(validation.elementHTML);
            });
            _this.ajouterElement(_this.btnSupprimer);
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Valider", function () {
                InterfaceEquipement.fermer();
                _this.admin.ajouterModifierElement(_this.infoApparence);
            }));
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Annuler", function () {
                InterfaceEquipement.fermer();
            }));
            _this.btnAjouterMorceau = new I_Bouton_1.I_Bouton("Ajouter morceau", function () {
                var morceau = {};
                _this.infoApparence.elementLook.listeMorceaux.push(morceau);
                _this.majListeMorceau();
                _this.conteneurMorceau.defilementBas();
            });
            return _this;
        }
        InterfaceEquipement.afficher = function (APPARENCE, ADMIN) {
            if (!InterfaceEquipement.instance) {
                InterfaceEquipement.instance = new InterfaceEquipement(ADMIN);
            }
            InterfaceEquipement.instance.initialisation(APPARENCE);
            TFMAdventure_1.default.ajouterInterface(InterfaceEquipement.instance.elementHTML);
        };
        InterfaceEquipement.estAffiche = function () {
            return InterfaceEquipement.instance && InterfaceEquipement.instance.elementHTML.parentNode != null;
        };
        InterfaceEquipement.fermer = function () {
            if (InterfaceEquipement.instance) {
                InterfaceEquipement.instance.elementHTML.remove();
            }
        };
        InterfaceEquipement.prototype.initialisation = function (APPARENCE) {
            if (!APPARENCE.elementLook) {
                APPARENCE.elementLook = new Look_1.ElementLook();
            }
            if (APPARENCE) {
                this.infoApparence = APPARENCE;
                APPARENCE.elementLook.listeMorceaux.sort(function (M1, M2) {
                    return M1.nom.localeCompare(M2.nom);
                });
            }
            else {
                this.infoApparence = new ElementApparence();
            }
            this.champCategorie.defTexte(this.infoApparence.categorie);
            this.champOrdre.defTexte(this.infoApparence.elementLook.ordre);
            this.champIdentifiant.defTexte(this.infoApparence.elementLook.identifiant);
            this.champNom.defTexte(this.infoApparence.nom);
            var chaine = "";
            for (var i = 0, nb = this.infoApparence.elementLook.listeMorceaux.length; i < nb; i++) {
                var morceau = this.infoApparence.elementLook.listeMorceaux[i];
                if (i) {
                    chaine += ";";
                }
                chaine += "#" + morceau.nom + "," + morceau.x + "," + morceau.y;
            }
            this.champAuto.defTexte(chaine);
            this.majListeMorceau();
            this.btnSupprimer.style.display = APPARENCE ? "flex" : "none";
        };
        InterfaceEquipement.prototype.majListeMorceau = function () {
            this.conteneurMorceau.vider();
            for (var _i = 0, _a = this.infoApparence.elementLook.listeMorceaux; _i < _a.length; _i++) {
                var morceau = _a[_i];
                this.conteneurMorceau.ajouterElement(this.recupInterfaceMorceau(morceau));
            }
            this.conteneurMorceau.ajouterElement(this.btnAjouterMorceau);
        };
        InterfaceEquipement.prototype.recupInterfaceMorceau = function (MORCEAU) {
            var _this = this;
            var conteneur = new I_Conteneur_1.I_Conteneur();
            conteneur.modeLigne();
            var champNom = new I_ChampTexte_1.I_ChampTexte("nom");
            champNom.etirer(4);
            champNom.defChangement(function (TEXTE) {
                MORCEAU.nom = TEXTE;
            });
            var champX = new I_ChampTexte_1.I_ChampTexte("x");
            champX.defChangement(function (TEXTE) {
                MORCEAU.x = parseInt(TEXTE);
            });
            var champY = new I_ChampTexte_1.I_ChampTexte("y");
            champY.defChangement(function (TEXTE) {
                MORCEAU.y = parseInt(TEXTE);
            });
            var champOrdre = new I_ChampTexte_1.I_ChampTexte("z");
            champOrdre.defChangement(function (TEXTE) {
                MORCEAU.ordre = parseInt(TEXTE);
                MORCEAU.ordre = Math.min(Math.max(MORCEAU.ordre, -125), 125);
            });
            champNom.defTexte(MORCEAU.nom);
            champX.defTexte(MORCEAU.x);
            champY.defTexte(MORCEAU.y);
            champOrdre.defTexte(MORCEAU.ordre ? MORCEAU.ordre : "🔗");
            var btnSuppr = new I_Bouton_1.I_Bouton("", function () {
                var index = _this.infoApparence.elementLook.listeMorceaux.indexOf(MORCEAU);
                if (index != -1) {
                    _this.infoApparence.elementLook.listeMorceaux.splice(index, 1);
                    _this.majListeMorceau();
                }
            });
            btnSuppr.ajouterIcone(new I_Image_1.I_Image("famfamfam/cancel.png"));
            conteneur.ajouterElement(champNom, champX, champY, champOrdre, btnSuppr);
            return conteneur;
        };
        return InterfaceEquipement;
    }(I_Conteneur_1.I_Conteneur));
    var ElementApparence = (function (_super) {
        __extends(ElementApparence, _super);
        function ElementApparence() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ElementApparence.prototype.deserialisation = function (DATA) {
            this.nom = DATA.lChaine();
            var version = DATA.l16();
            this.elementLook = new Look_1.ElementLook(DATA);
        };
        ElementApparence.prototype.serialisation = function (DATA) {
            DATA.eChaine(this.nom);
            DATA.e16(0);
            DATA.e16(this.elementLook.identifiant);
            DATA.e8(this.elementLook.ordre);
            DATA.e8(this.elementLook.listeMorceaux.length);
            for (var _i = 0, _a = this.elementLook.listeMorceaux; _i < _a.length; _i++) {
                var morceau = _a[_i];
                DATA.eChaine(morceau.nom);
                DATA.e16(morceau.x);
                DATA.e16(morceau.y);
                DATA.e8(morceau.ordre);
            }
            return DATA;
        };
        return ElementApparence;
    }(Limonadmin_1.ElementLimonadmin));
    exports.ElementApparence = ElementApparence;
});
//# sourceMappingURL=AdminApparence.js.map