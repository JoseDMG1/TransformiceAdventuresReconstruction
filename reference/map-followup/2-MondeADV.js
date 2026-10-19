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
define(["require", "exports", "../_tfmAdventure/TFMAdventure", "./_mobile/AplatADV", "./_mobile/MobileADV", "../_tfmAdventure/ClavierADV", "../../../Souritheque-client/src/outils/affichage/MoteurShader", "../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../interfaces/editeur/EditeurADV", "../../../Souritheque-client/src/outils/controles/Clavier", "../../../Souritheque-client/src/outils/son/MoteurSon", "./MoteurEffetSpeciauxADV", "../../../Souritheque-client/src/outils/Mathematiques", "./_collisions/GestionnaireCollisionsMondeADV", "../interfaces/InterfaceChargementADV", "../_animation/ClipAnimProjection"], function (require, exports, TFMAdventure_1, AplatADV_1, MobileADV_1, ClavierADV_1, MoteurShader_1, AnimMath_1, EditeurADV_1, Clavier_1, MoteurSon_1, MoteurEffetSpeciauxADV_1, Mathematiques_1, GestionnaireCollisionsMondeADV_1, InterfaceChargementADV_1, ClipAnimProjection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Rectangle = PIXI.Rectangle;
    var MondeADV = (function (_super) {
        __extends(MondeADV, _super);
        function MondeADV(LARGEUR, HAUTEUR) {
            var _this = _super.call(this) || this;
            _this.editeurEnCours = false;
            _this.infoCamera = new CameraADV();
            _this.tempsEnCours = Date.now();
            _this.listeMobileATrier = [];
            _this.tempsZero = Date.now();
            _this.modeAerien = false;
            _this.generateurIdentifiantTemporaire = 1;
            _this.identifiantModificationCamera = 1;
            _this.indexLignesDebug = {};
            _this.eloignementCamera = 0;
            _this.lumiereMonde = 0x7F7F7F;
            _this.rectanglesLumiereMonde = [];
            _this.tremblementEnCours = false;
            _this.tremblementDirectionnel = false;
            _this.zoomRequis = 1;
            _this.modeAffichageLumiere = false;
            _this.listeZoneEffetApercu = [];
            _this.listeZoneEffetApercuFin = [];
            _this.indexZoneEffet = {};
            _this.listeFXSol = [];
            _this.listeFXProjection = [];
            _this.listeMorceauTrainee = [];
            _this.listeMobileDynamique = [];
            _this.listeEnnemis = [];
            _this.codeMajSecteur = 1;
            _this.indexSecteur = {};
            _this.listeSecteurVisible = [];
            _this.indexAplat = {};
            _this.indexMobile = {};
            _this.indexJoueur = {};
            _this.indexMobileStatiqueInvisible = 0;
            _this.indexListeAplat = 0;
            _this.indexMobileInvisible = 0;
            _this.majPictoEditeurRequise = false;
            _this.listeElementAAfficher = [];
            _this.gestionnaireCollisions = new GestionnaireCollisionsMondeADV_1.default();
            _this.prochaineSeconde = 0;
            _this.musiqueCombatRequise = false;
            _this.musiqueCombatEnCours = false;
            _this.dateDemarrageMusique = 0;
            _this.listeAmbiance = [
                { lien: "ambiance/foret2", volume: 0.5 },
                { lien: "ambiance/foret", volume: 0.3 },
                { lien: "ambiance/prairie", volume: 1 },
                { lien: "ambiance/vent", volume: 1 },
            ];
            _this.listeMusique = [];
            _this.listeMusiqueBase = [
                { lien: "musique/tfmadv_musique2", volume: 0.4 },
                { lien: "musique/tfmadv_musique3", volume: 0.4 }
            ];
            _this.listeMusiqueCombat = [
                { lien: "musique/tfmadv_combat1", volume: 0.5 },
                { lien: "musique/tfmadv_combat2", volume: 0.5 },
                { lien: "musique/tfmadv_combat3", volume: 0.5 },
                { lien: "musique/tfmadv_combat4", volume: 0.5 }
            ];
            MondeADV.instance = _this;
            _this.moteurEffet = new MoteurEffetSpeciauxADV_1.MoteurEffetSpeciauxADV(_this);
            _this.textureTrainee = PIXI.Texture.from("trainee_ligne");
            _this.camera3D = new PIXI.projection.Camera3d();
            _this.camera3D.setPlanes(MondeADV.FOCUS_CAMERA, MondeADV.PROFONDEUR_MIN, MondeADV.PROFONDEUR_MAX, false);
            _this.camera3D.euler.x = MondeADV.ANGLE_CAMERA;
            _this.coucheSol = new PIXI.projection.Container3d();
            _this.coucheOmbre = new PIXI.projection.Container3d();
            _this.coucheCollision = new PIXI.projection.Container3d();
            _this.coucheCollision.visible = false;
            _this.coucheRectangleLumiere = new PIXI.projection.Container3d();
            _this.coucheRectangleLumiere.visible = false;
            _this.coucheDessin = new PIXI.projection.Container3d();
            _this.coucheEau = new PIXI.projection.Container3d();
            _this.conteneurLumiereSol = new PIXI.projection.Camera3d();
            _this.conteneurLumiereSol.setPlanes(MondeADV.FOCUS_CAMERA, MondeADV.PROFONDEUR_MIN, MondeADV.PROFONDEUR_MAX, false);
            _this.conteneurLumiereSol.euler.x = _this.camera3D.euler.x;
            _this.coucheMobile = new PIXI.Container();
            _this.coucheMobileInterface = new PIXI.Container();
            _this.conteneurMonde = new PIXI.Container();
            _this.addChild(_this.conteneurMonde);
            _this.conteneurMonde.addChild(_this.camera3D);
            _this.conteneurLumiere = new PIXI.Container();
            _this.conteneurLumiereMobile = new PIXI.Container();
            _this.coucheLumSol = new PIXI.projection.Container3d();
            _this.coucheLumSolCanopee = new PIXI.projection.Container3d();
            _this.coucheLumSolGlobale = new PIXI.projection.Container3d();
            _this.coucheLumMobile = new PIXI.Container();
            _this.coucheLumMobileDynamique = new PIXI.Container();
            _this.coucheLumMobileGlobale = new PIXI.Container();
            _this.conteneurMonde.addChild(_this.coucheMobile);
            _this.conteneurMonde.addChild(_this.coucheMobileInterface);
            _this.conteneurMonde.addChild(_this.conteneurLumiere);
            _this.redimentionnement(LARGEUR, HAUTEUR);
            _this.camera3D.interactive = true;
            _this.camera3D.on("mousedown", function (EVT) {
                if (EVT.data.button == 0) {
                    if (EditeurADV_1.EditeurADV.estAffiche() && EditeurADV_1.EditeurADV.instance.modeVoyage) {
                        return;
                    }
                    if (_this.fonctionCurseur) {
                        _this.fonctionCurseur(EVT);
                        return;
                    }
                    if (MobileADV_1.MobileADV.joueurPrincipal && !EditeurADV_1.EditeurADV.estAffiche()) {
                        ClavierADV_1.default.instance.cliqueMonde(true, true);
                    }
                }
            });
            _this.camera3D.on("rightdown", function () {
                _this.supprimerCurseur();
                if (MobileADV_1.MobileADV.joueurPrincipal && !EditeurADV_1.EditeurADV.estAffiche()) {
                    ClavierADV_1.default.instance.cliqueMonde(false, true);
                }
            });
            _this.clipCollisionRencontre = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("interface/zone/z0.png"));
            _this.clipCollisionRencontre.anchor.set(0.5, 0.5);
            _this.clipCollisionRencontre.euler.x = Math.PI / 2;
            _this.clipCollisionRencontre.blendMode = PIXI.BLEND_MODES.ADD;
            _this.clipCollisionRencontre.tint = 0x22004D;
            _this.shaderLumiere1 = new MoteurShader_1.Shader801(TFMAdventure_1.default.recupRessource("lumiere.frag"));
            _this.shaderLumiere1.autoFit = false;
            _this.shaderLumiere1.uniforms.texture = PIXI.Texture.EMPTY;
            _this.shaderLumiere1.uniforms.vignette = true;
            _this.shaderLumiere1.uniforms.rayonVignette = 0.75;
            _this.shaderLumiere1.uniforms.rayonVignette2 = 0.45;
            _this.shaderLumiere1.uniforms.alphaVignette = 0.6;
            _this.shaderLumiere1.uniforms.lumiereMonde = new Float32Array(3);
            MoteurShader_1.MoteurShader.instance.appliquerShader(_this.coucheSol, _this.shaderLumiere1);
            _this.shaderLumiere2 = new MoteurShader_1.Shader801(TFMAdventure_1.default.recupRessource("lumiere.frag"));
            _this.shaderLumiere2.uniforms.texture = PIXI.Texture.EMPTY;
            _this.shaderLumiere2.uniforms.vignette = true;
            _this.shaderLumiere2.uniforms.rayonVignette = 0.75;
            _this.shaderLumiere2.uniforms.rayonVignette2 = 0.45;
            _this.shaderLumiere2.uniforms.alphaVignette = 0.6;
            _this.shaderLumiere2.uniforms.lumiereMonde = new Float32Array(3);
            MoteurShader_1.MoteurShader.instance.appliquerShader(_this.coucheMobile, _this.shaderLumiere2);
            var depart = Date.now();
            _this.shaderEau = new MoteurShader_1.Shader801(TFMAdventure_1.default.recupRessource("eau.frag"));
            _this.shaderEau.uniforms.textureLumiere = PIXI.Texture.EMPTY;
            var textureDistorsion = PIXI.Texture.from("distorsion2");
            textureDistorsion.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            _this.shaderEau.uniforms.textureDistorsion = textureDistorsion;
            var textureEcume = PIXI.Texture.from("ecume");
            textureEcume.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            _this.shaderEau.padding = 0;
            _this.shaderEau.autoFit = false;
            _this.shaderEau.uniforms.textureEcume = textureEcume;
            _this.shaderEau.uniforms.couleurEau = new Float32Array(4);
            _this.shaderEau.uniforms.vitesseEau = new Float32Array(4);
            _this.shaderEau.uniforms.rapportRenduFocale = new Float32Array(2);
            _this.shaderEau.uniforms.rapportsFocaleTexture = new Float32Array(2);
            _this.shaderEau.uniforms.decalage = new Float32Array(2);
            _this.shaderEau.uniforms.invSinAngleCamera = 1 / MondeADV.SIN_ANGLE_CAMERA;
            _this.shaderEau.uniforms.cotanAngleCamera = MondeADV.COTAN_ANGLE_CAMERA;
            MoteurShader_1.MoteurShader.instance.appliquerShader(_this.coucheEau, _this.shaderEau);
            _this.shaderEau.defBoucle(function (TEMPS, SHADER) {
                var rapportLargeurFocale = _this.largeur / _this.camera3D.focus;
                var rapportHauteurFocale = _this.hauteur / _this.camera3D.focus;
                SHADER.uniforms.decalage[0] = _this.infoCamera.posX / _this.shaderEau.uniforms.textureEcume.width;
                SHADER.uniforms.decalage[1] = _this.infoCamera.posY / _this.shaderEau.uniforms.textureEcume.height;
                SHADER.uniforms.temps = (TEMPS - depart) / 1000;
                SHADER.uniforms.rapportEloignementFocale = _this.eloignementCamera / _this.camera3D.focus;
                SHADER.uniforms.rapportRenduFocale[0] = rapportLargeurFocale;
                SHADER.uniforms.rapportRenduFocale[1] = rapportHauteurFocale;
                SHADER.uniforms.rapportsFocaleTexture[0] = _this.camera3D.focus / _this.shaderEau.uniforms.textureEcume.width;
                SHADER.uniforms.rapportsFocaleTexture[1] = _this.camera3D.focus / _this.shaderEau.uniforms.textureEcume.height;
            });
            TFMAdventure_1.default.instance.performance.verifierActivationShaders();
            return _this;
        }
        MondeADV.prototype.resetMonde = function () {
            this.tempsZero = Date.now();
            for (var id in this.indexSecteur) {
                var secteur = this.indexSecteur[id];
                secteur.destruction();
            }
            MobileADV_1.MobileADV.ennemiProche = null;
            this.listeSouffle = null;
            this.curseurAplat = null;
            this.curseurMobile = null;
            this.fonctionCurseur = null;
            this.indexBoucleSuppl = null;
            this.collisionRencontre = null;
            this.listeSouffleEnCours = null;
            this.listeClipDebugPosition = null;
            this.listeFXSol = [];
            this.indexAplat = {};
            this.indexJoueur = {};
            this.listeEnnemis = [];
            this.indexMobile = {};
            this.indexSecteur = {};
            this.indexZoneEffet = {};
            this.listeFXProjection = [];
            this.listeMobileATrier = [];
            this.listeSecteurVisible = [];
            this.indexLignesDebug = {};
            this.listeMorceauTrainee = [];
            this.listeZoneEffetApercu = [];
            this.listeElementAAfficher = [];
            this.listeMobileDynamique = [];
            this.listeZoneEffetApercuFin = [];
            this.rectanglesLumiereMonde = [];
            this.gestionnaireCollisions = new GestionnaireCollisionsMondeADV_1.default();
            this.defCollisionCercleTemporaire(0, 0, 0);
            this.camera3D.removeChildren();
            this.coucheSol.removeChildren();
            this.coucheEau.removeChildren();
            this.coucheDessin.removeChildren();
            this.coucheOmbre.removeChildren();
            this.coucheMobile.removeChildren();
            this.coucheLumSol.removeChildren();
            this.coucheCollision.removeChildren();
            this.coucheLumMobile.removeChildren();
            this.coucheLumSolGlobale.removeChildren();
            this.coucheMobileInterface.removeChildren();
            this.coucheLumSolCanopee.removeChildren();
            this.coucheRectangleLumiere.removeChildren();
            this.coucheLumMobileGlobale.removeChildren();
            this.coucheLumMobileDynamique.removeChildren();
            if (this.coucheDebug) {
                this.coucheDebug.removeChildren();
                this.coucheDebug = null;
            }
            this.camera3D.addChild(this.coucheEau, this.coucheSol, this.coucheOmbre, this.coucheRectangleLumiere, this.coucheCollision, this.coucheDessin);
        };
        MondeADV.prototype.chargementMonde = function (MSG) {
            this.resetMonde();
            TFMAdventure_1.default.instance.app.renderer.backgroundColor = MSG.l32s();
            var nb = MSG.l16();
            for (var i = 0; i < nb; i++) {
                var identifiant = MSG.l32s();
                this.ajouterSegmentCollision(MSG.l16s(), MSG.l16s(), MSG.l16s(), MSG.l16s(), identifiant);
            }
            var module = InterfaceChargementADV_1.InterfaceChargementADV.recupModule(InterfaceChargementADV_1.ModuleChargementMondeADV);
            if (module) {
                module.estTermine = true;
            }
        };
        MondeADV.prototype.initialisationOptionMonde = function (MSG) {
            var spawnJoueur = new PIXI.Point(MSG.lFloat(), MSG.lFloat());
            TFMAdventure_1.default.instance.app.renderer.backgroundColor = MSG.l32s();
            this.lumiereMonde = MSG.l32s();
            this.rectanglesLumiereMonde = [];
            var nombreRectangles = MSG.l32s();
            for (var i = 0; i < nombreRectangles; i++) {
                this.rectanglesLumiereMonde[i] = {
                    x: MSG.l32s(),
                    y: MSG.l32s(),
                    largeur: MSG.l32s(),
                    hauteur: MSG.l32s(),
                    couleur: MSG.l32s(),
                    marge: MSG.l16s()
                };
            }
            this.majLumiereMonde();
            MondeADV.couleurCanopee = MSG.l32s();
            var eau = MSG.l32s();
            this.shaderEau.uniforms.couleurEau[0] = (eau >> 16 & 0xFF) / 255;
            this.shaderEau.uniforms.couleurEau[1] = (eau >> 8 & 0xFF) / 255;
            this.shaderEau.uniforms.couleurEau[2] = (eau & 0xFF) / 255;
            this.shaderEau.uniforms.couleurEau[3] = 1;
            this.shaderEau.uniforms.vitesseEau[0] = -MSG.l16s();
            this.shaderEau.uniforms.vitesseEau[1] = -MSG.l16s();
            this.shaderEau.uniforms.vitesseEau[2] = -MSG.l16s();
            this.shaderEau.uniforms.vitesseEau[3] = -MSG.l16s();
            this.listeMusique = this.listeMusiqueBase.slice();
            var nb = MSG.l8();
            if (nb) {
                for (var i = 0; i < nb; i++) {
                    var info = MSG.lChaine().split("#");
                    this.listeMusique.push({
                        lien: info[0],
                        volume: (info.length > 1 ? parseFloat(info[1]) : 1)
                    });
                }
            }
            if (this.musiqueEnCours) {
                this.musiqueEnCours.stop(1000);
            }
            this.jouerNouvelleMusique(5000);
        };
        MondeADV.prototype.donneeSecteur = function (MSG) {
            var nbA = MSG.l16();
            for (var i = 0; i < nbA; i++) {
                var aplat = new AplatADV_1.AplatADV();
                aplat.deserialisation(MSG);
                this.ajouterAplat(aplat, true);
            }
            var nbM = MSG.l16();
            for (var i = 0; i < nbM; i++) {
                var mobile = new MobileADV_1.MobileADV();
                mobile.deserialisation(MSG);
                this.ajouterMobile(mobile, true);
            }
        };
        MondeADV.prototype.boucleMonde = function (TEMPS, TEMPS_ECOULE, DELTA) {
            this.tempsEnCours = TEMPS;
            var joueurPrincipal = MobileADV_1.MobileADV.joueurPrincipal;
            MondeADV.COS_TEMPS = Math.cos(TEMPS);
            MondeADV.SIN_TEMPS = Math.sin(TEMPS);
            var seconde = TEMPS > this.prochaineSeconde;
            if (seconde && joueurPrincipal) {
                this.prochaineSeconde = TEMPS + 1000;
                if (this.listeAmbiance.length) {
                    if (!this.ambianceEnCours || !this.ambianceEnCours.lectureEnCours()) {
                        var info = this.listeAmbiance[(this.listeAmbiance.length * Math.random()) | 0];
                        this.ambianceEnCours = MoteurSon_1.default.jouerEffet(info.lien, info.volume);
                    }
                }
                if (this.dateDemarrageMusique) {
                    if (TEMPS > this.dateDemarrageMusique) {
                        this.dateDemarrageMusique = 0;
                        if (this.musiqueEnCours) {
                            this.musiqueEnCours.lecture();
                        }
                    }
                }
                else if (!this.musiqueEnCours || !this.musiqueEnCours.lectureEnCours()) {
                    this.jouerNouvelleMusique(this.musiqueCombatRequise ? 1000 : 10000);
                }
            }
            if (this.listeElementAAfficher.length) {
                var nb_1 = Math.ceil(this.listeElementAAfficher.length * 0.05 * DELTA);
                for (var i_1 = 0; i_1 < nb_1; i_1++) {
                    var element = this.listeElementAAfficher.shift();
                    if (element.aAfficher) {
                        if (element instanceof MobileADV_1.MobileADV) {
                            this.afficherMobile(element, true);
                        }
                        else {
                            this.afficherAplat(element, true);
                        }
                    }
                }
            }
            if (this.listeSouffle) {
                this.listeSouffleEnCours = this.listeSouffle.slice();
                this.listeSouffle = null;
            }
            if (this.listeZoneEffetApercu.length) {
                for (var i_2 = 0, nb_2 = this.listeZoneEffetApercu.length; i_2 < nb_2; i_2++) {
                    var zone = this.listeZoneEffetApercu[i_2];
                    zone.clipZone.alpha += (0.7 - zone.clipZone.alpha) * 0.1;
                    zone.clipZone.euler.z -= zone.clipZone.euler.z * 0.1 * DELTA;
                    zone.clipZone.scale3d.y = zone.clipZone.scale3d.x += (zone.echelle - zone.clipZone.scale3d.x) * 0.1 * DELTA;
                    if (zone.clipDuree) {
                        var p = Math.min((TEMPS - zone.dateDepart) / (zone.dateMortAuto - zone.dateDepart), 1);
                        zone.clipDuree.alpha = 0.2 + 0.5 * p;
                        zone.clipDuree.scale3d.x = zone.clipDuree.scale3d.y = zone.echelle * p;
                    }
                    if (zone.dateMortAuto && TEMPS > zone.dateMortAuto) {
                        this.listeZoneEffetApercuFin.push(zone);
                        this.listeZoneEffetApercu.splice(i_2, 1);
                        delete this.indexZoneEffet[zone.identifiant];
                        i_2--;
                        nb_2--;
                    }
                }
            }
            if (this.listeZoneEffetApercuFin.length) {
                for (var i_3 = 0, nb_3 = this.listeZoneEffetApercuFin.length; i_3 < nb_3; i_3++) {
                    var zone = this.listeZoneEffetApercuFin[i_3];
                    zone.alpha *= 0.9;
                    zone.euler.z += (Math.PI / 10 - zone.euler.z) * 0.1;
                    zone.clipZone.scale3d.y = zone.clipZone.scale3d.x += ((zone.echelle + 0.05) - zone.clipZone.scale3d.x) * 0.1;
                    if (zone.clipDuree) {
                        zone.clipDuree.scale3d.x = zone.clipDuree.scale3d.y = zone.clipZone.scale3d.y;
                    }
                    if (zone.alpha < 0.01) {
                        if (zone.parent) {
                            zone.parent.removeChild(zone);
                        }
                        this.listeZoneEffetApercuFin.splice(i_3, 1);
                        i_3--;
                        nb_3--;
                    }
                }
            }
            if (this.listeFXSol.length) {
                for (var i_4 = 0, nb_4 = this.listeFXSol.length; i_4 < nb_4; i_4++) {
                    var info = this.listeFXSol[i_4];
                    var p = Math.min((TEMPS - info.dateLancement) / (info.dateDestruction - info.dateLancement), 1);
                    p = AnimMath_1.Mouvement.easeInQuad(p, 0, 1, 1);
                    if (p >= 1) {
                        this.listeFXSol.splice(i_4, 1);
                        if (info.parent) {
                            info.parent.removeChild(info);
                        }
                        i_4--;
                        nb_4--;
                        continue;
                    }
                    p = AnimMath_1.Mouvement.easeInQuad(p, 0, 1, 1);
                    info.scale3d.y = info.scale3d.x += ((info.echelle + 0.05) - info.scale3d.x) * 0.1;
                    info.alpha = 1 - p;
                }
            }
            if (this.listeFXProjection.length) {
                for (var i_5 = 0, nb_5 = this.listeFXProjection.length; i_5 < nb_5; i_5++) {
                    var clip = this.listeFXProjection[i_5];
                    clip.boucle(TEMPS);
                    if (clip.destructionRequise) {
                        this.listeFXProjection.splice(i_5, 1);
                        if (clip.parent) {
                            clip.parent.removeChild(clip);
                        }
                        i_5--;
                        nb_5--;
                        continue;
                    }
                }
            }
            var eloignementCible = this.camera3D.focus * (1 - this.zoomRequis) / this.zoomRequis;
            if (eloignementCible != this.eloignementCamera) {
                this.eloignementCamera = this.eloignementCamera + (eloignementCible - this.eloignementCamera) * 0.15;
                if (Math.abs(eloignementCible - this.eloignementCamera) < 0.001) {
                    this.eloignementCamera = eloignementCible;
                }
                var profondeurMin = MondeADV.PROFONDEUR_MIN + this.eloignementCamera;
                var profondeurMax = MondeADV.PROFONDEUR_MAX + this.eloignementCamera;
                this.camera3D.setPlanes(MondeADV.FOCUS_CAMERA, profondeurMin, profondeurMax, false);
                this.conteneurLumiereSol.setPlanes(MondeADV.FOCUS_CAMERA, profondeurMin, profondeurMax, false);
                if (this.coucheDebug) {
                    this.coucheDebug.setPlanes(MondeADV.FOCUS_CAMERA, profondeurMin, profondeurMax, false);
                }
                this.identifiantModificationCamera++;
            }
            if (this.infoCamera.cible && TEMPS > this.infoCamera.enPauseJusqua) {
                this.infoCamera.effetDecalageX -= this.infoCamera.effetDecalageX * this.infoCamera.vitesseDecalage * DELTA;
                this.infoCamera.effetDecalageY -= this.infoCamera.effetDecalageY * this.infoCamera.vitesseDecalage * DELTA;
                var diffX = (this.infoCamera.cible.positionVirtuelle.x + this.infoCamera.effetDecalageX) - this.infoCamera.posX;
                var diffY = (this.infoCamera.cible.positionVirtuelle.y + this.infoCamera.effetDecalageY) - this.infoCamera.posY;
                this.infoCamera.posX += diffX * 0.1 * DELTA;
                this.infoCamera.posY += diffY * 0.1 * DELTA;
                this.camera3D.position3d.x = this.infoCamera.posX;
                if (this.modeAerien) {
                    this.camera3D.position3d.y = this.eloignementCamera;
                    this.camera3D.position3d.z = this.infoCamera.posY;
                }
                else {
                    this.camera3D.position3d.y = this.eloignementCamera * MondeADV.SIN_ANGLE_CAMERA;
                    this.camera3D.position3d.z = this.infoCamera.posY - this.eloignementCamera * MondeADV.COS_ANGLE_CAMERA;
                }
                if (Math.abs(diffX) > 0.2 || Math.abs(diffY) > 0.2) {
                    this.identifiantModificationCamera = (this.identifiantModificationCamera + 1) % 0xFFFFFF;
                }
                this.conteneurLumiereSol.position3d.set(this.camera3D.position3d.x, this.camera3D.position3d.y, this.camera3D.position3d.z);
                this.majVisibiliteSecteur();
            }
            this.camera3D.updateTransform();
            var nb = this.listeMorceauTrainee.length;
            if (nb) {
                var i_6 = -1;
                while (++i_6 < nb) {
                    var clip = this.listeMorceauTrainee[i_6];
                    clip.alpha -= 0.03 * DELTA;
                    if (clip.alpha <= 0) {
                        this.listeMorceauTrainee.splice(i_6, 1);
                        if (clip.parent) {
                            clip.parent.removeChild(clip);
                        }
                        i_6--;
                        nb--;
                    }
                }
            }
            if (this.tremblementEnCours) {
                if (TEMPS > this.finTremblement) {
                    this.tremblementEnCours = false;
                    this.x = 0;
                    this.y = 0;
                }
                else {
                    this.x = (Math.random() * this.puissanceTremblement) - (this.puissanceTremblement / 2);
                    this.y = (Math.random() * this.puissanceTremblement) - (this.puissanceTremblement / 2);
                    if (this.tremblementDirectionnel) {
                        var progression = (TEMPS - this.debutTremblement) / (this.finTremblement - this.debutTremblement);
                        progression = 1 - this.mouvementTremblement(progression, 0, 1, 1);
                        var decalage = this.distanceTremblement * progression;
                        this.x += Math.cos(this.angleTremblement) * decalage;
                        this.y += Math.sin(this.angleTremblement) * decalage;
                    }
                }
            }
            if (this.indexBoucleSuppl) {
                for (var clef in this.indexBoucleSuppl) {
                    this.indexBoucleSuppl[clef](TEMPS);
                }
            }
            var i = -1;
            nb = this.listeMobileDynamique.length;
            while (++i < nb) {
                var mobile = this.listeMobileDynamique[i];
                if (mobile.destructionRequise) {
                    this.supprimerMobile(mobile);
                    i--;
                    nb--;
                    continue;
                }
                mobile.boucle(TEMPS, DELTA, seconde);
                this.majPosMobile(mobile);
            }
            i = -1;
            nb = this.listeSecteurVisible.length;
            while (++i < nb) {
                var secteur = this.listeSecteurVisible[i];
                var k = -1;
                var nb2 = secteur.listeMobile.length;
                while (++k < nb2) {
                    var mobile = secteur.listeMobile[k];
                    mobile.boucle(TEMPS, DELTA, seconde);
                    this.majPosMobile(mobile);
                }
                k = -1;
                nb2 = secteur.listeAplat.length;
                while (++k < nb2) {
                    var aplat = secteur.listeAplat[k];
                    aplat.boucle(TEMPS);
                }
            }
            while (this.listeMobileATrier.length) {
                var mobile = this.listeMobileATrier.shift();
                if (mobile.destructionRequise || !mobile.estVisible || !mobile.parent) {
                    continue;
                }
                var liste = this.coucheMobile.children;
                var changement = false;
                var indexBase = liste.indexOf(mobile);
                var index = indexBase;
                while (true) {
                    index--;
                    if (index < 0) {
                        break;
                    }
                    var mobileCible = liste[index];
                    if (mobileCible.estEnCoursDeTriage) {
                        continue;
                    }
                    if (mobile.positionVirtuelle.y > mobileCible.positionVirtuelle.y) {
                        break;
                    }
                    liste[index] = mobile;
                    liste[indexBase] = mobileCible;
                    indexBase = index;
                    changement = true;
                }
                if (!changement) {
                    index = indexBase;
                    var nbClip = liste.length;
                    while (true) {
                        index++;
                        if (index >= nbClip) {
                            break;
                        }
                        var mobileCible = liste[index];
                        if (mobileCible.estEnCoursDeTriage) {
                            continue;
                        }
                        if (mobile.positionVirtuelle.y < mobileCible.positionVirtuelle.y) {
                            break;
                        }
                        liste[index] = mobile;
                        liste[indexBase] = mobileCible;
                        indexBase = index;
                    }
                }
                mobile.estEnCoursDeTriage = false;
            }
            if (this.majPictoEditeurRequise) {
                this.majPictoEditeurRequise = false;
                if (EditeurADV_1.EditeurADV.instance) {
                    EditeurADV_1.EditeurADV.instance.majListePicto(this.listeSecteurVisible);
                }
            }
            if (MondeADV.ACTIVER_LUMIERE) {
                this.conteneurLumiere.visible = true;
                this.clipFondLumiereGlobale.visible = false;
                this.conteneurLumiereSol.visible = true;
                this.conteneurLumiereMobile.visible = false;
                this.coucheLumSol.visible = true;
                this.coucheLumSolCanopee.visible = true;
                this.coucheLumSolGlobale.visible = false;
                if (this.shaderLumiere1.enabled) {
                    this.conteneurLumiere.updateTransform();
                    TFMAdventure_1.default.instance.app.renderer.render(this.conteneurLumiere, this.textureShader1, false, null, true);
                    this.shaderLumiere1.uniforms.texture = this.textureShader1;
                    this.shaderLumiere1.uniforms.lumiereMonde = this.recupLumiere();
                    this.shaderEau.uniforms.textureLumiere = this.textureShader1;
                }
                this.conteneurLumiereSol.visible = false;
                this.conteneurLumiereMobile.visible = true;
                this.coucheLumMobile.visible = true;
                this.coucheLumMobileDynamique.visible = true;
                this.coucheLumMobileGlobale.visible = false;
                if (this.shaderLumiere2.enabled) {
                    this.conteneurLumiere.updateTransform();
                    TFMAdventure_1.default.instance.app.renderer.render(this.conteneurLumiere, this.textureShader2, false, null, true);
                    this.shaderLumiere2.uniforms.texture = this.textureShader2;
                    this.shaderLumiere2.uniforms.lumiereMonde = this.recupLumiere();
                }
                this.conteneurLumiere.visible = false;
            }
            this.listeSouffleEnCours = null;
        };
        MondeADV.prototype.jouerNouvelleMusique = function (PAUSE) {
            if (this.musiqueEnCours) {
                this.musiqueEnCours.stop(1000);
            }
            this.musiqueCombatEnCours = this.musiqueCombatRequise;
            var liste = this.musiqueCombatRequise ? this.listeMusiqueCombat : this.listeMusique;
            if (liste.length) {
                var info = liste[(liste.length * Math.random()) | 0];
                this.musiqueEnCours = MoteurSon_1.default.jouerMusique(info.lien, info.volume, false);
                this.dateDemarrageMusique = Date.now() + PAUSE;
            }
        };
        MondeADV.prototype.recupLumiere = function () {
            var lumiere = MoteurShader_1.Shader801.couleurVersTableauFlotant(this.lumiereMonde);
            var posX = this.infoCamera.posX;
            var posY = this.infoCamera.posY;
            for (var _i = 0, _a = this.rectanglesLumiereMonde; _i < _a.length; _i++) {
                var rect = _a[_i];
                var fusion = 1;
                fusion = Math.min(fusion, Math.max(0, (posX - rect.x + rect.marge) / rect.marge));
                fusion = Math.min(fusion, Math.max(0, (posY - rect.y + rect.marge) / rect.marge));
                fusion = Math.min(fusion, Math.max(0, (rect.x + rect.largeur + rect.marge - posX) / rect.marge));
                fusion = Math.min(fusion, Math.max(0, (rect.y + rect.hauteur + rect.marge - posY) / rect.marge));
                if (fusion > 0) {
                    var couleurRect = MoteurShader_1.Shader801.couleurVersTableauFlotant(rect.couleur);
                    lumiere[0] = lumiere[0] * (1 - fusion) + couleurRect[0] * fusion;
                    lumiere[1] = lumiere[1] * (1 - fusion) + couleurRect[1] * fusion;
                    lumiere[2] = lumiere[2] * (1 - fusion) + couleurRect[2] * fusion;
                }
            }
            return lumiere;
        };
        MondeADV.prototype.majPositionCamera = function () {
            this.infoCamera.cible.codeCamera = -1;
            this.infoCamera.posX = this.infoCamera.cible.positionVirtuelle.x;
            this.infoCamera.posY = this.infoCamera.cible.positionVirtuelle.y;
            this.camera3D.position3d.x = this.infoCamera.posX;
            this.camera3D.position3d.z = this.infoCamera.posY + this.camera3D.position3d.y;
            this.conteneurLumiereSol.position3d.set(this.camera3D.position3d.x, this.camera3D.position3d.y, this.camera3D.position3d.z);
            this.identifiantModificationCamera++;
        };
        MondeADV.prototype.recupIndexTriage = function (LISTE, POS_Y) {
            var bas = 0;
            var haut = LISTE.length;
            while (bas < haut) {
                var mid = (bas + haut) >> 1;
                var cible = LISTE[mid];
                if (cible.y > POS_Y) {
                    haut = mid;
                }
                else {
                    bas = mid + 1;
                }
            }
            return bas;
        };
        MondeADV.prototype.recupIndexTriageAplat = function (LISTE, INDEX) {
            var bas = 0;
            var haut = LISTE.length;
            while (bas < haut) {
                var mid = (bas + haut) >> 1;
                var cible = LISTE[mid];
                if (cible.indexTriage > INDEX) {
                    haut = mid;
                }
                else {
                    bas = mid + 1;
                }
            }
            return bas;
        };
        MondeADV.prototype.redimentionnement = function (LARGEUR, HAUTEUR) {
            this.largeur = LARGEUR;
            this.hauteur = HAUTEUR;
            this.demiLargeur = Math.floor(LARGEUR / 2);
            this.demiHauteur = Math.floor(HAUTEUR / 2);
            this.conteneurMonde.position.set(LARGEUR / 2, HAUTEUR / 2);
            if (!this.cacheNoir) {
                var formeCacheNoir = new PIXI.Graphics();
                formeCacheNoir.beginFill(0);
                formeCacheNoir.drawRect(0, 0, 256, 256);
                formeCacheNoir.endFill();
                this.cacheNoir = new PIXI.Sprite(formeCacheNoir.generateCanvasTexture());
            }
            this.cacheNoir.scale.x = LARGEUR / 256;
            this.cacheNoir.scale.y = HAUTEUR / 256;
            this.majLumiereMonde();
            if (this.infoCamera.cible) {
                this.majVisibiliteSecteur();
            }
            if (this.textureShader1) {
                this.textureShader1.destroy(true);
                this.textureShader2.destroy(true);
                this.textureShader3.destroy(true);
            }
            this.textureShader1 = PIXI.RenderTexture.create(LARGEUR, HAUTEUR, PIXI.SCALE_MODES.LINEAR);
            this.textureShader2 = PIXI.RenderTexture.create(LARGEUR, HAUTEUR, PIXI.SCALE_MODES.LINEAR);
            this.textureShader3 = PIXI.RenderTexture.create(LARGEUR, HAUTEUR, PIXI.SCALE_MODES.LINEAR);
            this.coucheMobile.filterArea = new Rectangle(0, 0, LARGEUR, HAUTEUR);
            this.conteneurMonde.filterArea = new Rectangle(0, 0, LARGEUR, HAUTEUR);
            this.camera3D.filterArea = new Rectangle(0, 0, LARGEUR, HAUTEUR);
            this.coucheEau.filterArea = new Rectangle(0, 0, LARGEUR, HAUTEUR);
            this.coucheSol.filterArea = new Rectangle(0, 0, LARGEUR, HAUTEUR);
            if (this.shaderEau) {
                this.shaderEau.uniforms.rapportFocaleLargeurTexture = this.largeur / 512;
            }
        };
        MondeADV.prototype.majLumiereMonde = function () {
            if (!this.clipFondLumiere) {
                this.clipFondLumiere = new PIXI.Sprite();
                this.clipFondLumiere.anchor.set(0.5, 0.5);
                this.conteneurLumiere.addChild(this.clipFondLumiere);
                this.clipFondLumiereGlobale = new PIXI.Sprite();
                this.clipFondLumiereGlobale.anchor.set(0.5, 0.5);
                this.conteneurLumiere.addChild(this.clipFondLumiereGlobale);
                this.conteneurLumiere.addChild(this.conteneurLumiereSol);
                this.conteneurLumiere.addChild(this.conteneurLumiereMobile);
                this.conteneurLumiereSol.addChild(this.coucheLumSolCanopee);
                this.conteneurLumiereSol.addChild(this.coucheLumSol);
                this.conteneurLumiereSol.addChild(this.coucheLumSolGlobale);
                this.conteneurLumiereMobile.addChild(this.coucheLumMobile);
                this.conteneurLumiereMobile.addChild(this.coucheLumMobileDynamique);
                this.conteneurLumiereMobile.addChild(this.coucheLumMobileGlobale);
            }
            var fondLumiere = new PIXI.Graphics();
            fondLumiere.beginFill(0x808080);
            fondLumiere.drawRect(0, 0, this.largeur, this.hauteur);
            fondLumiere.endFill();
            if (this.clipFondLumiere.texture) {
                this.clipFondLumiere.texture.destroy(true);
            }
            this.clipFondLumiere.texture = fondLumiere.generateCanvasTexture();
            fondLumiere = new PIXI.Graphics();
            fondLumiere.beginFill(0x808080);
            fondLumiere.drawRect(0, 0, this.largeur, this.hauteur);
            fondLumiere.endFill();
            if (this.clipFondLumiereGlobale.texture) {
                this.clipFondLumiereGlobale.texture.destroy(true);
            }
            this.clipFondLumiereGlobale.texture = fondLumiere.generateCanvasTexture();
            if (EditeurADV_1.EditeurADV.estAffiche()) {
                EditeurADV_1.EditeurADV.instance.genererRectanglesLumiere();
            }
        };
        MondeADV.prototype.ajouterSouffle = function (POX, POY, RAYON, PUISSANCE) {
            if (RAYON === void 0) { RAYON = 100; }
            if (PUISSANCE === void 0) { PUISSANCE = 1; }
            if (!this.listeSouffle) {
                this.listeSouffle = [];
            }
            this.listeSouffle.push(new InfoSouffle(POX, POY, RAYON, PUISSANCE));
        };
        MondeADV.prototype.ajouterMorceauTrainee = function (BX, BY, PX, PY) {
            var clipMorceau = new PIXI.projection.Sprite3d(this.textureTrainee);
            var angle = Math.atan2(PY - BY, PX - BX);
            clipMorceau.euler.x = Math.PI / 2;
            clipMorceau.position3d.x = BX - Mathematiques_1.default.cosRapide(angle) * 60;
            clipMorceau.position3d.z = BY - Mathematiques_1.default.sinRapide(angle) * 60;
            clipMorceau.anchor.set(0, 0.5);
            clipMorceau.euler.z = angle;
            clipMorceau.alpha = 0.8;
            clipMorceau.scale3d.x = Mathematiques_1.default.distance2Points(BX, BY, PX, PY) / 32;
            this.coucheSol.addChild(clipMorceau);
            this.listeMorceauTrainee.push(clipMorceau);
        };
        MondeADV.prototype.ajouterEclairLumiere = function (POX, POY, RAYON, COULEUR, TYPE) {
            var _this = this;
            var clipSol = null;
            var clipMobile = null;
            if (TYPE == 0 || TYPE == 2) {
                clipSol = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("fx/rond-lum-200.png"));
                clipSol.euler.x = Math.PI / 2;
                clipSol.anchor.set(0.5, 0.5);
                clipSol.scale3d.x = RAYON / 100;
                clipSol.scale3d.y = RAYON / 100;
                clipSol.tint = COULEUR;
                clipSol.position3d.x = POX;
                clipSol.position3d.z = POY;
                this.coucheLumSol.addChild(clipSol);
            }
            if (TYPE == 0 || TYPE == 1) {
                clipMobile = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("fx/rond-lum-200.png"));
                clipMobile.anchor.set(0.5, 0.5);
                clipMobile.scale.set(RAYON / 50);
                clipMobile.tint = COULEUR;
                this.coucheLumMobileDynamique.addChild(clipMobile);
            }
            AnimMath_1.default.animBoucle(400, function (PROGRESSION) {
                if (clipSol) {
                    clipSol.alpha = 0.5 - 0.5 * PROGRESSION;
                }
                if (clipMobile) {
                    clipMobile.alpha = 0.5 - 0.5 * PROGRESSION;
                    var pos = new PIXI.Point();
                    pos.x = POX;
                    pos.z = POY;
                    _this.camera3D.proj.local.apply(pos, pos);
                    clipMobile.position.set(pos.x, pos.y);
                }
            }).defMouvement(AnimMath_1.Mouvement.easeOutQuad).defFonctionFin(function () {
                if (clipSol && clipSol.parent) {
                    _this.coucheLumSol.removeChild(clipSol);
                }
                if (clipMobile && clipMobile.parent) {
                    _this.coucheLumMobileDynamique.removeChild(clipMobile);
                }
            }).boucleAuto();
            this.ajouterSouffle(MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.x, MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.y, RAYON, 0.5);
        };
        MondeADV.prototype.recupSecteur = function (X, Y) {
            var baseX = (X / 200) | 0;
            var baseY = (Y / 200) | 0;
            var codeSecteur = (baseX << 16) | (baseY & 0xFFFF);
            var secteur = this.indexSecteur[codeSecteur];
            if (!secteur) {
                secteur = new SecteurMonde(baseX, baseY, codeSecteur);
                this.indexSecteur[codeSecteur] = secteur;
            }
            return secteur;
        };
        MondeADV.prototype.majVisibiliteSecteur = function () {
            var posX = this.infoCamera.cible.positionServeur.x;
            var posY = this.infoCamera.cible.positionServeur.y;
            this.codeMajSecteur = (this.codeMajSecteur + 1) % 0xFFFFFF;
            var baseX = (posX / 200) | 0;
            var baseY = (posY / 200) | 0;
            var visionHaut = ((this.hauteur + 600) / 200) | 0;
            var visionBas = ((this.hauteur + 400) / 200) | 0;
            var visionCote = ((this.largeur + 400) / 200) | 0;
            for (var x = baseX - visionCote, finX = baseX + visionCote; x <= finX; x++) {
                for (var y = baseY - visionHaut, finY = baseY + visionBas; y <= finY; y++) {
                    var secteur = this.indexSecteur[(x << 16) | (y & 0xFFFF)];
                    if (secteur) {
                        secteur.codeMaj = this.codeMajSecteur;
                        if (!secteur.estVisible) {
                            secteur.rendreVisible(this, true);
                            this.listeSecteurVisible.push(secteur);
                        }
                    }
                }
            }
            for (var i = 0, nb = this.listeSecteurVisible.length; i < nb; i++) {
                var secteur = this.listeSecteurVisible[i];
                if (secteur.codeMaj != this.codeMajSecteur) {
                    secteur.rendreVisible(this, false);
                    this.listeSecteurVisible.splice(i, 1);
                    i--;
                    nb--;
                }
            }
        };
        MondeADV.prototype.nouveauMobile = function (JOUEUR_PRINCIPAL, MSG) {
            var typeMobile = MSG.l8();
            MSG.defPosition(MSG.recupPosition() - 1);
            var classe = TFMAdventure_1.default.CLASSE_TYPE_MOBILE[typeMobile] || MobileADV_1.MobileADV;
            var mobile = new classe();
            if (JOUEUR_PRINCIPAL) {
                mobile.estJoueurPrincipal = true;
                MobileADV_1.MobileADV.joueurPrincipal = mobile;
            }
            mobile.deserialisation(MSG);
            mobile.majCaracteristique(MSG);
            var ancien = this.indexMobile[mobile.identifiantMobile];
            if (ancien) {
                this.supprimerMobile(ancien);
            }
            this.ajouterMobile(mobile, true);
            if (JOUEUR_PRINCIPAL) {
                ClavierADV_1.default.instance.bloquerDeplacement(false);
            }
        };
        MondeADV.prototype.ajouterMobile = function (MOBILE, SECTEUR) {
            if (SECTEUR === void 0) { SECTEUR = false; }
            MOBILE.mondeEnCours = this;
            MOBILE.estVisible = false;
            if (MOBILE.listeAplatMobile) {
                for (var _i = 0, _a = MOBILE.listeAplatMobile; _i < _a.length; _i++) {
                    var aplatMobile = _a[_i];
                    this.coucheSol.addChild(aplatMobile);
                }
            }
            this.indexMobile[MOBILE.identifiantMobile] = MOBILE;
            if (MOBILE.estUnJoueur && MOBILE.nom) {
                this.indexJoueur[MOBILE.nom.toLowerCase()] = MOBILE;
            }
            if (MOBILE.estStatique) {
                if (SECTEUR) {
                    MOBILE.secteur = this.recupSecteur(MOBILE.positionServeur.x, MOBILE.positionServeur.y);
                    MOBILE.secteur.ajouterMobile(MOBILE);
                    if (MOBILE.secteur.estVisible) {
                        this.afficherMobile(MOBILE, true);
                    }
                }
                else {
                    this.afficherMobile(MOBILE, true);
                }
            }
            else {
                this.afficherMobile(MOBILE, true);
                this.listeMobileDynamique.push(MOBILE);
            }
            if (MOBILE.estUnEnnemi) {
                this.listeEnnemis.push(MOBILE);
            }
            if (MOBILE.visibleUniquementEditeur) {
                MOBILE.visible = this.editeurEnCours;
            }
        };
        MondeADV.prototype.supprimerMobile = function (MOBILE) {
            var _this = this;
            MOBILE.estMort = true;
            MOBILE.mondeEnCours = null;
            if (MOBILE.parent) {
                if (MOBILE.disparitionAlpha && MOBILE.estVisible && !(MOBILE.x > this.demiLargeur + MOBILE.width || MOBILE.x < -this.demiLargeur - MOBILE.width || MOBILE.y > this.demiHauteur + MOBILE.height || MOBILE.x < -this.demiHauteur - MOBILE.height)) {
                    AnimMath_1.default.animBoucle(1000, function (P) {
                        _this.majPosMobile(MOBILE);
                        MOBILE.alpha = 1 - P;
                    }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).defFonctionFin(function () {
                        if (MOBILE.parent) {
                            MOBILE.parent.removeChild(MOBILE);
                        }
                    }).boucleAuto();
                }
                else {
                    MOBILE.parent.removeChild(MOBILE);
                }
            }
            if (MOBILE.clipNom && MOBILE.clipNom.parent) {
                MOBILE.clipNom.parent.removeChild(MOBILE.clipNom);
            }
            if (MOBILE.clipOmbre) {
                if (MOBILE.clipOmbre.parent) {
                    MOBILE.clipOmbre.parent.removeChild(MOBILE.clipOmbre);
                }
                MOBILE.clipOmbre = null;
            }
            if (MOBILE.lumiereClipSol) {
                if (MOBILE.lumiereClipSol.parent) {
                    MOBILE.lumiereClipSol.parent.removeChild(MOBILE.lumiereClipSol);
                }
                MOBILE.lumiereClipSol = null;
            }
            if (MOBILE.lumiereClipMobile) {
                if (MOBILE.lumiereClipMobile.parent) {
                    MOBILE.lumiereClipMobile.parent.removeChild(MOBILE.lumiereClipMobile);
                }
                MOBILE.lumiereClipMobile = null;
            }
            if (MOBILE.clipAura && MOBILE.clipAura.parent) {
                MOBILE.clipAura.parent.removeChild(MOBILE.clipAura);
            }
            if (MOBILE.listeAplatMobile) {
                for (var _i = 0, _a = MOBILE.listeAplatMobile; _i < _a.length; _i++) {
                    var aplatMobile = _a[_i];
                    aplatMobile.disparition(MOBILE.disparitionAlpha);
                }
            }
            MOBILE.arreterSon();
            delete this.indexMobile[MOBILE.identifiantMobile];
            if (MOBILE.estUnJoueur && MOBILE.nom) {
                delete this.indexJoueur[MOBILE.nom.toLowerCase()];
            }
            if (MOBILE.secteur) {
                MOBILE.secteur.supprimerMobile(MOBILE);
                MOBILE.secteur = null;
            }
            if (!MOBILE.estStatique) {
                var index = this.listeMobileDynamique.indexOf(MOBILE);
                if (index != -1) {
                    this.listeMobileDynamique.splice(index, 1);
                }
            }
            if (MOBILE.estUnEnnemi) {
                var index = this.listeEnnemis.indexOf(MOBILE);
                if (index != -1) {
                    this.listeEnnemis.splice(index, 1);
                }
            }
            MOBILE.destruction();
        };
        MondeADV.prototype.trierMobile = function (MOBILE) {
            if (!MOBILE.estEnCoursDeTriage && MOBILE.parent == this.coucheMobile) {
                MOBILE.estEnCoursDeTriage = true;
                this.listeMobileATrier.push(MOBILE);
            }
        };
        MondeADV.prototype.recupMobile = function (CODE) {
            return this.indexMobile[CODE];
        };
        MondeADV.prototype.recupJoueur = function (NOM) {
            return this.indexJoueur[NOM.toLowerCase()];
        };
        MondeADV.prototype.recupElement = function (CODE) {
            var mobile = this.indexMobile[CODE];
            if (mobile) {
                return mobile;
            }
            return this.indexAplat[CODE];
        };
        MondeADV.prototype.ajouterApercuZoneEffet = function (ID, TYPE, X, Y, RAYON, DUREE) {
            var zone = new ClipZoneApercu(ID, TYPE, RAYON, DUREE);
            zone.position3d.x = X;
            zone.position3d.z = Y;
            this.coucheSol.addChild(zone);
            this.listeZoneEffetApercu.push(zone);
            this.indexZoneEffet[ID] = zone;
        };
        MondeADV.prototype.supprimerApercuZoneEffet = function (ID) {
            var zone = this.indexZoneEffet[ID];
            if (zone) {
                zone.dateMortAuto = 1;
            }
        };
        MondeADV.prototype.jouerSon = function (CODE, VOLUME, X, Y) {
            if (MobileADV_1.MobileADV.joueurPrincipal) {
                var son = TFMAdventure_1.default.indexSon[CODE];
                if (son) {
                    var distance = Mathematiques_1.default.distance2Points(MobileADV_1.MobileADV.joueurPrincipal.positionServeur.x, MobileADV_1.MobileADV.joueurPrincipal.positionServeur.y, X, Y);
                    var volumeFinal = MoteurSon_1.default.attenuerSonDistant(VOLUME, distance, TFMAdventure_1.default.LARGEUR + 200);
                    if (volumeFinal > 0.01) {
                        MoteurSon_1.default.jouerEffet(son, volumeFinal, 200);
                    }
                }
            }
        };
        MondeADV.prototype.ajouterFX = function (CODE, X, Y, CODE_MOBILE, PLAN, DUREE) {
            var infoFX = TFMAdventure_1.default.indexFX[CODE];
            if (infoFX) {
                var clipAnim = TFMAdventure_1.default.recupFX(CODE);
                if (PLAN == 2) {
                    var clip_1 = new ClipAnimProjection_1.ClipAnimProjection(clipAnim);
                    clip_1.defPosition(X, Y);
                    clip_1.declencheurFinAnim(function () {
                        clip_1.destructionRequise = true;
                    });
                    this.listeFXProjection.push(clip_1);
                    this.coucheSol.addChild(clip_1);
                    return;
                }
                this.generateurIdentifiantTemporaire = (this.generateurIdentifiantTemporaire + 1) % 0xFFFFFF;
                var mobile_1 = new MobileADV_1.MobileADV();
                mobile_1.identifiantMobile = -this.generateurIdentifiantTemporaire;
                mobile_1.apparitionAlpha = false;
                mobile_1.disparitionAlpha = false;
                mobile_1.listeFXEnCours = [{ clip: clipAnim, dateFin: 0 }];
                mobile_1.addChild(clipAnim);
                mobile_1.positionServeur.set(X, Y);
                mobile_1.positionVirtuelle.set(X, Y);
                if (CODE_MOBILE) {
                    var mobileCible = this.recupMobile(CODE_MOBILE);
                    if (mobileCible) {
                        mobile_1.positionServeur.x = mobile_1.positionVirtuelle.x = mobileCible.positionVirtuelle.x;
                        mobile_1.positionServeur.y = mobile_1.positionVirtuelle.y = mobileCible.positionVirtuelle.y;
                        if (PLAN == 0) {
                            mobile_1.positionServeur.y += 5;
                            mobile_1.positionVirtuelle.y += 5;
                        }
                        else {
                            mobile_1.positionServeur.y -= 5;
                            mobile_1.positionVirtuelle.y -= 5;
                        }
                        if (infoFX.orientable) {
                            if (!mobile_1.estVersLaDroite) {
                                clipAnim.scale.x *= -1;
                            }
                        }
                    }
                }
                if (DUREE) {
                    mobile_1.dateDestructionAuto = Date.now() + DUREE;
                }
                else {
                    clipAnim.declencheurFinAnim(function () {
                        mobile_1.destructionRequise = true;
                    });
                }
                this.ajouterMobile(mobile_1, false);
            }
        };
        MondeADV.prototype.fxEchelleAplat = function (CODE, X, Y, RAYON_DEBUT, RAYON_FIN, DUREE, TYPE, RESOLUTION_COTE) {
            var clip = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("fxsol/" + CODE + ".png"));
            clip.anchor.set(0.5, 0.5);
            clip.euler.x = Math.PI / 2;
            clip.position3d.x = X;
            clip.position3d.z = Y;
            var echelleDebut = RAYON_DEBUT / (RESOLUTION_COTE / 2);
            var echelleFin = RAYON_FIN / (RESOLUTION_COTE / 2);
            var distanceEchelle = echelleFin - echelleDebut;
            clip.scale3d.y = clip.scale3d.x = echelleDebut;
            clip.alpha = 0;
            AnimMath_1.default.animObjet(clip, "alpha", 0, 1, DUREE * 0.2).boucleAuto();
            AnimMath_1.default.animObjet(clip, "alpha", 1, 0, DUREE * 0.2, DUREE * 0.8).boucleAuto();
            var anim = AnimMath_1.default.animBoucle(DUREE, function (P) {
                clip.scale3d.y = clip.scale3d.x = echelleDebut + distanceEchelle * P;
            });
            if (TYPE == 1) {
                anim.defMouvement(AnimMath_1.Mouvement.easeOutExpo);
            }
            else if (TYPE == 2) {
                anim.defMouvement(AnimMath_1.Mouvement.easeOutQuad);
            }
            anim.defFonctionFin(function () {
                if (clip.parent) {
                    clip.parent.removeChild(clip);
                }
            });
            anim.boucleAuto();
            this.coucheSol.addChild(clip);
        };
        MondeADV.prototype.ajouterFXSol = function (CODE, X, Y, MOBILE, RAYON, DUREE, TEINTE) {
            var clip = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("fxsol/" + CODE + ".png"));
            clip.tint = TEINTE;
            clip.euler.x = Math.PI / 2;
            clip.anchor.set(0.5, 0.5);
            var mobile = this.recupMobile(MOBILE);
            if (mobile) {
                clip.position3d.x = mobile.positionServeur.x;
                clip.position3d.z = mobile.positionServeur.y;
            }
            else {
                clip.position3d.x = X;
                clip.position3d.z = Y;
            }
            this.coucheSol.addChild(clip);
            var info = clip;
            info.echelle = RAYON / 200;
            clip.scale3d.y = clip.scale3d.x = info.echelle;
            info.dateLancement = Date.now();
            info.dateDestruction = info.dateLancement + DUREE;
            this.listeFXSol.push(info);
        };
        MondeADV.prototype.ajouterAplat = function (APLAT, SECTEUR) {
            APLAT.estVisible = false;
            this.indexAplat[APLAT.identifiantMobile] = APLAT;
            APLAT.secteur = this.recupSecteur(APLAT.position3d.x, APLAT.position3d.z);
            if (SECTEUR) {
                APLAT.secteur.ajouterAplat(APLAT);
                if (APLAT.secteur.estVisible) {
                    this.afficherAplat(APLAT, true);
                }
            }
            else {
                this.afficherAplat(APLAT, true);
            }
        };
        MondeADV.prototype.supprimerAplat = function (IDENTIFIANT) {
            var aplat = this.indexAplat[IDENTIFIANT];
            if (aplat) {
                delete this.indexAplat[IDENTIFIANT];
                if (aplat.parent) {
                    aplat.parent.removeChild(aplat);
                }
                if (aplat.secteur) {
                    aplat.secteur.supprimerAplat(aplat);
                    aplat.secteur = null;
                }
            }
        };
        MondeADV.prototype.majPosElementMonde = function (ELEMENT, POX, POY, ECHELLE_X, ECHELLE_Y) {
            if (ECHELLE_X === void 0) { ECHELLE_X = 1; }
            if (ECHELLE_Y === void 0) { ECHELLE_Y = 1; }
            var pos = new PIXI.Point();
            pos.x = POX;
            pos.z = POY;
            this.camera3D.proj.local.apply(pos, pos);
            ELEMENT.x = pos.x;
            ELEMENT.y = pos.y;
            var echelle = (this.camera3D.focus + -pos.y * MondeADV.COTAN_ANGLE_CAMERA) / (this.camera3D.focus + this.eloignementCamera);
            ELEMENT.scale.set(ECHELLE_X * echelle, ECHELLE_Y * echelle);
        };
        MondeADV.prototype.majPosMobile = function (MOBILE) {
            if (MOBILE.estStatique) {
                if (MOBILE.codeCamera == this.identifiantModificationCamera) {
                    return;
                }
                else {
                    MOBILE.codeCamera = this.identifiantModificationCamera;
                }
            }
            var pos = new PIXI.Point();
            pos.x = MOBILE.positionVirtuelle.x;
            pos.z = MOBILE.positionVirtuelle.y;
            this.camera3D.proj.local.apply(pos, pos);
            MOBILE.x = pos.x;
            MOBILE.y = pos.y;
            if (MOBILE.orientationDeplacementAuto) {
                var posY = pos.y + MOBILE.creature.y;
                var posX = pos.x + this.camera3D.position3d.x;
                MOBILE.creature.rotation = Math.atan2(posY - MOBILE.orientationAutoDernierY, posX - MOBILE.orientationAutoDernierX);
                MOBILE.orientationAutoDernierX = posX;
                MOBILE.orientationAutoDernierY = posY;
            }
            if (this.modeAerien) {
                MOBILE.scale.set(this.camera3D.focus / (this.camera3D.focus + this.eloignementCamera));
            }
            else {
                var echelle = (this.camera3D.focus + -pos.y * MondeADV.COTAN_ANGLE_CAMERA) / (this.camera3D.focus + this.eloignementCamera);
                MOBILE.scale.set(echelle);
                if (MOBILE.clipNom) {
                    var hauteur = MOBILE.hauteurClipNom > 0 ? MOBILE.hauteurClipNom : 120;
                    MOBILE.clipNom.position.set(MOBILE.x, MOBILE.y - hauteur * echelle);
                    MOBILE.clipNom.scale.set(echelle * MOBILE.clipNom.echelle);
                }
            }
            MOBILE.echelleDistance = MOBILE.scale.x;
            if (MOBILE.clipOmbre) {
                MOBILE.clipOmbre.position3d.x = MOBILE.positionVirtuelle.x;
                MOBILE.clipOmbre.position3d.z = MOBILE.positionVirtuelle.y;
            }
            if (MOBILE.lumiereClipSol) {
                MOBILE.lumiereClipSol.position3d.x = MOBILE.positionVirtuelle.x;
                MOBILE.lumiereClipSol.position3d.z = MOBILE.positionVirtuelle.y;
            }
            if (MOBILE.lumiereClipMobile) {
                MOBILE.lumiereClipMobile.x = MOBILE.x;
                MOBILE.lumiereClipMobile.y = MOBILE.y;
            }
            if (MOBILE.clipAura) {
                MOBILE.clipAura.position3d.x = MOBILE.positionVirtuelle.x;
                MOBILE.clipAura.position3d.z = MOBILE.positionVirtuelle.y;
                MOBILE.clipAura.alpha += (0.7 - MOBILE.clipAura.alpha) * 0.1;
                MOBILE.clipAura.euler.z += 0.001;
            }
            if (MOBILE.listeAplatMobile) {
                for (var _i = 0, _a = MOBILE.listeAplatMobile; _i < _a.length; _i++) {
                    var aplatMobile = _a[_i];
                    aplatMobile.position3d.x = MOBILE.positionVirtuelle.x;
                    aplatMobile.position3d.z = MOBILE.positionVirtuelle.y;
                }
            }
        };
        MondeADV.prototype.afficherMobile = function (MOBILE, OUI) {
            if (OUI != MOBILE.estVisible) {
                MOBILE.estVisible = OUI;
                MOBILE.aAfficher = false;
                this.majPictoEditeurRequise = true;
                MOBILE.derniereBoucle = this.tempsEnCours;
                if (OUI) {
                    MOBILE.positionVirtuelle.x = MOBILE.positionServeur.x;
                    MOBILE.positionVirtuelle.y = MOBILE.positionServeur.y;
                    this.majPosMobile(MOBILE);
                    if (MOBILE.infoCommune.lumiere && !this.modeAffichageLumiere) {
                        if (MOBILE.infoCommune.lumiere == 1) {
                            this.coucheLumMobile.addChild(MOBILE);
                        }
                        else {
                            this.coucheLumMobileGlobale.addChild(MOBILE);
                        }
                    }
                    else {
                        this.coucheMobile.addChildAt(MOBILE, this.recupIndexTriage(this.coucheMobile.children, MOBILE.y));
                        this.trierMobile(MOBILE);
                        if (MOBILE.clipOmbre) {
                            this.coucheOmbre.addChild(MOBILE.clipOmbre);
                        }
                        if (MOBILE.lumiereClipSol) {
                            this.coucheLumSol.addChild(MOBILE.lumiereClipSol);
                        }
                        if (MOBILE.lumiereClipMobile) {
                            this.coucheLumMobileDynamique.addChild(MOBILE.lumiereClipMobile);
                        }
                    }
                    if (MOBILE.clipNom) {
                        if (MOBILE.estJoueurPrincipal) {
                            this.coucheMobileInterface.addChild(MOBILE.clipNom);
                        }
                        else {
                            this.coucheMobileInterface.addChildAt(MOBILE.clipNom, 0);
                        }
                    }
                    if (MOBILE.infoCommune.sonBoucle) {
                        MOBILE.jouerSon(MOBILE.infoCommune.sonBoucle, MOBILE.infoCommune.volumeSon, true);
                    }
                    if (MOBILE.apparitionAlpha && (!(MOBILE.x > this.demiLargeur + MOBILE.width || MOBILE.x < -this.demiLargeur - MOBILE.width || MOBILE.y > this.demiHauteur + MOBILE.height || MOBILE.x < -this.demiHauteur - MOBILE.height))) {
                        AnimMath_1.default.animObjet(MOBILE, "alpha", 0, 1, 1000).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto(true);
                    }
                    else {
                        MOBILE.alpha = 1;
                    }
                }
                else {
                    MOBILE.estEnCoursDeTriage = false;
                    if (MOBILE.parent) {
                        MOBILE.parent.removeChild(MOBILE);
                    }
                    if (MOBILE.clipNom && MOBILE.clipNom.parent) {
                        MOBILE.clipNom.parent.removeChild(MOBILE.clipNom);
                    }
                    MOBILE.scale.set(1);
                    if (MOBILE.clipOmbre && MOBILE.clipOmbre.parent) {
                        MOBILE.clipOmbre.parent.removeChild(MOBILE.clipOmbre);
                    }
                    if (MOBILE.lumiereClipSol && MOBILE.lumiereClipSol.parent) {
                        MOBILE.lumiereClipSol.parent.removeChild(MOBILE.lumiereClipSol);
                    }
                    if (MOBILE.lumiereClipMobile && MOBILE.lumiereClipMobile.parent) {
                        MOBILE.lumiereClipMobile.parent.removeChild(MOBILE.lumiereClipMobile);
                    }
                    MOBILE.arreterSon();
                }
            }
        };
        MondeADV.prototype.afficherAplat = function (APLAT, OUI) {
            if (OUI != APLAT.estVisible) {
                APLAT.aAfficher = false;
                this.majPictoEditeurRequise = true;
                APLAT.estVisible = OUI;
                if (OUI) {
                    if (APLAT.infoCommune.lumiere && !this.modeAffichageLumiere) {
                        if (APLAT.infoCommune.lumiere == 1) {
                            if (APLAT.infoCommune.typeVent == 2) {
                                this.coucheLumSolCanopee.addChild(APLAT);
                            }
                            else {
                                this.coucheLumSol.addChild(APLAT);
                            }
                        }
                        else {
                            this.coucheLumSolGlobale.addChild(APLAT);
                        }
                    }
                    else {
                        if (APLAT.couche == 1) {
                            APLAT.position3d.y = -50;
                            this.coucheEau.addChildAt(APLAT, this.recupIndexTriageAplat(this.coucheEau.children, APLAT.indexTriage));
                        }
                        else {
                            this.coucheSol.addChildAt(APLAT, this.recupIndexTriageAplat(this.coucheSol.children, APLAT.indexTriage));
                        }
                    }
                }
                else {
                    APLAT.parent.removeChild(APLAT);
                }
            }
        };
        MondeADV.prototype.recupPosMondeDepuisEcran = function (POX, POY) {
            POX -= this.conteneurMonde.position.x;
            POY -= this.conteneurMonde.position.y;
            var cosAngleCamera = MondeADV.instance.modeAerien ? 0 : MondeADV.COS_ANGLE_CAMERA;
            var sinAngleCamera = MondeADV.instance.modeAerien ? 1 : MondeADV.SIN_ANGLE_CAMERA;
            var cotanAngleCamera = MondeADV.instance.modeAerien ? 0 : MondeADV.COTAN_ANGLE_CAMERA;
            var facteurAgrandissement = (this.camera3D.focus + this.eloignementCamera) / (this.camera3D.focus + -POY * cotanAngleCamera);
            return new PIXI.Point(this.camera3D.position3d.x + POX * facteurAgrandissement, (this.camera3D.position3d.z + this.eloignementCamera * cosAngleCamera) + POY * facteurAgrandissement / sinAngleCamera);
        };
        MondeADV.prototype.recupPosEcranDepuisMonde = function (POX, POY) {
            var pos = new PIXI.Point();
            pos.x = POX;
            pos.z = POY;
            this.camera3D.proj.local.apply(pos, pos);
            pos.x += TFMAdventure_1.default.DEMI_LARGEUR;
            pos.y += TFMAdventure_1.default.DEMI_HAUTEUR;
            return pos;
        };
        MondeADV.prototype.defCamera = function (CIBLE) {
            this.infoCamera.defCible(CIBLE);
        };
        MondeADV.prototype.ajouterSegmentCollision = function (X1, Y1, X2, Y2, IDENTIFIANT) {
            this.gestionnaireCollisions.ajouterSegmentCollisionAvecIdentifiant(X1, Y1, X2, Y2, IDENTIFIANT);
            if (EditeurADV_1.EditeurADV.estAffiche() && EditeurADV_1.EditeurADV.instance.modeCollision) {
                this.ajouterSegmentCollisionEditeur(X1, Y1, X2, Y2, IDENTIFIANT);
            }
        };
        MondeADV.prototype.ajouterSegmentCollisionEditeur = function (X1, Y1, X2, Y2, IDENTIFIANT) {
            EditeurADV_1.EditeurADV.instance.ajouterCollision(X1, Y1, X2, Y2, IDENTIFIANT);
            this.majStatutFermetureCollisionsExtremite(X1, Y1, IDENTIFIANT);
            this.majStatutFermetureCollisionsExtremite(X2, Y2, IDENTIFIANT);
            EditeurADV_1.EditeurADV.instance.majStatutFermetureCollision(IDENTIFIANT, this.determinerNombreFermeturesCollision(IDENTIFIANT) >= 2);
        };
        MondeADV.prototype.majStatutFermetureCollisionsExtremite = function (X, Y, IDENTIFIANT_IGNORE) {
            var infoExtremite = this.extraireInfoExtremiteCollision(X, Y);
            var listeCollisions = infoExtremite.infosCollisionsConcernees;
            for (var _i = 0, _a = infoExtremite.infosCollisionsConcernees; _i < _a.length; _i++) {
                var infoCollision = _a[_i];
                var collision = infoCollision.segment;
                if (collision.identifiant === IDENTIFIANT_IGNORE) {
                    continue;
                }
                var xAutreExtremite = infoCollision.depart ? collision.x + collision.dx : collision.x;
                var yAutreExtremite = infoCollision.depart ? collision.y + collision.dy : collision.y;
                var infoAutreExtremite = this.extraireInfoExtremiteCollision(xAutreExtremite, yAutreExtremite);
                var listeAutresCollisions = infoAutreExtremite.infosCollisionsConcernees;
                EditeurADV_1.EditeurADV.instance.majStatutFermetureCollision(collision.identifiant, (listeAutresCollisions.length > 1 || listeAutresCollisions.length == 1 && listeAutresCollisions[0].segment.identifiant !== collision.identifiant)
                    && (listeCollisions.length > 1 || listeCollisions.length == 1 && listeCollisions[0].segment.identifiant !== collision.identifiant));
            }
        };
        MondeADV.prototype.ajusterCibleDeplacementSuivantCollisions = function (X, Y, DX, DY) {
            if (this.collisionRencontre) {
                var adx = X - this.collisionRencontre.centreX;
                var ady = Y - this.collisionRencontre.centreY;
                var bdx = adx + DX;
                var bdy = ady + DY;
                var rayonCarre = this.collisionRencontre.rayon * this.collisionRencontre.rayon;
                if (adx * adx + ady * ady <= rayonCarre && bdx * bdx + bdy * bdy > rayonCarre) {
                    return new PIXI.Point(X, Y);
                }
            }
            return this.gestionnaireCollisions.ajusterCibleDeplacementSuivantCollisions(X, Y, DX, DY);
        };
        MondeADV.prototype.trouverExtremiteCollisionProche = function (X, Y, DISTANCE_MAX) {
            return this.gestionnaireCollisions.trouverExtremiteCollisionProche(X, Y, DISTANCE_MAX);
        };
        MondeADV.prototype.extraireInfoExtremiteCollision = function (X, Y) {
            return this.gestionnaireCollisions.extraireInfoExtremiteCollision(X, Y);
        };
        MondeADV.prototype.determinerNombreFermeturesCollision = function (IDENTIFIANT) {
            return this.gestionnaireCollisions.determinerNombreFermeturesCollision(IDENTIFIANT);
        };
        MondeADV.prototype.itererCollisions = function (FONCTION_COLLISION) {
            return this.gestionnaireCollisions.itererCollisions(FONCTION_COLLISION);
        };
        MondeADV.prototype.trouverCollisionsProches = function (X, Y, DISTANCE_MAX) {
            return this.gestionnaireCollisions.trouverSegmentsProches(X, Y, DISTANCE_MAX);
        };
        MondeADV.prototype.modifierSegmentCollision = function (IDENTIFIANT, X1, Y1, X2, Y2) {
            var collision = this.gestionnaireCollisions.recupSegmentCollision(IDENTIFIANT);
            var x1 = collision.x;
            var y1 = collision.y;
            var x2 = x1 + collision.dx;
            var y2 = y1 + collision.dy;
            this.gestionnaireCollisions.modifierSegmentCollision(X1, Y1, X2, Y2, IDENTIFIANT);
            if (EditeurADV_1.EditeurADV.estAffiche() && EditeurADV_1.EditeurADV.instance.modeCollision) {
                EditeurADV_1.EditeurADV.instance.modifierCollision(IDENTIFIANT, X1, Y1, X2, Y2);
                this.majStatutFermetureCollisionsExtremite(x1, y1);
                this.majStatutFermetureCollisionsExtremite(x2, y2);
                this.majStatutFermetureCollisionsExtremite(X1, Y1, IDENTIFIANT);
                this.majStatutFermetureCollisionsExtremite(X2, Y2, IDENTIFIANT);
            }
        };
        MondeADV.prototype.retirerSegmentCollision = function (IDENTIFIANT) {
            var segment = this.gestionnaireCollisions.recupSegmentCollision(IDENTIFIANT);
            this.gestionnaireCollisions.retirerSegmentCollisionDepuisIdentifiant(IDENTIFIANT);
            if (segment && EditeurADV_1.EditeurADV.estAffiche() && EditeurADV_1.EditeurADV.instance.modeCollision) {
                EditeurADV_1.EditeurADV.instance.retirerCollision(IDENTIFIANT);
                this.majStatutFermetureCollisionsExtremite(segment.x, segment.y);
                this.majStatutFermetureCollisionsExtremite(segment.x + segment.dx, segment.y + segment.dy);
            }
        };
        MondeADV.prototype.ajouterBoucle = function (NOM, FONCTION) {
            if (!this.indexBoucleSuppl) {
                this.indexBoucleSuppl = {};
            }
            this.indexBoucleSuppl[NOM] = FONCTION;
        };
        MondeADV.prototype.supprimerBoucle = function (NOM) {
            if (this.indexBoucleSuppl) {
                delete this.indexBoucleSuppl[NOM];
            }
        };
        MondeADV.prototype.afficherEffetChiffre = function (CIBLE, AUTEUR, TYPE, VALEUR, PERIODIQUE) {
            if (!AUTEUR) {
                AUTEUR = CIBLE;
            }
            if (VALEUR) {
                var droite = CIBLE.positionVirtuelle.x > AUTEUR.positionVirtuelle.x;
                if (CIBLE == AUTEUR) {
                    droite = !AUTEUR.estVersLaDroite;
                }
                var effetChiffre = new ClipChiffre(this, Math.abs(VALEUR).toString(), CIBLE.estJoueurPrincipal && TYPE == 1 ? -1 : TYPE, CIBLE.positionVirtuelle.x, CIBLE.positionVirtuelle.y, droite);
                this.coucheMobileInterface.addChild(effetChiffre);
                if (!PERIODIQUE && CIBLE.estJoueurPrincipal && TYPE != 0) {
                    var angle = Math.atan2(CIBLE.positionVirtuelle.y - AUTEUR.positionVirtuelle.y, CIBLE.positionVirtuelle.x - AUTEUR.positionVirtuelle.x);
                    MondeADV.instance.tremblement(1, 100, 10, angle);
                }
            }
            if (PERIODIQUE) {
                if (TYPE == 0) {
                    CIBLE.afficherFX(26, 0, 0, 1, 1, 0, 0);
                }
            }
            else {
                if (TYPE == 0) {
                    CIBLE.afficherFX(33, 0, 0, 1, 1, 0, 0);
                    this.ajouterEclairLumiere(CIBLE.positionVirtuelle.x, CIBLE.positionVirtuelle.y, 200, 0x33d071, 0);
                }
                else if (CIBLE.fxBouclierEnCours) {
                    CIBLE.afficherFX(40, 0, 0, 1, 1, 0, 0);
                    CIBLE.fxBouclierEnCours.alpha = 3;
                    if (CIBLE.estJoueurPrincipal) {
                        CIBLE.jouerSon("ting", 0.8);
                    }
                }
                else if (TYPE == -1 || TYPE == 1) {
                    CIBLE.afficherFX(36, 0, -60, 1, 1, 0, 0, (AUTEUR.x < CIBLE.x ? Math.PI : 0) - Math.PI / 2);
                    CIBLE.effetTouche();
                }
                else if (TYPE == 2) {
                    CIBLE.jouerSon("flamme", 0.2);
                    CIBLE.afficherFX(38, 0, 0, 1, 1, 0, 0);
                    this.ajouterEclairLumiere(CIBLE.positionVirtuelle.x, CIBLE.positionVirtuelle.y, 200, 0xFF7400, 0);
                    CIBLE.effetTouche();
                }
                else if (TYPE == 3) {
                    CIBLE.jouerSon("glace", 0.2);
                    CIBLE.afficherFX(45, 0, 0, 1, 1, 0, 0);
                    this.ajouterEclairLumiere(CIBLE.positionVirtuelle.x, CIBLE.positionVirtuelle.y, 200, 0x8CF8FF, 0);
                    CIBLE.effetTouche();
                }
                else if (TYPE == 4) {
                    CIBLE.jouerSon("poison2", 0.2);
                    CIBLE.afficherFX(39, 0, 0, 1, 1, 0, 0);
                    this.ajouterEclairLumiere(CIBLE.positionVirtuelle.x, CIBLE.positionVirtuelle.y, 200, 0xA05CD8, 0);
                    CIBLE.effetTouche();
                }
                else if (TYPE == 5) {
                    CIBLE.jouerSon("elec", 0.2);
                    CIBLE.afficherFX(37, 0, 0, 1, 1, 0, 0);
                    this.ajouterEclairLumiere(CIBLE.positionVirtuelle.x, CIBLE.positionVirtuelle.y, 200, 0x4556FF, 0);
                    CIBLE.effetTouche();
                }
            }
        };
        MondeADV.prototype.defModeAerien = function (OUI) {
            this.modeAerien = OUI;
            if (OUI) {
                this.camera3D.euler.x = Math.PI / 2;
            }
            else {
                this.camera3D.euler.x = MondeADV.ANGLE_CAMERA;
            }
            this.conteneurLumiereSol.euler.x = this.camera3D.euler.x;
            this.majPositionCamera();
        };
        MondeADV.prototype.basculerAffichageLumiere = function () {
            this.modeAffichageLumiere = !this.modeAffichageLumiere;
            if (this.modeAffichageLumiere) {
                var liste = this.coucheLumMobile.children.slice();
                liste = liste.concat(this.coucheLumMobileGlobale.children.slice());
                for (var _i = 0, liste_1 = liste; _i < liste_1.length; _i++) {
                    var mobile = liste_1[_i];
                    if (mobile instanceof MobileADV_1.MobileADV) {
                        this.coucheMobile.addChild(mobile);
                    }
                }
                liste = this.coucheLumSol.children.slice();
                liste = liste.concat(this.coucheLumSolCanopee.children.slice());
                liste = liste.concat(this.coucheLumSolGlobale.children.slice());
                for (var _a = 0, liste_2 = liste; _a < liste_2.length; _a++) {
                    var aplat = liste_2[_a];
                    if (aplat instanceof AplatADV_1.AplatADV) {
                        this.coucheSol.addChildAt(aplat, this.recupIndexTriageAplat(this.coucheSol.children, aplat.indexTriage));
                    }
                }
            }
            else {
                for (var _b = 0, _c = this.coucheMobile.children.slice(); _b < _c.length; _b++) {
                    var mobile = _c[_b];
                    if (mobile instanceof MobileADV_1.MobileADV && mobile.infoCommune.lumiere) {
                        if (mobile.infoCommune.lumiere == 1) {
                            this.coucheLumMobile.addChild(mobile);
                        }
                        else if (mobile.infoCommune.lumiere == 2) {
                            this.coucheLumMobileGlobale.addChild(mobile);
                        }
                    }
                }
                for (var _d = 0, _e = this.coucheSol.children.slice(); _d < _e.length; _d++) {
                    var aplat = _e[_d];
                    if (aplat instanceof AplatADV_1.AplatADV && aplat.infoCommune.lumiere) {
                        this.conteneurLumiereSol.addChild(aplat);
                        if (aplat.infoCommune.lumiere == 1) {
                            if (aplat.infoCommune.typeVent == 2) {
                                this.coucheLumSolCanopee.addChild(aplat);
                            }
                            else {
                                this.coucheLumSol.addChild(aplat);
                            }
                        }
                        else if (aplat.infoCommune.lumiere == 2) {
                            this.coucheLumSolGlobale.addChild(aplat);
                        }
                    }
                }
            }
        };
        MondeADV.prototype.defCurseur = function (CURSEUR, FONCTION, BOUCLE) {
            var _this = this;
            this.supprimerCurseur();
            if (CURSEUR instanceof MobileADV_1.MobileADV) {
                this.curseurMobile = CURSEUR;
                this.ajouterMobile(CURSEUR, false);
                this.afficherMobile(CURSEUR, true);
                this.ajouterBoucle("curseur", function () {
                    var pos = _this.recupPosMondeDepuisEcran(TFMAdventure_1.default.SOURIS_X, TFMAdventure_1.default.SOURIS_Y);
                    var accroche = Clavier_1.Clavier.controleEnCours ? 64 : Clavier_1.Clavier.shiftEnCours ? 32 : 1;
                    CURSEUR.positionServeur.x = CURSEUR.positionVirtuelle.x = Math.round(pos.x / accroche) * accroche;
                    CURSEUR.positionServeur.y = CURSEUR.positionVirtuelle.y = Math.round(pos.y / accroche) * accroche;
                    _this.majPosMobile(CURSEUR);
                    _this.trierMobile(CURSEUR);
                    if (BOUCLE) {
                        BOUCLE(pos);
                    }
                });
            }
            else {
                this.curseurAplat = CURSEUR;
                this.ajouterAplat(CURSEUR, false);
                this.afficherAplat(CURSEUR, true);
                this.ajouterBoucle("curseur", function () {
                    var pos = _this.recupPosMondeDepuisEcran(TFMAdventure_1.default.SOURIS_X, TFMAdventure_1.default.SOURIS_Y);
                    var accroche = Clavier_1.Clavier.controleEnCours ? 64 : Clavier_1.Clavier.shiftEnCours ? 32 : 1;
                    if (accroche != 1) {
                        CURSEUR.majPosition(Math.round(pos.x / accroche) * accroche, Math.round(pos.y / accroche) * accroche);
                    }
                    else {
                        CURSEUR.majPosition(pos.x, pos.y);
                    }
                    if (BOUCLE) {
                        BOUCLE(pos);
                    }
                });
            }
            this.fonctionCurseur = FONCTION;
        };
        MondeADV.prototype.supprimerCurseur = function () {
            this.fonctionCurseur = null;
            this.majPictoEditeurRequise = true;
            this.supprimerBoucle("curseur");
            if (this.curseurMobile) {
                this.supprimerMobile(this.curseurMobile);
                this.curseurMobile = null;
            }
            if (this.curseurAplat) {
                if (this.curseurAplat.parent) {
                    this.curseurAplat.parent.removeChild(this.curseurAplat);
                }
                this.curseurAplat = null;
            }
        };
        MondeADV.prototype.afficherLigneDebug = function (IDENTIFIANT, DX, DY, FX, FY, COULEUR) {
            if (!this.coucheDebug) {
                this.coucheDebug = new PIXI.projection.Camera3d();
                this.coucheDebug.setPlanes(MondeADV.FOCUS_CAMERA, MondeADV.PROFONDEUR_MIN - this.eloignementCamera, MondeADV.PROFONDEUR_MAX - this.eloignementCamera, false);
                this.coucheDebug.euler.x = MondeADV.ANGLE_CAMERA;
                this.conteneurMonde.addChild(this.coucheDebug);
            }
            this.supprimerFormeDebug(IDENTIFIANT);
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
            MondeADV.instance.coucheDessin.addChild(clip);
            this.indexLignesDebug[IDENTIFIANT] = clip;
        };
        MondeADV.prototype.afficherTransition = function (ANIM) {
            var _this = this;
            if (ANIM === void 0) { ANIM = true; }
            this.addChild(this.cacheNoir);
            this.cacheNoir.alpha = 1;
            if (ANIM) {
                AnimMath_1.default.animObjet(this.cacheNoir, "alpha", 1, 0, 2000, 500)
                    .defMouvement(AnimMath_1.Mouvement.easeInExpo).boucleAuto(true)
                    .defFonctionFin(function () {
                    if (_this.cacheNoir.parent) {
                        _this.cacheNoir.parent.removeChild(_this.cacheNoir);
                    }
                });
            }
        };
        MondeADV.prototype.afficherCercleDebug = function (IDENTIFIANT, X, Y, RAYON, COULEUR) {
            if (!this.coucheDebug) {
                this.coucheDebug = new PIXI.projection.Camera3d();
                this.coucheDebug.setPlanes(MondeADV.FOCUS_CAMERA, MondeADV.PROFONDEUR_MIN - this.eloignementCamera, MondeADV.PROFONDEUR_MAX - this.eloignementCamera, false);
                this.coucheDebug.euler.x = MondeADV.ANGLE_CAMERA;
                this.conteneurMonde.addChild(this.coucheDebug);
            }
            this.supprimerFormeDebug(IDENTIFIANT);
            var dessin = new PIXI.Graphics();
            dessin.lineStyle(4, COULEUR);
            dessin.beginFill(COULEUR);
            dessin.drawCircle(X, Y, RAYON);
            dessin.endFill();
            var clip = new PIXI.projection.Sprite3d(dessin.generateCanvasTexture());
            clip.euler.x = Math.PI / 2;
            clip.position3d.x = X - RAYON;
            clip.position3d.z = Y - RAYON;
            clip["idDessin"] = IDENTIFIANT;
            MondeADV.instance.coucheDessin.addChild(clip);
            this.indexLignesDebug[IDENTIFIANT] = clip;
        };
        MondeADV.prototype.supprimerFormeDebug = function (IDENTIFIANT) {
            var clip = this.indexLignesDebug[IDENTIFIANT];
            if (clip) {
                delete this.indexLignesDebug[IDENTIFIANT];
                if (clip.parent) {
                    clip.parent.removeChild(clip);
                    clip.texture.destroy(true);
                    clip.destroy();
                }
            }
        };
        MondeADV.prototype.debugPosServeur = function (MSG) {
            if (!this.listeClipDebugPosition) {
                this.listeClipDebugPosition = [];
            }
            for (var _i = 0, _a = this.listeClipDebugPosition; _i < _a.length; _i++) {
                var clip = _a[_i];
                clip.parent.removeChild(clip);
                clip.texture.destroy(true);
            }
            this.listeClipDebugPosition = [];
            var nb = MSG.l16();
            for (var i = 0; i < nb; i++) {
                var posX = MSG.lFloat();
                var posY = MSG.lFloat();
                var tailleMobile = MSG.l8();
                var porteeAttaque = MSG.l8();
                var graph = new PIXI.Graphics();
                graph.lineStyle(1, 0xAA8822, 0.8);
                graph.drawCircle(0, 0, tailleMobile + porteeAttaque);
                graph.endFill();
                graph.lineStyle(0, 0);
                graph.beginFill(0x2288AA, 0.5);
                graph.drawCircle(0, 0, tailleMobile);
                graph.endFill();
                if (MSG.lBool()) {
                    var projectionEnCours = MSG.lBool();
                    var angle = MSG.lFloat();
                    graph.beginFill(projectionEnCours ? 0xFF0000 : 0x00FFFF);
                    graph.moveTo(Math.cos(angle + Math.PI / 40) * tailleMobile, Math.sin(angle + Math.PI / 40) * tailleMobile);
                    graph.lineTo(Math.cos(angle) * (tailleMobile + porteeAttaque), Math.sin(angle) * (tailleMobile + porteeAttaque));
                    graph.lineTo(Math.cos(angle - Math.PI / 40) * tailleMobile, Math.sin(angle - Math.PI / 40) * tailleMobile);
                    graph.endFill();
                }
                var clip = new PIXI.projection.Sprite3d(graph.generateCanvasTexture());
                clip.blendMode = PIXI.BLEND_MODES.ADD;
                clip.anchor.set(0.5, 0.5);
                clip.position3d.x = posX;
                clip.position3d.z = posY;
                clip.euler.x = Math.PI / 2;
                this.camera3D.addChild(clip);
                this.listeClipDebugPosition.push(clip);
            }
        };
        MondeADV.prototype.decalageCamera = function (X, Y, VITESSE) {
            if (VITESSE === void 0) { VITESSE = 0.2; }
            this.infoCamera.effetDecalageX = X;
            this.infoCamera.effetDecalageY = Y;
            this.infoCamera.vitesseDecalage = VITESSE;
        };
        MondeADV.prototype.tremblement = function (PUISSANCE, DUREE, DISTANCE, DIRECTION, ORIGINE) {
            if (DIRECTION === void 0) { DIRECTION = 0; }
            var temps = Date.now();
            if (temps < this.finTremblement && PUISSANCE < this.puissanceTremblement) {
                return;
            }
            this.puissanceTremblement = PUISSANCE;
            this.debutTremblement = temps;
            this.finTremblement = temps + DUREE;
            this.tremblementEnCours = true;
            if (DISTANCE) {
                this.tremblementDirectionnel = true;
                this.distanceTremblement = DISTANCE;
                this.angleTremblement = DIRECTION;
                this.mouvementTremblement = AnimMath_1.Mouvement.easeOutExpo;
            }
            else {
                this.tremblementDirectionnel = false;
            }
        };
        MondeADV.prototype.defCollisionCercleTemporaire = function (X, Y, RAYON) {
            var _this = this;
            if (RAYON) {
                this.collisionRencontre = {
                    centreX: X,
                    centreY: Y,
                    rayon: RAYON
                };
                this.coucheOmbre.addChild(this.clipCollisionRencontre);
                this.clipCollisionRencontre.alpha = 0;
                this.clipCollisionRencontre.position3d.x = X;
                this.clipCollisionRencontre.position3d.z = Y;
                var echelleBase = (RAYON / 200);
                this.clipCollisionRencontre.scale3d.y = this.clipCollisionRencontre.scale3d.x = echelleBase;
                this.ajouterBoucle("boucleCollisionRencontre", function (TEMPS) {
                    var distance = Mathematiques_1.default.distance2Points(X, Y, MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.x, MobileADV_1.MobileADV.joueurPrincipal.positionVirtuelle.y);
                    distance = RAYON - distance;
                    var alphaClip = 1 - (distance / 300);
                    _this.clipCollisionRencontre.visible = alphaClip > 0;
                    _this.clipCollisionRencontre.alpha = alphaClip;
                    _this.clipCollisionRencontre.scale3d.y = _this.clipCollisionRencontre.scale3d.x = (RAYON + 40 - Math.abs(Mathematiques_1.default.sinRapide(TEMPS / 200) * 10)) / 200;
                });
            }
            else {
                this.collisionRencontre = null;
                this.supprimerBoucle("boucleCollisionRencontre");
                if (this.clipCollisionRencontre.parent) {
                    this.clipCollisionRencontre.parent.removeChild(this.clipCollisionRencontre);
                }
            }
        };
        MondeADV.ANGLE_CAMERA = Math.PI - (Math.PI / 4);
        MondeADV.FOCUS_CAMERA = 1600;
        MondeADV.COS_ANGLE_CAMERA = Math.cos(MondeADV.ANGLE_CAMERA);
        MondeADV.SIN_ANGLE_CAMERA = Math.sin(MondeADV.ANGLE_CAMERA);
        MondeADV.COTAN_ANGLE_CAMERA = 1 / Math.tan(MondeADV.ANGLE_CAMERA);
        MondeADV.PROFONDEUR_MIN = 10;
        MondeADV.PROFONDEUR_MAX = 10000;
        MondeADV.ACTIVER_LUMIERE = true;
        MondeADV.SIN_TEMPS = 0;
        MondeADV.COS_TEMPS = 0;
        MondeADV.couleurCanopee = 0x4B3D0A;
        return MondeADV;
    }(PIXI.Container));
    exports.MondeADV = MondeADV;
    var CameraADV = (function () {
        function CameraADV() {
            this.posX = 0;
            this.posY = 0;
            this.effetDecalageX = 0;
            this.effetDecalageY = 0;
            this.vitesseDecalage = 0;
            this.enPauseJusqua = 0;
        }
        CameraADV.prototype.defCible = function (CIBLE) {
            this.cible = CIBLE;
            this.posX = CIBLE.positionServeur.x;
            this.posY = CIBLE.positionServeur.y - 100;
        };
        CameraADV.prototype.pausePendant = function (DUREE) {
            this.enPauseJusqua = Date.now() + DUREE;
        };
        return CameraADV;
    }());
    var ClipChiffre = (function (_super) {
        __extends(ClipChiffre, _super);
        function ClipChiffre(MONDE, TEXTE, TYPE, POX, POY, DROITE) {
            var _this = _super.call(this) || this;
            _this.monde = MONDE;
            _this.type = TYPE;
            _this.posX = POX + (DROITE ? 30 : -30);
            _this.posY = POY;
            var puissance = 30 + Math.random() * 50;
            _this.decalageX = DROITE ? puissance : -puissance;
            _this.decalageY = -(50 + Math.random() * 60);
            _this.alpha = 0;
            var style = ClipChiffre.cacheStyle[TYPE];
            if (!style) {
                style = ClipChiffre.styleBase.clone();
                ClipChiffre.cacheStyle[TYPE] = style;
                if (TYPE == -1) {
                    style.fill = "#FF2E00";
                }
                else if (TYPE == 0) {
                    style.fill = "#33d071";
                }
                else if (TYPE == 1) {
                    style.fill = "#FFC400";
                }
                else if (TYPE == 2) {
                    style.fill = "#FF7400";
                }
                else if (TYPE == 3) {
                    style.fill = "#8CF8FF";
                }
                else if (TYPE == 4) {
                    style.fill = "#A05CD8";
                }
                else if (TYPE == 5) {
                    style.fill = "#4556FF";
                }
            }
            var texte = new PIXI.Text(TEXTE, style);
            texte.x = -texte.width / 2;
            texte.y = -texte.height / 2;
            _this.addChild(texte);
            var anim = AnimMath_1.default.animBoucle(1500, function (PROGRESSION) {
                _this.majPos(_this.posX, _this.posY);
                _this.alpha = PROGRESSION;
                _this.y += _this.decalageY * PROGRESSION;
                _this.x += _this.decalageX * PROGRESSION;
                _this.scale.set(PROGRESSION);
            });
            anim.defMouvement(AnimMath_1.Mouvement.easeOutExpo);
            anim.boucleAuto();
            anim.defFonctionFin(function () {
                AnimMath_1.default.animBoucle(300, function (PROGRESSION) {
                    _this.majPos(_this.posX, _this.posY);
                    _this.y += _this.decalageY;
                    _this.x += _this.decalageX;
                    _this.scale.set(1 - PROGRESSION);
                    _this.alpha = 1 - PROGRESSION;
                }).boucleAuto().defMouvement(AnimMath_1.Mouvement.easeInExpo).defFonctionFin(function () {
                    if (_this.parent) {
                        _this.parent.removeChild(_this);
                    }
                    texte.destroy();
                });
            });
            return _this;
        }
        ClipChiffre.prototype.majPos = function (POX, POY) {
            var pos = new PIXI.Point();
            pos.x = this.posX;
            pos.z = this.posY;
            this.monde.camera3D.proj.local.apply(pos, pos);
            this.x = pos.x;
            this.y = pos.y;
        };
        ClipChiffre.styleBase = new PIXI.TextStyle({
            fontFamily: "police-nom,Verdana",
            align: "center",
            fill: "#FF9000",
            fontSize: 20,
            stroke: '#000000',
            strokeThickness: 5
        });
        ClipChiffre.cacheStyle = {};
        return ClipChiffre;
    }(Container));
    var ClipZoneApercu = (function (_super) {
        __extends(ClipZoneApercu, _super);
        function ClipZoneApercu(ID, TYPE, RAYON, DUREE) {
            var _this = _super.call(this) || this;
            _this.echelle = RAYON / 194;
            _this.identifiant = ID;
            _this.dateDepart = Date.now();
            _this.dateMortAuto = _this.dateDepart + (DUREE ? DUREE : 10000);
            _this.euler.x = Math.PI / 2;
            _this.clipZone = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("interface/zone/z" + TYPE + ".png"));
            _this.clipZone.alpha = 0;
            _this.clipZone.blendMode = PIXI.BLEND_MODES.ADD;
            _this.clipZone.anchor.set(0.5, 0.5);
            _this.clipZone.euler.z = -Math.PI / 8;
            if (TYPE == 2) {
                _this.clipZone.euler.z *= -1;
            }
            _this.clipZone.scale3d.y = _this.clipZone.scale3d.x = (RAYON / 194) * 0.8;
            _this.addChild(_this.clipZone);
            if (DUREE) {
                _this.clipDuree = new PIXI.projection.Sprite3d(TFMAdventure_1.default.recupTextureDistante("interface/zone/zi.png"));
                _this.clipDuree.blendMode = PIXI.BLEND_MODES.ADD;
                if (TYPE == 1) {
                    _this.clipDuree.tint = 0x00FFFF;
                }
                else if (TYPE == 2) {
                    _this.clipDuree.tint = 0xFF0000;
                }
                _this.clipDuree.anchor.set(0.5, 0.5);
                _this.clipDuree.scale3d.y = _this.clipDuree.scale3d.x = 0;
                _this.addChildAt(_this.clipDuree, 0);
            }
            return _this;
        }
        return ClipZoneApercu;
    }(PIXI.projection.Container3d));
    var SecteurMonde = (function () {
        function SecteurMonde(X, Y, CODE) {
            this.listeMobile = [];
            this.listeAplat = [];
            this.estVisible = false;
            this.codeMaj = 0;
            this.x = X;
            this.y = Y;
            this.code = CODE;
        }
        SecteurMonde.prototype.ajouterMobile = function (MOBILE) {
            this.listeMobile.push(MOBILE);
        };
        SecteurMonde.prototype.ajouterAplat = function (APLAT) {
            this.listeAplat.push(APLAT);
        };
        SecteurMonde.prototype.supprimerMobile = function (MOBILE) {
            var index = this.listeMobile.indexOf(MOBILE);
            if (index != -1) {
                this.listeMobile.splice(index, 1);
            }
        };
        SecteurMonde.prototype.supprimerAplat = function (APLAT) {
            var index = this.listeAplat.indexOf(APLAT);
            if (index != -1) {
                this.listeAplat.splice(index, 1);
            }
        };
        SecteurMonde.prototype.rendreVisible = function (MONDE, OUI) {
            if (OUI != this.estVisible) {
                this.estVisible = OUI;
                var i = -1;
                var nb = this.listeMobile.length;
                while (++i < nb) {
                    var mobile = this.listeMobile[i];
                    if (OUI) {
                        if (!mobile.aAfficher) {
                            mobile.aAfficher = true;
                            MONDE.listeElementAAfficher.push(mobile);
                        }
                    }
                    else {
                        mobile.aAfficher = false;
                        MONDE.afficherMobile(mobile, false);
                    }
                }
                i = -1;
                nb = this.listeAplat.length;
                while (++i < nb) {
                    var aplat = this.listeAplat[i];
                    if (OUI) {
                        if (!aplat.aAfficher) {
                            aplat.aAfficher = true;
                            MONDE.listeElementAAfficher.push(aplat);
                        }
                    }
                    else {
                        aplat.aAfficher = false;
                        MONDE.afficherAplat(aplat, false);
                    }
                }
            }
        };
        SecteurMonde.prototype.destruction = function () {
            this.listeMobile = null;
            this.listeAplat = null;
        };
        SecteurMonde.prototype.calculerTailleSecteur = function () {
        };
        return SecteurMonde;
    }());
    exports.SecteurMonde = SecteurMonde;
    var InfoSouffle = (function () {
        function InfoSouffle(POX, POY, RAYON, PUISSANCE) {
            if (RAYON === void 0) { RAYON = 100; }
            if (PUISSANCE === void 0) { PUISSANCE = 1; }
            this.posX = POX;
            this.posY = POY;
            this.rayon = RAYON;
            this.puissance = PUISSANCE;
            this.rayonCarre = RAYON * RAYON;
        }
        return InfoSouffle;
    }());
    exports.InfoSouffle = InfoSouffle;
});
//# sourceMappingURL=MondeADV.js.map