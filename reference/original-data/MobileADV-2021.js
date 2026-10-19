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
define(["require", "exports", "../MondeADV", "../../_tfmAdventure/TFMAdventure", "../../_tfmAdventure/ProtoADV", "../../_tfmAdventure/ClavierADV", "../../outils/MathADV", "./types/ClipNomADV", "../../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../../../../Souritheque-client/src/interface/Couleur", "../../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "./types/InfoCommuneElement", "../../../../Souritheque-client/src/outils/Mathematiques", "../../../../Souritheque-client/src/outils/affichage/animation/Look", "../../../../Souritheque-client/src/outils/son/MoteurSon", "./types/EffetMobileADV", "./AplatMobileADV", "../../gameplay/armes/OutilsArmeADV", "./MoteurBibliothequeSonADV", "../../graphismes/ShaderTransparencePicto", "../../../../Souritheque-client/src/outils/UtilPIXI", "../../_tfmAdventure/OptionsADV"], function (require, exports, MondeADV_1, TFMAdventure_1, ProtoADV_1, ClavierADV_1, MathADV_1, ClipNomADV_1, AnimMath_1, Couleur_1, ClipAnim_1, InfoCommuneElement_1, Mathematiques_1, Look_1, MoteurSon_1, EffetMobileADV_1, AplatMobileADV_1, OutilsArmeADV_1, MoteurBibliothequeSonADV_1, ShaderTransparencePicto_1, UtilPIXI_1, OptionsADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MobileADV = (function (_super) {
        __extends(MobileADV, _super);
        function MobileADV() {
            var _this = _super.call(this) || this;
            _this.coucheMonde = 0;
            _this.destructionRequise = false;
            _this.estJoueurPrincipal = false;
            _this.estUnJoueur = false;
            _this.estVisible = false;
            _this.distanceCarreJoueurPrincipal = 0;
            _this.infoCommune = new InfoCommuneElement_1.InfoCommuneElement();
            _this.souffleEnCours = 0;
            _this.dateDebutClignottement = 0;
            _this.dateClignottementRapide = 0;
            _this.echelleDistance = 1;
            _this.estEnCombat = false;
            _this.estMort = false;
            _this.estUnEnnemi = false;
            _this.estUnAllie = false;
            _this.finFiltreTouche = 0;
            _this.tempsDebutAttaque = 0;
            _this.paradeEnCours = false;
            _this.estVersLaDroite = true;
            _this.estUnAplat = false;
            _this.positionVirtuelle = new PIXI.Point();
            _this.positionServeur = new PIXI.Point();
            _this.decalageServeur = new PIXI.Point();
            _this.estStatique = false;
            _this.vitesseDeplacement = 0;
            _this.modificateurVitesse = 1;
            _this.modificateurVitesseBase = 1;
            _this.enCoursDeDeplacement = false;
            _this.angleDeplacement = 0;
            _this.dernierAngleDeplacement = 0;
            _this.prochainDernierAngle = 0;
            _this.tempsDeplacementTotal = 0;
            _this.distanceMaxActive = false;
            _this.distanceDeplacementMax = 0;
            _this.distanceDeplacementRestant = 0;
            _this.derniereBoucle = 0;
            _this.estEnCoursDeTriage = false;
            _this.estEtourdi = false;
            _this.estGele = false;
            _this.peutSubirCollisions = false;
            _this.apparitionAlpha = true;
            _this.disparitionAlpha = true;
            _this.pauseDeplacement = 0;
            _this.prochaineBoucleSon = 0;
            _this.effetGraphique = new EffetMobileADV_1.EffetMobileADV(_this);
            return _this;
        }
        MobileADV.synchronisationJoueurPrincipal = function (POSITION, ANGLE_DEPLACEMENT) {
            if (MobileADV.joueurPrincipal) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.synchroJoueur(POSITION, ANGLE_DEPLACEMENT));
            }
        };
        MobileADV.prototype.defLook = function (LOOK) {
            this.look = LOOK;
            if (this.creature) {
                this.creature.defLook(LOOK);
                this.creature.jouerAnimation("statique", 0, true);
            }
        };
        MobileADV.prototype.defCreature = function (CLIP, REBOND) {
            var _this = this;
            if (REBOND === void 0) { REBOND = false; }
            if (this.creature) {
                if (this.creature.parent) {
                    this.creature.parent.removeChild(this.creature);
                }
                this.creature.filters = null;
                this.creature = null;
            }
            if (!CLIP) {
                return;
            }
            var indexAnim = CLIP.recupSourceClonage().indexAnim;
            if (indexAnim) {
                if (indexAnim["marche"]) {
                    this.possedeAnimMarche = true;
                }
                if (indexAnim["saut"]) {
                    this.possedeAnimSaut = true;
                }
            }
            this.creature = CLIP;
            if (REBOND) {
                this.creature.scale.y = 0.6;
            }
            if (this.look) {
                this.creature.defLook(this.look);
            }
            this.addChild(this.creature);
            if (this.infoCommune.teinture != undefined) {
                this.creature.tint = this.infoCommune.teinture;
                this.creature.alpha = this.infoCommune.alpha;
            }
            if (this.infoCommune.symetrie) {
                this.creature.scale.x = -1;
            }
            else if (!this.estVersLaDroite) {
                this.creature.scale.x = -1;
            }
            if (this.estStatique && this.creature.typeClip == "A") {
                this.creature.lecture((Math.random() * this.creature.nombreImage) | 0);
            }
            this.modeCombat(this.estEnCombat, true);
            if (this.rayonInterne) {
                var pwet = new PIXI.Graphics();
                pwet.beginFill(0x000000, 0.5);
                pwet.drawEllipse(0, 0, this.rayonInterne * 2, this.rayonInterne);
                pwet.endFill();
            }
            this.creature.declencheurEtiquette = function (ETIQUETTE) {
                if (ETIQUETTE == "pas") {
                    _this.jouerSon("pas/herbe" + ((1 + Math.random() * 4) | 0), 0.3);
                }
            };
            this.creature.jouerAnimation("statique", 0, true);
        };
        MobileADV.prototype.afficherOmbre = function (RAYON) {
            if (RAYON) {
                if (!this.clipOmbre) {
                    this.clipOmbre = new PIXI.projection.Sprite3d(PIXI.Texture.from("ombre"));
                    this.clipOmbre.euler.x = Math.PI / 2;
                    this.clipOmbre.pivot3d.set(64, 15);
                }
                this.echelleOmbre = RAYON / 124;
                this.clipOmbre.scale3d.x = this.echelleOmbre;
                this.clipOmbre.position3d.x = this.positionVirtuelle.x;
                this.clipOmbre.position3d.z = this.positionVirtuelle.y;
            }
        };
        MobileADV.prototype.equiperArme = function (ARME, DROITE) {
            if (ARME == null) {
                return;
            }
            if (DROITE) {
                if (this.mainDroite) {
                    this.mainDroite.desequipement();
                }
                this.mainDroite = ARME;
            }
            else {
                if (this.mainGauche) {
                    this.mainGauche.desequipement();
                }
                this.mainGauche = ARME;
            }
            ARME.mainDroite = DROITE;
            ARME.codeMain = DROITE ? 1 : 2;
            if (this.clipNom && this.estJoueurPrincipal) {
                this.clipNom.majArme(this.mainDroite, this.mainGauche);
            }
            if (this.creature && ARME.apparence) {
                this.creature.ajouterElementLook(ARME.apparence);
            }
            if (ARME.posture) {
                ARME.nomAnim = ARME.posture + "_attaque" + (DROITE ? "" : "G");
            }
            else {
                ARME.nomAnim = "attaque" + (DROITE ? "" : "G");
            }
        };
        MobileADV.prototype.desequiperArme = function (DROITE) {
            var ancienneArme;
            if (DROITE) {
                ancienneArme = this.mainDroite;
                this.mainDroite = null;
            }
            else {
                ancienneArme = this.mainGauche;
                this.mainGauche = null;
            }
            if (this.clipNom && this.estJoueurPrincipal) {
                this.clipNom.majArme(this.mainDroite, this.mainGauche);
            }
            if (this.creature && ancienneArme.apparence) {
                this.creature.retirerElementLook(ancienneArme.apparence);
            }
        };
        MobileADV.prototype.modeCombat = function (OUI, FORCER) {
            if (FORCER === void 0) { FORCER = false; }
            if (OUI != this.estEnCombat || FORCER) {
                this.estEnCombat = OUI;
                if (this.estJoueurPrincipal) {
                    TFMAdventure_1.default.instance.chat.activerCliqueTexte(!OUI);
                }
            }
        };
        MobileADV.prototype.modeParade = function (OUI, DROITE) {
            if (OUI != this.paradeEnCours) {
                this.paradeEnCours = OUI;
                if (OUI) {
                    if (DROITE) {
                        this.creature.jouerAnimation("parade-prep", 10, true)
                            .animationSuivante("parade", 10);
                    }
                    else {
                        this.creature.jouerAnimation("paradeG-prep", 10, true)
                            .animationSuivante("paradeG", 10);
                    }
                }
                else {
                    this.creature.jouerAnimation("statique", 0, true);
                }
                if (this.estJoueurPrincipal) {
                    if (OUI) {
                        MondeADV_1.MondeADV.instance.ajouterSouffle(this.positionVirtuelle.x, this.positionVirtuelle.y, 150, 0.5);
                    }
                    ClavierADV_1.default.instance.compilationDeplacementJoueurPrincipal();
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.modeParade(OUI, DROITE));
                }
            }
        };
        MobileADV.prototype.versLaDroite = function (OUI, SERVEUR) {
            if (SERVEUR === void 0) { SERVEUR = false; }
            if (OUI != this.estVersLaDroite) {
                this.estVersLaDroite = OUI;
                if (this.creature) {
                    this.creature.scale.x = OUI ? 1 : -1;
                    this.creature.scale.y = 0.9;
                }
                if (this.listeFXOrientable) {
                    for (var _i = 0, _a = this.listeFXOrientable; _i < _a.length; _i++) {
                        var clip = _a[_i];
                        clip.scale.x *= -1;
                    }
                }
                if (SERVEUR && this.estJoueurPrincipal) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.mobileDroite(OUI));
                }
                return true;
            }
            return false;
        };
        MobileADV.prototype.boucle = function (TEMPS, DELTA, SECONDE) {
            var joueurPrincipal = MobileADV.joueurPrincipal;
            var estLoin = false;
            if (joueurPrincipal) {
                if (this.joueurVisibleDerriere && this.estVisible) {
                    this.boucleTransparence(TEMPS);
                }
                this.distanceCarreJoueurPrincipal = Mathematiques_1.default.distanceCarre(joueurPrincipal.positionServeur.x, joueurPrincipal.positionServeur.y, this.positionServeur.x, this.positionServeur.y);
                estLoin = this.distanceCarreJoueurPrincipal > 4000000;
                if (this.estStatique && estLoin) {
                    this.positionVirtuelle.x = this.positionServeur.x;
                    this.positionVirtuelle.y = this.positionServeur.y;
                    return;
                }
            }
            var tempsEcoule = TEMPS - this.derniereBoucle;
            var modificateurDureeImage = tempsEcoule / 16.6666;
            this.derniereBoucle = TEMPS;
            if (this.dateDestructionAuto && TEMPS > this.dateDestructionAuto) {
                this.destructionRequise = true;
                return;
            }
            if (SECONDE) {
                if (this.estUnEnnemi) {
                    if (!MobileADV.ennemiProche
                        || MobileADV.ennemiProche.estMort
                        || this.distanceCarreJoueurPrincipal < MobileADV.ennemiProche.distanceCarreJoueurPrincipal) {
                        MobileADV.ennemiProche = this;
                    }
                }
            }
            if (this.estVisible && !estLoin) {
                if (this.creature) {
                    this.creature.boucle(TEMPS);
                }
                if (this.listeFXEnCours) {
                    var nb = this.listeFXEnCours.length;
                    if (nb == 0) {
                        this.listeFXEnCours = null;
                    }
                    else {
                        for (var i = 0; i < nb; i++) {
                            var info = this.listeFXEnCours[i];
                            info.clip.boucle(TEMPS);
                            var destruction = false;
                            if (info.dateFin) {
                                if (TEMPS > info.dateFin) {
                                    destruction = true;
                                }
                            }
                            else if (info.clip.jouerEnBoucle && info.clip.boucleEnCours > 0) {
                                destruction = true;
                            }
                            if (destruction) {
                                this.listeFXEnCours.splice(i, 1);
                                info.clip.parent.removeChild(info.clip);
                                i--;
                                nb--;
                                if (this.listeFXOrientable) {
                                    var index = this.listeFXOrientable.indexOf(info.clip);
                                    if (index != -1) {
                                        this.listeFXOrientable.splice(index, 1);
                                    }
                                }
                            }
                        }
                    }
                }
                if (this.listeFXBoucle) {
                    for (var _i = 0, _a = this.listeFXBoucle; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.clipAnim) {
                            info.clipAnim.boucle(TEMPS);
                        }
                        if (info.boucle) {
                            info.boucle(TEMPS, DELTA);
                        }
                    }
                }
                if (this.listeMobileInterne) {
                    for (var _b = 0, _c = this.listeMobileInterne; _b < _c.length; _b++) {
                        var clip = _c[_b];
                        clip.boucle(TEMPS);
                    }
                }
                if (this.boucleListeAplatRequise) {
                    this.boucleListeAplatRequise = false;
                    if (this.listeAplatMobile) {
                        for (var _d = 0, _e = this.listeAplatMobile; _d < _e.length; _d++) {
                            var aplat = _e[_d];
                            aplat.boucle(TEMPS, DELTA);
                            if (aplat.boucleRequise) {
                                this.boucleListeAplatRequise = true;
                            }
                        }
                    }
                }
                if (this.fxBouclierEnCours) {
                    this.fxBouclierEnCours.alpha += (0.2 - this.fxBouclierEnCours.alpha) * 0.1 * DELTA;
                }
                if (this.clipNom && this.clipNom.boucleRequise) {
                    this.clipNom.boucle(TEMPS, DELTA);
                }
                if (this.infoCommune.typeVent == 1) {
                    this.creature.skew.x = Mathematiques_1.default.cosRapide((TEMPS + (this.positionVirtuelle.x + this.positionVirtuelle.y) * 5) / 1000) * 0.05 - 0.025;
                    if (joueurPrincipal && joueurPrincipal.enCoursDeDeplacement && this.height < 100) {
                        if (Math.abs(this.souffleEnCours) < 0.08) {
                            if (this.distanceCarreJoueurPrincipal < 6400) {
                                var nouvelleBousculade = (joueurPrincipal.estVersLaDroite ? -1 : 1) * (1 - (this.distanceCarreJoueurPrincipal / 6400));
                                if (Math.abs(nouvelleBousculade) > Math.abs(this.souffleEnCours)) {
                                    this.souffleEnCours = nouvelleBousculade;
                                    MoteurSon_1.default.jouerEffet("buisson" + ((Math.random() * 3) | 0), 0.1, 500);
                                }
                            }
                        }
                    }
                    if (this.mondeEnCours.listeSouffleEnCours) {
                        for (var _f = 0, _g = this.mondeEnCours.listeSouffleEnCours; _f < _g.length; _f++) {
                            var souffle = _g[_f];
                            var distance = Mathematiques_1.default.distanceCarre(souffle.posX, souffle.posY, this.positionVirtuelle.x, this.positionVirtuelle.y);
                            if (distance < souffle.rayonCarre) {
                                var puissance = souffle.puissance;
                                if (this.height > 100) {
                                    puissance = Math.min(puissance, puissance / (this.height / 50));
                                }
                                if (souffle.posX < this.positionVirtuelle.x) {
                                    puissance = -puissance;
                                }
                                var nouvelleBousculade = puissance * (1 - (distance / souffle.rayonCarre));
                                if (Math.abs(nouvelleBousculade) > Math.abs(this.souffleEnCours)) {
                                    this.souffleEnCours = nouvelleBousculade;
                                }
                            }
                        }
                    }
                }
                else if (this.infoCommune.typeVent == 2) {
                    this.creature.scale.x = 0.995 + Mathematiques_1.default.cosRapide((this.positionVirtuelle.x * 100 + TEMPS) / 1000) * 0.05;
                    this.creature.scale.y = 0.995 + Mathematiques_1.default.sinRapide((this.positionVirtuelle.y * 100 + TEMPS) / 800) * 0.05;
                    if (this.infoCommune.symetrie) {
                        this.creature.scale.x *= -1;
                    }
                    var valeur_1 = Math.min(Math.max(1.2 + Mathematiques_1.default.sinRapide(TEMPS / 5000), 0.4), 1);
                    var rouge = 0x7F + (MondeADV_1.MondeADV.couleurCanopee >> 16 & 0xFF) * valeur_1;
                    var vert = 0x7F + (MondeADV_1.MondeADV.couleurCanopee >> 8 & 0xFF) * valeur_1;
                    var bleu = 0x7F + (MondeADV_1.MondeADV.couleurCanopee & 0xFF) * valeur_1;
                    this.creature.tint = (rouge << 16) | (vert << 8) | bleu;
                }
                if (this.souffleEnCours) {
                    this.skew.x += (this.souffleEnCours - this.skew.x) * 0.2;
                    this.souffleEnCours *= 0.95;
                    if (Math.abs(this.souffleEnCours) < 0.001) {
                        this.souffleEnCours = 0;
                        this.skew.x = 0;
                    }
                }
                if (this.lumiereClipMobile) {
                    if (this.typeEffetLumiere) {
                        if (!this.lumiereAlea) {
                            this.lumiereAlea = Math.random() * 10000;
                        }
                        if (this.typeEffetLumiere == 1) {
                            var temps = (TEMPS * 0.4) + this.lumiereAlea;
                            var r = Mathematiques_1.default.cosRapide(temps / 37) * Mathematiques_1.default.sinRapide(temps / 71) * Mathematiques_1.default.cosRapide(temps / 97) * 0.1;
                            this.lumiereClipSol.scale3d.set(this.echelleLumiere + r);
                            this.lumiereClipMobile.scale.set((this.echelleLumiere * this.echelleDistance * this.ratioLumiere) + r * this.echelleDistance);
                        }
                        else if (this.typeEffetLumiere == 2) {
                            var r = Mathematiques_1.default.cosRapide((TEMPS + this.lumiereAlea) / 2000) * 0.2;
                            this.lumiereClipSol.scale3d.set(this.echelleLumiere + r);
                            this.lumiereClipMobile.scale.set((this.echelleLumiere * this.echelleDistance * this.ratioLumiere) + r);
                        }
                    }
                    else {
                        this.lumiereClipMobile.scale.set(this.echelleLumiere * this.echelleDistance * this.ratioLumiere);
                    }
                }
                if (this.dateDebutClignottement > 0) {
                    if (this.dateClignottementRapide < Date.now()) {
                        this.alpha = Mathematiques_1.default.cosRapide((Date.now() - this.dateDebutClignottement) * (2 * Math.PI) / 1000 * 2) * 0.3 + 0.7;
                    }
                    else {
                        this.alpha = Mathematiques_1.default.cosRapide((Date.now() - this.dateDebutClignottement) * (2 * Math.PI) / 1000) * 0.3 + 0.7;
                    }
                }
            }
            if (this.finFiltreTouche && TEMPS > this.finFiltreTouche) {
                this.finFiltreTouche = 0;
                this.majFiltre();
            }
            if (this.creature && this.creature.scale.y != 1) {
                this.creature.scale.y += (1 - this.creature.scale.y) * 0.2;
            }
            if (this.mainDroite) {
                this.mainDroite.boucleInterne();
            }
            if (this.mainGauche) {
                this.mainGauche.boucleInterne();
            }
            if (this.estMort) {
                if (this.creature) {
                    this.creature.jouerAnimation("mort", 100);
                }
            }
            else {
                if (!this.porteur) {
                    if (this.projectionEnCours) {
                        var progression = (TEMPS - this.tempsZeroProjection) / this.dureeProjection;
                        if (progression < 0) {
                            progression = 0;
                        }
                        else if (progression >= 1) {
                            progression = 1;
                            this.projectionEnCours = false;
                            this.orientationDeplacementAuto = false;
                            if (this.hauteurProjection) {
                                if (this.creature) {
                                    this.creature.y = 0;
                                    this.creature.scale.y = 0.8;
                                }
                                if (this.clipOmbre) {
                                    this.clipOmbre.scale3d.x = this.echelleOmbre;
                                    this.clipOmbre.scale3d.y = 1;
                                }
                            }
                        }
                        if (this.typeProjection == 1) {
                            progression = AnimMath_1.Mouvement.easeOutExpo(progression, 0, 1, 1);
                        }
                        else if (this.typeProjection == 5) {
                            progression = AnimMath_1.Mouvement.easeInExpo(progression, 0, 1, 1);
                        }
                        else if (this.typeProjection == 6) {
                            progression = AnimMath_1.Mouvement.easeOutQuad(progression, 0, 1, 1);
                        }
                        else if (this.typeProjection == 7) {
                            progression = AnimMath_1.Mouvement.easeInQuad(progression, 0, 1, 1);
                        }
                        var deplacementX = this.distanceProjection.x * (progression - this.derniereProgressionProjection);
                        var deplacementY = this.distanceProjection.y * (progression - this.derniereProgressionProjection);
                        var positionAjustee = void 0;
                        if (this.peutSubirCollisions) {
                            positionAjustee = this.mondeEnCours.ajusterCibleDeplacementSuivantCollisions(this.positionServeur.x, this.positionServeur.y, deplacementX, deplacementY);
                            this.positionServeur.x = this.positionVirtuelle.x = positionAjustee.x;
                            this.positionServeur.y = this.positionVirtuelle.y = positionAjustee.y;
                        }
                        else {
                            this.positionServeur.x = this.positionVirtuelle.x = this.departProjection.x + this.distanceProjection.x * progression;
                            this.positionServeur.y = this.positionVirtuelle.y = this.departProjection.y + this.distanceProjection.y * progression;
                        }
                        this.derniereProgressionProjection = progression;
                        if (this.hauteurProjection) {
                            var hauteurSaut = (this.hauteurFacteurQuadratique * progression + this.hauteurFacteurLineaire) * progression + this.hauteurDepart;
                            if (this.creature) {
                                this.creature.y = -hauteurSaut;
                                if (this.typeProjection == 3) {
                                    this.creature.rotation += tempsEcoule / 100;
                                }
                            }
                            if (this.clipOmbre) {
                                var reduction = 1 - (Math.min(hauteurSaut / 300, 1) * 0.9);
                                this.clipOmbre.scale3d.x = this.echelleOmbre * reduction;
                                this.clipOmbre.scale3d.y = reduction;
                            }
                            if (this.possedeAnimSaut) {
                                if (this.projectionEnCours) {
                                    this.creature.jouerAnimation("saut", 100);
                                    if (progression < 0.4) {
                                        this.creature.stop(0);
                                    }
                                    else if (progression > 0.6) {
                                        this.creature.stop(2);
                                    }
                                    else {
                                        this.creature.stop(1);
                                    }
                                }
                                else {
                                    this.creature.jouerAnimation("saut-fin", 2, true);
                                    this.creature.animationSuivante("statique", 0);
                                }
                            }
                        }
                        else {
                        }
                        this.mondeEnCours.trierMobile(this);
                    }
                    else if (this.enCoursDeDeplacement && this.modificateurVitesseBase && TEMPS > this.pauseDeplacement) {
                        this.tempsDeplacementTotal += tempsEcoule;
                        var dureeImage = tempsEcoule / 1000;
                        if (dureeImage > 5) {
                            dureeImage = 5;
                        }
                        var puissanceX = Math.cos(this.angleDeplacement);
                        var puissanceY = Math.sin(this.angleDeplacement);
                        if (TEMPS > this.prochainDernierAngle) {
                            this.prochainDernierAngle = TEMPS + 200;
                            this.dernierAngleDeplacement = this.angleDeplacement;
                        }
                        var distanceDeplacement = this.vitesseDeplacement * this.modificateurVitesseBase * this.modificateurVitesse * dureeImage;
                        if (this.distanceMaxActive) {
                            this.distanceDeplacementRestant -= distanceDeplacement;
                            if (this.distanceDeplacementRestant <= 0) {
                                distanceDeplacement += this.distanceDeplacementRestant;
                                this.arreterDeplacement();
                            }
                        }
                        var deplacementX = puissanceX * distanceDeplacement;
                        var deplacementY = puissanceY * distanceDeplacement;
                        if (this.peutSubirCollisions) {
                            var positionAjustee = this.mondeEnCours.ajusterCibleDeplacementSuivantCollisions(this.positionServeur.x, this.positionServeur.y, deplacementX, deplacementY);
                            this.positionServeur.x = positionAjustee.x;
                            this.positionServeur.y = positionAjustee.y;
                        }
                        else {
                            this.positionServeur.x += deplacementX;
                            this.positionServeur.y += deplacementY;
                        }
                        if (puissanceX < -0.1 && this.estVersLaDroite) {
                            this.versLaDroite(false);
                        }
                        else if (puissanceX > 0.1 && !this.estVersLaDroite) {
                            this.versLaDroite(true);
                        }
                        if (this.creature && this.enCoursDeDeplacement) {
                            if (this.possedeAnimMarche) {
                                if (this.creature.nomAnimEnCours != "course") {
                                    this.creature.jouerAnimation(this.modificateurVitesse < 0.5 ? "marche" : "course", 2);
                                }
                            }
                            else {
                                if (this.creature.nomAnimEnCours != "course") {
                                    this.creature.jouerAnimation("course", 2);
                                }
                                if (this.creature.animEnCours) {
                                    this.creature.animEnCours.defVitesseLecture(Math.max(this.modificateurVitesse, 0.5));
                                }
                            }
                        }
                    }
                }
            }
            var diffY = this.positionServeur.y - this.positionVirtuelle.y;
            this.positionVirtuelle.x += (this.positionServeur.x - this.positionVirtuelle.x) * 0.2 * DELTA;
            this.positionVirtuelle.y += diffY * 0.2 * DELTA;
            if (this.listeMobilePorte) {
                for (var _h = 0, _j = this.listeMobilePorte; _h < _j.length; _h++) {
                    var mobile = _j[_h];
                    mobile.positionServeur.x = mobile.positionVirtuelle.x = this.positionVirtuelle.x;
                    mobile.positionServeur.y = mobile.positionVirtuelle.y = this.positionVirtuelle.y;
                    if (diffY < -5 || diffY > 5) {
                        this.mondeEnCours.trierMobile(mobile);
                    }
                }
            }
            var valeur = this.estJoueurPrincipal ? 1 : 5;
            if (diffY < -valeur || diffY > valeur) {
                this.mondeEnCours.trierMobile(this);
            }
            if (this.bibliothequeSon && this.bibliothequeSon.sonBoucleCourse) {
                this.bibliothequeSon.boucleSonCourse();
            }
            if (this.listeSonEnCours && TEMPS > this.prochaineBoucleSon) {
                this.prochaineBoucleSon = TEMPS + 500;
                if (this.listeSonEnCours) {
                    for (var i = 0, nb = this.listeSonEnCours.length; i < nb; i++) {
                        var infoSon = this.listeSonEnCours[i];
                        var volume = MoteurSon_1.default.attenuerSonDistant(1, Math.sqrt(this.distanceCarreJoueurPrincipal), TFMAdventure_1.default.DEMI_LARGEUR + 200);
                        infoSon.son.defVolume(infoSon.volume * volume);
                        if (infoSon.boucle) {
                            if (volume <= 0 && infoSon.son.lectureEnCours()) {
                                infoSon.son.stop();
                            }
                            else if (volume && !infoSon.son.lectureEnCours()) {
                                infoSon.son.lecture();
                            }
                        }
                        else {
                            if (!infoSon.son.lectureEnCours()) {
                                this.listeSonEnCours.splice(i, 1);
                                i--;
                                nb--;
                                continue;
                            }
                        }
                    }
                }
            }
            if (this.bulleChat) {
                this.bulleChat.boucle(TEMPS);
            }
            if (this.listeBoucle) {
                for (var _k = 0, _l = this.listeBoucle; _k < _l.length; _k++) {
                    var boucleSuppl = _l[_k];
                    boucleSuppl(this, TEMPS, DELTA);
                }
            }
        };
        MobileADV.prototype.ajouterBoucle = function (BOUCLE) {
            if (!this.listeBoucle) {
                this.listeBoucle = [];
            }
            this.listeBoucle.push(BOUCLE);
        };
        MobileADV.prototype.activerTrainee = function () {
            var _this = this;
            var dernierePositionTrainee = null;
            var boutTrainee = new AplatMobileADV_1.AplatMobileADV();
            boutTrainee.texture = PIXI.Texture.from("trainee_bout");
            boutTrainee.pivot3d.set(90, 16);
            boutTrainee.alpha = 0.4;
            this.ajouterAplatMobile(boutTrainee);
            this.ajouterBoucle(function (MOBILE, TEMPS, DELTA) {
                if (MOBILE.estMort || !MOBILE.visible) {
                    return;
                }
                if (dernierePositionTrainee) {
                    var distance = Mathematiques_1.default.distanceCarre(dernierePositionTrainee.x, dernierePositionTrainee.y, _this.positionVirtuelle.x, _this.positionVirtuelle.y);
                    if (distance > 2) {
                        _this.mondeEnCours.ajouterMorceauTrainee(dernierePositionTrainee.x, dernierePositionTrainee.y, _this.positionVirtuelle.x, _this.positionVirtuelle.y);
                        boutTrainee.euler.z = Math.atan2(_this.positionVirtuelle.y - dernierePositionTrainee.y, _this.positionVirtuelle.x - dernierePositionTrainee.x);
                    }
                    dernierePositionTrainee.set(_this.positionVirtuelle.x, _this.positionVirtuelle.y);
                }
                else {
                    dernierePositionTrainee = new PIXI.Point(_this.positionVirtuelle.x, _this.positionVirtuelle.y);
                }
            });
        };
        MobileADV.prototype.majFiltre = function () {
            if (this.creature) {
                if (this.estGele || this.finFiltreTouche) {
                    var liste = [];
                    if (this.estGele) {
                        liste.push(TFMAdventure_1.default.FILTRE_GEL);
                    }
                    if (this.finFiltreTouche) {
                        liste.push(TFMAdventure_1.default.FILTRE_TOUCHE);
                    }
                    this.creature.filters = liste;
                }
                else {
                    this.creature.filters = null;
                }
            }
        };
        MobileADV.prototype.boucleTransparence = function (TEMPS) {
            var xJoueurEcran = MobileADV.joueurPrincipal.x + TFMAdventure_1.default.DEMI_LARGEUR;
            var yJoueurEcran = MobileADV.joueurPrincipal.y + TFMAdventure_1.default.DEMI_HAUTEUR;
            var limites = this.getBounds(true);
            if (MobileADV.joueurPrincipal.positionVirtuelle.y > this.positionVirtuelle.y
                || limites.left > xJoueurEcran + MobileADV.DEMI_LARGEUR_TROU_PICTO
                || xJoueurEcran - MobileADV.DEMI_LARGEUR_TROU_PICTO > limites.right
                || limites.top > yJoueurEcran + MobileADV.DEMI_HAUTEUR_TROU_PICTO
                || yJoueurEcran - MobileADV.DEMI_HAUTEUR_TROU_PICTO > limites.bottom) {
                if (this.filtreTransparence) {
                    if (this.filtreTransparence.demandeDestruction) {
                        var filtres = this.filters;
                        if (filtres) {
                            var indiceFiltreTransparence = filtres.indexOf(this.filtreTransparence);
                            if (indiceFiltreTransparence >= 0) {
                                filtres.splice(indiceFiltreTransparence, 1);
                            }
                            if (filtres.length <= 0) {
                                filtres = null;
                            }
                            this.filters = filtres;
                        }
                        this.filtreTransparence = null;
                    }
                    else {
                        this.filtreTransparence.debuterFondu(TEMPS, false);
                        this.filtreTransparence.boucle(TEMPS, this.filtreTransparence);
                    }
                }
            }
            else {
                if (!this.filtreTransparence) {
                    this.filtreTransparence = new ShaderTransparencePicto_1.ShaderTransparencePicto();
                    var filtres = this.filters;
                    if (filtres) {
                        filtres.push(this.filtreTransparence);
                    }
                    else {
                        filtres = [this.filtreTransparence];
                    }
                    this.filters = filtres;
                }
                this.filtreTransparence.debuterFondu(TEMPS, true);
                this.filtreTransparence.boucle(TEMPS, this.filtreTransparence);
            }
        };
        MobileADV.prototype.jouerSon = function (SON, VOLUME, BOUCLE) {
            if (VOLUME === void 0) { VOLUME = 1; }
            if (BOUCLE === void 0) { BOUCLE = false; }
            var volumeDistance = MoteurSon_1.default.attenuerSonDistant(1, Math.sqrt(this.distanceCarreJoueurPrincipal), TFMAdventure_1.default.DEMI_LARGEUR + 200);
            if (BOUCLE) {
                if (!this.listeSonEnCours) {
                    this.listeSonEnCours = [];
                    this.indexSonBoucle = {};
                }
                var infoSon = this.indexSonBoucle[SON];
                var son = void 0;
                if (infoSon) {
                    infoSon.volume = VOLUME;
                }
                else {
                    son = MoteurSon_1.default.jouerEffet(SON, volumeDistance * VOLUME, 0, false);
                    if (son) {
                        son.jouerEnBoucle(BOUCLE);
                        infoSon = {
                            son: son,
                            volume: VOLUME,
                            boucle: BOUCLE
                        };
                        this.listeSonEnCours.push(infoSon);
                        this.indexSonBoucle[SON] = infoSon;
                    }
                }
            }
            else {
                MoteurSon_1.default.jouerEffet(SON, volumeDistance * VOLUME);
            }
        };
        MobileADV.prototype.arreterSon = function () {
            if (this.listeSonEnCours) {
                for (var _i = 0, _a = this.listeSonEnCours; _i < _a.length; _i++) {
                    var info = _a[_i];
                    info.son.stop(1000);
                }
                this.listeSonEnCours = null;
            }
        };
        MobileADV.prototype.declenchementMort = function (A_TERRE) {
            this.arreterDeplacement();
            this.estMort = true;
            if (this.creature) {
                this.creature.jouerAnimation("mort", 100, true);
                this.creature.y = 0;
            }
            if (this.bibliothequeSon) {
                this.bibliothequeSon.sonMort();
            }
            if (A_TERRE) {
                if (this.clipNom) {
                    this.clipNom.modeATerre(true);
                }
            }
            else {
                if (this.clipNom && this.clipNom.parent) {
                    this.clipNom.parent.removeChild(this.clipNom);
                }
            }
        };
        MobileADV.prototype.reanimation = function () {
            this.estMort = false;
            if (this.clipNom) {
                this.clipNom.modeATerre(false);
            }
            if (this.creature) {
                this.creature.jouerAnimation("statique", 0, true);
                this.creature.scale.y = 0.6;
                this.jouerSon("soins2", 0.6);
                this.afficherFX(48, 0, 0, 1, 1, 0, 0, 0);
            }
        };
        MobileADV.prototype.animationAttaque = function (MAIN, CODE) {
            this.animAttaqueEnCours = true;
            if (this.creature) {
                var arme = MAIN == 1 ? this.mainDroite : (MAIN == 2 ? this.mainGauche : null);
                var nomAnim = void 0;
                if (arme) {
                    nomAnim = arme.nomAnim + CODE;
                }
                else {
                    nomAnim = "attaque" + CODE;
                }
                this.creature.jouerAnimation(nomAnim, 3, true, 0, 11);
            }
        };
        MobileADV.prototype.finAnimationAttaque = function (MAIN, CODE, IMAGE, TOUCHE) {
            this.animAttaqueEnCours = false;
            this.finAnimAttaqueEnCours = true;
            if (this.bibliothequeSon) {
                this.bibliothequeSon.sonAttaque();
            }
            if (this.creature) {
                var arme = MAIN == 1 ? this.mainDroite : (MAIN == 2 ? this.mainGauche : null);
                var nomAnim = void 0;
                if (arme) {
                    nomAnim = arme.nomAnim + CODE;
                }
                else {
                    nomAnim = "attaque" + CODE;
                }
                this.creature.jouerAnimation(nomAnim, 1, true, IMAGE).animationSuivante("statique");
                this.mondeEnCours.ajouterSouffle(this.positionVirtuelle.x, this.positionVirtuelle.y, 200);
                if (TOUCHE) {
                    this.creature.pausePendant(100);
                }
            }
        };
        MobileADV.prototype.afficherEmoji = function (CODE) {
            var clip = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("interface/emote/T" + CODE + ".png"));
            clip.anchor.set(0.5, 0.5);
            clip.x = this.estVersLaDroite ? -40 : 40;
            AnimMath_1.default.animObjet(clip, "y", -30, -60, 2000).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto()
                .defFonctionFin(function () {
                if (clip.parent) {
                    clip.parent.removeChild(clip);
                }
            });
            this.addChild(clip);
        };
        MobileADV.prototype.afficherFX = function (CODE, X, Y, SX, SY, PAUSE, PLAN, ANGLE, DUREE) {
            if (ANGLE === void 0) { ANGLE = 0; }
            if (DUREE === void 0) { DUREE = 0; }
            if (!this.estVisible) {
                return;
            }
            if (!this.listeFXEnCours) {
                this.listeFXEnCours = [];
            }
            if (!this.listeFXOrientable) {
                this.listeFXOrientable = [];
            }
            var info = TFMAdventure_1.default.indexFX[CODE];
            var clip = info.clip;
            if (clip) {
                clip = TFMAdventure_1.default.recupFX(CODE);
                clip.x = X;
                clip.y = Y;
                clip.rotation = ANGLE;
                clip.scale.set(SX, SY);
                if (PAUSE) {
                    clip.pausePendant(PAUSE);
                }
                var cible = this.porteur && this.creature ? this.creature : this;
                if (PLAN == 1) {
                    cible.addChildAt(clip, 0);
                }
                else {
                    cible.addChild(clip);
                }
                this.listeFXEnCours.push({ clip: clip, dateFin: (DUREE ? Date.now() + DUREE : 0) });
                if (info.orientable) {
                    if (!this.estVersLaDroite) {
                        clip.scale.x *= -1;
                    }
                    this.listeFXOrientable.push(clip);
                }
                if (info.etirable && info.largeur && this.largeurOmbre) {
                    clip.scale.set((this.largeurOmbre + info.decalageEtirement) / info.largeur);
                }
            }
        };
        MobileADV.prototype.majCouleurArme = function (COULEUR) {
            if (COULEUR == 0) {
                if (this.cacheFXArme) {
                    this.creature.supprimerObjet(this.cacheFXArme);
                    this.FXArmeEquipe = false;
                }
                return;
            }
            if (!this.cacheFXArme) {
                this.cacheFXArme = TFMAdventure_1.default.recupFX(56);
                this.cacheFXArme.position.set(20, 17);
            }
            this.cacheFXArme.teinter(COULEUR);
            if (!this.FXArmeEquipe) {
                this.creature.equiperObjet("arme1", this.cacheFXArme);
                this.FXArmeEquipe = true;
            }
        };
        MobileADV.prototype.afficherAura = function (TYPE, RAYON, COULEUR) {
            var _this = this;
            var ancienRayon = 0;
            if (this.clipAura) {
                if (this.clipAura.parent) {
                    this.clipAura.parent.removeChild(this.clipAura);
                }
                if (this.auraDernierRayon) {
                    ancienRayon = this.auraDernierRayon;
                }
                this.clipAura = null;
                this.auraDernierRayon = null;
            }
            if (RAYON > 0) {
                this.clipAura = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("interface/zone/z" + TYPE + ".png"));
                this.clipAura.tint = COULEUR;
                this.clipAura.euler.x = Math.PI / 2;
                if (!ancienRayon) {
                    this.clipAura.alpha = 0;
                }
                this.clipAura.blendMode = PIXI.BLEND_MODES.ADD;
                this.clipAura.anchor.set(0.5, 0.5);
                this.clipAura.position3d.x = this.positionVirtuelle.x;
                this.clipAura.position3d.z = this.positionVirtuelle.y;
                this.mondeEnCours.coucheSol.addChild(this.clipAura);
                var depart_1 = ancienRayon / 200;
                var distance_1 = (RAYON / 200) - depart_1;
                this.clipAura.scale3d.y = this.clipAura.scale3d.x = depart_1;
                AnimMath_1.default.animBoucle(1000, function (P) {
                    _this.clipAura.scale3d.y = _this.clipAura.scale3d.x = depart_1 + distance_1 * P;
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                this.auraDernierRayon = RAYON;
            }
        };
        MobileADV.prototype.ajouterAplatMobile = function (APLAT_MOBILE) {
            if (!this.listeAplatMobile) {
                this.listeAplatMobile = [];
            }
            if (APLAT_MOBILE.boucleRequise) {
                this.boucleListeAplatRequise = true;
            }
            if (APLAT_MOBILE.apparitionAlpha) {
                APLAT_MOBILE.alpha = 0;
            }
            this.listeAplatMobile.push(APLAT_MOBILE);
            if (this.mondeEnCours) {
                this.mondeEnCours.coucheSol.addChild(APLAT_MOBILE);
            }
        };
        MobileADV.prototype.supprimerAplatMobile = function (IDENTIFIANT) {
            if (!this.listeAplatMobile) {
                return;
            }
            for (var i = 0, nb = this.listeAplatMobile.length; i < nb; i++) {
                var aplatMobile = this.listeAplatMobile[i];
                if (aplatMobile.identifiant == IDENTIFIANT) {
                    aplatMobile.disparition(aplatMobile.disparitionAlpha);
                    this.listeAplatMobile.splice(i, 1);
                    break;
                }
            }
            if (this.listeAplatMobile.length == 0) {
                this.listeAplatMobile = null;
            }
        };
        MobileADV.prototype.ajouterLumiere = function (COULEUR, RAYON, ALPHA, EFFET, FORME, RATIO) {
            if (ALPHA === void 0) { ALPHA = 1; }
            if (EFFET === void 0) { EFFET = 0; }
            if (FORME === void 0) { FORME = 0; }
            if (RATIO === void 0) { RATIO = 1.5; }
            if (this.infoCommune.lumiere) {
                return;
            }
            this.supprimerLumiere();
            this.typeEffetLumiere = EFFET;
            this.echelleLumiere = RAYON / 100;
            this.ratioLumiere = RATIO;
            var monde = this.mondeEnCours ? this.mondeEnCours : MondeADV_1.MondeADV.instance;
            this.lumiereClipSol = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("fx/lum" + FORME + ".png"));
            this.lumiereClipSol.euler.x = Math.PI / 2;
            this.lumiereClipSol.anchor.set(0.5, 0.5);
            this.lumiereClipSol.scale3d.set(this.echelleLumiere);
            this.lumiereClipSol.tint = COULEUR;
            this.lumiereClipSol.alpha = ALPHA;
            this.lumiereClipMobile = PIXI.Sprite.from(TFMAdventure_1.default.recupImageDistance("fx/lum" + FORME + ".png"));
            this.lumiereClipMobile.anchor.set(0.5, 0.5);
            this.lumiereClipMobile.scale.set(this.echelleLumiere * RATIO);
            this.lumiereClipMobile.tint = COULEUR;
            this.lumiereClipMobile.alpha = ALPHA;
            if (this.estVisible) {
                monde.coucheLumSol.addChild(this.lumiereClipSol);
                monde.coucheLumMobileDynamique.addChild(this.lumiereClipMobile);
                this.lumiereClipSol.position3d.x = this.positionVirtuelle.x;
                this.lumiereClipSol.position3d.z = this.positionVirtuelle.y;
                var pos = new PIXI.Point();
                pos.x = this.positionVirtuelle.x;
                pos.z = this.positionVirtuelle.y;
                monde.camera3D.proj.local.apply(pos, pos);
                this.lumiereClipMobile.position.set(pos.x, pos.y);
            }
        };
        MobileADV.prototype.supprimerLumiere = function () {
            if (this.lumiereClipSol) {
                if (this.lumiereClipSol.parent) {
                    this.lumiereClipSol.parent.removeChild(this.lumiereClipSol);
                }
                this.lumiereClipSol = null;
            }
            if (this.lumiereClipMobile) {
                if (this.lumiereClipMobile.parent) {
                    this.lumiereClipMobile.parent.removeChild(this.lumiereClipSol);
                }
                this.lumiereClipMobile = null;
            }
        };
        MobileADV.prototype.projection = function (DX, DY, FX, FY, DUREE, HAUTEUR, HAUTEUR_DEPART, HAUTEUR_FIN, ORIENTATION_AUTO, TRAINEE, TYPE) {
            if (!this.estUnJoueur) {
                this.enCoursDeDeplacement = false;
                if (this.creature && this.creature.nomAnimEnCours == "course") {
                    this.creature.jouerAnimation("statique", 0, true);
                }
            }
            this.projectionEnCours = true;
            this.tempsZeroProjection = Date.now();
            this.decalageServeur.set(0, 0);
            this.derniereProgressionProjection = 0;
            this.departProjection = new PIXI.Point(DX, DY);
            this.distanceProjection = new PIXI.Point(FX - DX, FY - DY);
            this.dureeProjection = DUREE;
            this.typeProjection = TYPE;
            this.hauteurProjection = HAUTEUR;
            this.hauteurDepart = HAUTEUR_DEPART;
            this.orientationDeplacementAuto = ORIENTATION_AUTO;
            this.hauteurFacteurQuadratique = ((HAUTEUR_FIN + HAUTEUR_DEPART - 2 * HAUTEUR) - 2 * Math.sqrt((HAUTEUR - HAUTEUR_FIN) * (HAUTEUR - HAUTEUR_DEPART)));
            this.hauteurFacteurLineaire = (2 * (HAUTEUR - HAUTEUR_DEPART) + 2 * Math.sqrt((HAUTEUR - HAUTEUR_FIN) * (HAUTEUR - HAUTEUR_DEPART)));
            if (TRAINEE) {
                this.activerTrainee();
            }
            if (ORIENTATION_AUTO) {
                this.orientationAutoDernierX = 0;
                this.orientationAutoDernierY = 0;
            }
            if (this.creature) {
                this.creature.y = 0;
            }
            if (this.clipOmbre) {
                this.clipOmbre.scale3d.x = this.echelleOmbre;
                this.clipOmbre.scale3d.y = 1;
            }
        };
        MobileADV.prototype.deplacementVers = function (DIRECTION, DISTANCE_MAX) {
            if (DISTANCE_MAX === void 0) { DISTANCE_MAX = 0; }
            if (!this.enCoursDeDeplacement) {
                this.enCoursDeDeplacement = true;
                this.tempsDeplacementTotal = 0;
            }
            this.orientationDeplacementAuto = false;
            this.angleDeplacement = DIRECTION;
            this.distanceMaxActive = DISTANCE_MAX > 0;
            if (this.distanceMaxActive) {
                this.distanceDeplacementMax = DISTANCE_MAX;
                this.distanceDeplacementRestant = DISTANCE_MAX;
            }
            if (this.creature) {
                this.creature.y = 0;
            }
        };
        MobileADV.prototype.deplacementVersPosition = function (POX, POY) {
            var distance = MathADV_1.default.distance2Points(this.positionServeur.x, this.positionServeur.y, POX, POY);
            if (distance < 0.1) {
                return;
            }
            var angle = Math.atan2(POY - this.positionServeur.y, POX - this.positionServeur.x);
            this.deplacementVers(angle, distance);
        };
        MobileADV.prototype.arreterDeplacement = function () {
            this.enCoursDeDeplacement = false;
            this.distanceMaxActive = false;
            this.distanceDeplacementMax = 0;
            this.distanceDeplacementRestant = 0;
            this.orientationDeplacementAuto = false;
            if (this.creature && this.creature.nomAnimEnCours == "course") {
                this.creature.jouerAnimation("statique", 0, true);
            }
        };
        MobileADV.prototype.majInteraction = function (MSG) {
            var _this = this;
            var nb = MSG.l8();
            if (nb == 0) {
                this.listeInteraction = null;
                this.rendreCliquable();
            }
            else {
                if (this.listeInteraction) {
                    this.listeInteraction = [];
                }
                else {
                    this.listeInteraction = [];
                    this.rendreCliquable(function () {
                        var temps = Date.now();
                        if (temps - _this.dernierCliqueInteraction < 200) {
                            return;
                        }
                        _this.dernierCliqueInteraction = temps;
                        if (_this.listeInteraction.length > 1) {
                        }
                        else {
                            TFMAdventure_1.default.envoyer(ProtoADV_1.default.interactionMobile(_this.identifiantMobile, _this.listeInteraction[0]));
                        }
                    });
                }
                for (var i = 0; i < nb; i++) {
                    this.listeInteraction.push(MSG.l8());
                }
            }
        };
        MobileADV.prototype.rendreCliquable = function (FONCTION, CLIQUE_DROIT) {
            UtilPIXI_1.default.rendreElementCliquable(this, FONCTION, CLIQUE_DROIT);
        };
        MobileADV.prototype.clignottementDisparition = function (DUREE) {
            this.dateDebutClignottement = Date.now();
            this.dateClignottementRapide = Date.now() + DUREE * 3 / 5;
        };
        MobileADV.prototype.teleporterVers = function (X, Y) {
            this.arreterDeplacement();
            this.positionVirtuelle.x = X;
            this.positionVirtuelle.y = Y;
            this.positionServeur.x = X;
            this.positionServeur.y = Y;
            if (this.mondeEnCours) {
                this.mondeEnCours.trierMobile(this);
            }
        };
        MobileADV.prototype.effetTouche = function () {
            var temps = Date.now();
            if (temps > this.finFiltreTouche) {
                this.mondeEnCours.ajouterSouffle(this.positionVirtuelle.x, this.positionVirtuelle.y, 200);
                if (this.fxBouclierEnCours) {
                    this.fxBouclierEnCours.alpha = 3;
                    if (this.estJoueurPrincipal) {
                        this.jouerSon("ting", 0.4);
                    }
                }
                else {
                    this.finFiltreTouche = temps + 50;
                    this.majFiltre();
                    if (!this.estUnJoueur && this.creature && !this.estGele) {
                        this.creature.scale.y = 0.5;
                    }
                    if (this.bibliothequeSon) {
                        this.bibliothequeSon.sonTouche();
                    }
                }
            }
        };
        MobileADV.prototype.majCaracteristique = function (MSG) {
            this.vitesseDeplacement = MSG.l16();
        };
        MobileADV.prototype.majFX = function (MSG) {
            if (!this.listeFXBoucle) {
                this.listeFXBoucle = [];
                this.indexFXBoucle = {};
                this.codeFXBoucle = 0;
            }
            if (!this.listeFXOrientable) {
                this.listeFXOrientable = [];
            }
            this.codeFXBoucle = (this.codeFXBoucle + 1) % 100;
            for (var i = 0, nb = MSG.l8(); i < nb; i++) {
                var codeFX = MSG.l16s();
                var infoFX = this.indexFXBoucle[codeFX];
                if (!infoFX) {
                    infoFX = { code: codeFX };
                    this.indexFXBoucle[codeFX] = infoFX;
                    this.listeFXBoucle.push(infoFX);
                    if (codeFX > 0) {
                        var infoBase = TFMAdventure_1.default.indexFX[codeFX];
                        infoFX.clipAnim = TFMAdventure_1.default.recupFX(codeFX);
                        this.addChild(infoFX.clipAnim);
                        if (infoBase.orientable) {
                            if (!this.estVersLaDroite) {
                                infoFX.clipAnim.scale.x *= -1;
                            }
                            this.listeFXOrientable.push(infoFX.clipAnim);
                        }
                        if (infoBase.etirable && infoBase.largeur && this.largeurOmbre) {
                            infoFX.clipAnim.scale.set((this.largeurOmbre + infoBase.decalageEtirement) / infoBase.largeur);
                        }
                        if (codeFX == 34) {
                            this.fxBouclierEnCours = infoFX.clipAnim;
                            this.fxBouclierEnCours.alpha = 3;
                            if (this.estJoueurPrincipal) {
                                this.jouerSon("brille", 0.2);
                            }
                        }
                    }
                    this.effetGraphique.lancementEffet(infoFX);
                }
                infoFX.codeBoucle = this.codeFXBoucle;
            }
            for (var i = 0, nb = this.listeFXBoucle.length; i < nb; i++) {
                var infoFX = this.listeFXBoucle[i];
                if (infoFX.codeBoucle != this.codeFXBoucle) {
                    this.listeFXBoucle.splice(i, 1);
                    delete this.indexFXBoucle[infoFX.code];
                    if (infoFX.fin) {
                        infoFX.fin();
                    }
                    if (infoFX.clipAnim) {
                        if (infoFX.clipAnim.parent) {
                            infoFX.clipAnim.parent.removeChild(infoFX.clipAnim);
                        }
                        var index = this.listeFXOrientable.indexOf(infoFX.clipAnim);
                        if (index != -1) {
                            this.listeFXOrientable.splice(index, 1);
                        }
                    }
                    i--;
                    nb--;
                    if (infoFX.code == 34) {
                        this.fxBouclierEnCours = null;
                    }
                }
            }
        };
        MobileADV.prototype.deserialisation = function (MSG) {
            this.typeMobile = MSG.l8();
            this.identifiantMobile = MSG.l32s();
            this.estStatique = MSG.lBool();
            this.estUnJoueur = this.typeMobile == 1;
            this.peutSubirCollisions = MSG.lBool();
            this.apparitionAlpha = MSG.lBool();
            this.disparitionAlpha = MSG.lBool();
            this.estVersLaDroite = MSG.lBool();
            this.nom = MSG.lChaine();
            this.codeTitre = MSG.l16();
            this.hauteurClipNom = MSG.l16();
            this.largeurOmbre = MSG.l16();
            this.coucheMonde = MSG.l8();
            this.positionServeur.set(MSG.lFloat(), MSG.lFloat());
            this.positionVirtuelle.set(this.positionServeur.x, this.positionServeur.y);
            this.visible = !MSG.lBool();
            this.infoCommune.deserialisation(MSG);
            if (MSG.lBool()) {
                this.ajouterLumiere(MSG.l32s(), MSG.l16(), MSG.l8() / 100, MSG.l8(), MSG.l8(), MSG.l8() / 10);
            }
            if (MSG.lBool()) {
                this.defCreature(new ClipAnim_1.ClipAnim(MSG));
            }
            if (MSG.lBool()) {
                this.defLook(new Look_1.Look(MSG));
            }
            var nb = MSG.l8();
            if (nb > 0) {
                var liste = [];
                for (var i = 0; i < nb; i++) {
                    liste.push(MSG.lChaine());
                }
                if (this.creature) {
                    this.creature.listePosture = liste;
                }
            }
            if (MSG.lBool()) {
                this.equiperArme(OutilsArmeADV_1.OutilsArmeADV.recupArme(MSG, this), false);
            }
            if (MSG.lBool()) {
                this.equiperArme(OutilsArmeADV_1.OutilsArmeADV.recupArme(MSG, this), true);
            }
            nb = MSG.l8();
            if (nb > 0) {
                this.listeMobileInterne = [];
                var base = this.creature ? this.creature : this;
                var multiX = base.scale.x < 0 ? -1 : 1;
                for (var i = 0; i < nb; i++) {
                    var clipInterne = new ClipAnim_1.ClipAnim(MSG);
                    clipInterne.x = base.pivot.x + (MSG.l16s() * multiX);
                    clipInterne.y = base.pivot.y + MSG.l16s();
                    clipInterne.rotation = MSG.l8() * 0.02617993;
                    if (this.infoCommune.teinture != undefined) {
                        clipInterne.tint = this.infoCommune.teinture;
                    }
                    base.addChild(clipInterne);
                    this.listeMobileInterne.push(clipInterne);
                }
            }
            this.estUnAllie = MSG.lBool();
            this.estUnEnnemi = MSG.lBool();
            this.modeCombat(MSG.lBool());
            this.rayonInterne = MSG.l16();
            this.porteeAttaque = MSG.l8();
            this.codeBibliothequeSon = MSG.l16();
            this.visibleUniquementEditeur = MSG.lBool();
            this.joueurVisibleDerriere = MSG.lBool();
            var nbAplatMobile = MSG.l8();
            if (nbAplatMobile) {
                for (var i = 0; i < nbAplatMobile; i++) {
                    this.ajouterAplatMobile(new AplatMobileADV_1.AplatMobileADV(MSG));
                }
            }
            this.majInteraction(MSG);
            this.deserialisationSupplementaire(MSG);
            if (this.largeurOmbre) {
                this.afficherOmbre(this.largeurOmbre);
            }
            this.porteeTotale = this.rayonInterne + this.porteeAttaque;
            this.rotation = this.infoCommune.rotation;
            this.clipNom = new ClipNomADV_1.ClipNomADV(this);
            if (this.typeMobile == 2 || this.typeMobile == 3) {
                this.clipNom.defEchelle(0.8);
            }
            if (this.nom) {
                this.clipNom.afficherNom(this.nom, this.estUnJoueur ? Couleur_1.Couleur.VERT : Couleur_1.Couleur.ROUGE);
            }
            this.clipNom.afficherTitre(this.codeTitre > 0, this.codeTitre);
            if (this.estJoueurPrincipal) {
                if (!OptionsADV_1.default.options.affichagePseudoJoueurPrincipal) {
                    this.clipNom.masquerNom();
                }
                this.clipNom.afficherTitre(false);
                this.clipNom.majSante(200, 200, 200, 1, false);
                MondeADV_1.MondeADV.instance.infoCamera.defCible(this);
            }
            if (this.codeBibliothequeSon) {
                this.bibliothequeSon = MoteurBibliothequeSonADV_1.MoteurBibliothequeSonADV.recupBibliotheque(this.codeBibliothequeSon, this);
            }
            if (this.typeMobile >= 100 && this.typeMobile <= 102) {
                EffetMobileADV_1.EffetMobileADV.listeIngredient.push(this);
            }
        };
        MobileADV.prototype.afficherNom = function (OUI) {
            if (OUI) {
                if (this.nom) {
                    this.clipNom.afficherNom(this.nom, this.estUnJoueur ? Couleur_1.Couleur.VERT : Couleur_1.Couleur.ROUGE);
                }
            }
            else {
                this.clipNom.masquerNom();
            }
        };
        MobileADV.prototype.deserialisationSupplementaire = function (MSG) {
        };
        MobileADV.prototype.destruction = function () {
            this.estDetruit = true;
            this.listeFXEnCours = null;
            this.listeFXBoucle = null;
            this.indexFXBoucle = null;
            this.secteur = null;
        };
        MobileADV.DUREE_IMAGE_DEPLACEMENT = 16.666666;
        MobileADV.DEMI_LARGEUR_TROU_PICTO = 178;
        MobileADV.DEMI_HAUTEUR_TROU_PICTO = MobileADV.DEMI_LARGEUR_TROU_PICTO;
        return MobileADV;
    }(PIXI.Container));
    exports.MobileADV = MobileADV;
});
//# sourceMappingURL=MobileADV.js.map