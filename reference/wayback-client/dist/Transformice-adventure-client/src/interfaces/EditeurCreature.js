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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/interface/souruis/elements/I_ImagePixi", "../../../Souritheque-client/src/interface/souruis/elements/I_BoutonEtat", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../_tfmAdventure/TFMAdventure"], function (require, exports, I_Conteneur_1, I_ChampTexte_1, I_Bouton_1, ClipAnim_1, I_Texte_1, I_ImagePixi_1, I_BoutonEtat_1, I_Image_1, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EditeurCreature = (function (_super) {
        __extends(EditeurCreature, _super);
        function EditeurCreature() {
            var _this = _super.call(this) || this;
            _this.dossierSource = "";
            _this.marionnette = "";
            _this.look = "";
            _this.tailleApercu = 300;
            _this.origineX = _this.tailleApercu * 0.5;
            _this.origineY = _this.tailleApercu * 0.9;
            _this.listeAnimCreature = [];
            _this.deplacementEnCours = false;
            _this.premiereAnim = "";
            _this.modeFenetre("Éditeur de créature", EditeurCreature.fermer);
            _this.centrerAuto();
            _this.afficherFondCadre()
                .defLargeurMin(700)
                .defLargeurMax(700);
            _this.conteneur = new I_Conteneur_1.I_Conteneur();
            _this.ligneChoix = new I_Conteneur_1.I_Conteneur();
            _this.ligneChoix.modeLigne().etirerContenu();
            _this.btnModeImage = new I_BoutonEtat_1.I_BoutonEtat("Image", function () {
                _this.changerMode("image");
            });
            _this.btnModeAnimation = new I_BoutonEtat_1.I_BoutonEtat("Animation", function () {
                _this.changerMode("animation");
            });
            _this.btnModeCreature = new I_BoutonEtat_1.I_BoutonEtat("Créature", function () {
                _this.changerMode("créature");
            });
            _this.ligneChoix.ajouterElement(_this.btnModeImage, _this.btnModeAnimation, _this.btnModeCreature);
            _this.conteneurListeAnim = new I_Conteneur_1.I_Conteneur();
            _this.conteneurListeAnim.defHauteurMax(300);
            _this.conteneurListeAnim.activerAscenseur();
            _this.btnNouvelleAnim = new I_Bouton_1.I_Bouton("Ajouter animation", function () {
                var clipAnim = new ClipAnimCreature(_this, "", "");
                _this.conteneurListeAnim.ajouterElement(clipAnim, _this.btnNouvelleAnim);
                _this.listeAnimCreature.push(clipAnim);
            });
            var ligne = _this.nouvelleLigne();
            _this.imagePixi = new I_ImagePixi_1.I_ImagePixi(_this.tailleApercu, _this.tailleApercu);
            _this.imagePixi.activerSouris(true);
            _this.imagePixi.style.borderRadius = "10px";
            _this.imagePixi.style.boxShadow = "inset 1px 1px 1px #000000CC, inset -1px -1px 1px #927a5a";
            _this.imagePixi.margeAuto();
            _this.imagePixi.ajouterBoucle(function () {
                if (_this.imagePixi.scene.children.length) {
                    var clip = _this.imagePixi.scene.getChildAt(0);
                    if (clip instanceof ClipAnim_1.ClipAnim) {
                        clip.boucle(Date.now());
                    }
                }
            });
            _this.texteErreur = new I_Texte_1.I_Texte();
            _this.texteErreur.style.textAlign = "center";
            _this.texteErreur.style.display = "none";
            _this.texteErreur.multiligne();
            _this.champMarionette = new I_ChampTexte_1.I_ChampTexte("Marionnette")
                .defChangement(function (TEXTE) {
                if (_this.modeEnCours == "image") {
                    _this.marionnette = TEXTE.indexOf("I#") == 0 ? TEXTE : "I#" + TEXTE;
                }
                else if (_this.modeEnCours == "animation") {
                    _this.marionnette = TEXTE.indexOf("A#") == 0 ? TEXTE : "A#" + TEXTE;
                }
                else if (_this.modeEnCours == "créature") {
                    _this.marionnette = TEXTE.indexOf("C#") == 0 ? TEXTE : "C#" + TEXTE;
                    _this.chargerCreature();
                }
                _this.majMarionnette(true);
            });
            _this.champSource = new I_ChampTexte_1.I_ChampTexte("Dossier source")
                .defChangement(function (TEXTE) {
                _this.dossierSource = TEXTE;
                _this.majMarionnette(true);
            });
            _this.champLook = new I_ChampTexte_1.I_ChampTexte("Look");
            _this.lignePos = _this.conteneur.nouvelleLigne();
            _this.lignePos.espacement(0);
            _this.lignePos.etirerContenu();
            _this.champX = new I_ChampTexte_1.I_ChampTexte("Accroche X");
            _this.champY = new I_ChampTexte_1.I_ChampTexte("Accroche Y");
            _this.lignePos.ajouterElement(_this.champX, _this.champY);
            _this.champX.defChangement(function (TEXTE) {
                if (_this.modeEnCours == "image") {
                    var clip = _this.imagePixi.scene.getChildAt(0);
                    clip.pivot.set(parseInt(TEXTE), clip.pivot.y);
                }
            });
            _this.champY.defChangement(function (TEXTE) {
                if (_this.modeEnCours == "image") {
                    var clip = _this.imagePixi.scene.getChildAt(0);
                    clip.pivot.set(clip.pivot.x, parseInt(TEXTE));
                }
            });
            _this.conteneurDroite = new I_Conteneur_1.I_Conteneur();
            _this.conteneurGauche = new I_Conteneur_1.I_Conteneur();
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.etirerContenu();
                LIGNE.ajouterElement(_this.conteneurGauche, _this.conteneurDroite);
            });
            _this.conteneurDroite.ajouterElement(_this.ligneChoix, _this.conteneur);
            _this.btnPlacementAuto = new I_Image_1.I_Image("famfamfam/cup_link.png");
            _this.btnPlacementAuto.rendreCliquable(function () {
                if (_this.modeEnCours == "image") {
                    var clip = _this.imagePixi.scene.getChildAt(0);
                    var rect = clip.getBounds();
                    var origineX = _this.imagePixi.largeurImage * 0.5;
                    var origineY = _this.imagePixi.hauteurImage * 0.9;
                    var hauteurEchantillon = 10;
                    for (var k = 1; k <= 5; k++) {
                        clip.pivot.set(0, 0);
                        var nbPoint = 0;
                        var totalX = 0;
                        var totalY = 0;
                        clip.position.x = ((_this.imagePixi.largeurImage - rect.width) / 2);
                        clip.position.y = (hauteurEchantillon * k) - rect.height;
                        _this.imagePixi.appPixi.render();
                        for (var x = 0; x < _this.imagePixi.largeurImage; x++) {
                            for (var y = 0; y < hauteurEchantillon; y++) {
                                var pixel = _this.imagePixi.recupPixel(x, y);
                                if (pixel[3] > 64) {
                                    nbPoint++;
                                    totalX += x;
                                    totalY += y;
                                }
                            }
                        }
                        if (nbPoint > 10) {
                            var posX = ((totalX / nbPoint) - clip.position.x) | 0;
                            var posY = ((totalY / nbPoint) - clip.position.y) | 0;
                            clip.position.set(origineX, origineY);
                            clip.pivot.set(posX, posY);
                            _this.champX.defTexte(posX);
                            _this.champY.defTexte(posY);
                            break;
                        }
                    }
                }
            });
            _this.btnPlacementAuto.style.position = "absolute";
            _this.btnPlacementAuto.style.left = "10px";
            _this.btnPlacementAuto.style.top = "5px";
            _this.nouvelleLigne(function (LIGNE) {
                LIGNE.etirerContenu();
                LIGNE.ajouterElement(new I_Bouton_1.I_Bouton("Valider", function () {
                    if (_this.retourValidation) {
                        if (_this.clip.pivot.x) {
                            _this.clip.ancrageX = _this.clip.pivot.x;
                        }
                        if (_this.clip.pivot.y) {
                            _this.clip.ancrageY = _this.clip.pivot.y;
                        }
                        _this.retourValidation(_this.clip);
                    }
                    EditeurCreature.fermer();
                }));
                LIGNE.ajouterElement(new I_Bouton_1.I_Bouton("Annuler", function () {
                    EditeurCreature.fermer();
                }));
            });
            _this.cible = new PIXI.Graphics();
            _this.cible.lineStyle(1, 0x97D64E);
            _this.cible.moveTo(-100, 0.5);
            _this.cible.lineTo(100, 0.5);
            _this.cible.moveTo(0.5, -10);
            _this.cible.lineTo(0.5, 10);
            _this.cible.position.set(_this.origineX, _this.origineY);
            return _this;
        }
        EditeurCreature.afficher = function (CLIP, VALIDATION) {
            if (!EditeurCreature.instance) {
                EditeurCreature.instance = new EditeurCreature();
            }
            EditeurCreature.instance.initialisation(CLIP);
            EditeurCreature.instance.retourValidation = VALIDATION;
            TFMAdventure_1.default.ajouterInterface(EditeurCreature.instance.elementHTML);
        };
        EditeurCreature.fermer = function () {
            if (EditeurCreature.instance) {
                EditeurCreature.instance.elementHTML.remove();
            }
        };
        EditeurCreature.prototype.initialisation = function (CLIP) {
            this.imagePixi.creerAppPixi();
            if (CLIP) {
                if (CLIP.typeClip == "I") {
                    this.changerMode("image");
                    this.marionnette = "I#" + CLIP.codeAffichage.substr(1);
                    this.champMarionette.defTexte(this.marionnette.substr(2));
                    if (CLIP.ancrageX !== undefined) {
                        this.pivotX = CLIP.ancrageX;
                        this.pivotY = CLIP.ancrageY;
                        this.champX.defTexte(CLIP.ancrageX);
                        this.champY.defTexte(CLIP.ancrageY);
                    }
                }
                else if (CLIP.typeClip == "A") {
                    this.changerMode("animation");
                    this.marionnette = CLIP.serialisationChaine();
                    this.champMarionette.defTexte(this.marionnette);
                }
                else if (CLIP.typeClip == "C") {
                    this.changerMode("créature");
                    this.marionnette = CLIP.serialisationChaine();
                    this.champMarionette.defTexte(this.marionnette);
                }
                this.dossierSource = CLIP.sourceLocale;
                this.champSource.defTexte(this.dossierSource);
                if (this.modeEnCours == "créature") {
                    this.chargerCreature();
                }
            }
            else {
                this.champMarionette.defTexte("");
                this.champLook.defTexte("");
                this.changerMode("image");
            }
            this.majMarionnette();
        };
        EditeurCreature.prototype.changerMode = function (MODE) {
            this.modeEnCours = MODE;
            this.conteneur.vider();
            this.conteneurGauche.vider();
            this.btnModeImage.cocher(false);
            this.btnModeAnimation.cocher(false);
            this.btnModeCreature.cocher(false);
            this.imagePixi.creerAppPixi();
            this.imagePixi.scene.addChild(this.cible);
            this.champSource.defTexte("");
            this.champLook.defTexte("");
            this.champMarionette.defTexte("");
            this.champX.defTexte("");
            this.champY.defTexte("");
            this.pivotX = undefined;
            this.pivotY = undefined;
            this.listeAnimCreature = [];
            this.conteneurListeAnim.vider();
            this.conteneurListeAnim.ajouterElement(this.btnNouvelleAnim);
            this.dossierSource = "";
            this.marionnette = "";
            this.look = "";
            this.btnPlacementAuto.elementHTML.remove();
            if (MODE == "image") {
                this.btnModeImage.cocher(true);
                this.champMarionette.defTexteAide("Lien");
                this.conteneurGauche.ajouterElement(this.imagePixi);
                this.conteneur.ajouterElement(this.texteErreur, this.champMarionette, this.lignePos);
                this.conteneurGauche.appendChild(this.btnPlacementAuto);
                return;
            }
            if (MODE == "animation") {
                this.btnModeAnimation.cocher(true);
                this.champMarionette.defTexteAide("Marionnette");
                this.conteneurGauche.ajouterElement(this.imagePixi);
                this.conteneur.ajouterElement(this.texteErreur, this.champMarionette, this.champSource, this.champLook);
                return;
            }
            if (MODE == "créature") {
                this.btnModeCreature.cocher(true);
                this.champMarionette.defTexteAide("Créature");
                this.conteneurGauche.ajouterElement(this.imagePixi);
                this.conteneur.ajouterElement(this.texteErreur, this.champMarionette, this.champSource, this.champLook, this.conteneurListeAnim);
                this.compilationListeAnim();
                return;
            }
        };
        EditeurCreature.prototype.chargerCreature = function () {
            this.premiereAnim = "";
            this.conteneurListeAnim.vider();
            var clip = new ClipAnim_1.ClipAnim();
            clip.sourceRacine = this.dossierSource;
            clip.sourceLocale = this.dossierSource;
            clip.deserialisationChaine(this.marionnette);
            this.champSource.defTexte(clip.sourceLocale);
            this.dossierSource = clip.sourceLocale;
            for (var nom in clip.indexAnim) {
                if (!this.premiereAnim) {
                    this.premiereAnim = nom;
                }
                var anim = clip.indexAnim[nom];
                var clipAnim = new ClipAnimCreature(this, "", "");
                clipAnim.champNom.defTexte(nom);
                clipAnim.champMarionnette.defTexte(anim.serialisationChaine());
                this.conteneurListeAnim.ajouterElement(clipAnim, this.btnNouvelleAnim);
                this.listeAnimCreature.push(clipAnim);
            }
            this.conteneurListeAnim.ajouterElement(this.btnNouvelleAnim);
        };
        EditeurCreature.prototype.majMarionnette = function (MAJ_POS) {
            var _this = this;
            if (MAJ_POS === void 0) { MAJ_POS = false; }
            this.imagePixi.scene.removeChildren();
            this.imagePixi.scene.addChild(this.cible);
            if (!this.marionnette) {
                return;
            }
            try {
                this.clip = new ClipAnim_1.ClipAnim();
                this.clip.sourceLocale = this.dossierSource;
                this.clip.sourceRacine = this.dossierSource;
                this.clip.deserialisationChaine(this.marionnette);
                this.imagePixi.scene.addChildAt(this.clip, 0);
                this.clip.position.set(this.origineX, this.origineY);
                this.texteErreur.style.display = "none";
                if (this.pivotX !== undefined) {
                    this.clip.pivot.set(this.pivotX, this.pivotY);
                }
                if (this.modeEnCours == "créature") {
                    this.clip.jouerAnimation(this.premiereAnim, 0, true);
                }
                else if (this.modeEnCours == "image") {
                    if (MAJ_POS) {
                        var rect = this.clip.getBounds();
                        if (rect.width > 1) {
                            this.placementAutoImage();
                        }
                        else {
                            this.clip.texture.baseTexture.once("loaded", function () {
                                _this.placementAutoImage();
                            });
                        }
                    }
                    this.clip.interactive = true;
                    this.clip.buttonMode = true;
                    this.clip.on("mousedown", function (EVT) {
                        _this.deplacementEnCours = true;
                        _this.deplacementX = EVT.data.global.x;
                        _this.deplacementY = EVT.data.global.y;
                        _this.pivotX = _this.clip.pivot.x;
                        _this.pivotY = _this.clip.pivot.y;
                    });
                    this.clip.on("mouseup", function (EVT) {
                        _this.deplacementEnCours = false;
                    });
                    this.clip.on("mousemove", function (EVT) {
                        if (_this.deplacementEnCours) {
                            _this.clip.pivot.set(_this.pivotX - (EVT.data.global.x - _this.deplacementX), _this.pivotY - (EVT.data.global.y - _this.deplacementY));
                            _this.champX.defTexte(_this.clip.pivot.x);
                            _this.champY.defTexte(_this.clip.pivot.y);
                        }
                    });
                }
            }
            catch (e) {
                this.texteErreur.defTexte(e);
                this.texteErreur.style.display = "inline";
            }
        };
        EditeurCreature.prototype.placementAutoImage = function () {
            var rect = this.clip.getBounds();
            var posX = (rect.width / 2) | 0;
            var posY = (rect.height - 2) | 0;
            this.clip.pivot.set(posX, posY);
            this.champX.defTexte(posX);
            this.champY.defTexte(posY);
        };
        EditeurCreature.prototype.compilationListeAnim = function () {
            if (this.modeEnCours != "créature") {
                return;
            }
            this.premiereAnim = "";
            var listeAnim = [];
            var source = this.champSource.recupTexte();
            if (source) {
                listeAnim.push("source=" + source);
            }
            for (var _i = 0, _a = this.listeAnimCreature; _i < _a.length; _i++) {
                var anim = _a[_i];
                var nom = anim.champNom.recupTexte();
                var marionnette = anim.champMarionnette.recupTexte();
                if (nom && marionnette) {
                    if (marionnette.length > 2 && marionnette.charAt(1) != "#") {
                        marionnette = "A#" + marionnette;
                    }
                    listeAnim.push("@" + nom + "=" + marionnette);
                }
                if (!this.premiereAnim) {
                    this.premiereAnim = nom;
                }
            }
            var chaine = "C#" + listeAnim.join("&&");
            this.marionnette = chaine;
        };
        return EditeurCreature;
    }(I_Conteneur_1.I_Conteneur));
    exports.EditeurCreature = EditeurCreature;
    var ClipAnimCreature = (function (_super) {
        __extends(ClipAnimCreature, _super);
        function ClipAnimCreature(EDITEUR, NOM, ANIM) {
            var _this = _super.call(this) || this;
            _this.editeur = EDITEUR;
            var ligneHaut = _this.nouvelleLigne();
            _this.btnSuppr = new I_Bouton_1.I_Bouton()
                .ajouterIcone(new I_Image_1.I_Image("famfamfam/cross.png"))
                .defClique(function () {
                _this.elementHTML.remove();
                _this.editeur.listeAnimCreature.splice(_this.editeur.listeAnimCreature.indexOf(_this), 1);
                _this.editeur.compilationListeAnim();
                _this.editeur.majMarionnette();
            });
            _this.btnHaut = new I_Bouton_1.I_Bouton()
                .ajouterIcone(new I_Image_1.I_Image("famfamfam/arrow_up.png"))
                .defClique(function () {
                var index = _this.editeur.listeAnimCreature.indexOf(_this);
                if (index > 0) {
                    _this.editeur.listeAnimCreature.splice(index, 1);
                    _this.editeur.listeAnimCreature.unshift(_this);
                    _this.editeur.conteneurListeAnim.elementHTML.insertBefore(_this.elementHTML, _this.editeur.conteneurListeAnim.elementHTML.firstChild);
                    _this.editeur.premiereAnim = _this.champNom.recupTexte();
                    _this.editeur.compilationListeAnim();
                    _this.editeur.majMarionnette();
                }
            });
            _this.champNom = new I_ChampTexte_1.I_ChampTexte("Nom animation");
            _this.champNom.etirer();
            _this.champNom.defChangement(function (TEXTE) {
                _this.editeur.compilationListeAnim();
                _this.editeur.majMarionnette();
            });
            ligneHaut.ajouterElement(_this.btnSuppr, _this.btnHaut, _this.champNom);
            _this.champMarionnette = new I_ChampTexte_1.I_ChampTexte("Marionnette");
            _this.champMarionnette.defChangement(function () {
                _this.editeur.compilationListeAnim();
                _this.editeur.majMarionnette();
            });
            _this.ajouterElement(_this.champMarionnette);
            _this.champNom.defTexte(NOM);
            _this.champMarionnette.defTexte(ANIM);
            return _this;
        }
        return ClipAnimCreature;
    }(I_Conteneur_1.I_Conteneur));
});
//# sourceMappingURL=EditeurCreature.js.map