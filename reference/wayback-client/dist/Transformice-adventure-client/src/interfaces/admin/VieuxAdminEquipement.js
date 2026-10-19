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
define(["require", "exports", "../../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../../Souritheque-client/src/outils/reseau/Msg801", "../../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../../_tfmAdventure/TFMAdventure", "../../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../../Souritheque-client/src/outils/Module801", "../../_tfmAdventure/ProtoADV", "../../../../Souritheque-client/src/interface/souruis/elements/I_BoutonEtat"], function (require, exports, I_Conteneur_1, I_Bouton_1, I_Image_1, Msg801_1, I_ChampTexte_1, TFMAdventure_1, I_Texte_1, Module801_1, ProtoADV_1, I_BoutonEtat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VieuxAdminEquipement = (function (_super) {
        __extends(VieuxAdminEquipement, _super);
        function VieuxAdminEquipement() {
            var _this = _super.call(this) || this;
            _this.indexMonstre = {};
            _this.categorieEnCours = "";
            _this.indexEquipementTest = {};
            _this.modeFenetre("Bibliothèque d'équipement", VieuxAdminEquipement.fermer);
            _this.defLargeur(400);
            _this.etirerDansParent(50, 50, 50, 50);
            var ligne = _this.nouvelleLigne();
            ligne.etirer();
            _this.conteneurCategorie = new I_Conteneur_1.I_Conteneur();
            _this.conteneurListe = new I_Conteneur_1.I_Conteneur();
            _this.conteneurListe.defLargeurMin(240);
            _this.conteneurListe.etirer();
            _this.conteneurListe.activerAscenseur();
            ligne.appendChild(_this.conteneurCategorie);
            ligne.appendChild(_this.conteneurListe);
            var btn = new I_Bouton_1.I_Bouton("Ajouter un équipement").ajouterIcone(new I_Image_1.I_Image("famfamfam/photo_add.png"))
                .defClique(function () {
                InterfaceEquipement.afficher();
            });
            _this.ajouterElement(btn);
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Fermer", function () {
                VieuxAdminEquipement.fermer();
            }));
            return _this;
        }
        VieuxAdminEquipement.prototype.chargementListeEquipement = function (MSG) {
            var _this = this;
            this.conteneurListe.vider();
            this.conteneurCategorie.vider();
            this.indexMonstre = {};
            var premiereCategorie;
            var nb = MSG.l16();
            var _loop_1 = function (i) {
                var info = new InfoEquipement();
                info.deserialisation(MSG);
                var liste = this_1.indexMonstre[info.categorie];
                if (liste == null) {
                    liste = [];
                    if (!premiereCategorie) {
                        premiereCategorie = info.categorie;
                    }
                    this_1.indexMonstre[info.categorie] = liste;
                    var btnCategorie_1 = new I_Bouton_1.I_Bouton();
                    btnCategorie_1.defClique(function () {
                        if (_this.btnCategorieEnCours) {
                            _this.btnCategorieEnCours.laisserEnfoncer(false);
                        }
                        _this.btnCategorieEnCours = btnCategorie_1;
                        _this.btnCategorieEnCours.laisserEnfoncer(true);
                        _this.afficherCategorie(info.categorie);
                    });
                    this_1.conteneurCategorie.ajouterElement(btnCategorie_1);
                }
                liste.push(info);
            };
            var this_1 = this;
            for (var i = 0; i < nb; i++) {
                _loop_1(i);
            }
            if (this.categorieEnCours) {
                this.afficherCategorie(this.categorieEnCours);
            }
            else {
                this.afficherCategorie(premiereCategorie);
            }
        };
        VieuxAdminEquipement.afficher = function (MSG) {
            if (!VieuxAdminEquipement.instance) {
                VieuxAdminEquipement.instance = new VieuxAdminEquipement();
            }
            VieuxAdminEquipement.instance.chargementListeEquipement(MSG);
            document.body.appendChild(VieuxAdminEquipement.instance.elementHTML);
        };
        VieuxAdminEquipement.estAffiche = function () {
            return VieuxAdminEquipement.instance && VieuxAdminEquipement.instance.elementHTML.parentNode != null;
        };
        VieuxAdminEquipement.fermer = function () {
            if (VieuxAdminEquipement.instance) {
                VieuxAdminEquipement.instance.elementHTML.remove();
            }
        };
        VieuxAdminEquipement.prototype.initialisation = function () {
        };
        VieuxAdminEquipement.prototype.afficherCategorie = function (CATEGORIE) {
            var _this = this;
            this.categorieEnCours = CATEGORIE;
            this.conteneurListe.vider();
            var liste = this.indexMonstre[CATEGORIE];
            if (!liste) {
                return;
            }
            var _loop_2 = function (info) {
                var conteneur = new I_Conteneur_1.I_Conteneur();
                conteneur.modeLigne(true, true);
                conteneur.afficherFondUni("#000000" + "50");
                var texteIdentifiant = new I_Texte_1.I_Texte(info.identifiant);
                var texteNom = new I_Texte_1.I_Texte(info.nom);
                texteNom.etirer(2);
                var btnEquiper = new I_BoutonEtat_1.I_BoutonEtat("", function (ACTIF) {
                    if (ACTIF) {
                        _this.indexEquipementTest[info.identifiant] = true;
                    }
                    else {
                        delete _this.indexEquipementTest[info.identifiant];
                    }
                    var liste = [];
                    for (var code in _this.indexEquipementTest) {
                        liste.push(code);
                    }
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.equiperEquipement(liste));
                });
                btnEquiper.cocher(this_2.indexEquipementTest[info.identifiant]);
                var btnEditer = new I_Bouton_1.I_Bouton("", function () {
                    InterfaceEquipement.afficher(info);
                });
                btnEditer.ajouterIcone(new I_Image_1.I_Image("famfamfam/picture_edit.png"));
                conteneur.ajouterElement(texteIdentifiant, texteNom, btnEquiper, btnEditer);
                this_2.conteneurListe.ajouterElement(conteneur);
            };
            var this_2 = this;
            for (var _i = 0, liste_1 = liste; _i < liste_1.length; _i++) {
                var info = liste_1[_i];
                _loop_2(info);
            }
        };
        return VieuxAdminEquipement;
    }(I_Conteneur_1.I_Conteneur));
    exports.VieuxAdminEquipement = VieuxAdminEquipement;
    var InterfaceEquipement = (function (_super) {
        __extends(InterfaceEquipement, _super);
        function InterfaceEquipement() {
            var _this = _super.call(this) || this;
            _this.modeFenetre("Équipement", InterfaceEquipement.fermer);
            _this.defLargeurMin(400);
            _this.centrerAuto();
            _this.texteIdentifiant = new I_Texte_1.I_Texte();
            _this.champNom = new I_ChampTexte_1.I_ChampTexte("Nom");
            _this.champNom.etirer(2);
            _this.champNom.defChangement(function (TEXTE) {
                _this.infoEquipement.nom = TEXTE;
            });
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.alignementEnfants("center");
                LIGNE.ajouterElement(_this.texteIdentifiant, _this.champNom);
            });
            _this.nouvelleLigne(function (LIGNE) {
                _this.champOrdre = new I_ChampTexte_1.I_ChampTexte("-125...125");
                _this.champOrdre.etirer(2);
                _this.champOrdre.defChangement(function (TEXTE) {
                    var valeur = parseInt(TEXTE);
                    _this.infoEquipement.ordre = Math.min(Math.max(valeur, -125), 125);
                });
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Ordre d'affichage"), _this.champOrdre);
            });
            _this.champCategorie = new I_ChampTexte_1.I_ChampTexte("Catégorie").defChangement(function (TEXTE) {
                _this.infoEquipement.categorie = TEXTE;
            });
            _this.ajouterElement(_this.champCategorie);
            _this.champAuto = new I_ChampTexte_1.I_ChampTexte("Remplissage auto").defChangement(function (TEXTE) {
                _this.champAuto.defTexte("");
                _this.infoEquipement.listeMorceau.length = 0;
                var liste = TEXTE.split(";");
                for (var _i = 0, liste_2 = liste; _i < liste_2.length; _i++) {
                    var info = liste_2[_i];
                    var liste2 = info.split(",");
                    var morceau = new InfoMorceau();
                    morceau.nom = liste2[0].substring(1);
                    morceau.accrocheX = parseInt(liste2[1]);
                    morceau.accrocheY = parseInt(liste2[2]);
                    var remplacement = false;
                    for (var _a = 0, _b = _this.infoEquipement.listeMorceau; _a < _b.length; _a++) {
                        var ancienMorceau = _b[_a];
                        if (ancienMorceau.nom == morceau.nom) {
                            remplacement = true;
                            ancienMorceau.accrocheX = morceau.accrocheX;
                            ancienMorceau.accrocheY = morceau.accrocheY;
                        }
                    }
                    if (!remplacement) {
                        _this.infoEquipement.listeMorceau.push(morceau);
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
            _this.btnSupprimer = new I_Bouton_1.I_Bouton("Supprimer", function () {
                InterfaceEquipement.fermer();
                Module801_1.default.instance.envoyer(ProtoADV_1.default.supprEquipement(_this.infoEquipement.identifiant));
            }).ajouterIcone(new I_Image_1.I_Image("famfamfam/cancel.png"));
            _this.ajouterElement(_this.btnSupprimer);
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Valider", function () {
                InterfaceEquipement.fermer();
                Module801_1.default.instance.envoyer(ProtoADV_1.default.nouvelEquipement(_this.infoEquipement.serialisation(new Msg801_1.default())));
            }));
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Annuler", function () {
                InterfaceEquipement.fermer();
            }));
            _this.btnAjouterMorceau = new I_Bouton_1.I_Bouton("Ajouter morceau", function () {
                var morceau = new InfoMorceau();
                _this.infoEquipement.listeMorceau.push(morceau);
                _this.majListeMorceau();
                _this.conteneurMorceau.defilementBas();
            });
            return _this;
        }
        InterfaceEquipement.afficher = function (EQUIPEMENT) {
            if (!InterfaceEquipement.instance) {
                InterfaceEquipement.instance = new InterfaceEquipement();
            }
            InterfaceEquipement.instance.initialisation(EQUIPEMENT);
            document.body.appendChild(InterfaceEquipement.instance.elementHTML);
        };
        InterfaceEquipement.estAffiche = function () {
            return InterfaceEquipement.instance && InterfaceEquipement.instance.elementHTML.parentNode != null;
        };
        InterfaceEquipement.fermer = function () {
            if (InterfaceEquipement.instance) {
                InterfaceEquipement.instance.elementHTML.remove();
            }
        };
        InterfaceEquipement.prototype.initialisation = function (EQUIPEMENT) {
            if (EQUIPEMENT) {
                this.infoEquipement = EQUIPEMENT;
                EQUIPEMENT.listeMorceau.sort(function (M1, M2) {
                    return M1.nom.localeCompare(M2.nom);
                });
            }
            else {
                this.infoEquipement = new InfoEquipement();
            }
            this.champCategorie.defTexte(this.infoEquipement.categorie);
            this.champOrdre.defTexte(this.infoEquipement.ordre);
            this.texteIdentifiant.defTexte(this.infoEquipement.identifiant);
            this.champNom.defTexte(this.infoEquipement.nom);
            var chaine = "";
            for (var i = 0, nb = this.infoEquipement.listeMorceau.length; i < nb; i++) {
                var morceau = this.infoEquipement.listeMorceau[i];
                if (i) {
                    chaine += ";";
                }
                chaine += "#" + morceau.nom + "," + morceau.accrocheX + "," + morceau.accrocheY;
            }
            this.champAuto.defTexte(chaine);
            this.majListeMorceau();
            this.btnSupprimer.style.display = EQUIPEMENT ? "flex" : "none";
        };
        InterfaceEquipement.prototype.majListeMorceau = function () {
            this.conteneurMorceau.vider();
            for (var _i = 0, _a = this.infoEquipement.listeMorceau; _i < _a.length; _i++) {
                var morceau = _a[_i];
                this.conteneurMorceau.ajouterElement(morceau.recupInterface(this));
            }
            this.conteneurMorceau.ajouterElement(this.btnAjouterMorceau);
        };
        return InterfaceEquipement;
    }(I_Conteneur_1.I_Conteneur));
    var InfoEquipement = (function () {
        function InfoEquipement() {
            this.identifiant = 0;
            this.listeMorceau = [];
        }
        InfoEquipement.prototype.recupElementInterface = function () {
            return null;
        };
        InfoEquipement.prototype.deserialisation = function (MSG) {
            this.identifiant = MSG.l16();
            this.ordre = MSG.l8s();
            for (var i = 0, nb = MSG.l8(); i < nb; i++) {
                var morceau = new InfoMorceau();
                morceau.nom = MSG.lChaine();
                morceau.accrocheX = MSG.l16s();
                morceau.accrocheY = MSG.l16s();
                morceau.ordre = MSG.l8s();
                this.listeMorceau.push(morceau);
            }
            this.nom = MSG.lChaine();
            this.categorie = MSG.lChaine();
        };
        InfoEquipement.prototype.serialisation = function (MSG) {
            MSG.e16(this.identifiant);
            MSG.e8(this.ordre);
            MSG.e8(this.listeMorceau.length);
            for (var _i = 0, _a = this.listeMorceau; _i < _a.length; _i++) {
                var morceau = _a[_i];
                MSG.eChaine(morceau.nom);
                MSG.e16(morceau.accrocheX);
                MSG.e16(morceau.accrocheY);
                MSG.e8(morceau.ordre);
            }
            MSG.eChaine(this.nom);
            MSG.eChaine(this.categorie);
            return MSG;
        };
        return InfoEquipement;
    }());
    var InfoMorceau = (function () {
        function InfoMorceau() {
            this.ordre = 0;
        }
        InfoMorceau.prototype.recupInterface = function (PARENT) {
            var _this = this;
            var conteneur = new I_Conteneur_1.I_Conteneur();
            conteneur.modeLigne();
            var champNom = new I_ChampTexte_1.I_ChampTexte("nom");
            champNom.etirer(4);
            champNom.defChangement(function (TEXTE) {
                _this.nom = TEXTE;
            });
            var champX = new I_ChampTexte_1.I_ChampTexte("x");
            champX.defChangement(function (TEXTE) {
                _this.accrocheX = parseInt(TEXTE);
            });
            var champY = new I_ChampTexte_1.I_ChampTexte("y");
            champY.defChangement(function (TEXTE) {
                _this.accrocheY = parseInt(TEXTE);
            });
            var champOrdre = new I_ChampTexte_1.I_ChampTexte("z");
            champOrdre.defChangement(function (TEXTE) {
                _this.ordre = parseInt(TEXTE);
                _this.ordre = Math.min(Math.max(_this.ordre, -125), 125);
            });
            champNom.defTexte(this.nom);
            champX.defTexte(this.accrocheX);
            champY.defTexte(this.accrocheY);
            champOrdre.defTexte(this.ordre ? this.ordre : "🔗");
            var btnSuppr = new I_Bouton_1.I_Bouton("", function () {
                var index = PARENT.infoEquipement.listeMorceau.indexOf(_this);
                if (index != -1) {
                    PARENT.infoEquipement.listeMorceau.splice(index, 1);
                    PARENT.majListeMorceau();
                }
            });
            btnSuppr.ajouterIcone(new I_Image_1.I_Image("famfamfam/cancel.png"));
            conteneur.ajouterElement(champNom, champX, champY, champOrdre, btnSuppr);
            return conteneur;
        };
        return InfoMorceau;
    }());
});
//# sourceMappingURL=VieuxAdminEquipement.js.map