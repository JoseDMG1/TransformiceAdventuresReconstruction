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
define(["require", "exports", "./ProtoADV", "../_monde/MondeADV", "./ClavierADV", "../_monde/_mobile/MobileADV", "../../../Souritheque-client/src/outils/affichage/MoteurShader", "../../../Souritheque-client/src/outils/Module801", "../../../Souritheque-client/src/outils/reseau/ProtoM801", "../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "../../../Souritheque-client/src/outils/controles/Manette", "../../../Souritheque-client/src/outils/Mathematiques", "../../../Souritheque-client/src/interface/tribulle/Chat801", "../../../Souritheque-client/src/enums/Communaute", "../../../Souritheque-client/src/outils/divers/Chips", "../../../Souritheque-client/src/outils/son/MoteurSon", "../gameplay/InterfaceCompetenceADV", "../../../Souritheque-client/src/outils/Trad801", "../interfaces/InterfaceLoginADV", "./ConfigADV", "../interfaces/IntroADV", "../interfaces/InterfaceChargementADV", "../interfaces/InterfaceOptionDebug", "../../../Souritheque-client/src/interface/souruis/elements/I_Element", "../_monde/_mobile/types/MobileTemoignageADV", "../_monde/BulleChatADV", "../_monde/_mobile/types/MobileMarmiteADV", "./MoteurPerformance", "../../../Souritheque-client/src/interface/AnimLogoAtelier801", "../../../Souritheque-client/src/outils/Steamice", "../interfaces/InterfaceQueteADV", "../_monde/_mobile/types/MobileInterviewADV", "../interfaces/InterfaceLiensExternesADV", "./OptionsADV", "../interfaces/InterfaceDecoADV"], function (require, exports, ProtoADV_1, MondeADV_1, ClavierADV_1, MobileADV_1, MoteurShader_1, Module801_1, ProtoM801_1, ClipAnim_1, Manette_1, Mathematiques_1, Chat801_1, Communaute_1, Chips_1, MoteurSon_1, InterfaceCompetenceADV_1, Trad801_1, InterfaceLoginADV_1, ConfigADV_1, IntroADV_1, InterfaceChargementADV_1, InterfaceOptionDebug_1, I_Element_1, MobileTemoignageADV_1, BulleChatADV_1, MobileMarmiteADV_1, MoteurPerformance_1, AnimLogoAtelier801_1, Steamice_1, InterfaceQueteADV_1, MobileInterviewADV_1, InterfaceLiensExternesADV_1, OptionsADV_1, InterfaceDecoADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NOM_JEU = "Transformice Adventure";
    var ADRESSE_DEBUG = "5.196.91.193:4001";
    var ADRESSE_PROD = "188.165.225.27:16801";
    var TFMAdventure = (function (_super) {
        __extends(TFMAdventure, _super);
        function TFMAdventure(CONFIG) {
            var _this = _super.call(this, "tfm-adventure", CONFIG["version"], ADRESSE_PROD) || this;
            _this.communaute = Communaute_1.default.ANGLAIS_INT;
            _this.nbJoueur = 0;
            _this.prochainTestRedimensionnement = 0;
            _this.listeLigneChat = [];
            TFMAdventure.instance = _this;
            ConfigADV_1.default.VERSION = CONFIG["version"];
            ConfigADV_1.default.CLE_BETA_REQUISE = CONFIG["modeBeta"];
            TFMAdventure.JEU_LANCE = true;
            ClipAnim_1.ClipAnim.BIBLIOTHEQUE = ConfigADV_1.default.DATA_TFMADV;
            ClipAnim_1.ClipAnim.BIBLIOTHEQUE_MORCEAUX = ClipAnim_1.ClipAnim.BIBLIOTHEQUE + "equipement/";
            ClipAnim_1.ClipAnim.BIBLIOTHEQUE_DIVERS = ClipAnim_1.ClipAnim.BIBLIOTHEQUE + "anim/";
            ClipAnim_1.ClipAnim.VERSION_IMAGE = "?v=" + ConfigADV_1.default.VERSION;
            MoteurSon_1.default.DOSSIER_MUSIQUE = ConfigADV_1.default.DATA_TFMADV + "sons/";
            var infoUrl = new URL(window.location.href);
            if (infoUrl) {
                if (infoUrl.searchParams.get("login") == "0") {
                    ConfigADV_1.default.AFFICHER_CHAMP_LOGIN = false;
                }
                if (infoUrl.searchParams.get("debug")) {
                    TFMAdventure.DEBUG = true;
                }
                if (infoUrl.searchParams.get("vol")) {
                    MoteurSon_1.default.defVolumeGlobal(parseFloat(infoUrl.searchParams.get("vol")));
                }
            }
            Steamice_1.default.initialisation();
            document.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
            window.addEventListener("resize", TFMAdventure.redimensionnageFenetre);
            window.addEventListener("mouseup", function (EVENT) {
                if (MobileADV_1.MobileADV.joueurPrincipal) {
                    if (EVENT.button == 0) {
                        ClavierADV_1.default.instance.cliqueMonde(true, false);
                    }
                    else if (EVENT.button == 2) {
                        ClavierADV_1.default.instance.cliqueMonde(false, false);
                    }
                }
            });
            _this.performance = new MoteurPerformance_1.MoteurPerformance();
            _this.coucheInterface = document.createElement("div");
            _this.coucheInterface.style.position = "absolute";
            _this.coucheInterface.style.top = "0px";
            _this.coucheInterface.style.width = "100%";
            _this.coucheInterface.style.height = "100%";
            _this.coucheInterface.style.userSelect = "none";
            _this.coucheInterface.style.pointerEvents = "none";
            InterfaceChargementADV_1.InterfaceChargementADV.afficher();
            _this.clavier = new ClavierADV_1.default();
            InterfaceChargementADV_1.InterfaceChargementADV.defTexte("Initilisation des shaders");
            Mathematiques_1.default.initialisationTableCosSin();
            InterfaceChargementADV_1.InterfaceChargementADV.defTexte("Initilisation de PIXI");
            PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
            _this.app = new PIXI.Application(640, 480, {
                backgroundColor: 0x222222,
                antialias: true,
                roundPixels: false,
            });
            _this.scene = _this.app.stage;
            _this.canvas = _this.app.view;
            TFMAdventure.redimensionnageFenetre();
            document.body.appendChild(_this.app.view);
            document.body.appendChild(_this.coucheInterface);
            _this.champLog = new PIXI.Text("", {
                fontSize: 12,
                fontFamily: 'Lucida Console',
                fill: '#00FFFF',
                stroke: '#000000',
                strokeThickness: 4
            });
            InterfaceChargementADV_1.InterfaceChargementADV.defTexte("Chargement des ressources");
            _this.chargeur = new PIXI.loaders.Loader();
            _this.chargeur
                .add('lumiere.frag', 'ressources/shaders/lumiere.frag')
                .add('test.frag', 'ressources/shaders/test.frag')
                .add('eau.frag', 'ressources/shaders/eau.frag')
                .add('camouflage.frag', 'ressources/shaders/camouflage.frag')
                .add('transparence.frag', 'ressources/shaders/transparence.frag')
                .add('flammes.frag', 'ressources/shaders/flammes.frag')
                .add('ecume', 'ressources/effets/ecume.png')
                .add('distorsion', 'ressources/effets/distorsion.png')
                .add('distorsion2', 'ressources/effets/distorsion2.png')
                .add('masque-camouflage', 'ressources/effets/masque-camouflage.png')
                .add('particule-camouflage', 'ressources/effets/particule-camouflage.png')
                .add("trainee_ligne", "ressources/effets/trainee_ligne.png")
                .add("trainee_bout", "ressources/effets/trainee_bout.png")
                .add("ombre", "ressources/ombre.png");
            _this.chargeur.load(function (CHARGEUR, RESSOURCE) {
                TFMAdventure.bibliotheque = RESSOURCE;
                InterfaceChargementADV_1.InterfaceChargementADV.defTexte("Initialisation données binaires");
                InterfaceChargementADV_1.InterfaceChargementADV.defTexte("Connexion au serveur");
                ProtoADV_1.default.initialisation();
                _this.connexion();
            });
            OptionsADV_1.default.initialiser();
            return _this;
        }
        TFMAdventure.recupFX = function (CODE) {
            var info = TFMAdventure.indexFX[CODE];
            if (!info) {
                console.error("FX inconnu : " + CODE);
                return new ClipAnim_1.ClipAnim();
            }
            var clip = info.clip;
            if (!clip.rasterisationActive && !clip.rasterisationAsyncEnCours) {
                clip.rasterisation(TFMAdventure.instance.app, true);
            }
            return clip.cloner();
        };
        TFMAdventure.prototype.connexionServeur = function (LANGUE, DRAPEAU, PAYS, NB_JOUEUR) {
            this.nbJoueur = NB_JOUEUR;
            InterfaceLoginADV_1.default.majNbJoueur(NB_JOUEUR);
        };
        TFMAdventure.prototype.selectionLangue = function (LANGUE, DRAPEAU, RETOUR) {
            var _this = this;
            Trad801_1.default.chargerFichierLangue(LANGUE, "tfmadv", function () {
                if (RETOUR) {
                    RETOUR();
                }
                InterfaceChargementADV_1.InterfaceChargementADV.ajouterModule(new InterfaceChargementADV_1.ModuleChargementDonneBinaire());
                InterfaceChargementADV_1.InterfaceChargementADV.finChargement(function () {
                    _this.lancement();
                });
                if (Steamice_1.default.steamActif) {
                    Steamice_1.default.initialisationReseau();
                }
            });
        };
        TFMAdventure.prototype.deconnexionSocket = function (PAS_DE_CONNEXION) {
            MoteurSon_1.default.sourdine();
            this.app.destroy(true);
            document.body.innerHTML = "";
            InterfaceDecoADV_1.InterfaceDecoADV.afficher(PAS_DE_CONNEXION);
        };
        TFMAdventure.prototype.lancement = function () {
            var _this = this;
            this.coucheMonde = new PIXI.Container();
            this.scene.addChild(this.coucheMonde);
            this.coucheInterfacePixi = new PIXI.Container();
            this.scene.addChild(this.coucheInterfacePixi);
            this.initialisationMonde();
            this.derniereBoucle = Date.now();
            this.app.ticker.add(this.bouclePrincipale, this, PIXI.UPDATE_PRIORITY.HIGH);
            TFMAdventure.FILTRE_TOUCHE = new PIXI.filters.ColorMatrixFilter();
            TFMAdventure.FILTRE_TOUCHE.brightness(100, true);
            TFMAdventure.FILTRE_GEL = new PIXI.filters.ColorMatrixFilter();
            TFMAdventure.FILTRE_GEL.matrix[0] = 0.3;
            TFMAdventure.FILTRE_GEL.matrix[6] = 0.8;
            TFMAdventure.FILTRE_GEL.matrix[12] = 1.1;
            if (TFMAdventure.VERSION_MOBILE) {
                this.ajouterManetteVirtuelle();
            }
            document.onmousemove = function (EVT) {
                TFMAdventure.SOURIS_X = (EVT.clientX / TFMAdventure.RATIO_LARGEUR) + document.body.scrollLeft;
                TFMAdventure.SOURIS_Y = (EVT.clientY / TFMAdventure.RATIO_HAUTEUR) + document.body.scrollTop;
            };
            if (ConfigADV_1.default.AFFICHER_CHAMP_LOGIN) {
                TFMAdventure.instance.scene.addChild(new AnimLogoAtelier801_1.AnimLogoAtelier801(ConfigADV_1.default.DATA_TFMADV + "interface/logo/", TFMAdventure.LARGEUR, TFMAdventure.HAUTEUR, function () {
                    _this.musiqueIntro = MoteurSon_1.default.jouerMusique("musique/tfmadv_intro", 0.7, false).jouerEnBoucle();
                    TFMAdventure.instance.scene.addChild(new IntroADV_1.IntroADV(function () {
                        InterfaceLoginADV_1.default.afficher(true);
                    }));
                }));
            }
            else {
                Module801_1.default.instance.envoyer(ProtoM801_1.default.connexionJoueur("Souris", null));
            }
        };
        TFMAdventure.prototype.authentification = function (ID_JOUEUR, NOM_JOUEUR, TEMPS_JEU, COMMUNAUTE, CODE_JOUEUR_PARTIE, EST_INVITE, DROITS, A_UN_DROIT_PUBLIQUE, TAILLE_MESSAGE) {
            var _this = this;
            if (this.musiqueIntro) {
                this.musiqueIntro.stop(1000);
            }
            InterfaceChargementADV_1.InterfaceChargementADV.afficher();
            this.chat = new Chat801_1.Chat801(this, "400px", "300px", COMMUNAUTE.directionLangue);
            this.chat.activerSelectionTexte(false);
            this.chat.defTailleMessageMax(TAILLE_MESSAGE);
            this.chat.defCliqueNom(function (NOM) {
                _this.envoyer(ProtoM801_1.default.commande("profil " + NOM));
            });
            this.chat.ajouterCommande("mss", function (RESTE) {
                _this.envoyer(ProtoM801_1.default.messageChatStaff(1, RESTE.join(" ")));
            });
            this.chat.ajouterCommande("son", function () {
                MoteurSon_1.default.sourdine(!MoteurSon_1.default.estEnSourdine());
            });
            this.chat.ajouterCommande("a", function () {
            });
            this.chat.ajouterCommande("p", function () {
                _this.chat.ajouterMessage("Position : " + (MobileADV_1.MobileADV.joueurPrincipal.positionServeur.x | 0) + ", " + (MobileADV_1.MobileADV.joueurPrincipal.positionServeur.y | 0), "-");
            });
            this.coucheInterface.appendChild(this.chat.elementHTML);
            window.cmd = this.chat.commande;
            this.clipDeck = new InterfaceCompetenceADV_1.InterfaceCompetenceADV();
            this.clipDeck.majPosition();
            this.coucheInterfacePixi.addChild(this.clipDeck);
            if (this.autorisationJoueur.estAdmin || TFMAdventure.DEBUG) {
                Chips_1.Chips.afficher();
            }
            InterfaceLoginADV_1.default.enregistrerLoginUtilise();
            InterfaceLoginADV_1.default.afficher(false);
            InterfaceLiensExternesADV_1.default.afficher();
            if (TFMAdventure.DEBUG) {
                InterfaceOptionDebug_1.InterfaceOptionDebug.afficher();
            }
            ClavierADV_1.default.instance.ajouterContexteJeu();
        };
        TFMAdventure.ajouterInterface = function (INTERFACE, COUCHE) {
            if (COUCHE === void 0) { COUCHE = 0; }
            var coucheInterface = TFMAdventure.instance.coucheInterface;
            if (INTERFACE instanceof I_Element_1.I_Element) {
                INTERFACE.style.zIndex = String(COUCHE);
                coucheInterface.appendChild(INTERFACE.elementHTML);
            }
            else {
                INTERFACE.style.zIndex = String(COUCHE);
                coucheInterface.appendChild(INTERFACE);
            }
        };
        TFMAdventure.prototype.afficherInterfaceCreationCompte = function (CAPTCHA) {
            InterfaceLoginADV_1.default.afficherConteneurCreationCompte(CAPTCHA);
        };
        TFMAdventure.prototype.echecAuthentification = function (ERREUR, SUGGESTION_PSEUDO, COOKIE_2FA) {
            InterfaceLoginADV_1.default.echecAuthentification(ERREUR, SUGGESTION_PSEUDO, COOKIE_2FA);
        };
        TFMAdventure.prototype.messageChat = function (MESSAGE, AUTEUR, COMMUNAUTE, CANAL) {
            if (CANAL === void 0) { CANAL = -1; }
            var texte = this.chat.ajouterMessage(MESSAGE, AUTEUR, COMMUNAUTE);
            if (CANAL == -1) {
                texte.style.color = "#606060";
            }
            else if (CANAL == 1) {
                texte.style.color = "#ED67EA";
            }
            var mobileJoueurCible = MondeADV_1.MondeADV.instance.recupJoueur(AUTEUR);
            if (mobileJoueurCible) {
                BulleChatADV_1.default.afficher(mobileJoueurCible, MESSAGE);
            }
        };
        TFMAdventure.prototype.initialisationMonde = function () {
            if (this.mondeEnCours && this.mondeEnCours.parent) {
                this.mondeEnCours.parent.removeChild(this.mondeEnCours);
            }
            this.mondeEnCours = new MondeADV_1.MondeADV(TFMAdventure.LARGEUR, TFMAdventure.HAUTEUR);
            this.coucheMonde.addChild(this.mondeEnCours);
        };
        TFMAdventure.prototype.ajouterManetteVirtuelle = function () {
            var clip1 = PIXI.Sprite.from("./ressources/manette/fond-pad.png");
            clip1.anchor.set(0.5, 0.5);
            var clip2 = PIXI.Sprite.from("./ressources/manette/pad.png");
            clip2.anchor.set(0.5, 0.5);
            this.manetteVirtuelle = new Manette_1.ManetteVirtuelle(100, clip1, clip2, function (ANGLE, FORCE) {
                if (FORCE) {
                    FORCE = Math.round(FORCE * 10) / 10;
                }
                ClavierADV_1.default.instance.compilationDeplacementManette(ANGLE, FORCE);
            });
            this.scene.addChild(this.manetteVirtuelle);
        };
        TFMAdventure.recupImageDistance = function (LIEN) {
            return ConfigADV_1.default.DATA_TFMADV + LIEN + "?v=" + ConfigADV_1.default.VERSION;
        };
        TFMAdventure.recupTextureDistante = function (LIEN) {
            return PIXI.Texture.fromImage(ConfigADV_1.default.DATA_TFMADV + LIEN + "?v=" + ConfigADV_1.default.VERSION);
        };
        TFMAdventure.recupRessource = function (NOM) {
            var ressource = TFMAdventure.bibliotheque[NOM];
            return ressource.data;
        };
        TFMAdventure.prototype.bouclePrincipale = function (POURCENT_DELTA) {
            var temps = Date.now();
            var tempsEcoule = temps - this.derniereBoucle;
            var dureeImage = Math.min(tempsEcoule / 16.66666, 5);
            this.derniereBoucle = temps;
            this.performance.boucle(temps);
            if (this.champLog) {
                this.app.stage.addChild(this.champLog);
            }
            if (this.mondeEnCours) {
                this.mondeEnCours.boucleMonde(temps, tempsEcoule, dureeImage);
                if (this.clipDeck) {
                    this.clipDeck.boucle(temps, tempsEcoule);
                }
            }
            if (InterfaceQueteADV_1.default.instance) {
                InterfaceQueteADV_1.default.instance.boucle(temps, dureeImage);
            }
            if (MoteurShader_1.MoteurShader.instance.boucleRequise) {
                MoteurShader_1.MoteurShader.instance.boucleShader(temps);
            }
        };
        TFMAdventure.prototype.deplacementClavier = function (DIRECTION) {
            if (MobileADV_1.MobileADV.joueurPrincipal) {
                MobileADV_1.MobileADV.joueurPrincipal.deplacementVers(DIRECTION);
            }
        };
        TFMAdventure.envoyer = function (MSG) {
            TFMAdventure.instance.envoyer(MSG);
        };
        TFMAdventure.prototype.changerTailleFenetre = function (LARGEUR, HAUTEUR) {
            var tailleMax = 1920;
            var tailleMin = 1280;
            var ratioLargeur = 1;
            var ratioHauteur = 1;
            var largeur = LARGEUR;
            var hauteur = HAUTEUR;
            if (LARGEUR > tailleMax || HAUTEUR > tailleMax) {
                if (LARGEUR > HAUTEUR) {
                    ratioLargeur = LARGEUR / tailleMax;
                    largeur = tailleMax;
                    hauteur = Math.ceil(HAUTEUR / ratioLargeur);
                    ratioHauteur = HAUTEUR / hauteur;
                    this.canvas.style.height = "100%";
                }
                else {
                    ratioHauteur = HAUTEUR / tailleMax;
                    hauteur = tailleMax;
                    largeur = Math.ceil(LARGEUR / ratioHauteur);
                    ratioLargeur = LARGEUR / largeur;
                    this.canvas.style.height = "100%";
                }
            }
            else if (LARGEUR < tailleMin && HAUTEUR < tailleMin) {
                if (LARGEUR > HAUTEUR) {
                    ratioLargeur = LARGEUR / tailleMin;
                    largeur = tailleMin;
                    hauteur = Math.floor(HAUTEUR / ratioLargeur);
                    ratioHauteur = HAUTEUR / hauteur;
                    this.canvas.style.height = "100%";
                }
                else {
                    ratioHauteur = HAUTEUR / tailleMin;
                    hauteur = tailleMin;
                    largeur = Math.floor(LARGEUR / ratioHauteur);
                    ratioLargeur = LARGEUR / largeur;
                    this.canvas.style.height = "100%";
                }
            }
            else {
                this.canvas.style.height = "";
            }
            TFMAdventure.LARGEUR = largeur;
            TFMAdventure.HAUTEUR = hauteur;
            TFMAdventure.DEMI_LARGEUR = largeur / 2;
            TFMAdventure.DEMI_HAUTEUR = hauteur / 2;
            TFMAdventure.RATIO_LARGEUR = ratioLargeur;
            TFMAdventure.RATIO_HAUTEUR = ratioHauteur;
            if (this.app && this.app.renderer) {
                this.app.renderer.resize(TFMAdventure.LARGEUR, TFMAdventure.HAUTEUR);
                if (MondeADV_1.MondeADV.instance) {
                    MondeADV_1.MondeADV.instance.redimentionnement(TFMAdventure.LARGEUR, TFMAdventure.HAUTEUR);
                }
                if (IntroADV_1.IntroADV.instance && IntroADV_1.IntroADV.instance.parent) {
                    IntroADV_1.IntroADV.instance.changerTaille(largeur, hauteur);
                }
                if (AnimLogoAtelier801_1.AnimLogoAtelier801.instance && AnimLogoAtelier801_1.AnimLogoAtelier801.instance.parent) {
                    AnimLogoAtelier801_1.AnimLogoAtelier801.instance.changerTaille(largeur, hauteur);
                }
                if (this.clipDeck) {
                    this.clipDeck.majPosition();
                }
            }
            if (this.manetteVirtuelle) {
                this.manetteVirtuelle.position.set(this.manetteVirtuelle.rayon + 40, hauteur - (this.manetteVirtuelle.rayon + 40));
            }
        };
        TFMAdventure.prototype.webGLDisponible = function () {
            var canvas = document.createElement("canvas");
            var webgl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            if (webgl && webgl instanceof WebGLRenderingContext) {
                return true;
            }
            console.error("WEBGL NOT AVAILABLE");
            return false;
        };
        TFMAdventure.redimensionnageFenetre = function () {
            var taille = tailleFenetre();
            if (taille.largeur !== TFMAdventure.LARGEUR || taille.hauteur !== TFMAdventure.HAUTEUR) {
                TFMAdventure.instance.changerTailleFenetre(taille.largeur, taille.hauteur);
            }
        };
        TFMAdventure.log = function (MSG) {
            var message = "" + MSG;
            TFMAdventure.instance.listeLigneChat.unshift(message);
            TFMAdventure.instance.champLog.text = TFMAdventure.instance.listeLigneChat.join("\n");
            if (TFMAdventure.instance.listeLigneChat.length > 10) {
                TFMAdventure.instance.listeLigneChat.pop();
            }
        };
        TFMAdventure.DEBUG = false;
        TFMAdventure.VERSION_MOBILE = false;
        TFMAdventure.CHARGEMENT_DONNEES = true;
        TFMAdventure.JEU_LANCE = false;
        TFMAdventure.LARGEUR = 640;
        TFMAdventure.HAUTEUR = 480;
        TFMAdventure.RATIO_LARGEUR = 1;
        TFMAdventure.RATIO_HAUTEUR = 1;
        TFMAdventure.DEMI_LARGEUR = TFMAdventure.LARGEUR / 2;
        TFMAdventure.DEMI_HAUTEUR = TFMAdventure.HAUTEUR / 2;
        TFMAdventure.SOURIS_X = 0;
        TFMAdventure.SOURIS_Y = 0;
        TFMAdventure.indexAnimation = {};
        TFMAdventure.indexFX = {};
        TFMAdventure.indexMonstre = {};
        TFMAdventure.indexSon = {};
        TFMAdventure.indexVetement = {};
        TFMAdventure.CLASSE_TYPE_MOBILE = {
            10: MobileTemoignageADV_1.MobileTemoignageADV,
            11: MobileMarmiteADV_1.MobileMarmiteADV,
            12: MobileInterviewADV_1.MobileInterviewADV
        };
        return TFMAdventure;
    }(Module801_1.default));
    exports.default = TFMAdventure;
    function tailleFenetre() {
        var taille = { largeur: 1600, hauteur: 900 };
        if (self.innerWidth) {
            taille = { largeur: self.innerWidth, hauteur: self.innerHeight };
        }
        else if (document.documentElement && document.documentElement.clientWidth) {
            taille = {
                largeur: document.documentElement.clientWidth,
                hauteur: document.documentElement.clientHeight
            };
        }
        else if (document.body) {
            taille = { largeur: document.body.clientWidth, hauteur: document.body.clientHeight };
        }
        return taille;
    }
    window.lancement = function (CONFIG) {
        if (!TFMAdventure.JEU_LANCE) {
            new TFMAdventure(CONFIG);
        }
    };
});
//# sourceMappingURL=TFMAdventure.js.map