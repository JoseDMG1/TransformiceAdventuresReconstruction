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
define(["require", "exports", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/outils/auth/OutilsAuthentification", "../../../Souritheque-client/src/outils/reseau/ProtoM801", "../../../Souritheque-client/src/outils/Module801", "../_tfmAdventure/ConfigADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_ChampTexte", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../../../Souritheque-client/src/outils/Steamice", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../_tfmAdventure/CacheLocalADV", "../../../Souritheque-client/src/outils/auth/EnumTypeAuthentification", "../../../Souritheque-client/src/outils/son/MoteurSon"], function (require, exports, Trad801_1, OutilsAuthentification_1, ProtoM801_1, Module801_1, ConfigADV_1, I_Conteneur_1, I_ChampTexte_1, I_Bouton_1, TFMAdventure_1, I_Image_1, AnimMath_1, Steamice_1, I_Texte_1, CacheLocalADV_1, EnumTypeAuthentification_1, MoteurSon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TypeAffichage;
    (function (TypeAffichage) {
        TypeAffichage[TypeAffichage["LOGIN"] = 0] = "LOGIN";
        TypeAffichage[TypeAffichage["CREATION_COMPTE"] = 1] = "CREATION_COMPTE";
        TypeAffichage[TypeAffichage["LOGIN_STEAM"] = 2] = "LOGIN_STEAM";
    })(TypeAffichage || (TypeAffichage = {}));
    var InterfaceLoginADV = (function (_super) {
        __extends(InterfaceLoginADV, _super);
        function InterfaceLoginADV() {
            var _this = _super.call(this, "colonne") || this;
            _this.affichageEnCours = TypeAffichage.LOGIN;
            _this.mettreFocusSurChampsTexte = false;
            _this.defLargeur("100%").defHauteur("100%");
            _this.alignementEnfants("center").justifierEnfants("center");
            _this.style.backgroundImage = "url(" + ConfigADV_1.default.DATA_TFMADV + "interface/intro/herbe.png), url(" + ConfigADV_1.default.DATA_TFMADV + "interface/intro/fond.jpg)";
            _this.style.backgroundRepeat = "no-repeat";
            _this.style.backgroundPosition = "center";
            var logo = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/intro/logo.png"));
            logo.style.position = "relative";
            logo.style.top = "-222px";
            logo.style.left = "-60px";
            _this.appendChild(logo);
            _this.conteneurLogin = new I_Conteneur_1.I_Conteneur("colonne").alignementEnfants("center");
            _this.conteneurLogin.modeFenetre("");
            Trad801_1.default.definirTraduction(_this.conteneurLogin.elementHTML.querySelector("span"), "$bouton.connexion");
            _this.conteneurLogin.style.position = "absolute";
            _this.conteneurLogin.style.top = "50%";
            _this.conteneurLogin.defLargeur(320);
            var conteneurChampEtSuggestionsLogin = new I_Conteneur_1.I_Conteneur().defLargeur("100%");
            var conteneurLogin2 = new I_Conteneur_1.I_Conteneur("ligne");
            _this.champLogin = new I_ChampTexte_1.I_ChampTexte().defLargeurMin("10em").defLargeur("100%").defCouleur("#B6F54C");
            _this.champLogin.champ.placeholder = Trad801_1.default.trad("$Pseudo");
            _this.champLogin.defActionEntree(_this.validationLogin.bind(_this));
            conteneurLogin2.ajouterElement(_this.champLogin);
            _this.conteneurListeSuggestionsPseudos = new I_Conteneur_1.I_Conteneur("colonne");
            conteneurChampEtSuggestionsLogin.ajouterElement(conteneurLogin2, _this.conteneurListeSuggestionsPseudos);
            conteneurLogin2.style.margin = "0px";
            _this.champLogin.style.margin = "";
            _this.conteneurListeSuggestionsPseudos.style.margin = "";
            _this.champMDP = new I_ChampTexte_1.I_ChampTexte().defModeMotDePasse(true).defLargeurMin("10em").defLargeur("100%").defCouleur("#F57900");
            Trad801_1.default.definirTraduction(_this.champMDP.champ, "$Mot_De_Passe", "placeholder");
            _this.champMDP.defActionEntree(_this.validationLogin.bind(_this));
            var boutonSubmitLogin = new I_Bouton_1.I_Bouton("", _this.validationLogin.bind(_this)).defLargeur("100%");
            Trad801_1.default.definirTraduction(boutonSubmitLogin.elementHTML, "$bouton.seConnecter");
            _this.boutonCreationCompte = new I_Bouton_1.I_Bouton("", _this.demandeAfficherConteneurCreationCompte.bind(_this)).defLargeur("100%");
            Trad801_1.default.definirTraduction(_this.boutonCreationCompte.elementHTML, "$Créer_Un_Compte");
            _this.conteneurErreurLogin = new I_Conteneur_1.I_Conteneur();
            _this.conteneurErreurLogin.style.textAlign = "center";
            _this.conteneurErreurLogin.style.color = "#F00";
            _this.conteneurErreurLogin.style.display = "none";
            _this.conteneurLogin.ajouterElement(conteneurChampEtSuggestionsLogin, _this.champMDP, boutonSubmitLogin, _this.boutonCreationCompte, _this.conteneurErreurLogin);
            _this.conteneurSteam = new I_Conteneur_1.I_Conteneur();
            _this.conteneurSteam.style.position = "absolute";
            _this.conteneurSteam.style.top = "44%";
            _this.conteneurSteam.rendreCliquable(function (EVT) {
                Module801_1.default.instance.envoyer(ProtoM801_1.default.connexionJoueur(Steamice_1.default.recupSteamId(), Steamice_1.default.recupTicketAuthentification(), EnumTypeAuthentification_1.EnumTypeAuthentification.STEAM));
            });
            var imageSteam = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "/interface/steam.png");
            imageSteam.defLargeur(463);
            imageSteam.defHauteur(164);
            var texteConnecteAvec = new I_Texte_1.I_Texte(Trad801_1.default.trad("$SeConnecterAvec"));
            texteConnecteAvec.style.display = "float";
            texteConnecteAvec.style.position = "relative";
            texteConnecteAvec.style.left = "100px";
            texteConnecteAvec.style.top = "-150px";
            texteConnecteAvec.style.width = "260px";
            texteConnecteAvec.style.textAlign = "center";
            texteConnecteAvec.style.fontSize = "1.2em";
            texteConnecteAvec.style.fontWeight = "bold";
            _this.conteneurErreurSteam = new I_Conteneur_1.I_Conteneur();
            _this.conteneurErreurSteam.style.textAlign = "center";
            _this.conteneurErreurSteam.style.color = "#F00";
            _this.conteneurErreurSteam.style.display = "none";
            _this.conteneurSteam.ajouterElement(imageSteam, texteConnecteAvec, _this.conteneurErreurSteam);
            _this.ajouterElement(_this.conteneurSteam);
            _this.conteneurCompteAtelier801 = new I_Conteneur_1.I_Conteneur();
            _this.conteneurCompteAtelier801.style.position = "absolute";
            _this.conteneurCompteAtelier801.style.left = "30%";
            _this.conteneurCompteAtelier801.style.top = "70%";
            _this.conteneurCompteAtelier801.rendreCliquable(function (EVT) {
                _this.changerAffichage(TypeAffichage.LOGIN);
            });
            var imageCompteAtelier801 = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/fond-compte-atelier801.png"));
            imageCompteAtelier801.defLargeur(128);
            imageCompteAtelier801.defHauteur(98);
            var texteConnecterAtelier801 = new I_Texte_1.I_Texte(Trad801_1.default.trad("$SeConnecterAvecTFM"));
            texteConnecterAtelier801.multiligne();
            texteConnecterAtelier801.defLargeur(112);
            texteConnecterAtelier801.style.display = "float";
            texteConnecterAtelier801.style.position = "relative";
            texteConnecterAtelier801.style.left = "10px";
            texteConnecterAtelier801.style.top = "-60px";
            texteConnecterAtelier801.style.textAlign = "center";
            texteConnecterAtelier801.style.fontSize = "0.6em";
            texteConnecterAtelier801.style.fontWeight = "bold";
            _this.conteneurCompteAtelier801.ajouterElement(imageCompteAtelier801, texteConnecterAtelier801);
            _this.ajouterElement(_this.conteneurCompteAtelier801);
            _this.conteneurCreationCompte = new I_Conteneur_1.I_Conteneur("colonne").alignementEnfants("center");
            _this.conteneurCreationCompte.style.position = "absolute";
            _this.conteneurCreationCompte.style.top = "50%";
            _this.conteneurCreationCompte.defLargeurMin("20em");
            _this.conteneurCreationCompte.modeFenetre(Trad801_1.default.trad("$Créer_Un_Compte"), function () {
                _this.changerAffichage(TypeAffichage.LOGIN);
            });
            _this.champPseudoCreation = new I_ChampTexte_1.I_ChampTexte().defLargeurMin("10em").defLargeur("100%").defMaxCaractere(12);
            Trad801_1.default.definirTraduction(_this.champPseudoCreation.champ, "$Pseudo", "placeholder");
            _this.champMDPCreation = new I_ChampTexte_1.I_ChampTexte().defModeMotDePasse(true).defLargeurMin("10em").defLargeur("100%");
            Trad801_1.default.definirTraduction(_this.champMDPCreation.champ, "$Mot_De_Passe", "placeholder");
            _this.champConfirmationMDP = new I_ChampTexte_1.I_ChampTexte().defModeMotDePasse(true).defLargeurMin("10em").defLargeur("100%");
            Trad801_1.default.definirTraduction(_this.champConfirmationMDP.champ, "$texte.confirmation", "placeholder");
            _this.champMail = new I_ChampTexte_1.I_ChampTexte().defLargeurMin("10em").defLargeur("100%");
            _this.champMail.champ.type = "email";
            Trad801_1.default.definirTraduction(_this.champMail.champ, "$AdresseEmail", "placeholder");
            var conteneurCaptchaEtChamp = new I_Conteneur_1.I_Conteneur("colonne").defLargeur("100%").alignementEnfants("center");
            conteneurCaptchaEtChamp.afficherFondUni("#00000050");
            _this.conteneurImageCaptcha = new I_Conteneur_1.I_Conteneur().defLargeur("25%");
            _this.conteneurImageCaptcha.style.display = "inline-block";
            _this.conteneurImageCaptcha.style.backgroundColor = "#CFE6E6";
            _this.conteneurImageCaptcha.style.textAlign = "center";
            _this.champCaptcha = new I_ChampTexte_1.I_ChampTexte().defLargeur("100%").defMaxCaractere(4);
            Trad801_1.default.definirTraduction(_this.champCaptcha.champ, "$CaptchaCopier", "placeholder");
            conteneurCaptchaEtChamp.ajouterElement(_this.conteneurImageCaptcha, _this.champCaptcha);
            var boutonSubmitCreationCompte = new I_Bouton_1.I_Bouton("", _this.validationCreationCompte.bind(_this)).defLargeur("100%");
            Trad801_1.default.definirTraduction(boutonSubmitCreationCompte.elementHTML, "$bouton.valider");
            var boutonAnnulerCreationCompte = new I_Bouton_1.I_Bouton("", function () {
                _this.changerAffichage(TypeAffichage.LOGIN);
            }).defLargeur("100%");
            Trad801_1.default.definirTraduction(boutonAnnulerCreationCompte.elementHTML, "$bouton.annuler");
            _this.conteneurErreurCreation = new I_Conteneur_1.I_Conteneur();
            _this.conteneurErreurCreation.style.textAlign = "center";
            _this.conteneurErreurCreation.style.color = "#F00";
            _this.conteneurErreurCreation.style.display = "none";
            _this.conteneurCreationCompte.ajouterElement(_this.champPseudoCreation, _this.champMDPCreation, _this.champConfirmationMDP, _this.champMail, conteneurCaptchaEtChamp, boutonSubmitCreationCompte, boutonAnnulerCreationCompte, _this.conteneurErreurCreation);
            _this.imageSon = new I_Image_1.I_Image(ConfigADV_1.default.DATA_TFMADV + "interface/sons/" + (MoteurSon_1.default.volume != 0 ? "general.png" : "general_coupe.png")).defLargeur(32).defHauteur(32);
            _this.imageSon.style.position = "absolute";
            _this.imageSon.style.top = "0.5em";
            _this.imageSon.style.left = "0.5em";
            _this.imageSon.rendreCliquable(function () {
                var nouveauVolume;
                var nouvelleImage;
                if (MoteurSon_1.default.volume == 0) {
                    nouveauVolume = 0.7;
                    nouvelleImage = ConfigADV_1.default.DATA_TFMADV + "interface/sons/general.png";
                }
                else {
                    nouveauVolume = 0;
                    nouvelleImage = ConfigADV_1.default.DATA_TFMADV + "interface/sons/general_coupe.png";
                }
                MoteurSon_1.default.defVolumeGlobal(nouveauVolume);
                _this.imageSon.chargerImage(nouvelleImage);
                CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.VOLUME_GLOBAL, nouveauVolume);
            });
            _this.ajouterElement(_this.conteneurLogin, _this.conteneurCreationCompte);
            _this.champVersion = new I_Texte_1.I_Texte("⚙️ " + ConfigADV_1.default.VERSION);
            _this.champVersion.style.fontFamily = "police-nom,Verdana";
            _this.champVersion.defCouleur("#203f0e").defTaille("0.6em");
            _this.champVersion.style.position = "absolute";
            _this.champVersion.style.bottom = "-24px";
            _this.champVersion.style.right = "5px";
            _this.conteneurLogin.appendChild(_this.champVersion);
            _this.champNbJoueur = new I_Texte_1.I_Texte("🐭 " + TFMAdventure_1.default.instance.nbJoueur);
            _this.champNbJoueur.style.fontFamily = "police-nom,Verdana";
            _this.champNbJoueur.defTaille("0.6em");
            _this.champNbJoueur.defCouleur("#203f0e");
            _this.champNbJoueur.style.fontWeight = "bold";
            _this.champNbJoueur.style.position = "absolute";
            _this.champNbJoueur.style.bottom = "-24px";
            _this.champNbJoueur.style.left = "5px";
            _this.conteneurLogin.appendChild(_this.champNbJoueur);
            if (ConfigADV_1.default.CLE_BETA_REQUISE) {
                _this.champCleBeta = new I_ChampTexte_1.I_ChampTexte().defLargeurMin("10em").defLargeur("100%");
                Trad801_1.default.definirTraduction(_this.champCleBeta.champ, "$texte.cleBeta", "placeholder");
                _this.champMDP.elementHTML.parentNode.insertBefore(_this.champCleBeta.elementHTML, _this.champMDP.elementHTML.nextElementSibling);
                _this.champCleBeta.defActionEntree(_this.validationLogin.bind(_this));
                _this.boutonCreationCompte.desactiver(true);
                _this.champCleBeta.defChangement(function () {
                    _this.boutonCreationCompte.desactiver(_this.champCleBeta.recupTexte().length <= 0);
                });
            }
            _this.listeChampsTexte = Array.prototype.slice.apply(_this.elementHTML.querySelectorAll("input"));
            _this.listeBoutons = Array.prototype.slice.apply(_this.elementHTML.querySelectorAll("button"));
            var cachePseudo = CacheLocalADV_1.default.recup(CacheLocalADV_1.default.CLES.DERNIER_LOGIN);
            if (cachePseudo !== null) {
                _this.champLogin.defTexte(cachePseudo);
            }
            _this.mettreFocusSurChampsTexte = true;
            return _this;
        }
        InterfaceLoginADV.afficher = function (OUI) {
            if (!InterfaceLoginADV.instance) {
                InterfaceLoginADV.instance = new InterfaceLoginADV();
            }
            if (OUI) {
                if (Steamice_1.default.steamActif) {
                    InterfaceLoginADV.instance.changerAffichage(TypeAffichage.LOGIN_STEAM);
                }
                else {
                    InterfaceLoginADV.instance.changerAffichage(TypeAffichage.LOGIN);
                }
                TFMAdventure_1.default.ajouterInterface(InterfaceLoginADV.instance.elementHTML);
                TFMAdventure_1.default.ajouterInterface(InterfaceLoginADV.instance.imageSon);
                AnimMath_1.default.animBoucle(1500, function (P) {
                    InterfaceLoginADV.instance.elementHTML.style.opacity = String(P);
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                if (InterfaceLoginADV.instance.mettreFocusSurChampsTexte) {
                    if (InterfaceLoginADV.instance.champLogin.recupTexte().length > 0) {
                        InterfaceLoginADV.instance.champMDP.focus();
                    }
                    else {
                        InterfaceLoginADV.instance.champLogin.focus();
                    }
                    InterfaceLoginADV.instance.mettreFocusSurChampsTexte = false;
                }
            }
            else {
                if (InterfaceLoginADV.instance && InterfaceLoginADV.instance.elementHTML) {
                    for (var _i = 0, _a = this.instance.listeChampsTexte; _i < _a.length; _i++) {
                        var champTexte = _a[_i];
                        champTexte.value = "";
                    }
                    InterfaceLoginADV.instance.elementHTML.remove();
                    InterfaceLoginADV.instance.imageSon.retirer();
                }
            }
        };
        InterfaceLoginADV.majNbJoueur = function (NB_JOUEUR) {
            if (InterfaceLoginADV.instance && InterfaceLoginADV.instance.elementHTML.parentNode) {
                InterfaceLoginADV.instance.champNbJoueur.defTexte("🐭 " + NB_JOUEUR);
            }
        };
        InterfaceLoginADV.afficherConteneurCreationCompte = function (CAPTCHA) {
            if (CAPTCHA === void 0) { CAPTCHA = null; }
            if (InterfaceLoginADV.instance) {
                InterfaceLoginADV.instance.afficherConteneurCreationCompte(CAPTCHA);
            }
        };
        InterfaceLoginADV.echecAuthentification = function (ERREUR, SUGGESTION_PSEUDO, COOKIE_2FA) {
            if (InterfaceLoginADV.instance) {
                InterfaceLoginADV.instance.echecAuthentification(ERREUR, SUGGESTION_PSEUDO, COOKIE_2FA);
            }
        };
        InterfaceLoginADV.enregistrerLoginUtilise = function () {
            if (InterfaceLoginADV.instance) {
                if (InterfaceLoginADV.instance.affichageEnCours == TypeAffichage.LOGIN) {
                    CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.DERNIER_LOGIN, this.instance.champLogin.recupTexte());
                }
                else if (InterfaceLoginADV.instance.affichageEnCours == TypeAffichage.CREATION_COMPTE) {
                    CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.DERNIER_LOGIN, this.instance.champMail.recupTexte());
                }
            }
        };
        InterfaceLoginADV.prototype.changerAffichage = function (AFFICHAGE) {
            this.activationInterface(true);
            this.conteneurLogin.style.display = "none";
            this.conteneurCreationCompte.style.display = "none";
            this.conteneurErreurLogin.style.display = "none";
            this.conteneurErreurCreation.style.display = "none";
            this.conteneurSteam.style.display = "none";
            this.conteneurCompteAtelier801.style.display = "none";
            this.conteneurErreurSteam.style.display = "none";
            switch (AFFICHAGE) {
                case TypeAffichage.LOGIN:
                    this.conteneurLogin.style.display = "flex";
                    break;
                case TypeAffichage.LOGIN_STEAM:
                    this.conteneurSteam.style.display = "flex";
                    this.conteneurCompteAtelier801.style.display = "flex";
                    break;
                case TypeAffichage.CREATION_COMPTE:
                    this.conteneurCreationCompte.style.display = "flex";
                    break;
            }
            this.affichageEnCours = AFFICHAGE;
        };
        InterfaceLoginADV.prototype.activationInterface = function (OUI) {
            this.style.filter = OUI ? "" : "grayscale(100%)";
            for (var _i = 0, _a = this.listeChampsTexte; _i < _a.length; _i++) {
                var champ = _a[_i];
                champ.disabled = !OUI;
            }
            for (var _b = 0, _c = this.listeBoutons; _b < _c.length; _b++) {
                var bouton = _c[_b];
                if (bouton == this.boutonCreationCompte.elementHTML && ConfigADV_1.default.CLE_BETA_REQUISE) {
                    continue;
                }
                bouton.disabled = !OUI;
            }
        };
        InterfaceLoginADV.prototype.validationLogin = function () {
            this.activationInterface(false);
            this.conteneurErreurLogin.style.display = "none";
            if (ConfigADV_1.default.CLE_BETA_REQUISE) {
                var cleBeta = this.champCleBeta ? this.champCleBeta.recupTexte() : "";
                if (cleBeta.length > 0) {
                    Module801_1.default.instance.envoyer(ProtoM801_1.default.enregistrerClefBeta(cleBeta));
                }
            }
            var nom = this.champLogin.recupTexte();
            var password = this.champMDP.recupTexte();
            Module801_1.default.instance.envoyer(ProtoM801_1.default.connexionJoueur(nom, password));
        };
        InterfaceLoginADV.prototype.echecAuthentification = function (ERREUR, SUGGESTION_PSEUDO, COOKIE_2FA) {
            var _this = this;
            this.activationInterface(true);
            if (this.affichageEnCours == TypeAffichage.LOGIN) {
                this.champMDP.defTexte("");
            }
            if (ERREUR == OutilsAuthentification_1.ErreurAuthentification.MAIL_DUPLIQUE) {
                this.champLogin.style.display = "none";
                var pseudos = SUGGESTION_PSEUDO.split("¤");
                var _loop_1 = function (pseudo) {
                    var divPseudo = document.createElement("div");
                    divPseudo.style.color = "#FFF";
                    divPseudo.style.cursor = "pointer";
                    divPseudo.addEventListener("click", function () {
                        _this.conteneurListeSuggestionsPseudos.vider();
                        _this.conteneurListeSuggestionsPseudos.style.display = "none";
                        _this.champLogin.style.display = "";
                        _this.champLogin.defTexte(pseudo);
                    });
                    divPseudo.textContent = pseudo;
                    this_1.conteneurListeSuggestionsPseudos.style.display = "";
                    this_1.conteneurListeSuggestionsPseudos.appendChild(divPseudo);
                };
                var this_1 = this;
                for (var _i = 0, pseudos_1 = pseudos; _i < pseudos_1.length; _i++) {
                    var pseudo = pseudos_1[_i];
                    _loop_1(pseudo);
                }
            }
            else if (ERREUR == OutilsAuthentification_1.ErreurAuthentification.PAS_DE_COMPTE) {
                var popupChoixPseudo_1 = new I_Conteneur_1.I_Conteneur();
                popupChoixPseudo_1.modeFenetre("", function () {
                    popupChoixPseudo_1.elementHTML.remove();
                });
                popupChoixPseudo_1.centrerAuto(0.5, 0.6);
                popupChoixPseudo_1.defLargeur(400);
                popupChoixPseudo_1.ajouterElement(new I_Texte_1.I_Texte(Trad801_1.default.trad("$Saisir_Pseudo")));
                var champPseudo_1 = new I_ChampTexte_1.I_ChampTexte(Trad801_1.default.trad("$Pseudo"));
                if (SUGGESTION_PSEUDO) {
                    champPseudo_1.defTexte(SUGGESTION_PSEUDO);
                }
                champPseudo_1.defActionEntree(function (TEXTE) {
                    Module801_1.default.instance.envoyer(ProtoM801_1.default.creationCompteSteam(Steamice_1.default.recupSteamId(), Steamice_1.default.recupTicketAuthentification(), champPseudo_1.recupTexte()));
                    popupChoixPseudo_1.elementHTML.remove();
                });
                popupChoixPseudo_1.ajouterElement(champPseudo_1);
                popupChoixPseudo_1.nouvelleLigne(function (LIGNE) {
                    LIGNE.style.justifyContent = "center";
                    LIGNE.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.valider"), function (EVT) {
                        Module801_1.default.instance.envoyer(ProtoM801_1.default.creationCompteSteam(Steamice_1.default.recupSteamId(), Steamice_1.default.recupTicketAuthentification(), champPseudo_1.recupTexte()));
                        popupChoixPseudo_1.elementHTML.remove();
                    }));
                    LIGNE.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.annuler"), function (EVT) {
                        popupChoixPseudo_1.elementHTML.remove();
                    }));
                });
                TFMAdventure_1.default.ajouterInterface(popupChoixPseudo_1);
            }
            else {
                var conteneurErreur = void 0;
                switch (this.affichageEnCours) {
                    case TypeAffichage.LOGIN:
                        conteneurErreur = this.conteneurErreurLogin;
                        break;
                    case TypeAffichage.LOGIN_STEAM:
                        break;
                    case TypeAffichage.CREATION_COMPTE:
                        conteneurErreur = this.conteneurErreurCreation;
                        break;
                }
                var message = OutilsAuthentification_1.default.convertirErreurEnMessage(ERREUR);
                if (!conteneurErreur) {
                    var popup_1 = new I_Conteneur_1.I_Conteneur();
                    popup_1.modeFenetre(Trad801_1.default.trad("$text.error"), function () {
                        popup_1.elementHTML.remove();
                    });
                    popup_1.centrerAuto();
                    popup_1.ajouterElement(new I_Texte_1.I_Texte(message));
                    popup_1.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.ok"), function (EVT) {
                        popup_1.elementHTML.remove();
                    }));
                    popup_1.etirerContenu();
                    TFMAdventure_1.default.ajouterInterface(popup_1);
                }
                else {
                    conteneurErreur.style.position = "relative";
                    conteneurErreur.style.display = "";
                    conteneurErreur.elementHTML.textContent = OutilsAuthentification_1.default.convertirErreurEnMessage(ERREUR);
                }
            }
        };
        InterfaceLoginADV.prototype.demandeAfficherConteneurCreationCompte = function () {
            Module801_1.default.instance.envoyer(ProtoM801_1.default.demandeCaptcha());
        };
        InterfaceLoginADV.prototype.afficherConteneurCreationCompte = function (CAPTCHA) {
            if (CAPTCHA === void 0) { CAPTCHA = null; }
            this.changerAffichage(TypeAffichage.CREATION_COMPTE);
            this.conteneurImageCaptcha.vider();
            this.conteneurImageCaptcha.appendChild(CAPTCHA);
        };
        InterfaceLoginADV.prototype.validationCreationCompte = function () {
            var nom = this.champPseudoCreation.recupTexte();
            var password = this.champMDPCreation.recupTexte();
            var passwordConfirmation = this.champConfirmationMDP.recupTexte();
            var mail = this.champMail.recupTexte();
            var captcha = this.champCaptcha.recupTexte();
            if (password !== passwordConfirmation) {
                this.conteneurErreurCreation.elementHTML.textContent = Trad801_1.default.trad("$MDP_Identique");
                this.conteneurErreurCreation.style.display = "";
                return;
            }
            this.conteneurErreurCreation.style.display = "none";
            Module801_1.default.instance.envoyer(ProtoM801_1.default.creationCompte(nom, password, mail, captcha));
        };
        return InterfaceLoginADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceLoginADV;
});
//# sourceMappingURL=InterfaceLoginADV.js.map