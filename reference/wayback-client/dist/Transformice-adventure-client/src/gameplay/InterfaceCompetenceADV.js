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
define(["require", "exports", "../../../Souritheque-client/src/outils/controles/Clavier", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV", "../_monde/MondeADV", "../_monde/_mobile/AplatADV", "../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../_monde/_mobile/MobileADV", "../../../Souritheque-client/src/outils/son/MoteurSon", "../../../Souritheque-client/src/outils/UtilPIXI", "../interfaces/InterfaceJoueurADV", "../interfaces/InterfaceLancementDonjonADV", "../interfaces/EncartAideADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/outils/reseau/ProtoM801", "../interfaces/InterfaceMenuADV"], function (require, exports, Clavier_1, TFMAdventure_1, ProtoADV_1, MondeADV_1, AplatADV_1, AnimMath_1, MobileADV_1, MoteurSon_1, UtilPIXI_1, InterfaceJoueurADV_1, InterfaceLancementDonjonADV_1, EncartAideADV_1, I_Conteneur_1, I_Texte_1, Trad801_1, ProtoM801_1, InterfaceMenuADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceCompetenceADV = (function (_super) {
        __extends(InterfaceCompetenceADV, _super);
        function InterfaceCompetenceADV() {
            var _this = _super.call(this) || this;
            _this.listeComp = [];
            _this.indexComp = {};
            InterfaceCompetenceADV.instance = _this;
            var fond = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/jeu/bloc_comp.png"));
            fond.anchor.set(0.5, 0.5);
            fond.position.set(0, -13);
            _this.conteneurComp = new PIXI.Container();
            _this.conteneurComp.position.set(-70, -2);
            _this.addChild(fond, _this.conteneurComp);
            _this.btnProfil = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/jeu/pastille_profil.png"));
            _this.btnProfil.anchor.set(0.5, 0.5);
            _this.btnProfil.position.set(-205, 8);
            UtilPIXI_1.default.rendreElementCliquable(_this.btnProfil, function () {
                if (InterfaceJoueurADV_1.InterfaceJoueurADV.estAffiche()) {
                    InterfaceJoueurADV_1.InterfaceJoueurADV.fermer();
                }
                else {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.profilJoueur(""));
                }
                AnimMath_1.default.animBoucle(1000, function (P) {
                    _this.btnProfil.scale.set(0.7 + 0.3 * P);
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            });
            _this.addChild(_this.btnProfil);
            _this.btnDonjon = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/jeu/pastille_donjon.png"));
            _this.btnDonjon.tint = InterfaceCompetenceADV.donjondisponible ? 0xFFFFFF : 0x808080;
            _this.btnDonjon.anchor.set(0.5, 0.5);
            _this.btnDonjon.position.set(-163, 8);
            UtilPIXI_1.default.rendreElementCliquable(_this.btnDonjon, function () {
                if (InterfaceCompetenceADV.donjondisponible) {
                    if (InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.estAffiche()) {
                        InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.masquer(!InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.estMasque);
                    }
                    else {
                        TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeInterfaceLancementDonjon());
                    }
                    AnimMath_1.default.animBoucle(1000, function (P) {
                        _this.btnDonjon.scale.set(0.7 + 0.3 * P);
                    }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                }
            });
            _this.addChild(_this.btnDonjon);
            var forme = new PIXI.Graphics();
            forme.beginFill(0xFFED9F, 0.8);
            forme.drawCircle(0, 20, 20);
            forme.endFill();
            _this.fondBtnDonjon = new PIXI.Sprite(forme.generateCanvasTexture());
            _this.fondBtnDonjon.anchor.set(0.5, 0.5);
            _this.fondBtnDonjon.position.set(-163, 8);
            _this.btnMenu = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/jeu/pastille_menu.png"));
            _this.btnMenu.anchor.set(0.5, 0.5);
            _this.btnMenu.position.set(204, 8);
            UtilPIXI_1.default.rendreElementCliquable(_this.btnMenu, function () {
                InterfaceMenuADV_1.default.afficher(!InterfaceMenuADV_1.default.estAffiche());
                AnimMath_1.default.animBoucle(1000, function (P) {
                    _this.btnMenu.scale.set(0.7 + 0.3 * P);
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            });
            _this.addChild(_this.btnMenu);
            _this.btnEmote = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/jeu/pastille_emote.png"));
            _this.btnEmote.anchor.set(0.5, 0.5);
            _this.btnEmote.position.set(162, 8);
            UtilPIXI_1.default.rendreElementCliquable(_this.btnEmote, function () {
                if (!_this.conteneurEmote) {
                    _this.conteneurEmote = new ConteneurEmote();
                }
                if (_this.conteneurEmote.parent) {
                    _this.conteneurEmote.parent.removeChild(_this.conteneurEmote);
                }
                else {
                    _this.addChild(_this.conteneurEmote);
                    _this.conteneurEmote.position.set(_this.btnEmote.x - 10, _this.btnEmote.y - 20 - _this.conteneurEmote.height);
                    AnimMath_1.default.animBoucle(1000, function (P) {
                        _this.btnEmote.scale.set(0.7 + 0.3 * P);
                    }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                }
            });
            _this.addChild(_this.btnEmote);
            _this.clipZone = new AplatADV_1.AplatADV();
            var fondZone = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("interface/zone/2.png"));
            fondZone.anchor.set(0.5, 0.5);
            fondZone.blendMode = PIXI.BLEND_MODES.ADD;
            var fond2 = new PIXI.projection.Sprite3d(fondZone.texture);
            fond2.anchor.set(0.5, 0.5);
            _this.fondInterieur = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("interface/zone/2b.png"));
            _this.fondInterieur.anchor.set(0.5, 0.5);
            _this.clipZone.addChild(fondZone, fond2, _this.fondInterieur);
            _this.clipZoneValidation = new AplatADV_1.AplatADV();
            _this.clipZoneValidation.texture = TFMAdventure_1.default.recupTextureDistante("interface/zone/2c.png");
            _this.clipZoneValidation.blendMode = PIXI.BLEND_MODES.ADD;
            _this.clipLigne = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("interface/zone/zl.png"));
            _this.clipLigne.blendMode = PIXI.BLEND_MODES.ADD;
            _this.clipLigne.anchor.set(0.1, 0.5);
            _this.clipLigne.euler.x = Math.PI / 2;
            _this.clipZoneValidationLigne = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("interface/zone/zl.png"));
            _this.clipZoneValidationLigne.blendMode = PIXI.BLEND_MODES.ADD;
            _this.clipZoneValidationLigne.anchor.set(0.1, 0.5);
            _this.clipZoneValidationLigne.euler.x = Math.PI / 2;
            var clavier = new Clavier_1.ContexteClavier();
            Clavier_1.Clavier.ajouterContexte(clavier);
            clavier.defAppuyerEmplacement(["Digit1", "Numpad1"], function () {
                _this.activationCompIndex(0);
            });
            clavier.defAppuyerEmplacement(["Digit2", "Numpad2"], function () {
                _this.activationCompIndex(1);
            });
            clavier.defAppuyerEmplacement(["Digit3", "Numpad3"], function () {
                _this.activationCompIndex(2);
            });
            return _this;
        }
        InterfaceCompetenceADV.defDonjonDisponibe = function (OUI) {
            InterfaceCompetenceADV.donjondisponible = OUI;
            if (InterfaceCompetenceADV.instance) {
                InterfaceCompetenceADV.instance.btnDonjon.tint = OUI ? 0xFFFFFF : 0x808080;
            }
        };
        InterfaceCompetenceADV.donjonMasque = function (OUI) {
            if (InterfaceCompetenceADV.instance) {
                if (OUI) {
                    InterfaceCompetenceADV.instance.addChildAt(InterfaceCompetenceADV.instance.fondBtnDonjon, 0);
                }
                else {
                    if (InterfaceCompetenceADV.instance.fondBtnDonjon.parent) {
                        InterfaceCompetenceADV.instance.fondBtnDonjon.parent.removeChild(InterfaceCompetenceADV.instance.fondBtnDonjon);
                    }
                }
            }
        };
        InterfaceCompetenceADV.prototype.boucle = function (TEMPS, TEMPS_ECOULE) {
            for (var _i = 0, _a = this.listeComp; _i < _a.length; _i++) {
                var comp = _a[_i];
                comp.boucle(TEMPS);
                comp.y *= 0.8;
            }
            if (this.clipZoneValidation.parent) {
                var tempsEcoule = TEMPS - this.debutAnimValidation;
                var pourcentage = tempsEcoule / 3000;
                var pourcentage2 = AnimMath_1.Mouvement.easeOutExpo(pourcentage, 0, 1, 1);
                this.clipZoneValidation.euler.z = -(Math.PI / 6) * pourcentage2;
                this.clipZoneValidation.alpha = 1 - pourcentage2;
                var couleur = 0x7F * (1 - pourcentage2);
                this.clipZoneValidation.tint = (couleur << 16) | (0xFF << 8) | 0xFF;
                if (pourcentage >= 1) {
                    this.clipZoneValidation.parent.removeChild(this.clipZoneValidation);
                }
            }
            if (this.clipZoneValidationLigne.parent) {
                var tempsEcoule = TEMPS - this.debutAnimValidationLigne;
                var pourcentage = tempsEcoule / 1000;
                var pourcentage2 = AnimMath_1.Mouvement.easeOutExpo(pourcentage, 0, 1, 1);
                this.clipZoneValidationLigne.alpha = 1 - pourcentage2;
                var couleur = 0x7F * (1 - pourcentage2);
                this.clipZoneValidationLigne.tint = (couleur << 16) | (0xFF << 8) | 0xFF;
                if (pourcentage >= 1) {
                    this.clipZoneValidationLigne.parent.removeChild(this.clipZoneValidationLigne);
                }
            }
        };
        InterfaceCompetenceADV.prototype.majComp = function (MSG) {
            var comp = this.indexComp[MSG.l32s()];
            if (comp) {
                var code = MSG.l16();
                var codeIcone = MSG.l16();
                var typeZone = MSG.l8();
                var rayonZone = MSG.l16();
                comp.majCompetence(codeIcone, typeZone, rayonZone);
            }
        };
        InterfaceCompetenceADV.prototype.majListeComp = function (MSG) {
            if (!this.listeFXComp) {
                this.listeFXComp = [];
                var _loop_1 = function (i) {
                    var fx = TFMAdventure_1.default.indexFX[31].clip.cloner();
                    fx.declencheurFinAnim(function () {
                        if (fx.parent) {
                            fx.parent.removeChild(fx);
                        }
                    });
                    this_1.listeFXComp.push(fx);
                };
                var this_1 = this;
                for (var i = 0; i < 5; i++) {
                    _loop_1(i);
                }
            }
            this.indexComp = {};
            this.conteneurComp.removeChildren();
            this.listeComp = [];
            var nb = MSG.l8();
            for (var i = 0; i < nb; i++) {
                var comp = new IconeCompetenceADV(MSG, this.listeFXComp[i]);
                comp.x = i * 70;
                this.conteneurComp.addChild(comp);
                this.listeComp.push(comp);
                this.indexComp[comp.identifiantUnique] = comp;
            }
            for (var i = nb; i < 3; i++) {
                var fondComp = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/jeu/comp_vide.png"));
                fondComp.anchor.set(0.5, 0.5);
                fondComp.x = i * 70;
                UtilPIXI_1.default.rendreElementCliquable(fondComp, function () {
                });
                this.conteneurComp.addChild(fondComp);
            }
            this.majPosition();
        };
        InterfaceCompetenceADV.prototype.majPosition = function () {
            this.x = (TFMAdventure_1.default.LARGEUR / 2) | 0;
            this.y = TFMAdventure_1.default.HAUTEUR - 50;
        };
        InterfaceCompetenceADV.prototype.activationCompIndex = function (INDEX) {
            var carte = this.listeComp[INDEX];
            if (carte) {
                carte.cliqueComp();
            }
        };
        InterfaceCompetenceADV.prototype.majRecuperation = function (ID, TEMPS) {
            var comp = this.indexComp[ID];
            if (comp) {
                comp.majRecuperation(TEMPS);
            }
        };
        InterfaceCompetenceADV.donjondisponible = true;
        return InterfaceCompetenceADV;
    }(PIXI.Container));
    exports.InterfaceCompetenceADV = InterfaceCompetenceADV;
    var IconeCompetenceADV = (function (_super) {
        __extends(IconeCompetenceADV, _super);
        function IconeCompetenceADV(MSG, FX) {
            var _this = _super.call(this) || this;
            _this.recupEnCours = false;
            _this.fxFinRecharge = FX;
            _this.identifiantUnique = MSG.l32s();
            _this.code = MSG.l16();
            _this.codeIcone = MSG.l16();
            _this.typeZone = MSG.l8();
            _this.rayonZone = MSG.l16();
            var recuperation = MSG.l32s();
            _this.texture = TFMAdventure_1.default.recupTextureDistante("comp/" + _this.codeIcone + ".png");
            _this.anchor.set(0.5, 0.5);
            _this.interactive = true;
            _this.buttonMode = true;
            _this.champRecup = new PIXI.Text();
            _this.champRecup.anchor.set(0.5, 0.5);
            _this.champRecup.style = IconeCompetenceADV.styleBase;
            _this.addChild(_this.champRecup);
            UtilPIXI_1.default.rendreElementCliquable(_this, function () {
                _this.cliqueComp();
            });
            _this.aide = new I_Conteneur_1.I_Conteneur();
            var titre = new I_Texte_1.I_Texte(Trad801_1.default.trad("$comp.nom." + _this.code)).defCouleur(0x7BBD40);
            titre.style.fontWeight = "bold";
            var desc = new I_Texte_1.I_Texte(Trad801_1.default.trad("$comp.desc." + _this.code)).defTaille("80%");
            _this.aide.ajouterElement(titre, desc);
            UtilPIXI_1.default.rendreSurvolable(_this, function () {
                EncartAideADV_1.default.afficher(_this.aide);
            }, function () {
                EncartAideADV_1.default.fermer(_this.aide);
            });
            _this.majRecuperation(recuperation);
            return _this;
        }
        IconeCompetenceADV.prototype.majCompetence = function (CODE_ICONE, TYPE_ZONE, RAYON_ZONE) {
            this.codeIcone = CODE_ICONE;
            this.texture = TFMAdventure_1.default.recupTextureDistante("comp/" + this.codeIcone + ".png");
            this.typeZone = TYPE_ZONE;
            this.rayonZone = RAYON_ZONE;
        };
        IconeCompetenceADV.prototype.boucle = function (TEMPS) {
            if (this.fxFinRecharge && this.fxFinRecharge.parent) {
                this.fxFinRecharge.boucle(TEMPS);
            }
            if (this.recupEnCours && this.finRecuperation != -1) {
                var tempsRestant = this.finRecuperation - TEMPS;
                if (tempsRestant <= 0) {
                    this.majRecuperation(0);
                }
                else if (tempsRestant < 1000) {
                    var tempsNombre = ((tempsRestant / 100) | 0);
                    this.champRecup.text = "." + tempsNombre;
                }
                else {
                    this.champRecup.text = String((tempsRestant / 1000) | 0);
                }
            }
        };
        IconeCompetenceADV.prototype.majRecuperation = function (DUREE) {
            if (DUREE) {
                this.recupEnCours = true;
                var temps = Date.now();
                if (DUREE == -1) {
                    this.finRecuperation = -1;
                    this.champRecup.visible = false;
                }
                else {
                    this.finRecuperation = temps + DUREE;
                    this.champRecup.visible = true;
                }
                this.tint = 0x87819E;
                this.boucle(temps);
            }
            else {
                if (this.recupEnCours) {
                    this.recupEnCours = false;
                    this.champRecup.visible = false;
                    this.tint = 0xFFFFFF;
                    this.y = -60;
                    MoteurSon_1.default.jouerEffet("sel", 0.3);
                    if (this.fxFinRecharge) {
                        this.addChildAt(this.fxFinRecharge, 0);
                        this.fxFinRecharge.lecture(0);
                        this.parent.addChildAt(this, 0);
                    }
                }
            }
        };
        IconeCompetenceADV.prototype.cliqueComp = function () {
            var _this = this;
            if (this.recupEnCours || MobileADV_1.MobileADV.joueurPrincipal.estMort) {
                return;
            }
            AnimMath_1.default.animBoucle(800, function (P) {
                _this.scale.set(0.85 + 0.15 * P);
            }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            if (this.typeZone == 0 || this.typeZone == 1) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.activerCompetence(this.identifiantUnique, 0, 0, 0));
            }
            else if (this.typeZone == 2) {
                var curseur_1 = InterfaceCompetenceADV.instance.clipZone;
                curseur_1.scale3d.x = this.rayonZone / 200;
                curseur_1.scale3d.y = this.rayonZone / 200;
                curseur_1.euler.z = 0;
                MondeADV_1.MondeADV.instance.defCurseur(curseur_1, function () {
                    MobileADV_1.MobileADV.joueurPrincipal.versLaDroite(curseur_1.position3d.x > MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.x, true);
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.activerCompetence(_this.identifiantUnique, 0, curseur_1.position3d.x, curseur_1.position3d.z));
                    MondeADV_1.MondeADV.instance.supprimerCurseur();
                    var clipValidation = InterfaceCompetenceADV.instance.clipZoneValidation;
                    clipValidation.position3d.x = curseur_1.position3d.x;
                    clipValidation.position3d.z = curseur_1.position3d.z;
                    clipValidation.tint = 0xFFFFFF;
                    clipValidation.alpha = 1;
                    clipValidation.scale3d.x = curseur_1.scale3d.x;
                    clipValidation.scale3d.y = curseur_1.scale3d.y;
                    clipValidation.euler.z = curseur_1.euler.z;
                    MondeADV_1.MondeADV.instance.coucheSol.addChild(clipValidation);
                    InterfaceCompetenceADV.instance.debutAnimValidation = Date.now();
                }, function (POS) {
                    curseur_1.euler.z += 10 / 10000;
                    InterfaceCompetenceADV.instance.fondInterieur.euler.z -= 20 / 10000;
                });
            }
            else if (this.typeZone == 3) {
                var curseur_2 = InterfaceCompetenceADV.instance.clipLigne;
                curseur_2.euler.z = 0;
                MondeADV_1.MondeADV.instance.coucheSol.addChild(curseur_2);
                MondeADV_1.MondeADV.instance.ajouterBoucle("zone_ligne", function (TEMPS) {
                    var posSouris = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(TFMAdventure_1.default.SOURIS_X, TFMAdventure_1.default.SOURIS_Y);
                    var angle = Math.atan2(posSouris.y - MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.y, posSouris.x - MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.x);
                    curseur_2.position3d.x = (MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.x);
                    curseur_2.position3d.z = (MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.y);
                    curseur_2.euler.z = angle;
                });
                InterfaceCompetenceADV.instance.fonctionCliqueMonde = function () {
                    MondeADV_1.MondeADV.instance.supprimerBoucle("zone_ligne");
                    MondeADV_1.MondeADV.instance.supprimerCurseur();
                    if (curseur_2.parent) {
                        curseur_2.parent.removeChild(curseur_2);
                    }
                    InterfaceCompetenceADV.instance.fonctionCliqueMonde = null;
                    var posSouris = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(TFMAdventure_1.default.SOURIS_X, TFMAdventure_1.default.SOURIS_Y);
                    MobileADV_1.MobileADV.joueurPrincipal.versLaDroite(posSouris.x > MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.x, true);
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.activerCompetence(_this.identifiantUnique, 0, posSouris.x, posSouris.y));
                    var clipValidation = InterfaceCompetenceADV.instance.clipZoneValidationLigne;
                    clipValidation.position3d.x = curseur_2.position3d.x;
                    clipValidation.position3d.z = curseur_2.position3d.z;
                    clipValidation.tint = 0xFFFFFF;
                    clipValidation.alpha = 1;
                    clipValidation.euler.z = curseur_2.euler.z;
                    MondeADV_1.MondeADV.instance.coucheSol.addChild(clipValidation);
                    InterfaceCompetenceADV.instance.debutAnimValidationLigne = Date.now();
                };
            }
        };
        IconeCompetenceADV.styleBase = new PIXI.TextStyle({
            fontFamily: "police-nom,Verdana",
            align: "center",
            fill: "#FFE7E2",
            fontSize: 40,
            stroke: '#000000',
            strokeThickness: 5
        });
        return IconeCompetenceADV;
    }(PIXI.Sprite));
    var ConteneurEmote = (function (_super) {
        __extends(ConteneurEmote, _super);
        function ConteneurEmote() {
            var _this = _super.call(this) || this;
            _this.styleBase = new PIXI.TextStyle({
                fontFamily: "police-nom,Verdana",
                align: "center",
                fill: "#EBDDC3",
                fontSize: 20,
                stroke: '#000000',
                strokeThickness: 5
            });
            var liste = ["/hi", "/sit", "/dance"];
            var _loop_2 = function (i) {
                var emote = liste[i];
                var texte = new PIXI.Text(emote, this_2.styleBase);
                texte.y = i * 24;
                this_2.addChild(texte);
                UtilPIXI_1.default.rendreElementCliquable(texte, function () {
                    TFMAdventure_1.default.envoyer(ProtoM801_1.default.commande(emote.substr(1)));
                    if (_this.parent) {
                        _this.parent.removeChild(_this);
                    }
                }, function () {
                    if (_this.parent) {
                        _this.parent.removeChild(_this);
                    }
                });
            };
            var this_2 = this;
            for (var i = 0; i < liste.length; i++) {
                _loop_2(i);
            }
            var fond = new PIXI.Graphics();
            fond.beginFill(0, 0.8);
            fond.drawRoundedRect(-5, -5, _this.width + 10, _this.height + 10, 6);
            _this.addChildAt(fond, 0);
            return _this;
        }
        return ConteneurEmote;
    }(PIXI.Container));
});
//# sourceMappingURL=InterfaceCompetenceADV.js.map