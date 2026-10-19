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
define(["require", "exports", "../../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../_monde/MondeADV", "../../_monde/_mobile/MobileADV", "../../../../Souritheque-client/src/outils/Module801", "../../_tfmAdventure/ProtoADV", "../../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../../../../Souritheque-client/src/interface/souruis/elements/I_BoutonEtat", "../../_tfmAdventure/TFMAdventure", "../../_monde/_mobile/AplatADV", "../EditeurCreature", "../../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "../../../../Souritheque-client/src/interface/souruis/elements/I_ImagePixi", "../../../../Souritheque-client/src/outils/controles/Clavier", "../../../../Souritheque-client/src/interface/Couleur", "../../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../../Souritheque-client/src/outils/Mathematiques", "../../../../Souritheque-client/src/outils/Trad801"], function (require, exports, I_Conteneur_1, I_Bouton_1, I_Image_1, MondeADV_1, MobileADV_1, Module801_1, ProtoADV_1, I_ChampTexte_1, I_BoutonEtat_1, TFMAdventure_1, AplatADV_1, EditeurCreature_1, ClipAnim_1, I_ImagePixi_1, Clavier_1, Couleur_1, AnimMath_1, I_Texte_1, Mathematiques_1, Trad801_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EditeurADV = (function (_super) {
        __extends(EditeurADV, _super);
        function EditeurADV() {
            var _this = _super.call(this) || this;
            _this.indexPicto = {};
            _this.categorieEnCours = "";
            _this.listeElementInvisible = [];
            _this.modeTransparence = false;
            _this.coucheSolEnCours = "sol";
            _this.modeVoyage = false;
            _this.modeDessin = false;
            _this.modeEffaceurDessin = false;
            _this.couleurDessin = 0x6D5ADF;
            _this.indexDessin = {};
            _this.modeCollision = false;
            _this.modeLumiere = false;
            _this.suppressionCollisionsEnCours = false;
            _this.indexSpritesCollisions = {};
            _this.infoConstructionCollisionEnCours = null;
            _this.infoExtremiteCollisionEnCoursDEdition = null;
            _this.spriteExtremiteCollision = null;
            _this.extremiteCollisionProche = null;
            _this.selection = new Selection();
            _this.etirerDansParent(undefined, 50, 50, 50);
            _this.defLargeurMax(315);
            _this.modeFenetre("Éléments", EditeurADV.fermer);
            _this.selectionObjet = _this.selectionObjet.bind(_this);
            _this.debutModeVoyage = _this.debutModeVoyage.bind(_this);
            _this.boucleModeVoyage = _this.boucleModeVoyage.bind(_this);
            _this.finModeVoyage = _this.finModeVoyage.bind(_this);
            _this.debutModeDessin = _this.debutModeDessin.bind(_this);
            _this.boucleModeDessin = _this.boucleModeDessin.bind(_this);
            _this.finModeDessin = _this.finModeDessin.bind(_this);
            _this.clicModeCollision = _this.clicModeCollision.bind(_this);
            _this.boucleModeCollision = _this.boucleModeCollision.bind(_this);
            _this.enfoncerClicModeLumiere = _this.enfoncerClicModeLumiere.bind(_this);
            _this.relacherClicModeLumiere = _this.relacherClicModeLumiere.bind(_this);
            _this.clicDroitModeLumiere = _this.clicDroitModeLumiere.bind(_this);
            _this.boucleModeLumiere = _this.boucleModeLumiere.bind(_this);
            _this.relachementClicModeCollision = _this.relachementClicModeCollision.bind(_this);
            _this.clipSelection = new ClipSelection();
            var ligne = _this.nouvelleLigne();
            ligne.etirer();
            _this.conteneurCategorie = new I_Conteneur_1.I_Conteneur();
            _this.conteneurCategorie.defLargeurMin(80);
            _this.conteneurCategorie.activerAscenseur();
            _this.conteneurListe = new I_Conteneur_1.I_Conteneur()
                .modeLigne().multiligne()
                .justifierEnfants("flex-start")
                .alignementEnfants("flex-end");
            _this.conteneurListe.defLargeurMin(240);
            _this.conteneurListe.etirer();
            _this.conteneurListe.activerAscenseur();
            ligne.appendChild(_this.conteneurCategorie);
            ligne.appendChild(_this.conteneurListe);
            var btn = new I_Bouton_1.I_Bouton("Ajouter élément").ajouterIcone(new I_Image_1.I_Image("famfamfam/photo_add.png"))
                .defClique(function () {
                FenetreNouveauPicto.afficher();
            });
            _this.ajouterElement(btn);
            MondeADV_1.MondeADV.instance.on("rightdown", function () {
                if (EditeurADV.estAffiche()) {
                    _this.monde.supprimerCurseur();
                    if (_this.curseurInterieur) {
                        if (_this.curseurInterieur.parent) {
                            _this.curseurInterieur.parent.removeChild(_this.curseurInterieur);
                        }
                        _this.curseurInterieur = null;
                    }
                }
            });
            document.body.onwheel = function (EVT) {
                if (Clavier_1.Clavier.shiftEnCours) {
                    MondeADV_1.MondeADV.instance.zoomRequis *= EVT.deltaY > 0 ? 0.8 : 1.2;
                }
                else if (_this.selectionEnCours) {
                    var angleEnCours = _this.selectionEnCours instanceof AplatADV_1.AplatADV ? _this.selectionEnCours.euler.z : _this.selectionEnCours.rotation;
                    angleEnCours += 10 * 0.02617993 * (EVT.deltaY < 0 ? -1 : 1);
                    if (_this.selectionEnCours instanceof AplatADV_1.AplatADV) {
                        _this.selectionEnCours.euler.z = angleEnCours;
                    }
                    else {
                        _this.selectionEnCours.rotation = angleEnCours;
                    }
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.rotationPicto(_this.selectionEnCours.identifiantMobile, angleEnCours / 0.02617993));
                }
                else if (MondeADV_1.MondeADV.instance.curseurMobile) {
                    MondeADV_1.MondeADV.instance.curseurMobile.rotation = MondeADV_1.MondeADV.instance.curseurMobile.rotation + (5 * 0.02617993 * (EVT.deltaY < 0 ? -1 : 1));
                    if (MondeADV_1.MondeADV.instance.curseurMobile.rotation < 0) {
                        MondeADV_1.MondeADV.instance.curseurMobile.rotation = Math.PI * 2 + MondeADV_1.MondeADV.instance.curseurMobile.rotation;
                    }
                    MondeADV_1.MondeADV.instance.curseurMobile.rotation = MondeADV_1.MondeADV.instance.curseurMobile.rotation % (Math.PI * 2);
                }
                else if (MondeADV_1.MondeADV.instance.curseurAplat) {
                    MondeADV_1.MondeADV.instance.curseurAplat.euler.z = MondeADV_1.MondeADV.instance.curseurAplat.euler.z + (5 * 0.02617993 * (EVT.deltaY < 0 ? -1 : 1));
                    if (MondeADV_1.MondeADV.instance.curseurAplat.euler.z < 0) {
                        MondeADV_1.MondeADV.instance.curseurAplat.euler.z = Math.PI * 2 + MondeADV_1.MondeADV.instance.curseurAplat.euler.z;
                    }
                    MondeADV_1.MondeADV.instance.curseurAplat.euler.z = MondeADV_1.MondeADV.instance.curseurAplat.euler.z % (Math.PI * 2);
                }
                else if (_this.curseurInterieur) {
                    _this.curseurInterieur.rotation = _this.curseurInterieur.rotation + (5 * 0.02617993 * (EVT.deltaY < 0 ? -1 : 1));
                    if (_this.curseurInterieur.rotation < 0) {
                        _this.curseurInterieur.rotation = Math.PI * 2 + _this.curseurInterieur.rotation;
                    }
                    _this.curseurInterieur.rotation = _this.curseurInterieur.rotation % (Math.PI * 2);
                }
            };
            _this.contexteClavier = new Clavier_1.ContexteClavier()
                .defAppuyerEmplacement("ArrowUp", function () {
                if (_this.selectionEnCours && _this.selectionEnCours instanceof AplatADV_1.AplatADV) {
                    for (var i = 0, nb = Clavier_1.Clavier.shiftEnCours ? 10 : 1; i < nb; i++) {
                        _this.changerProfondeurAplat(_this.selectionEnCours, 1);
                    }
                }
                else if (_this.clipSelection.objet instanceof ClipAnim_1.ClipAnim) {
                    var parent_1 = _this.clipSelection.objet.parent;
                    var indexEnCours = parent_1.listeMobileInterne.indexOf(_this.clipSelection.objet);
                    var cible = parent_1.listeMobileInterne[indexEnCours + 1];
                    if (cible) {
                        parent_1.swapChildren(_this.clipSelection.objet, cible);
                        parent_1.listeMobileInterne[indexEnCours] = cible;
                        parent_1.listeMobileInterne[indexEnCours + 1] = _this.clipSelection.objet;
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.profondeurMobileInterieur(parent_1.identifiantMobile, indexEnCours, true));
                    }
                }
            }, true)
                .defAppuyerEmplacement("ArrowDown", function () {
                if (_this.selectionEnCours && _this.selectionEnCours instanceof AplatADV_1.AplatADV) {
                    for (var i = 0, nb = Clavier_1.Clavier.shiftEnCours ? 10 : 1; i < nb; i++) {
                        _this.changerProfondeurAplat(_this.selectionEnCours, -1);
                    }
                }
                else if (_this.clipSelection.objet instanceof ClipAnim_1.ClipAnim) {
                    var parent_2 = _this.clipSelection.objet.parent;
                    var indexEnCours = parent_2.listeMobileInterne.indexOf(_this.clipSelection.objet);
                    var cible = parent_2.listeMobileInterne[indexEnCours - 1];
                    if (cible) {
                        parent_2.swapChildren(_this.clipSelection.objet, cible);
                        parent_2.listeMobileInterne[indexEnCours] = cible;
                        parent_2.listeMobileInterne[indexEnCours - 1] = _this.clipSelection.objet;
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.profondeurMobileInterieur(parent_2.identifiantMobile, indexEnCours, false));
                    }
                }
            }, true)
                .defAppuyerEmplacement("Delete", function () {
                if (_this.selectionEnCours) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.supprPicto(_this.selectionEnCours));
                    _this.selectionObjet(null);
                }
                else if (_this.mobileInterieurEnCours && _this.mobileInterieurEnCours.listeMobileInterne) {
                    var index = _this.mobileInterieurEnCours.listeMobileInterne.indexOf(_this.clipSelection.objet);
                    if (index != -1) {
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.supprimerMobileInterieur(_this.mobileInterieurEnCours.identifiantMobile, index));
                        _this.modeInterieur(null);
                    }
                }
            })
                .defAppuyerEmplacement("KeyC", function () {
                if (Clavier_1.Clavier.shiftEnCours) {
                    MondeADV_1.MondeADV.instance.coucheSol.visible = !MondeADV_1.MondeADV.instance.coucheSol.visible;
                }
                else {
                    _this.coucheSolEnCours = _this.coucheSolEnCours == "sol" ? "eau" : "sol";
                    BarreOutilsEditeur.instance.couche.defTexte(_this.coucheSolEnCours);
                    if (MondeADV_1.MondeADV.instance.curseurAplat) {
                        if (MondeADV_1.MondeADV.instance.curseurAplat.parent) {
                            MondeADV_1.MondeADV.instance.curseurAplat.parent.removeChild(MondeADV_1.MondeADV.instance.curseurAplat);
                        }
                        if (_this.coucheSolEnCours == "sol") {
                            MondeADV_1.MondeADV.instance.curseurAplat.couche = 0;
                            MondeADV_1.MondeADV.instance.coucheSol.addChild(MondeADV_1.MondeADV.instance.curseurAplat);
                        }
                        else {
                            MondeADV_1.MondeADV.instance.curseurAplat.couche = 1;
                            MondeADV_1.MondeADV.instance.coucheEau.addChild(MondeADV_1.MondeADV.instance.curseurAplat);
                        }
                    }
                }
            })
                .defAppuyerEmplacement("Escape", function () {
                _this.toutAnnuler();
            })
                .defAppuyerEmplacement("Space", function () {
                _this.modeVoyage = true;
                window.onmousedown = _this.debutModeVoyage;
                document.body.style.cursor = "grab";
                MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
                _this.selectionObjet(null);
            })
                .defRelacherEmplacement("Space", function () {
                _this.modeVoyage = false;
                window.onmousedown = null;
                document.body.style.cursor = "auto";
                MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
                _this.finModeVoyage();
            })
                .defAppuyerEmplacement("KeyF", function () {
                MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
                _this.selectionObjet(null);
                if (_this.modeCollision) {
                    _this.finModeCollision();
                }
                else {
                    _this.debutModeCollision();
                }
            })
                .defAppuyerEmplacement("KeyR", function () {
                MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
                _this.selectionObjet(null);
                if (_this.modeLumiere) {
                    _this.finModeLumiere();
                }
                else {
                    _this.debutModeLumiere();
                }
            })
                .defAppuyerEmplacement("KeyV", function () {
                _this.modeDessin = true;
                window.onmousedown = _this.debutModeDessin;
                document.body.style.cursor = "crosshair";
                MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
                _this.selectionObjet(null);
            })
                .defRelacherEmplacement("KeyV", function () {
                _this.modeDessin = false;
                window.onmousedown = null;
                document.body.style.cursor = "auto";
                MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
                _this.finModeDessin();
            })
                .defAppuyerEmplacement("KeyQ", function () {
                MondeADV_1.MondeADV.instance.defModeAerien(!MondeADV_1.MondeADV.instance.modeAerien);
                MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
            })
                .defAppuyerEmplacement("KeyT", function () {
                _this.modeTransparence = !_this.modeTransparence;
                MondeADV_1.MondeADV.instance.coucheMobile.alpha = _this.modeTransparence ? 0.3 : 1;
            })
                .defAppuyerEmplacement("KeyL", function () {
                MondeADV_1.MondeADV.instance.basculerAffichageLumiere();
                MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
                _this.selectionObjet(null);
            })
                .defAppuyerEmplacement("KeyB", function () {
                if (MondeADV_1.MondeADV.instance.curseurMobile) {
                    MondeADV_1.MondeADV.instance.curseurMobile.creature.scale.x *= -1;
                }
                else if (MondeADV_1.MondeADV.instance.curseurAplat) {
                    MondeADV_1.MondeADV.instance.curseurAplat.scale3d.x *= -1;
                }
            })
                .defAppuyerEmplacement("KeyG", function () {
                if (MondeADV_1.MondeADV.instance.curseurMobile) {
                    if (MondeADV_1.MondeADV.instance.curseurMobile.infoCommune.lumiere) {
                        MondeADV_1.MondeADV.instance.curseurMobile.infoCommune.lumiere = MondeADV_1.MondeADV.instance.curseurMobile.infoCommune.lumiere == 1 ? 2 : 1;
                        MondeADV_1.MondeADV.instance.afficherMobile(MondeADV_1.MondeADV.instance.curseurMobile, false);
                        MondeADV_1.MondeADV.instance.afficherMobile(MondeADV_1.MondeADV.instance.curseurMobile, true);
                    }
                }
                else if (MondeADV_1.MondeADV.instance.curseurAplat) {
                    if (MondeADV_1.MondeADV.instance.curseurAplat.infoCommune.lumiere) {
                        MondeADV_1.MondeADV.instance.curseurAplat.infoCommune.lumiere = MondeADV_1.MondeADV.instance.curseurAplat.infoCommune.lumiere == 1 ? 2 : 1;
                        MondeADV_1.MondeADV.instance.afficherAplat(MondeADV_1.MondeADV.instance.curseurAplat, false);
                        MondeADV_1.MondeADV.instance.afficherAplat(MondeADV_1.MondeADV.instance.curseurAplat, true);
                    }
                }
            });
            _this.selectionObjet = _this.selectionObjet.bind(_this);
            _this.cliqueDroitElement = _this.cliqueDroitElement.bind(_this);
            return _this;
        }
        EditeurADV.prototype.chargementListePicto = function (MSG) {
            var _this = this;
            this.conteneurListe.vider();
            this.conteneurCategorie.vider();
            this.indexPicto = {};
            var premiereCategorie;
            var nb = MSG.l16();
            var _loop_1 = function (i) {
                var infoPicto = new InfoPictoADV();
                infoPicto.deserialisation(MSG);
                var listePicto = this_1.indexPicto[infoPicto.categorie];
                if (listePicto == null) {
                    listePicto = [];
                    if (!premiereCategorie) {
                        premiereCategorie = infoPicto.categorie;
                    }
                    this_1.indexPicto[infoPicto.categorie] = listePicto;
                    var btnCategorie_1 = new I_Bouton_1.I_Bouton();
                    btnCategorie_1.ajouterIcone(new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("editeur/categorie/" + (infoPicto.categorie ? infoPicto.categorie : "sans-categorie") + ".png")));
                    btnCategorie_1.defClique(function () {
                        if (_this.btnCategorieEnCours) {
                            _this.btnCategorieEnCours.laisserEnfoncer(false);
                        }
                        _this.btnCategorieEnCours = btnCategorie_1;
                        _this.btnCategorieEnCours.laisserEnfoncer(true);
                        _this.afficherCategorie(infoPicto.categorie);
                    });
                    this_1.conteneurCategorie.ajouterElement(btnCategorie_1);
                }
                listePicto.push(infoPicto);
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
        EditeurADV.afficher = function (MSG) {
            if (!EditeurADV.instance) {
                EditeurADV.instance = new EditeurADV();
            }
            EditeurADV.instance.monde = MondeADV_1.MondeADV.instance;
            MondeADV_1.MondeADV.instance.editeurEnCours = true;
            Clavier_1.Clavier.ajouterContexte(EditeurADV.instance.contexteClavier);
            MondeADV_1.MondeADV.instance.majVisibiliteSecteur();
            MondeADV_1.MondeADV.instance.coucheDessin.visible = true;
            TFMAdventure_1.default.instance.coucheInterface.appendChild(EditeurADV.instance.elementHTML);
            MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
            BarreOutilsEditeur.afficher();
            for (var code in MondeADV_1.MondeADV.instance.indexMobile) {
                var mobile = MondeADV_1.MondeADV.instance.indexMobile[code];
                if (mobile.visibleUniquementEditeur) {
                    mobile.visible = true;
                }
            }
        };
        EditeurADV.estAffiche = function () {
            return EditeurADV.instance && EditeurADV.instance.elementHTML.parentNode != null;
        };
        EditeurADV.fermer = function () {
            if (EditeurADV.instance) {
                EditeurADV.instance.elementHTML.remove();
                EditeurADV.instance.finModeCollision();
                EditeurADV.instance.finModeLumiere();
                EditeurADV.instance.toutAnnuler();
                Clavier_1.Clavier.supprimerContexte(EditeurADV.instance.contexteClavier);
                MondeADV_1.MondeADV.instance.majPictoEditeurRequise = true;
                MondeADV_1.MondeADV.instance.editeurEnCours = false;
                MondeADV_1.MondeADV.instance.majVisibiliteSecteur();
                MondeADV_1.MondeADV.instance.supprimerCurseur();
                MondeADV_1.MondeADV.instance.coucheDessin.visible = false;
                MondeADV_1.MondeADV.instance.defModeAerien(false);
                for (var code in MondeADV_1.MondeADV.instance.indexMobile) {
                    var mobile = MondeADV_1.MondeADV.instance.indexMobile[code];
                    if (mobile.visibleUniquementEditeur) {
                        mobile.visible = false;
                    }
                }
            }
            BarreOutilsEditeur.fermer();
        };
        EditeurADV.prototype.afficherCategorie = function (CATEGORIE) {
            var _this = this;
            this.categorieEnCours = CATEGORIE;
            this.conteneurListe.vider();
            var liste = this.indexPicto[CATEGORIE];
            if (!liste) {
                return;
            }
            var _loop_2 = function (infoPicto) {
                var conteneur = new I_Conteneur_1.I_Conteneur();
                conteneur.style.position = "relative";
                conteneur.defLargeurMax(100).defHauteurMax(100);
                conteneur.defLargeurMin(100).defHauteurMin(100);
                conteneur.afficherFondUni("#000000" + "50");
                var conteneurImage = new I_Conteneur_1.I_Conteneur();
                var image = infoPicto.recupElementInterface();
                image.defLargeurMax(100).defHauteurMax(100);
                image.flexAlignement("center");
                image.margeAuto();
                conteneurImage.appendChild(image);
                conteneurImage.rendreCliquable(function () {
                    _this.selectionObjet(null);
                    if (infoPicto.estAplat) {
                        if (_this.mobileInterieurEnCours) {
                            return;
                        }
                        var aplat_1 = new AplatADV_1.AplatADV();
                        aplat_1.infoCommune.lumiere = infoPicto.estUneLumiere ? 1 : 0;
                        aplat_1.infoCommune.typeVent = infoPicto.typeVent;
                        aplat_1.construction(infoPicto.clip.recupLienImageSimple());
                        if (_this.coucheSolEnCours == "eau") {
                            aplat_1.couche = 1;
                        }
                        MondeADV_1.MondeADV.instance.defCurseur(aplat_1, function () {
                            Module801_1.default.instance.envoyer(ProtoADV_1.default.placementAplat(infoPicto.identifiant, aplat_1.couche, aplat_1.position3d.x, aplat_1.position3d.z, aplat_1.scale3d.x == -1, aplat_1.infoCommune.lumiere, aplat_1.euler.z / 0.02617993));
                        });
                    }
                    else {
                        var mobile_1 = new MobileADV_1.MobileADV();
                        mobile_1.infoCommune.lumiere = infoPicto.estUneLumiere ? 1 : 0;
                        mobile_1.infoCommune.typeVent = infoPicto.typeVent;
                        mobile_1.defCreature(infoPicto.recupClip());
                        if (_this.mobileInterieurEnCours) {
                            if (_this.curseurInterieur) {
                                if (_this.curseurInterieur.parent) {
                                    _this.curseurInterieur.parent.removeChild(_this.curseurInterieur);
                                }
                            }
                            _this.curseurInterieur = mobile_1;
                            var zero_1 = new PIXI.Point(0, 0);
                            _this.mobileInterieurEnCours.addChild(mobile_1);
                            _this.monde.ajouterBoucle("curseur", function () {
                                var posEcran = _this.mobileInterieurEnCours.toGlobal(zero_1);
                                var posInterieur = new PIXI.Point(TFMAdventure_1.default.SOURIS_X - posEcran.x, TFMAdventure_1.default.SOURIS_Y - posEcran.y);
                                posInterieur.x /= _this.mobileInterieurEnCours.scale.x;
                                posInterieur.y /= _this.mobileInterieurEnCours.scale.y;
                                var angle = Math.atan2(posInterieur.y, posInterieur.x) - _this.mobileInterieurEnCours.rotation;
                                var distance = Mathematiques_1.default.distance2Points(posInterieur.x, posInterieur.y, 0, 0);
                                var posX = Math.cos(angle) * distance;
                                var posY = Math.sin(angle) * distance;
                                var accroche = Clavier_1.Clavier.controleEnCours ? 64 : Clavier_1.Clavier.shiftEnCours ? 32 : 1;
                                _this.curseurInterieur.position.x = Math.round(posX / accroche) * accroche;
                                _this.curseurInterieur.position.y = Math.round(posY / accroche) * accroche;
                            });
                            _this.monde.fonctionCurseur = function () {
                                TFMAdventure_1.default.envoyer(ProtoADV_1.default.placementMobileInterieur(_this.mobileInterieurEnCours.identifiantMobile, infoPicto.identifiant, _this.curseurInterieur.position.x, _this.curseurInterieur.position.y, _this.curseurInterieur.rotation / 0.02617993));
                                _this.monde.fonctionCurseur = null;
                                _this.monde.supprimerBoucle("curseur");
                                if (_this.curseurInterieur.parent) {
                                    _this.curseurInterieur.parent.removeChild(_this.curseurInterieur);
                                }
                                _this.modeInterieur(null);
                            };
                        }
                        else {
                            MondeADV_1.MondeADV.instance.defCurseur(mobile_1, function () {
                                Module801_1.default.instance.envoyer(ProtoADV_1.default.placementPicto(infoPicto.identifiant, mobile_1.positionServeur.x, mobile_1.positionServeur.y, mobile_1.creature.scale.x == -1, mobile_1.infoCommune.lumiere, mobile_1.rotation / 0.02617993));
                            });
                        }
                    }
                });
                conteneur.appendChild(conteneurImage);
                this_2.conteneurListe.ajouterElement(conteneur);
                var crayon = new I_Image_1.I_Image("famfamfam/picture_edit.png");
                crayon.style.position = "absolute";
                crayon.style.right = "2px";
                crayon.style.bottom = "2px";
                crayon.rendreCliquable(function () {
                    FenetreNouveauPicto.afficher(infoPicto);
                });
                conteneur.appendChild(crayon);
            };
            var this_2 = this;
            for (var _i = 0, liste_1 = liste; _i < liste_1.length; _i++) {
                var infoPicto = liste_1[_i];
                _loop_2(infoPicto);
            }
        };
        EditeurADV.prototype.selectionServeur = function (CODE, INFO) {
            var _this = this;
            if (this.conteneurSelectionServeur) {
                this.conteneurSelectionServeur.elementHTML.remove();
            }
            var type = INFO.l8();
            if (type == 1) {
                var theme = INFO.lChaine();
                var difficulte = INFO.l16();
                var centreCollisionX = INFO.lFloat();
                var centreCollisionY = INFO.lFloat();
                var rayonCollision = INFO.lFloat();
                var positionTeleportationX = INFO.lFloat();
                var positionTeleportationY = INFO.lFloat();
                this.conteneurSelectionServeur = new I_Conteneur_1.I_Conteneur();
                this.conteneurSelectionServeur.defLargeurMin(250);
                this.conteneurSelectionServeur.centrerAuto(0.5, 0.1);
                this.conteneurSelectionServeur.afficherFondUni("#000000" + "AA");
                var champTheme_1 = new I_ChampTexte_1.I_ChampTexte();
                var champDifficulte_1 = new I_ChampTexte_1.I_ChampTexte();
                var champCentreCollisionX_1 = new I_ChampTexte_1.I_ChampTexte("x");
                var champCentreCollisionY_1 = new I_ChampTexte_1.I_ChampTexte("y");
                var champRayonCollision_1 = new I_ChampTexte_1.I_ChampTexte();
                var champPointTeleportationX_1 = new I_ChampTexte_1.I_ChampTexte("x");
                var champPointTeleportationY_1 = new I_ChampTexte_1.I_ChampTexte("y");
                var validation = function () {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.defRencontre(CODE, champTheme_1.recupTexte(), parseInt(champDifficulte_1.recupTexte()), parseFloat(champCentreCollisionX_1.recupTexte()), parseFloat(champCentreCollisionY_1.recupTexte()), parseFloat(champRayonCollision_1.recupTexte()), parseFloat(champPointTeleportationX_1.recupTexte()), parseFloat(champPointTeleportationY_1.recupTexte())));
                    _this.selectionObjet(null);
                };
                champTheme_1.defTexte(theme).defActionEntree(validation, true).etirer();
                champDifficulte_1.defTexte(difficulte).defActionEntree(validation, true).etirer();
                champCentreCollisionX_1.defTexte(centreCollisionX).defActionEntree(validation, true).etirer();
                champCentreCollisionY_1.defTexte(centreCollisionY).defActionEntree(validation, true).etirer();
                champRayonCollision_1.defTexte(rayonCollision).defActionEntree(validation, true).etirer();
                champPointTeleportationX_1.defTexte(positionTeleportationX).defActionEntree(validation, true).etirer();
                champPointTeleportationY_1.defTexte(positionTeleportationY).defActionEntree(validation, true).etirer();
                this.conteneurSelectionServeur.nouvelleLigne(function (LIGNE) {
                    LIGNE.ajouterElement(new I_Texte_1.I_Texte("Thême :"));
                    LIGNE.ajouterElement(champTheme_1);
                });
                this.conteneurSelectionServeur.nouvelleLigne(function (LIGNE) {
                    LIGNE.ajouterElement(new I_Texte_1.I_Texte("Difficulté :"));
                    LIGNE.ajouterElement(champDifficulte_1);
                });
                this.conteneurSelectionServeur.nouvelleLigne(function (LIGNE) {
                    LIGNE.ajouterElement(new I_Texte_1.I_Texte("Centre collision :"));
                    LIGNE.ajouterElement(champCentreCollisionX_1);
                    LIGNE.ajouterElement(champCentreCollisionY_1);
                });
                this.conteneurSelectionServeur.nouvelleLigne(function (LIGNE) {
                    LIGNE.ajouterElement(new I_Texte_1.I_Texte("Rayon collision :"));
                    LIGNE.ajouterElement(champRayonCollision_1);
                });
                this.conteneurSelectionServeur.nouvelleLigne(function (LIGNE) {
                    LIGNE.ajouterElement(new I_Texte_1.I_Texte("Point téléportation:"));
                    LIGNE.ajouterElement(champPointTeleportationX_1);
                    LIGNE.ajouterElement(champPointTeleportationY_1);
                });
                TFMAdventure_1.default.instance.coucheInterface.appendChild(this.conteneurSelectionServeur.elementHTML);
                return;
            }
        };
        EditeurADV.prototype.selectionObjet = function (OBJET) {
            if (this.mobileInterieurEnCours) {
                OBJET = null;
            }
            if (this.selectionEnCours) {
                if (this.clipSelection.parent) {
                    this.clipSelection.parent.removeChild(this.clipSelection);
                }
            }
            if (this.conteneurSelectionServeur) {
                this.conteneurSelectionServeur.elementHTML.remove();
                this.conteneurSelectionServeur = null;
            }
            this.selectionEnCours = OBJET;
            if (this.selectionEnCours) {
                this.clipSelection.majSelection(this.selectionEnCours);
                this.selectionEnCours.addChild(this.clipSelection);
            }
            if (BarreOutilsEditeur.estAffiche()) {
                var teinture = this.selectionEnCours && this.selectionEnCours.infoCommune.teinture !== undefined ? this.selectionEnCours.infoCommune.teinture.toString(16) : "FFFFFF";
                if (teinture === undefined) {
                    teinture = "FFFFFF";
                }
                while (teinture.length < 6) {
                    teinture = "0" + teinture;
                }
                if (this.selectionEnCours && this.selectionEnCours.infoCommune.alpha !== undefined) {
                    var alphaChaine = (this.selectionEnCours.infoCommune.alpha * 0xFF).toString(16);
                    while (alphaChaine.length < 2) {
                        alphaChaine = "0" + alphaChaine;
                    }
                    teinture += alphaChaine;
                }
                else {
                    teinture += "FF";
                }
                BarreOutilsEditeur.instance.couleurElement.defTexte("#" + teinture.toUpperCase());
            }
            if (this.selectionEnCours) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.selectionEditeur(OBJET.identifiantMobile));
            }
        };
        EditeurADV.prototype.cliqueDroitElement = function (OBJET) {
            if (OBJET == this.mobileInterieurEnCours) {
                return;
            }
            if (Clavier_1.Clavier.shiftEnCours) {
                OBJET.visible = false;
                this.listeElementInvisible.push(OBJET);
            }
            else {
                if (OBJET instanceof MobileADV_1.MobileADV) {
                    this.modeInterieur(OBJET);
                }
            }
        };
        EditeurADV.prototype.modeInterieur = function (MOBILE) {
            var _this = this;
            this.selectionObjet(null);
            if (!this.fondMobileInterieur) {
                this.fondMobileInterieur = new PIXI.Graphics();
                this.fondMobileInterieur.beginFill(0, 0.5);
                this.fondMobileInterieur.drawRect(-10000, -10000, 20000, 20000);
                this.fondMobileInterieur.endFill();
                this.fondMobileInterieur.interactive = true;
                this.fondMobileInterieur.on("mousedown", function (EVT) {
                    if (EVT.data.button == 0) {
                        if (_this.monde.fonctionCurseur) {
                            _this.monde.fonctionCurseur(EVT);
                            return;
                        }
                    }
                });
            }
            if (this.mobileInterieurEnCours && this.mobileInterieurEnCours.listeMobileInterne) {
                for (var _i = 0, _a = this.mobileInterieurEnCours.listeMobileInterne; _i < _a.length; _i++) {
                    var clip = _a[_i];
                    if (clip instanceof ClipAnim_1.ClipAnim) {
                        clip.interactive = false;
                        clip.buttonMode = false;
                        clip.removeAllListeners("click");
                        clip.removeAllListeners("mouseover");
                        clip.removeAllListeners("mouseout");
                    }
                }
                this.monde.coucheMobile.addChildAt(this.mobileInterieurEnCours, 0);
            }
            if (this.fondMobileInterieur.parent) {
                this.fondMobileInterieur.parent.removeChild(this.fondMobileInterieur);
            }
            if (this.mobileInterieurEnCours) {
                this.mobileInterieurEnCours.parent.removeChild(this.mobileInterieurEnCours);
                this.monde.coucheMobile.addChildAt(this.mobileInterieurEnCours, 0);
                this.monde.trierMobile(this.mobileInterieurEnCours);
            }
            this.mobileInterieurEnCours = null;
            if (MOBILE) {
                MOBILE.rendreCliquable(null);
                this.mobileInterieurEnCours = MOBILE;
                MOBILE.addChildAt(this.fondMobileInterieur, 0);
                this.monde.coucheMobileInterface.addChild(MOBILE);
                if (MOBILE.listeMobileInterne) {
                    var _loop_3 = function (clip) {
                        var clipAnim = clip;
                        clipAnim.interactive = true;
                        clipAnim.buttonMode = true;
                        clipAnim.on("click", function () {
                            if (_this.clipSelection.parent) {
                                _this.clipSelection.parent.removeChild(_this.clipSelection);
                            }
                            _this.clipSelection.majSelection(clipAnim);
                            clipAnim.addChild(_this.clipSelection);
                        });
                        clipAnim.on("mouseover", function () {
                            clipAnim.filters = [Couleur_1.Couleur.filtreLumiere];
                        });
                        clipAnim.on("mouseout", function () {
                            clipAnim.filters = null;
                        });
                    };
                    for (var _b = 0, _c = MOBILE.listeMobileInterne; _b < _c.length; _b++) {
                        var clip = _c[_b];
                        _loop_3(clip);
                    }
                }
            }
        };
        EditeurADV.prototype.majListePicto = function (LISTE) {
            var modeLumiere = MondeADV_1.MondeADV.instance.modeAffichageLumiere;
            var activationMobile = EditeurADV.estAffiche() && !MondeADV_1.MondeADV.instance.curseurAplat && !MondeADV_1.MondeADV.instance.curseurMobile;
            var activationAplat = activationMobile && MondeADV_1.MondeADV.instance.modeAerien && !this.modeLumiere;
            if (this.modeVoyage || this.modeDessin) {
                modeLumiere = false;
                activationMobile = false;
                activationAplat = false;
            }
            for (var _i = 0, LISTE_1 = LISTE; _i < LISTE_1.length; _i++) {
                var secteur = LISTE_1[_i];
                for (var _a = 0, _b = secteur.listeMobile; _a < _b.length; _a++) {
                    var mobile = _b[_a];
                    var activer = activationMobile;
                    if (modeLumiere && !mobile.infoCommune.lumiere) {
                        activer = false;
                    }
                    if (activationAplat) {
                        activer = false;
                    }
                    if (activer) {
                        mobile.rendreCliquable(this.selectionObjet, this.cliqueDroitElement);
                    }
                    else {
                        mobile.rendreCliquable(null);
                    }
                }
                for (var _c = 0, _d = secteur.listeAplat; _c < _d.length; _c++) {
                    var aplat = _d[_c];
                    var activer = activationAplat;
                    if (modeLumiere && !aplat.infoCommune.lumiere) {
                        activer = false;
                    }
                    if (activer) {
                        aplat.rendreCliquable(this.selectionObjet, this.cliqueDroitElement);
                    }
                    else {
                        aplat.rendreCliquable(null);
                    }
                }
            }
        };
        EditeurADV.prototype.changerProfondeurAplat = function (APLAT, DIRECTION) {
            var liste = APLAT.parent.children;
            var index = liste.indexOf(APLAT);
            var rectAplat = APLAT.getBounds();
            var indexBase = index;
            var cibleFinale;
            if (index != -1) {
                while (true) {
                    index += DIRECTION;
                    var cible = liste[index];
                    if (!cible) {
                        return;
                    }
                    if (!(cible instanceof AplatADV_1.AplatADV)) {
                        continue;
                    }
                    var rectCible = cible.getBounds();
                    if (rectCible.x > rectAplat.x + rectAplat.width || rectCible.x + rectCible.width < rectAplat.x
                        || rectCible.y > rectAplat.y + rectAplat.height || rectCible.y + rectCible.height < rectAplat.y) {
                        continue;
                    }
                    cibleFinale = cible;
                    break;
                }
            }
            if (cibleFinale) {
                var conteneur = APLAT.parent;
                conteneur.removeChild(APLAT);
                var index_1 = conteneur.getChildIndex(cibleFinale);
                conteneur.addChildAt(APLAT, DIRECTION > 0 ? index_1 + DIRECTION : index_1);
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.profondeurAplat(APLAT.identifiantMobile, cibleFinale.identifiantMobile, DIRECTION));
            }
        };
        EditeurADV.prototype.debutModeVoyage = function (EVT) {
            window.onmousemove = this.boucleModeVoyage;
            window.onmouseup = this.finModeVoyage;
            this.voyageDepart = new PIXI.Point(EVT.clientX, EVT.clientY);
            this.voyageDepartSouris = MobileADV_1.MobileADV.joueurPrincipal.positionServeur.clone();
            document.body.style.cursor = "grabbing";
        };
        EditeurADV.prototype.boucleModeVoyage = function (EVT) {
            var dx = (EVT.clientX - this.voyageDepart.x) * 2;
            var dy = (EVT.clientY - this.voyageDepart.y) * 2;
            MobileADV_1.MobileADV.joueurPrincipal.positionServeur.x = MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.x = this.voyageDepartSouris.x - dx;
            MobileADV_1.MobileADV.joueurPrincipal.positionServeur.y = MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.y = this.voyageDepartSouris.y - dy;
            this.monde.trierMobile(MobileADV_1.MobileADV.joueurPrincipal);
            this.monde.majPositionCamera();
        };
        EditeurADV.prototype.finModeVoyage = function () {
            window.onmousemove = null;
            window.onmouseup = null;
            document.body.style.cursor = this.modeVoyage ? "grab" : "auto";
            MobileADV_1.MobileADV.synchronisationJoueurPrincipal(MobileADV_1.MobileADV.joueurPrincipal.positionServeur, 255);
        };
        EditeurADV.prototype.debutModeDessin = function (EVT) {
            switch (EVT.button) {
                case 0:
                case 2:
                    this.modeEffaceurDessin = EVT.button == 2;
                    window.onmousemove = this.boucleModeDessin;
                    window.onmouseup = this.finModeDessin;
                    this.posDessin = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(EVT.clientX, EVT.clientY);
                    break;
            }
        };
        EditeurADV.prototype.boucleModeDessin = function (EVT) {
            var pos = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(EVT.clientX, EVT.clientY);
            if (this.modeEffaceurDessin) {
                for (var i = 0, nb = MondeADV_1.MondeADV.instance.coucheDessin.children.length; i < nb; i++) {
                    var dessin = MondeADV_1.MondeADV.instance.coucheDessin.children[i];
                    var distance = Mathematiques_1.default.distance2Points(dessin.position3d.x, dessin.position3d.z, pos.x, pos.y);
                    if (distance < 100) {
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.supprDessinEditeur(dessin["idDessin"]));
                        MondeADV_1.MondeADV.instance.coucheDessin.removeChild(dessin);
                        i--;
                        nb--;
                    }
                }
            }
            else {
                var distance = Mathematiques_1.default.distance2Points(pos.x, pos.y, this.posDessin.x, this.posDessin.y);
                if (distance > 20) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.dessinEditeur(this.posDessin.x, this.posDessin.y, pos.x, pos.y, this.couleurDessin));
                    this.posDessin.x = pos.x;
                    this.posDessin.y = pos.y;
                }
            }
        };
        EditeurADV.prototype.finModeDessin = function () {
            window.onmousemove = null;
            window.onmouseup = null;
        };
        EditeurADV.prototype.debutModeLumiere = function () {
            this.modeLumiere = true;
            TFMAdventure_1.default.instance.messageChat("Mode lumière activé", "-", null);
            MondeADV_1.MondeADV.instance.coucheMobile.interactive = true;
            MondeADV_1.MondeADV.instance.coucheMobile.interactiveChildren = false;
            MondeADV_1.MondeADV.instance.coucheRectangleLumiere.visible = true;
            window.onmousemove = this.boucleModeLumiere;
            MondeADV_1.MondeADV.instance.addListener("mousedown", this.enfoncerClicModeLumiere);
            MondeADV_1.MondeADV.instance.addListener("mouseup", this.relacherClicModeLumiere);
            MondeADV_1.MondeADV.instance.addListener("rightclick", this.clicDroitModeLumiere);
            InterfaceLumiere.afficher(null);
            this.genererRectanglesLumiere(null);
        };
        EditeurADV.prototype.finModeLumiere = function () {
            this.modeLumiere = false;
            TFMAdventure_1.default.instance.messageChat(Trad801_1.default.trad("Mode lumière désactivé"), "-", null);
            document.body.style.cursor = "";
            MondeADV_1.MondeADV.instance.coucheMobile.interactiveChildren = true;
            for (var _i = 0, _a = MondeADV_1.MondeADV.instance.coucheRectangleLumiere.children; _i < _a.length; _i++) {
                var sprite = _a[_i];
                if (sprite instanceof PIXI.projection.Sprite3d) {
                    sprite.texture.destroy(true);
                }
            }
            MondeADV_1.MondeADV.instance.coucheRectangleLumiere.removeChildren();
            MondeADV_1.MondeADV.instance.coucheRectangleLumiere.visible = false;
            this.rectangleLumiereEnCours = null;
            MondeADV_1.MondeADV.instance.removeListener("mousedown", this.enfoncerClicModeLumiere);
            MondeADV_1.MondeADV.instance.removeListener("mouseup", this.relacherClicModeLumiere);
            MondeADV_1.MondeADV.instance.removeListener("rightclick", this.clicDroitModeLumiere);
            window.onmousemove = null;
            InterfaceLumiere.masquer();
        };
        EditeurADV.prototype.enfoncerClicModeLumiere = function (EVT) {
            var position = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(EVT.data.global.x, EVT.data.global.y);
            switch (EVT.data.button) {
                case 0:
                    var rect = this.trouverRectangleSousSouris(position.x, position.y);
                    if (rect) {
                        this.rectangleLumiereEnCours = rect;
                        var x = Math.min(this.rectangleLumiereEnCours.x1, this.rectangleLumiereEnCours.x2);
                        var y = Math.min(this.rectangleLumiereEnCours.y1, this.rectangleLumiereEnCours.y2);
                        var largeur = Math.abs(this.rectangleLumiereEnCours.x1 - this.rectangleLumiereEnCours.x2);
                        var hauteur = Math.abs(this.rectangleLumiereEnCours.y1 - this.rectangleLumiereEnCours.y2);
                        this.rectangleLumiereEnCours.sprite = EditeurADV.dessinerRectangleLumiere(x, y, largeur, hauteur, rect.couleur);
                    }
                    else if (!this.rectangleLumiereEnCours) {
                        var sprite = EditeurADV.dessinerRectangleLumiere(position.x, position.y, 0, 0, InterfaceLumiere.instance.couleur);
                        this.rectangleLumiereEnCours = {
                            x1: position.x,
                            y1: position.y,
                            x2: position.x,
                            y2: position.y,
                            couleur: InterfaceLumiere.instance.couleur,
                            marge: InterfaceLumiere.instance.marge,
                            sprite: sprite
                        };
                    }
                    break;
            }
        };
        EditeurADV.prototype.clicDroitModeLumiere = function (EVT) {
            var position = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(EVT.data.global.x, EVT.data.global.y);
            var indiceRect = this.trouverRectanglesLumiereMonde(position.x, position.y, true);
            InterfaceLumiere.afficher(null);
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.majRectanglesLumiere(MondeADV_1.MondeADV.instance.rectanglesLumiereMonde));
        };
        EditeurADV.prototype.relacherClicModeLumiere = function (EVT) {
            var position = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(EVT.data.global.x, EVT.data.global.y);
            switch (EVT.data.button) {
                case 0:
                    var indiceRect = null;
                    var rect = null;
                    if (this.rectangleLumiereEnCours != null && Math.abs(this.rectangleLumiereEnCours.x1 - this.rectangleLumiereEnCours.x2) > 50 && Math.abs(this.rectangleLumiereEnCours.y1 - this.rectangleLumiereEnCours.y2) > 50) {
                        rect = {};
                        rect.x = Math.min(this.rectangleLumiereEnCours.x1, this.rectangleLumiereEnCours.x2);
                        rect.y = Math.min(this.rectangleLumiereEnCours.y1, this.rectangleLumiereEnCours.y2);
                        rect.largeur = Math.abs(this.rectangleLumiereEnCours.x1 - this.rectangleLumiereEnCours.x2);
                        rect.hauteur = Math.abs(this.rectangleLumiereEnCours.y1 - this.rectangleLumiereEnCours.y2);
                        rect.couleur = this.rectangleLumiereEnCours.couleur;
                        rect.marge = this.rectangleLumiereEnCours.marge;
                        indiceRect = MondeADV_1.MondeADV.instance.rectanglesLumiereMonde.length;
                        MondeADV_1.MondeADV.instance.rectanglesLumiereMonde.push(rect);
                        this.genererRectanglesLumiere(indiceRect);
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.majRectanglesLumiere(MondeADV_1.MondeADV.instance.rectanglesLumiereMonde));
                    }
                    else {
                        indiceRect = this.trouverRectanglesLumiereMonde(position.x, position.y);
                        rect = MondeADV_1.MondeADV.instance.rectanglesLumiereMonde[indiceRect];
                    }
                    if (this.rectangleLumiereEnCours && this.rectangleLumiereEnCours.sprite && this.rectangleLumiereEnCours.sprite.parent) {
                        this.rectangleLumiereEnCours.sprite.parent.removeChild(this.rectangleLumiereEnCours.sprite);
                    }
                    this.rectangleLumiereEnCours = null;
                    if (indiceRect != null) {
                        this.genererRectanglesLumiere(indiceRect);
                        InterfaceLumiere.afficher(indiceRect);
                    }
                    break;
            }
        };
        EditeurADV.prototype.trouverRectanglesLumiereMonde = function (POS_X, POS_Y, SUPPRIMER) {
            if (SUPPRIMER === void 0) { SUPPRIMER = false; }
            for (var i = 0; i < MondeADV_1.MondeADV.instance.rectanglesLumiereMonde.length; i++) {
                var rect = MondeADV_1.MondeADV.instance.rectanglesLumiereMonde[i];
                if (POS_X >= rect.x && POS_X <= rect.x + rect.largeur && POS_Y >= rect.y && POS_Y <= rect.y + rect.hauteur) {
                    if (SUPPRIMER) {
                        MondeADV_1.MondeADV.instance.rectanglesLumiereMonde.splice(i, 1);
                    }
                    return i;
                }
            }
            return null;
        };
        EditeurADV.prototype.trouverRectangleSousSouris = function (POS_X, POS_Y) {
            for (var i = 0; i < MondeADV_1.MondeADV.instance.rectanglesLumiereMonde.length; i++) {
                var rect = MondeADV_1.MondeADV.instance.rectanglesLumiereMonde[i];
                var dx1 = Math.abs(rect.x - POS_X);
                var dx2 = Math.abs(rect.x + rect.largeur - POS_X);
                var dy1 = Math.abs(rect.y - POS_Y);
                var dy2 = Math.abs(rect.y + rect.hauteur - POS_Y);
                var rect2 = void 0;
                if (dx1 < 10 && dy1 < 10) {
                    rect2 = {
                        x1: rect.x + rect.largeur,
                        y1: rect.y + rect.hauteur,
                        x2: rect.x,
                        y2: rect.y,
                        couleur: rect.couleur,
                        marge: rect.marge,
                        sprite: null
                    };
                }
                else if (dx1 < 10 && dy2 < 10) {
                    rect2 = {
                        x1: rect.x + rect.largeur,
                        y1: rect.y,
                        x2: rect.x,
                        y2: rect.y + rect.hauteur,
                        couleur: rect.couleur,
                        marge: rect.marge,
                        sprite: null
                    };
                }
                else if (dx2 < 10 && dy1 < 10) {
                    rect2 = {
                        x1: rect.x,
                        y1: rect.y + rect.hauteur,
                        x2: rect.x + rect.largeur,
                        y2: rect.y,
                        couleur: rect.couleur,
                        marge: rect.marge,
                        sprite: null
                    };
                }
                else if (dx2 < 10 && dy2 < 10) {
                    rect2 = {
                        x1: rect.x,
                        y1: rect.y,
                        x2: rect.x + rect.largeur,
                        y2: rect.y + rect.hauteur,
                        couleur: rect.couleur,
                        marge: rect.marge,
                        sprite: null
                    };
                }
                else {
                    continue;
                }
                MondeADV_1.MondeADV.instance.rectanglesLumiereMonde.splice(i, 1);
                this.genererRectanglesLumiere();
                return rect2;
            }
            return null;
        };
        EditeurADV.prototype.boucleModeLumiere = function (EVT) {
            var position = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(EVT.clientX, EVT.clientY);
            if (this.rectangleLumiereEnCours) {
                this.rectangleLumiereEnCours.x2 = position.x;
                this.rectangleLumiereEnCours.y2 = position.y;
                if (this.rectangleLumiereEnCours.sprite && this.rectangleLumiereEnCours.sprite.parent) {
                    if (this.rectangleLumiereEnCours.sprite instanceof PIXI.projection.Sprite3d) {
                        this.rectangleLumiereEnCours.sprite.texture.destroy(true);
                    }
                    this.rectangleLumiereEnCours.sprite.parent.removeChild(this.rectangleLumiereEnCours.sprite);
                }
                var x = Math.min(this.rectangleLumiereEnCours.x1, this.rectangleLumiereEnCours.x2);
                var y = Math.min(this.rectangleLumiereEnCours.y1, this.rectangleLumiereEnCours.y2);
                var largeur = Math.abs(this.rectangleLumiereEnCours.x1 - this.rectangleLumiereEnCours.x2);
                var hauteur = Math.abs(this.rectangleLumiereEnCours.y1 - this.rectangleLumiereEnCours.y2);
                this.rectangleLumiereEnCours.sprite = EditeurADV.dessinerRectangleLumiere(x, y, largeur, hauteur, this.rectangleLumiereEnCours.couleur, true);
            }
        };
        EditeurADV.prototype.genererRectanglesLumiere = function (INDICE_SELECTION) {
            if (INDICE_SELECTION == undefined) {
                INDICE_SELECTION = InterfaceLumiere.instance.indiceRect;
            }
            for (var _i = 0, _a = MondeADV_1.MondeADV.instance.coucheRectangleLumiere.children; _i < _a.length; _i++) {
                var sprite = _a[_i];
                if (sprite instanceof PIXI.projection.Sprite3d) {
                    sprite.texture.destroy(true);
                }
            }
            MondeADV_1.MondeADV.instance.coucheRectangleLumiere.removeChildren();
            for (var i = 0; i < MondeADV_1.MondeADV.instance.rectanglesLumiereMonde.length; i++) {
                var rect = MondeADV_1.MondeADV.instance.rectanglesLumiereMonde[i];
                EditeurADV.dessinerRectangleLumiere(rect.x, rect.y, rect.largeur, rect.hauteur, rect.couleur, i == INDICE_SELECTION);
            }
        };
        EditeurADV.dessinerRectangleLumiere = function (X, Y, LARGEUR, HAUTEUR, COULEUR, SELECTION) {
            if (SELECTION === void 0) { SELECTION = false; }
            var dessin = new PIXI.Graphics();
            dessin.lineStyle(4, COULEUR);
            dessin.beginFill(COULEUR, SELECTION ? 0.4 : 0.2);
            dessin.drawRect(0, 0, LARGEUR, HAUTEUR);
            dessin.endFill();
            var clip = new PIXI.projection.Sprite3d(dessin.generateCanvasTexture());
            clip.euler.x = Math.PI / 2;
            clip.position3d.x = X;
            clip.position3d.z = Y;
            MondeADV_1.MondeADV.instance.coucheRectangleLumiere.addChild(clip);
            return clip;
        };
        EditeurADV.prototype.debutModeCollision = function () {
            var _this = this;
            this.modeCollision = true;
            TFMAdventure_1.default.instance.messageChat(Trad801_1.default.trad("$editeur.modeCollisionActive"), "-", null);
            MondeADV_1.MondeADV.instance.coucheSol.interactiveChildren = false;
            MondeADV_1.MondeADV.instance.coucheEau.interactiveChildren = false;
            MondeADV_1.MondeADV.instance.coucheMobile.interactiveChildren = false;
            MondeADV_1.MondeADV.instance.coucheCollision.visible = true;
            MondeADV_1.MondeADV.instance.itererCollisions(function (SEGMENT) {
                _this.monde.ajouterSegmentCollisionEditeur(SEGMENT.x, SEGMENT.y, SEGMENT.x + SEGMENT.dx, SEGMENT.y + SEGMENT.dy, SEGMENT.identifiant);
            });
            window.addEventListener("mousedown", this.clicModeCollision);
            window.addEventListener("mousemove", this.boucleModeCollision);
            window.addEventListener("mouseup", this.relachementClicModeCollision);
        };
        EditeurADV.prototype.ajouterCollision = function (X1, Y1, X2, Y2, IDENTIFIANT) {
            var spriteCollision = EditeurADV.creerSpriteCollision(X1, Y1, X2, Y2);
            MondeADV_1.MondeADV.instance.coucheCollision.addChild(spriteCollision);
            this.indexSpritesCollisions[IDENTIFIANT] = spriteCollision;
        };
        EditeurADV.creerSpriteCollision = function (X1, Y1, X2, Y2) {
            var sprite = new SpriteCollision(X1, Y1, X2, Y2);
            EditeurADV.modifierExtremitesSpriteCollision(sprite, X1, Y1, X2, Y2);
            return sprite;
        };
        EditeurADV.modifierExtremitesSpriteCollision = function (SPRITE_COLLISION, X_DEPART, Y_DEPART, X_ARRIVEE, Y_ARRIVEE) {
            SPRITE_COLLISION.def(X_DEPART, Y_DEPART, X_ARRIVEE, Y_ARRIVEE);
            SPRITE_COLLISION.correct = Mathematiques_1.default.distanceCarre(X_DEPART, Y_DEPART, X_ARRIVEE, Y_ARRIVEE) >= EditeurADV.LONGUEUR_CARRE_MINIMALE_COLLISION;
        };
        EditeurADV.accepterModificationExtremiteCollision = function (INFO_EXTREMITE, X, Y) {
            for (var _i = 0, _a = INFO_EXTREMITE.infosCollisionsConcernees; _i < _a.length; _i++) {
                var infoCollision = _a[_i];
                var collision = infoCollision.segment;
                var nouveauXDepart = infoCollision.depart ? X : collision.x;
                var nouveauYDepart = infoCollision.depart ? Y : collision.y;
                var nouveauXArrivee = infoCollision.depart ? collision.x + collision.dx : X;
                var nouveauYArrivee = infoCollision.depart ? collision.y + collision.dy : Y;
                if (Mathematiques_1.default.distanceCarre(nouveauXDepart, nouveauYDepart, nouveauXArrivee, nouveauYArrivee) < EditeurADV.LONGUEUR_CARRE_MINIMALE_COLLISION) {
                    return false;
                }
            }
            return true;
        };
        EditeurADV.prototype.majStatutFermetureCollision = function (IDENTIFIANT, FERME) {
            var spriteCollision = this.indexSpritesCollisions[IDENTIFIANT];
            if (!spriteCollision) {
                return;
            }
            spriteCollision.ferme = FERME;
        };
        EditeurADV.prototype.modifierExtremiteCollision = function (INFO_EXTREMITE, X, Y) {
            for (var _i = 0, _a = INFO_EXTREMITE.infosCollisionsConcernees; _i < _a.length; _i++) {
                var infoCollision = _a[_i];
                var collision = infoCollision.segment;
                var spriteCollision = this.indexSpritesCollisions[collision.identifiant];
                var nouveauXDepart = infoCollision.depart ? X : collision.x;
                var nouveauYDepart = infoCollision.depart ? Y : collision.y;
                var nouveauXArrivee = infoCollision.depart ? collision.x + collision.dx : X;
                var nouveauYArrivee = infoCollision.depart ? collision.y + collision.dy : Y;
                EditeurADV.modifierExtremitesSpriteCollision(spriteCollision, nouveauXDepart, nouveauYDepart, nouveauXArrivee, nouveauYArrivee);
            }
        };
        EditeurADV.prototype.boucleModeCollision = function (EVT) {
            var position = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(EVT.clientX, EVT.clientY);
            var spriteExtremiteCollision = this.recupSpriteExtremiteCollision();
            var extremiteCollisionProche = this.monde.trouverExtremiteCollisionProche(position.x, position.y, 10);
            if (extremiteCollisionProche && this.peutAfficherSpriteExtremiteCollisionProche(extremiteCollisionProche.x, extremiteCollisionProche.y)) {
                spriteExtremiteCollision.position3d.x = extremiteCollisionProche.x;
                spriteExtremiteCollision.position3d.z = extremiteCollisionProche.y;
                this.monde.coucheCollision.addChild(spriteExtremiteCollision);
            }
            else {
                if (spriteExtremiteCollision.parent) {
                    spriteExtremiteCollision.parent.removeChild(spriteExtremiteCollision);
                }
            }
            this.extremiteCollisionProche = extremiteCollisionProche;
            if (this.infoConstructionCollisionEnCours) {
                this.boucleConstructionCollision(position.x, position.y);
            }
            if (this.infoExtremiteCollisionEnCoursDEdition) {
                this.boucleDeplacementExtremiteCollision(position.x, position.y);
            }
            if (this.suppressionCollisionsEnCours) {
                var collisionsASupprimer = this.monde.trouverCollisionsProches(position.x, position.y, 10);
                if (collisionsASupprimer.length > 0) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeRetraitCollisions(collisionsASupprimer));
                }
            }
            var nouveauCurseur = this.determinerCurseurModeCollision(position.x, position.y, EVT.ctrlKey, false, false);
            if (document.body.style.cursor !== nouveauCurseur) {
                document.body.style.cursor = nouveauCurseur;
            }
        };
        EditeurADV.prototype.determinerCurseurModeCollision = function (X, Y, CTRL, CLIC, CHANGEMENT_ETAT) {
            if (this.infoExtremiteCollisionEnCoursDEdition) {
                var xPointCible = void 0;
                var yPointCible = void 0;
                if (this.extremiteCollisionProche && (this.extremiteCollisionProche.x != this.infoExtremiteCollisionEnCoursDEdition.x || this.extremiteCollisionProche.y != this.infoExtremiteCollisionEnCoursDEdition.y)) {
                    xPointCible = this.extremiteCollisionProche.x;
                    yPointCible = this.extremiteCollisionProche.y;
                }
                else {
                    xPointCible = X;
                    yPointCible = Y;
                }
                if ((CLIC && CHANGEMENT_ETAT) || EditeurADV.accepterModificationExtremiteCollision(this.infoExtremiteCollisionEnCoursDEdition, xPointCible, yPointCible)) {
                    return "grabbing";
                }
                return "not-allowed";
            }
            if (this.infoConstructionCollisionEnCours) {
                var xPointCible = void 0;
                var yPointCible = void 0;
                if (this.extremiteCollisionProche && (this.extremiteCollisionProche.x != this.infoConstructionCollisionEnCours.depart.x || this.extremiteCollisionProche.y != this.infoConstructionCollisionEnCours.depart.y)) {
                    xPointCible = this.extremiteCollisionProche.x;
                    yPointCible = this.extremiteCollisionProche.y;
                }
                else {
                    xPointCible = X;
                    yPointCible = Y;
                }
                if ((CLIC && CHANGEMENT_ETAT) || Mathematiques_1.default.distanceCarre(this.infoConstructionCollisionEnCours.depart.x, this.infoConstructionCollisionEnCours.depart.y, xPointCible, yPointCible) >= EditeurADV.LONGUEUR_CARRE_MINIMALE_COLLISION) {
                    return "grabbing";
                }
                return "not-allowed";
            }
            if (this.suppressionCollisionsEnCours) {
                return "crosshair";
            }
            if (CTRL) {
                return "crosshair";
            }
            if (this.extremiteCollisionProche) {
                return "move";
            }
            return "auto";
        };
        EditeurADV.prototype.clicModeCollision = function (EVT) {
            var position;
            if (this.extremiteCollisionProche) {
                position = new PIXI.Point(this.extremiteCollisionProche.x, this.extremiteCollisionProche.y);
            }
            else {
                position = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(EVT.clientX, EVT.clientY);
            }
            var changementEtat = false;
            switch (EVT.button) {
                case 0:
                    if (EVT.ctrlKey && !this.infoConstructionCollisionEnCours) {
                        var spriteCollision = EditeurADV.creerSpriteCollision(position.x, position.y, position.x, position.y);
                        MondeADV_1.MondeADV.instance.coucheCollision.addChild(spriteCollision);
                        this.infoConstructionCollisionEnCours = new InfoConstructionCollision(position, spriteCollision);
                        changementEtat = true;
                    }
                    else if (this.infoConstructionCollisionEnCours) {
                        if (Mathematiques_1.default.distanceCarre(this.infoConstructionCollisionEnCours.depart.x, this.infoConstructionCollisionEnCours.depart.y, position.x, position.y) >= EditeurADV.LONGUEUR_CARRE_MINIMALE_COLLISION) {
                            MondeADV_1.MondeADV.instance.coucheCollision.removeChild(this.infoConstructionCollisionEnCours.sprite);
                            TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeAjoutCollision(this.infoConstructionCollisionEnCours.depart.x, this.infoConstructionCollisionEnCours.depart.y, position.x, position.y));
                            this.infoConstructionCollisionEnCours = null;
                            if (EVT.ctrlKey) {
                                var spriteCollision = EditeurADV.creerSpriteCollision(position.x, position.y, position.x, position.y);
                                MondeADV_1.MondeADV.instance.coucheCollision.addChild(spriteCollision);
                                this.infoConstructionCollisionEnCours = new InfoConstructionCollision(position, spriteCollision);
                            }
                            changementEtat = true;
                        }
                    }
                    else if (!EVT.ctrlKey && !this.infoExtremiteCollisionEnCoursDEdition && this.extremiteCollisionProche) {
                        this.infoExtremiteCollisionEnCoursDEdition = this.monde.extraireInfoExtremiteCollision(this.extremiteCollisionProche.x, this.extremiteCollisionProche.y);
                        changementEtat = true;
                    }
                    break;
                case 2:
                    if (!this.infoConstructionCollisionEnCours && !this.infoExtremiteCollisionEnCoursDEdition) {
                        if (this.extremiteCollisionProche) {
                            this.extremiteCollisionProche = null;
                        }
                        if (this.spriteExtremiteCollision && this.spriteExtremiteCollision.parent) {
                            this.spriteExtremiteCollision.parent.removeChild(this.spriteExtremiteCollision);
                        }
                        this.suppressionCollisionsEnCours = true;
                    }
                    break;
            }
            var nouveauCurseur = this.determinerCurseurModeCollision(position.x, position.y, EVT.ctrlKey, true, changementEtat);
            if (document.body.style.cursor !== nouveauCurseur) {
                document.body.style.cursor = nouveauCurseur;
            }
        };
        EditeurADV.prototype.relachementClicModeCollision = function (EVT) {
            switch (EVT.button) {
                case 0:
                    if (this.infoExtremiteCollisionEnCoursDEdition) {
                        var position = void 0;
                        if (this.extremiteCollisionProche) {
                            position = new PIXI.Point(this.extremiteCollisionProche.x, this.extremiteCollisionProche.y);
                        }
                        else {
                            position = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(EVT.clientX, EVT.clientY);
                        }
                        this.modifierExtremiteCollision(this.infoExtremiteCollisionEnCoursDEdition, this.infoExtremiteCollisionEnCoursDEdition.x, this.infoExtremiteCollisionEnCoursDEdition.y);
                        if (EditeurADV.accepterModificationExtremiteCollision(this.infoExtremiteCollisionEnCoursDEdition, position.x, position.y)) {
                            TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeModificationExtremitesCollision(this.infoExtremiteCollisionEnCoursDEdition, position.x, position.y));
                        }
                        this.infoExtremiteCollisionEnCoursDEdition = null;
                        var nouveauCurseur = this.determinerCurseurModeCollision(position.x, position.y, EVT.ctrlKey, true, true);
                        if (document.body.style.cursor !== nouveauCurseur) {
                            document.body.style.cursor = nouveauCurseur;
                        }
                    }
                    break;
                case 2:
                    this.suppressionCollisionsEnCours = false;
                    break;
            }
        };
        EditeurADV.prototype.boucleConstructionCollision = function (X, Y) {
            var xPointCible;
            var yPointCible;
            if (this.extremiteCollisionProche && (this.extremiteCollisionProche.x != this.infoConstructionCollisionEnCours.depart.x || this.extremiteCollisionProche.y != this.infoConstructionCollisionEnCours.depart.y)) {
                xPointCible = this.extremiteCollisionProche.x;
                yPointCible = this.extremiteCollisionProche.y;
            }
            else {
                xPointCible = X;
                yPointCible = Y;
            }
            this.infoConstructionCollisionEnCours.sprite.correct = Mathematiques_1.default.distanceCarre(this.infoConstructionCollisionEnCours.depart.x, this.infoConstructionCollisionEnCours.depart.y, xPointCible, yPointCible) >= EditeurADV.LONGUEUR_CARRE_MINIMALE_COLLISION;
            EditeurADV.modifierExtremitesSpriteCollision(this.infoConstructionCollisionEnCours.sprite, this.infoConstructionCollisionEnCours.depart.x, this.infoConstructionCollisionEnCours.depart.y, xPointCible, yPointCible);
        };
        EditeurADV.prototype.boucleDeplacementExtremiteCollision = function (X, Y) {
            var xPointCible;
            var yPointCible;
            if (this.extremiteCollisionProche && (this.extremiteCollisionProche.x != this.infoExtremiteCollisionEnCoursDEdition.x || this.extremiteCollisionProche.y != this.infoExtremiteCollisionEnCoursDEdition.y)) {
                xPointCible = this.extremiteCollisionProche.x;
                yPointCible = this.extremiteCollisionProche.y;
            }
            else {
                xPointCible = X;
                yPointCible = Y;
            }
            this.modifierExtremiteCollision(this.infoExtremiteCollisionEnCoursDEdition, xPointCible, yPointCible);
        };
        EditeurADV.prototype.recupSpriteExtremiteCollision = function () {
            if (!this.spriteExtremiteCollision) {
                this.spriteExtremiteCollision = EditeurADV.creerSpriteExtremiteCollision();
            }
            return this.spriteExtremiteCollision;
        };
        EditeurADV.creerSpriteExtremiteCollision = function () {
            var dessin = new PIXI.Graphics();
            dessin.lineStyle(2, 0x000000);
            dessin.beginFill(EditeurADV.COULEUR_SPRITE_EXTREMITE_COLLISION);
            dessin.drawCircle(0, 0, 8);
            dessin.endFill();
            var spriteExtremite = new PIXI.projection.Sprite3d(dessin.generateCanvasTexture());
            spriteExtremite.anchor.x = 0.5;
            spriteExtremite.anchor.y = 0.5;
            spriteExtremite.euler.x = Math.PI * 0.5;
            return spriteExtremite;
        };
        EditeurADV.prototype.peutAfficherSpriteExtremiteCollisionProche = function (X, Y) {
            return (!this.infoConstructionCollisionEnCours || X !== this.infoConstructionCollisionEnCours.depart.x && Y !== this.infoConstructionCollisionEnCours.depart.y)
                && (!this.infoExtremiteCollisionEnCoursDEdition || X !== this.infoExtremiteCollisionEnCoursDEdition.x && Y !== this.infoExtremiteCollisionEnCoursDEdition.y)
                && !this.suppressionCollisionsEnCours;
        };
        EditeurADV.prototype.modifierCollision = function (IDENTIFIANT, X1, Y1, X2, Y2) {
            var spriteCollision = this.indexSpritesCollisions[IDENTIFIANT];
            if (!spriteCollision) {
                return;
            }
            EditeurADV.modifierExtremitesSpriteCollision(spriteCollision, X1, Y1, X2, Y2);
        };
        EditeurADV.prototype.retirerCollision = function (IDENTIFIANT) {
            var spriteCollision = this.indexSpritesCollisions[IDENTIFIANT];
            if (!spriteCollision) {
                return;
            }
            if (spriteCollision.parent) {
                spriteCollision.parent.removeChild(spriteCollision);
            }
            delete this.indexSpritesCollisions[IDENTIFIANT];
        };
        EditeurADV.prototype.finModeCollision = function () {
            this.modeCollision = false;
            TFMAdventure_1.default.instance.messageChat(Trad801_1.default.trad("$editeur.modeCollisionDesactive"), "-", null);
            document.body.style.cursor = "";
            MondeADV_1.MondeADV.instance.coucheSol.interactiveChildren = true;
            MondeADV_1.MondeADV.instance.coucheEau.interactiveChildren = true;
            MondeADV_1.MondeADV.instance.coucheMobile.interactiveChildren = true;
            for (var idCollision in this.indexSpritesCollisions) {
                this.retirerCollision(idCollision);
            }
            MondeADV_1.MondeADV.instance.coucheCollision.removeChildren();
            MondeADV_1.MondeADV.instance.coucheCollision.visible = false;
            this.suppressionCollisionsEnCours = false;
            this.infoConstructionCollisionEnCours = null;
            this.infoExtremiteCollisionEnCoursDEdition = null;
            window.removeEventListener("mousedown", this.clicModeCollision);
            window.removeEventListener("mousemove", this.boucleModeCollision);
            window.removeEventListener("mouseup", this.relachementClicModeCollision);
        };
        EditeurADV.prototype.afficherLigneDessin = function (IDENTIFIANT, DX, DY, FX, FY, COULEUR) {
            var distance = Mathematiques_1.default.distance2Points(DX, DY, FX, FY);
            var dessin = new PIXI.Graphics();
            dessin.lineStyle(4, COULEUR);
            dessin.moveTo(0, 0);
            dessin.lineTo(distance + 1, 0);
            dessin.endFill();
            var clip = new PIXI.projection.Sprite3d(dessin.generateCanvasTexture());
            clip.euler.x = Math.PI / 2;
            clip.position3d.x = DX;
            clip.position3d.z = DY;
            clip.euler.z = Math.atan2(FY - DY, FX - DX);
            clip["idDessin"] = IDENTIFIANT;
            MondeADV_1.MondeADV.instance.coucheDessin.addChild(clip);
            this.indexDessin[IDENTIFIANT] = clip;
        };
        EditeurADV.prototype.supprLigneDessin = function (IDENTIFIANT) {
            var clip = this.indexDessin[IDENTIFIANT];
            delete this.indexDessin[IDENTIFIANT];
            if (clip && clip.parent) {
                clip.parent.removeChild(clip);
                clip.texture.destroy(true);
                clip.destroy();
            }
        };
        EditeurADV.prototype.toutAnnuler = function () {
            this.selectionObjet(null);
            this.modeInterieur(null);
            if (this.infoConstructionCollisionEnCours) {
                this.infoConstructionCollisionEnCours.sprite.parent.removeChild(this.infoConstructionCollisionEnCours.sprite);
                this.infoConstructionCollisionEnCours = null;
                document.body.style.cursor = "";
            }
            if (this.infoExtremiteCollisionEnCoursDEdition) {
                this.modifierExtremiteCollision(this.infoExtremiteCollisionEnCoursDEdition, this.infoExtremiteCollisionEnCoursDEdition.x, this.infoExtremiteCollisionEnCoursDEdition.y);
                this.infoExtremiteCollisionEnCoursDEdition = null;
                document.body.style.cursor = "";
            }
            if (this.curseurInterieur) {
                if (this.curseurInterieur.parent) {
                    this.curseurInterieur.parent.removeChild(this.curseurInterieur);
                }
                this.curseurInterieur = null;
            }
            if (this.clipSelection.parent) {
                this.clipSelection.parent.removeChild(this.clipSelection);
            }
            MondeADV_1.MondeADV.instance.supprimerCurseur();
            MondeADV_1.MondeADV.instance.zoomRequis = 1;
            MondeADV_1.MondeADV.instance.shaderLumiere1.enabled = true;
            MondeADV_1.MondeADV.instance.shaderLumiere2.enabled = true;
            MondeADV_1.MondeADV.instance.shaderEau.enabled = true;
            MondeADV_1.MondeADV.instance.coucheSol.visible = true;
            this.monde.fonctionCurseur = null;
            for (var _i = 0, _a = this.listeElementInvisible; _i < _a.length; _i++) {
                var element = _a[_i];
                element.visible = true;
            }
            this.listeElementInvisible = [];
        };
        EditeurADV.LONGUEUR_CARRE_MINIMALE_COLLISION = 50 * 50;
        EditeurADV.COULEUR_SPRITE_EXTREMITE_COLLISION = 0xAA0000;
        return EditeurADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.EditeurADV = EditeurADV;
    var BarreOutilsEditeur = (function (_super) {
        __extends(BarreOutilsEditeur, _super);
        function BarreOutilsEditeur() {
            var _this = _super.call(this) || this;
            _this.etirerDansParent(20, undefined, 20);
            _this.defLargeurMax(42);
            _this.afficherFondUni("#000000" + "AA");
            _this.modeLigne().multiligne();
            _this.couleurElement = new I_ChampTexte_1.I_ChampTexte();
            _this.couleurElement.defLargeurMin(150);
            _this.couleurElement.activerSelecteurCouleur(true, true, "bottom");
            _this.ajouterElement(_this.couleurElement);
            _this.couleurElement.defChangement(function (TEXTE) {
                if (EditeurADV.instance.selectionEnCours) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.majTeinture(EditeurADV.instance.selectionEnCours.identifiantMobile, parseInt(TEXTE.substr(1, 6), 16), parseInt(TEXTE.substr(7, 9), 16)));
                }
            });
            _this.couleurDessin = new I_ChampTexte_1.I_ChampTexte();
            _this.couleurDessin.defLargeurMin(150);
            _this.couleurDessin.activerSelecteurCouleur(true, false, "bottom");
            _this.couleurDessin.defTexte("#" + EditeurADV.instance.couleurDessin.toString(16));
            _this.ajouterElement(_this.couleurDessin);
            _this.couleurDessin.defChangement(function (TEXTE) {
                EditeurADV.instance.couleurDessin = parseInt(TEXTE.substring(1), 16);
            });
            _this.couche = new I_Texte_1.I_Texte(EditeurADV.instance.coucheSolEnCours);
            _this.couche.defLargeurMax(150);
            _this.ajouterElement(_this.couche);
            _this.ajouterOutils("Options", "famfamfam/world_edit.png", function () {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.ouvertureOptionMonde());
            });
            return _this;
        }
        BarreOutilsEditeur.afficher = function () {
            if (!BarreOutilsEditeur.instance) {
                BarreOutilsEditeur.instance = new BarreOutilsEditeur();
            }
            TFMAdventure_1.default.instance.coucheInterface.appendChild(BarreOutilsEditeur.instance.elementHTML);
        };
        BarreOutilsEditeur.estAffiche = function () {
            return BarreOutilsEditeur.instance && BarreOutilsEditeur.instance.elementHTML.parentNode != null;
        };
        BarreOutilsEditeur.fermer = function () {
            if (BarreOutilsEditeur.instance) {
                BarreOutilsEditeur.instance.elementHTML.remove();
            }
        };
        BarreOutilsEditeur.prototype.ajouterOutils = function (AIDE, ICODE, ACTION) {
            var clip = new I_Conteneur_1.I_Conteneur();
            clip.appendChild(new I_Image_1.I_Image(ICODE));
            clip.rendreCliquable(ACTION);
            this.ajouterElement(clip);
        };
        return BarreOutilsEditeur;
    }(I_Conteneur_1.I_Conteneur));
    exports.BarreOutilsEditeur = BarreOutilsEditeur;
    var InterfaceLumiere = (function () {
        function InterfaceLumiere() {
            this.estActif = false;
            this.couleur = 0x808080;
            this.marge = 300;
            this.conteneur = new I_Conteneur_1.I_Conteneur("colonne");
            this.conteneur.afficherFondUni("#000000" + "AA");
            this.texteCouleur = new I_ChampTexte_1.I_ChampTexte();
            this.texteCouleur.activerSelecteurCouleur();
            this.texteCouleur.defTexte("#" + this.couleur.toString(16));
            this.texteCouleur.defLargeur(200);
            this.texteCouleur.defHauteur(30);
            this.texteCouleur.defChangement(function (COULEUR) {
                InterfaceLumiere.instance.couleur = parseInt(COULEUR.substr(1, 6), 16);
                if (InterfaceLumiere.instance.indiceRect != undefined) {
                    var rect = MondeADV_1.MondeADV.instance.rectanglesLumiereMonde[InterfaceLumiere.instance.indiceRect];
                    if (rect) {
                        rect.couleur = InterfaceLumiere.instance.couleur;
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.majRectanglesLumiere(MondeADV_1.MondeADV.instance.rectanglesLumiereMonde));
                    }
                }
            });
            this.conteneur.ajouterElement(this.texteCouleur);
            this.texteMarge = new I_ChampTexte_1.I_ChampTexte();
            this.texteMarge.defTexte("300");
            this.texteMarge.defLargeur(100);
            this.texteMarge.defHauteur(30);
            this.texteMarge.defChangement(function (MARGE) {
                InterfaceLumiere.instance.marge = Number(MARGE);
                if (InterfaceLumiere.instance.indiceRect != undefined) {
                    var rect = MondeADV_1.MondeADV.instance.rectanglesLumiereMonde[InterfaceLumiere.instance.indiceRect];
                    if (rect) {
                        rect.marge = InterfaceLumiere.instance.marge;
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.majRectanglesLumiere(MondeADV_1.MondeADV.instance.rectanglesLumiereMonde));
                    }
                }
            });
            var conteneurTexte = new I_Conteneur_1.I_Conteneur("ligne");
            conteneurTexte.ajouterElement(new I_Texte_1.I_Texte("Marge"));
            conteneurTexte.ajouterElement(this.texteMarge);
            this.conteneur.ajouterElement(conteneurTexte);
            this.conteneur.defPosition("50%", "50px");
        }
        Object.defineProperty(InterfaceLumiere, "instance", {
            get: function () {
                if (InterfaceLumiere._instance == null) {
                    InterfaceLumiere._instance = new InterfaceLumiere();
                }
                return InterfaceLumiere._instance;
            },
            enumerable: true,
            configurable: true
        });
        InterfaceLumiere.afficher = function (ID_RECT) {
            var rect = MondeADV_1.MondeADV.instance.rectanglesLumiereMonde[ID_RECT];
            InterfaceLumiere.instance.indiceRect = ID_RECT;
            InterfaceLumiere.instance.estActif = true;
            if (rect) {
                InterfaceLumiere.instance.couleur = rect.couleur;
                InterfaceLumiere.instance.marge = rect.marge;
            }
            else {
                InterfaceLumiere.instance.couleur = 0x808080;
                InterfaceLumiere.instance.marge = 300;
            }
            InterfaceLumiere.instance.texteCouleur.defTexte("#" + InterfaceLumiere.instance.couleur.toString(16));
            InterfaceLumiere.instance.texteMarge.defTexte(InterfaceLumiere.instance.marge.toString());
            TFMAdventure_1.default.instance.coucheInterface.appendChild(InterfaceLumiere.instance.conteneur.elementHTML);
        };
        InterfaceLumiere.masquer = function () {
            if (InterfaceLumiere.instance.estActif) {
                InterfaceLumiere.instance.conteneur.elementHTML.remove();
                InterfaceLumiere.instance.estActif = false;
            }
        };
        return InterfaceLumiere;
    }());
    var FenetreNouveauPicto = (function (_super) {
        __extends(FenetreNouveauPicto, _super);
        function FenetreNouveauPicto() {
            var _this = _super.call(this) || this;
            _this.modeFenetre("Ajouter un picto", FenetreNouveauPicto.fermer);
            _this.centrerAuto();
            var conteneurPrincipal = new I_Conteneur_1.I_Conteneur("ligne");
            var conteneurGauche = new I_Conteneur_1.I_Conteneur();
            var conteneurDroite = new I_Conteneur_1.I_Conteneur();
            conteneurPrincipal.ajouterElement(conteneurGauche, conteneurDroite);
            _this.ajouterElement(conteneurPrincipal);
            _this.conteneurImage = new I_Conteneur_1.I_Conteneur();
            _this.conteneurImage.flexAlignement("center");
            _this.conteneurImage.margeAuto();
            _this.conteneurImage.defLargeurMax(200);
            conteneurGauche.ajouterElement(_this.conteneurImage);
            conteneurGauche.ajouterElement(new I_Bouton_1.I_Bouton("Apparence", function () {
                EditeurCreature_1.EditeurCreature.afficher(_this.infoPicto.clip, function (CLIP) {
                    _this.infoPicto.clip = CLIP;
                    _this.conteneurImage.vider();
                    _this.conteneurImage.appendChild(_this.infoPicto.recupElementInterface());
                });
            }));
            _this.champCategorie = new I_ChampTexte_1.I_ChampTexte("catégorie").defChangement(function (TEXTE) {
                _this.infoPicto.categorie = TEXTE;
            });
            conteneurGauche.ajouterElement(_this.champCategorie);
            conteneurGauche.nouvelleLigne(function (LIGNE) {
                _this.champAmbiance = new I_ChampTexte_1.I_ChampTexte("ambiance sonore").defChangement(function (TEXTE) {
                    _this.infoPicto.ambianceSonore = TEXTE;
                });
                _this.champAmbiance.etirer();
                LIGNE.ajouterElement(_this.champAmbiance);
                _this.champVolume = new I_ChampTexte_1.I_ChampTexte("volume").defChangement(function (TEXTE) {
                    _this.infoPicto.volume = parseInt(TEXTE);
                });
                LIGNE.ajouterElement(_this.champVolume);
            });
            conteneurGauche.nouvelleLigne(function (LIGNE) {
                _this.champCpt = new I_ChampTexte_1.I_ChampTexte("comportement").defChangement(function (TEXTE) {
                    _this.infoPicto.comportement = TEXTE;
                });
                _this.champCpt.etirer();
                LIGNE.ajouterElement(_this.champCpt);
            });
            conteneurGauche.nouvelleLigne(function (LIGNE) {
                LIGNE.alignementEnfants("center");
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Monstre"));
                _this.champMonstre = new I_ChampTexte_1.I_ChampTexte("2").defChangement(function (TEXTE) {
                    _this.infoPicto.monstre = parseInt(TEXTE);
                });
                _this.champMonstre.etirer();
                LIGNE.ajouterElement(_this.champMonstre);
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Vêtement"));
                _this.champVetement = new I_ChampTexte_1.I_ChampTexte("2,60").defChangement(function (TEXTE) {
                    _this.infoPicto.listeVetement = TEXTE.split(",").map(Number);
                    for (var i = 0, nb = _this.infoPicto.listeVetement.length; i < nb; i++) {
                        var code = _this.infoPicto.listeVetement[i];
                        if (!code) {
                            _this.infoPicto.listeVetement.splice(i, 1);
                            i--;
                            nb--;
                        }
                    }
                });
                _this.champVetement.etirer();
                LIGNE.ajouterElement(_this.champVetement);
            });
            conteneurGauche.nouvelleLigne(function (LIGNE) {
                LIGNE.alignementEnfants("center");
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Nom"));
                _this.champNom = new I_ChampTexte_1.I_ChampTexte().defChangement(function (TEXTE) {
                    _this.infoPicto.nom = TEXTE;
                });
                _this.champNom.etirer();
                LIGNE.ajouterElement(_this.champNom);
            });
            conteneurGauche.nouvelleLigne(function (LIGNE) {
                LIGNE.alignementEnfants("center");
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Titre"));
                _this.champTitre = new I_ChampTexte_1.I_ChampTexte().defChangement(function (TEXTE) {
                    var codeTitre = parseInt(TEXTE);
                    if (codeTitre < 0 || isNaN(codeTitre)) {
                        codeTitre = 0;
                    }
                    _this.infoPicto.codeTitre = codeTitre;
                    _this.texteTitre.defTexte(codeTitre != 0 ? Trad801_1.default.trad("$titre." + codeTitre) : "Aucun titre");
                });
                _this.texteTitre = new I_Texte_1.I_Texte().defCouleur(0x969696).defLargeurMax("10em");
                _this.texteTitre.etirer();
                LIGNE.ajouterElement(_this.champTitre, _this.texteTitre);
            });
            conteneurGauche.nouvelleLigne(function (LIGNE) {
                LIGNE.alignementEnfants("center");
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Hauteur clip nom"));
                _this.champHauteurClipNom = new I_ChampTexte_1.I_ChampTexte().defChangement(function (TEXTE) {
                    _this.infoPicto.hauteurClipNom = Number(TEXTE);
                });
                _this.champHauteurClipNom.etirer();
                LIGNE.ajouterElement(_this.champHauteurClipNom);
            });
            var conteneurLum = new I_Conteneur_1.I_Conteneur();
            conteneurLum.afficherFondUni("#FFFFFF" + "10");
            _this.lumBtnActiverLumiere = new I_BoutonEtat_1.I_BoutonEtat("Émet de la lumière", function (ACTIF) {
                _this.infoPicto.lumActive = ACTIF;
                if (ACTIF) {
                    _this.infoPicto.lumCouleur = 0xC3C0B0;
                    _this.infoPicto.lumRayon = 250;
                    _this.infoPicto.lumAlpha = 100;
                    _this.infoPicto.lumEffet = 0;
                    _this.infoPicto.lumForme = 0;
                    _this.infoPicto.lumRatio = 15;
                    _this.lumChampCouleur.defTexte("#C3C0B0");
                    _this.lumChampRayon.defTexte(250);
                    _this.lumChampAlpha.defTexte(1);
                    _this.lumChampEffet.defTexte("");
                    _this.lumChampForme.defTexte("");
                    _this.lumChampRatio.defTexte("1.5");
                }
                else {
                    _this.lumChampCouleur.defTexte("#000000");
                    _this.lumChampRayon.defTexte("");
                    _this.lumChampAlpha.defTexte("");
                    _this.lumChampEffet.defTexte("");
                    _this.lumChampForme.defTexte("");
                    _this.lumChampRatio.defTexte("");
                }
                _this.lumChampCouleur.desactiver(!ACTIF);
                _this.lumChampRayon.desactiver(!ACTIF);
                _this.lumChampAlpha.desactiver(!ACTIF);
                _this.lumChampEffet.desactiver(!ACTIF);
            });
            conteneurLum.ajouterElement(_this.lumBtnActiverLumiere);
            _this.lumChampCouleur = new I_ChampTexte_1.I_ChampTexte("couleur", 10).etirer(2);
            _this.lumChampCouleur.activerSelecteurCouleur();
            _this.lumChampCouleur.defChangement(function (TEXTE) {
                _this.infoPicto.lumCouleur = parseInt(TEXTE.substr(1), 16);
            });
            _this.lumChampRayon = new I_ChampTexte_1.I_ChampTexte("rayon").etirer(1);
            _this.lumChampRayon.defChangement(function (TEXTE) {
                _this.infoPicto.lumRayon = parseInt(TEXTE);
            });
            _this.lumChampAlpha = new I_ChampTexte_1.I_ChampTexte("alpha").etirer(1);
            _this.lumChampAlpha.defChangement(function (TEXTE) {
                _this.infoPicto.lumAlpha = Math.min(Math.max(parseFloat(TEXTE), 0), 1) * 100;
            });
            _this.lumChampEffet = new I_ChampTexte_1.I_ChampTexte("effet").etirer(1);
            _this.lumChampEffet.defChangement(function (TEXTE) {
                _this.infoPicto.lumEffet = parseInt(TEXTE);
            });
            _this.lumChampForme = new I_ChampTexte_1.I_ChampTexte("forme").etirer(1);
            _this.lumChampForme.defChangement(function (TEXTE) {
                _this.infoPicto.lumForme = parseInt(TEXTE);
            });
            _this.lumChampRatio = new I_ChampTexte_1.I_ChampTexte("ratio").etirer(1);
            _this.lumChampRatio.defChangement(function (TEXTE) {
                _this.infoPicto.lumRatio = Math.min(Math.max(parseFloat(TEXTE), 0), 10) * 10;
            });
            var largeurChamp = "4em";
            conteneurLum.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Couleur").defLargeurMin(largeurChamp), _this.lumChampCouleur);
            });
            conteneurLum.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Rayon").defLargeurMin(largeurChamp), _this.lumChampRayon);
            });
            conteneurLum.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Alpha").defLargeurMin(largeurChamp), _this.lumChampAlpha);
            });
            conteneurLum.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Effet").defLargeurMin(largeurChamp), _this.lumChampEffet);
            });
            conteneurLum.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Forme").defLargeurMin(largeurChamp), _this.lumChampForme);
            });
            conteneurLum.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Ratio").defLargeurMin(largeurChamp), _this.lumChampRatio);
            });
            conteneurDroite.ajouterElement(conteneurLum);
            conteneurDroite.nouvelleLigne(function (LIGNE) {
                LIGNE.alignementEnfants("center");
                LIGNE.ajouterElement(new I_Texte_1.I_Texte("Largeur ombre"));
                _this.champOmbre = new I_ChampTexte_1.I_ChampTexte().defChangement(function (TEXTE) {
                    _this.infoPicto.largeurOmbre = Number(TEXTE);
                });
                _this.champOmbre.etirer();
                LIGNE.ajouterElement(_this.champOmbre);
            });
            _this.btnAplat = new I_BoutonEtat_1.I_BoutonEtat("Est un aplat", function (OUI) {
                _this.infoPicto.estAplat = OUI;
            });
            _this.btnLumiere = new I_BoutonEtat_1.I_BoutonEtat("Est une lumière", function (OUI) {
                _this.infoPicto.estUneLumiere = OUI;
            });
            _this.btnVent = new I_BoutonEtat_1.I_BoutonEtat("Vent", function (OUI) {
                _this.infoPicto.typeVent = OUI ? 1 : 0;
                if (OUI) {
                    _this.btnCanopee.cocher(false);
                }
            });
            _this.btnCanopee = new I_BoutonEtat_1.I_BoutonEtat("Canopée", function (OUI) {
                _this.infoPicto.typeVent = OUI ? 2 : 0;
                if (OUI) {
                    _this.btnVent.cocher(false);
                }
            });
            _this.btnSymetrie = new I_BoutonEtat_1.I_BoutonEtat("Symétrie aléatoire", function (OUI) {
                _this.infoPicto.optionSymetrie = OUI;
            });
            _this.btnJoueurVisible = new I_BoutonEtat_1.I_BoutonEtat("Joueur visible à travers", function (OUI) {
                _this.infoPicto.joueurVisibleDerriere = OUI;
            });
            _this.btnEditeur = new I_BoutonEtat_1.I_BoutonEtat("Visible uniquement sur l'éditeur", function (OUI) {
                _this.infoPicto.visibleEditeur = OUI;
            });
            conteneurGauche.ajouterElement(_this.btnAplat, _this.btnLumiere, _this.btnVent, _this.btnCanopee, _this.btnSymetrie, _this.btnJoueurVisible, _this.btnEditeur);
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.ajouterElement(new I_Bouton_1.I_Bouton("Valider", function () {
                    FenetreNouveauPicto.fermer();
                    Module801_1.default.instance.envoyer(ProtoADV_1.default.nouveauPicto(_this.infoPicto));
                }).etirer(2));
                _this.btnSupprimer = new I_Bouton_1.I_Bouton("❌  Supprimer", function () {
                    var validation = new I_Conteneur_1.I_Conteneur();
                    validation.defLargeurMin(250);
                    validation.modeFenetre("Êtes vous sûrs ?");
                    validation.centrerAuto();
                    validation.ajouterElement(new I_Bouton_1.I_Bouton("Supprimer", function () {
                        FenetreNouveauPicto.fermer();
                        Module801_1.default.instance.envoyer(ProtoADV_1.default.supprPictoListe(_this.infoPicto.identifiant));
                        validation.elementHTML.remove();
                    }));
                    validation.ajouterElement(new I_Bouton_1.I_Bouton("Annuler", function () {
                        validation.elementHTML.remove();
                    }));
                    TFMAdventure_1.default.instance.coucheInterface.appendChild(validation.elementHTML);
                });
                _this.btnSupprimer.etirer(1);
                LIGNE.ajouterElement(_this.btnSupprimer);
            });
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Annuler", function () {
                FenetreNouveauPicto.fermer();
            }));
            return _this;
        }
        FenetreNouveauPicto.afficher = function (PICTO) {
            if (!FenetreNouveauPicto.instance) {
                FenetreNouveauPicto.instance = new FenetreNouveauPicto();
            }
            FenetreNouveauPicto.instance.initialisation(PICTO);
            TFMAdventure_1.default.instance.coucheInterface.appendChild(FenetreNouveauPicto.instance.elementHTML);
        };
        FenetreNouveauPicto.estAffiche = function () {
            return FenetreNouveauPicto.instance && FenetreNouveauPicto.instance.elementHTML.parentNode != null;
        };
        FenetreNouveauPicto.fermer = function () {
            if (FenetreNouveauPicto.instance) {
                FenetreNouveauPicto.instance.elementHTML.remove();
            }
        };
        FenetreNouveauPicto.prototype.initialisation = function (PICTO) {
            if (PICTO) {
                this.infoPicto = PICTO;
            }
            else {
                this.infoPicto = new InfoPictoADV();
            }
            this.champCategorie.defTexte(this.infoPicto.categorie);
            this.champAmbiance.defTexte(this.infoPicto.ambianceSonore);
            this.champCpt.defTexte(this.infoPicto.comportement);
            this.champNom.defTexte(this.infoPicto.nom);
            this.champTitre.defTexte(this.infoPicto.codeTitre);
            this.texteTitre.defTexte(Trad801_1.default.trad("$titre." + this.infoPicto.codeTitre));
            this.champHauteurClipNom.defTexte(this.infoPicto.hauteurClipNom);
            this.champOmbre.defTexte(this.infoPicto.largeurOmbre);
            this.champMonstre.defTexte(this.infoPicto.monstre ? this.infoPicto.monstre : "");
            this.champVetement.defTexte(this.infoPicto.listeVetement.join(","));
            this.champVolume.defTexte(this.infoPicto.volume ? this.infoPicto.volume : "");
            this.btnAplat.cocher(this.infoPicto.estAplat);
            this.btnLumiere.cocher(this.infoPicto.estUneLumiere);
            this.btnVent.cocher(this.infoPicto.typeVent == 1);
            this.btnCanopee.cocher(this.infoPicto.typeVent == 2);
            this.btnSymetrie.cocher(this.infoPicto.optionSymetrie);
            this.btnJoueurVisible.cocher(this.infoPicto.joueurVisibleDerriere);
            this.btnEditeur.cocher(this.infoPicto.visibleEditeur);
            this.lumBtnActiverLumiere.cocher(this.infoPicto.lumActive);
            if (this.infoPicto.lumActive) {
                this.lumChampCouleur.desactiver(false);
                this.lumChampRayon.desactiver(false);
                this.lumChampAlpha.desactiver(false);
                this.lumChampEffet.desactiver(false);
                this.lumChampCouleur.defTexte(this.infoPicto.lumCouleur.toString(16).toUpperCase());
                this.lumChampRayon.defTexte(this.infoPicto.lumRayon);
                this.lumChampAlpha.defTexte(this.infoPicto.lumAlpha / 100);
                this.lumChampEffet.defTexte(this.infoPicto.lumEffet ? this.infoPicto.lumEffet : "");
                this.lumChampForme.defTexte(this.infoPicto.lumForme ? this.infoPicto.lumForme : "");
                this.lumChampRatio.defTexte(this.infoPicto.lumRatio / 10);
            }
            else {
                this.lumChampCouleur.desactiver(true);
                this.lumChampRayon.desactiver(true);
                this.lumChampAlpha.desactiver(true);
                this.lumChampEffet.desactiver(true);
                this.lumChampCouleur.defTexte("808080");
                this.lumChampRayon.defTexte("");
                this.lumChampAlpha.defTexte("");
                this.lumChampEffet.defTexte("");
                this.lumChampForme.defTexte("");
                this.lumChampRatio.defTexte("");
            }
            this.conteneurImage.vider();
            if (PICTO) {
                this.conteneurImage.appendChild(this.infoPicto.recupElementInterface());
            }
            this.btnSupprimer.style.display = PICTO ? "flex" : "none";
        };
        return FenetreNouveauPicto;
    }(I_Conteneur_1.I_Conteneur));
    exports.FenetreNouveauPicto = FenetreNouveauPicto;
    var InfoPictoADV = (function () {
        function InfoPictoADV() {
            this.listeVetement = [];
        }
        InfoPictoADV.prototype.recupElementInterface = function () {
            if (this.monstre) {
                var clipMonstre = this.recupClip();
                return clipMonstre.recupElementInterface();
            }
            else if (this.clip.typeClip == "I") {
                var image = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance(this.clip.sourceLocale + this.clip.codeAffichage.substr(1)));
                image.defLargeurMax("100%").defHauteurMax("100%");
                return image;
            }
            else {
                var image = new I_ImagePixi_1.I_ImagePixi(100, 100);
                var clip_1 = this.clip.cloner();
                clip_1.jouerAnimation("statique");
                clip_1.x = image.largeurImage * 0.5;
                clip_1.y = image.largeurImage * 0.9;
                image.scene.addChild(clip_1);
                image.ajouterBoucle(function () {
                    clip_1.boucle(Date.now());
                });
                return image;
            }
        };
        InfoPictoADV.prototype.recupClip = function () {
            if (this.monstre) {
                var clipMonstre = TFMAdventure_1.default.indexMonstre[this.monstre];
                if (!clipMonstre) {
                    return new ClipAnim_1.ClipAnim();
                }
                clipMonstre = clipMonstre.cloner();
                clipMonstre.jouerAnimation("statique");
                if (this.listeVetement) {
                    for (var _i = 0, _a = this.listeVetement; _i < _a.length; _i++) {
                        var codeVetement = _a[_i];
                        var vetement = TFMAdventure_1.default.indexVetement[codeVetement];
                        if (vetement) {
                            clipMonstre.ajouterElementLook(vetement);
                        }
                    }
                }
                clipMonstre.stop(0);
                return clipMonstre;
            }
            else {
                return this.clip;
            }
        };
        InfoPictoADV.prototype.deserialisation = function (MSG) {
            this.identifiant = MSG.l16();
            this.categorie = MSG.lChaine();
            this.ambianceSonore = MSG.lChaine();
            this.comportement = MSG.lChaine();
            this.volume = MSG.l8();
            this.nom = MSG.lChaine();
            this.codeTitre = MSG.l16();
            this.hauteurClipNom = MSG.l16();
            this.largeurOmbre = MSG.l16();
            this.visibleEditeur = MSG.lBool();
            this.estAplat = MSG.lBool();
            this.estUneLumiere = MSG.lBool();
            this.typeVent = MSG.l8();
            this.optionSymetrie = MSG.lBool();
            this.joueurVisibleDerriere = MSG.lBool();
            this.lumActive = MSG.lBool();
            if (this.lumActive) {
                this.lumCouleur = MSG.l32s();
                this.lumRayon = MSG.l16();
                this.lumAlpha = MSG.l8();
                this.lumEffet = MSG.l8();
                this.lumForme = MSG.l8();
                this.lumRatio = MSG.l8();
            }
            this.clip = new ClipAnim_1.ClipAnim(MSG);
            this.monstre = MSG.l16();
            for (var i = 0, nb = MSG.l8(); i < nb; i++) {
                this.listeVetement.push(MSG.l16());
            }
        };
        InfoPictoADV.prototype.serialisation = function (MSG) {
            MSG.e16(this.identifiant);
            MSG.eChaine(this.categorie);
            MSG.eChaine(this.ambianceSonore);
            MSG.eChaine(this.comportement);
            MSG.e8(this.volume);
            MSG.eChaine(this.nom);
            MSG.e16(this.codeTitre);
            MSG.e16(this.hauteurClipNom);
            MSG.e16(this.largeurOmbre);
            MSG.eBool(this.visibleEditeur);
            MSG.eBool(this.estAplat);
            MSG.eBool(this.estUneLumiere);
            MSG.e8(this.typeVent);
            MSG.eBool(this.optionSymetrie);
            MSG.eBool(this.joueurVisibleDerriere);
            if (this.lumActive) {
                MSG.eBool(true);
                MSG.e32(this.lumCouleur);
                MSG.e16(this.lumRayon);
                MSG.e8(this.lumAlpha);
                MSG.e8(this.lumEffet);
                MSG.e8(this.lumForme);
                MSG.e8(this.lumRatio);
            }
            else {
                MSG.eBool(false);
            }
            if (this.clip) {
                this.clip.serialisation(MSG);
            }
            else {
                new ClipAnim_1.ClipAnim().serialisation(MSG);
            }
            MSG.e16(this.monstre);
            MSG.e8(this.listeVetement.length);
            for (var _i = 0, _a = this.listeVetement; _i < _a.length; _i++) {
                var vetement = _a[_i];
                MSG.e16(vetement);
            }
        };
        return InfoPictoADV;
    }());
    exports.InfoPictoADV = InfoPictoADV;
    var InfoConstructionCollision = (function () {
        function InfoConstructionCollision(DEPART, SPRITE) {
            this.depart = DEPART;
            this.sprite = SPRITE;
        }
        return InfoConstructionCollision;
    }());
    var SpriteCollision = (function (_super) {
        __extends(SpriteCollision, _super);
        function SpriteCollision(X1, Y1, X2, Y2) {
            var _this = _super.call(this, PIXI.Texture.WHITE) || this;
            _this._correct = true;
            _this._ferme = false;
            _this.tint = SpriteCollision.COULEUR_COLLISION_CORRECTE;
            _this.euler.x = Math.PI / 2;
            _this.anchor.y = 0.5;
            _this.scale3d.y = 4 / _this.texture.height;
            _this.def(X1, Y1, X2, Y2);
            return _this;
        }
        SpriteCollision.prototype.def = function (X1, Y1, X2, Y2) {
            this.position3d.x = X1;
            this.position3d.z = Y1;
            var dx = X2 - X1;
            var dy = Y2 - Y1;
            this.euler.z = Math.atan2(dy, dx);
            this.scale3d.x = Math.sqrt(dx * dx + dy * dy) / this.texture.width;
        };
        Object.defineProperty(SpriteCollision.prototype, "correct", {
            set: function (CORRECT) {
                this._correct = CORRECT;
                this.majCouleur();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteCollision.prototype, "ferme", {
            set: function (FERME) {
                this._ferme = FERME;
                this.majCouleur();
            },
            enumerable: true,
            configurable: true
        });
        SpriteCollision.prototype.majCouleur = function () {
            this.tint = this._correct ? (this._ferme ? SpriteCollision.COULEUR_COLLISION_FERMEE : SpriteCollision.COULEUR_COLLISION_CORRECTE) : SpriteCollision.COULEUR_COLLISION_INCORRECTE;
        };
        SpriteCollision.COULEUR_COLLISION_FERMEE = 0xFF0000;
        SpriteCollision.COULEUR_COLLISION_CORRECTE = 0xAA0000;
        SpriteCollision.COULEUR_COLLISION_INCORRECTE = 0x5E1715;
        return SpriteCollision;
    }(PIXI.projection.Sprite3d));
    var ClipSelection = (function (_super) {
        __extends(ClipSelection, _super);
        function ClipSelection() {
            var _this = _super.call(this) || this;
            _this.angleRotation = 0;
            _this.contour = new PIXI.Graphics();
            _this.clipRotation = new PIXI.Graphics();
            _this.cliquable(_this.clipRotation);
            _this.clipRotation.lineStyle(2, 0x000000);
            _this.clipRotation.beginFill(0x00FFFF);
            _this.clipRotation.drawCircle(0, 0, 8);
            _this.clipRotation.endFill();
            _this.clipRotation.on("mousedown", function () {
                if (!_this.objet) {
                    return;
                }
                window.onmousemove = function (EVT) {
                    var pos = _this.objet.getGlobalPosition();
                    var angle = Math.atan2(EVT.clientY - pos.y, EVT.clientX - pos.x) + Math.PI / 2;
                    if (angle < 0) {
                        angle = Math.PI * 2 + angle;
                    }
                    _this.angleRotation = Math.floor(angle / 0.02617993) * 0.02617993;
                    if (_this.objet instanceof AplatADV_1.AplatADV) {
                        _this.objet.euler.z = _this.angleRotation;
                    }
                    else {
                        _this.objet.rotation = _this.angleRotation;
                    }
                };
                window.onmouseup = function () {
                    window.onmouseup = null;
                    window.onmousemove = null;
                    if (_this.objet instanceof ClipAnim_1.ClipAnim) {
                        var mobileParent = _this.objet.parent;
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.rotationMobileInterieur(_this.objet.parent.identifiantMobile, mobileParent.listeMobileInterne.indexOf(_this.objet), _this.angleRotation / 0.02617993));
                    }
                    else {
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.rotationPicto(_this.objet.identifiantMobile, _this.angleRotation / 0.02617993));
                    }
                };
            });
            return _this;
        }
        ClipSelection.prototype.majSelection = function (OBJET) {
            this.objet = OBJET;
            if (this.contour.parent) {
                this.removeChild(this.contour);
            }
            this.contour.clear();
            var rect = OBJET.getLocalBounds();
            this.contour.lineStyle(2, 0x000000);
            this.contour.drawRect(rect.left - 12, rect.top - 12, rect.width + 24, rect.height + 24);
            this.contour.lineStyle(2, 0x52FFA5);
            this.contour.drawRect(rect.left - 10, rect.top - 10, rect.width + 20, rect.height + 20);
            this.contour.moveTo(-10, 0);
            this.contour.lineTo(10, 0);
            this.contour.moveTo(0, -5);
            this.contour.lineTo(0, 5);
            this.addChild(this.contour);
            this.clipRotation.position.set(0, rect.top - 30);
            this.addChild(this.clipRotation);
            var cible = this.objet.children[0];
            if (cible) {
                AnimMath_1.default.animObjet(cible.scale, "y", 0.9, 1, 300).defMouvement(AnimMath_1.Mouvement.easeOutElastic).boucleAuto();
            }
        };
        ClipSelection.prototype.cliquable = function (ELEMENT) {
            var _this = this;
            this.clipRotation.interactive = true;
            this.clipRotation.buttonMode = true;
            this.interactive = true;
            this.buttonMode = true;
            ELEMENT.on("mouseover", function () {
                _this.filters = [Couleur_1.Couleur.filtreLumiere];
            });
            ELEMENT.on("mouseout", function () {
                _this.filters = null;
            });
        };
        return ClipSelection;
    }(PIXI.Container));
    var Selection = (function (_super) {
        __extends(Selection, _super);
        function Selection() {
            var _this = _super.call(this) || this;
            _this.listeObjet = [];
            _this.angleRotation = 0;
            _this.listeContour = [];
            _this.contour = new PIXI.Graphics();
            _this.addChild(_this.contour);
            _this.clipRotation = new PIXI.Graphics();
            _this.cliquable(_this.clipRotation);
            _this.clipRotation.lineStyle(2, 0x000000);
            _this.clipRotation.beginFill(0x00FFFF);
            _this.clipRotation.drawCircle(0, 0, 8);
            _this.clipRotation.endFill();
            _this.clipRotation.on("mousedown", function () {
                window.onmousemove = function (EVT) {
                    var objet = _this.listeObjet[0];
                    var pos = objet.getGlobalPosition();
                    var angle = Math.atan2(EVT.clientY - pos.y, EVT.clientX - pos.x) + Math.PI / 2;
                    if (angle < 0) {
                        angle = Math.PI * 2 + angle;
                    }
                    _this.angleRotation = Math.floor(angle / 0.02617993) * 0.02617993;
                    if (objet instanceof AplatADV_1.AplatADV) {
                        objet.euler.z = _this.angleRotation;
                    }
                    else {
                        objet.rotation = _this.angleRotation;
                    }
                };
                window.onmouseup = function () {
                    var objet = _this.listeObjet[0];
                    window.onmouseup = null;
                    window.onmousemove = null;
                    if (objet instanceof ClipAnim_1.ClipAnim) {
                        var mobileParent = objet.parent;
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.rotationMobileInterieur(objet.parent.identifiantMobile, mobileParent.listeMobileInterne.indexOf(objet), _this.angleRotation / 0.02617993));
                    }
                    else {
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.rotationPicto(objet.identifiantMobile, _this.angleRotation / 0.02617993));
                    }
                };
            });
            return _this;
        }
        Selection.prototype.ajouterObjet = function (OBJET) {
            if (this.listeObjet.indexOf(OBJET) != -1) {
                return;
            }
            this.listeObjet.push(OBJET);
            this.majSelection();
        };
        Selection.prototype.vider = function () {
            this.nettoyerSelection();
            this.listeObjet = [];
            this.majSelection();
        };
        Selection.prototype.nettoyerSelection = function () {
            for (var _i = 0, _a = this.listeContour; _i < _a.length; _i++) {
                var contour = _a[_i];
                if (contour.parent) {
                    delete contour.parent["_contourEditeur"];
                    contour.parent.removeChild(contour);
                }
            }
        };
        Selection.prototype.majSelection = function () {
            this.nettoyerSelection();
            var nb = this.listeObjet.length;
            if (nb == 0) {
                this.visible = false;
                return;
            }
            this.visible = true;
            this.contour.clear();
            this.clipRotation.visible = nb == 1;
            for (var _i = 0, _a = this.listeObjet; _i < _a.length; _i++) {
                var objet = _a[_i];
                var rect = objet.getLocalBounds();
                var contour = new PIXI.Graphics();
                objet["_contourEditeur"] = contour;
                this.listeContour.push(contour);
                contour.lineStyle(1, 0x000000);
                contour.drawRect(rect.left - 12, rect.top - 12, rect.width + 24, rect.height + 24);
                contour.lineStyle(1, 0x00FFFF);
                contour.drawRect(rect.left - 10, rect.top - 10, rect.width + 20, rect.height + 20);
                contour.moveTo(-5, 0);
                contour.lineTo(5, 0);
                contour.moveTo(0, -5);
                contour.lineTo(0, 5);
                objet.addChild(contour);
            }
        };
        Selection.prototype.cliquable = function (ELEMENT) {
            var _this = this;
            this.clipRotation.interactive = true;
            this.clipRotation.buttonMode = true;
            this.interactive = true;
            this.buttonMode = true;
            ELEMENT.on("mouseover", function () {
                _this.filters = [Couleur_1.Couleur.filtreLumiere];
            });
            ELEMENT.on("mouseout", function () {
                _this.filters = null;
            });
        };
        return Selection;
    }(PIXI.Container));
});
//# sourceMappingURL=EditeurADV.js.map