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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "../../../Souritheque-client/src/interface/souruis/elements/I_ImagePixi", "../../../Souritheque-client/src/outils/affichage/animation/Look", "../gameplay/armes/OutilsArmeADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV", "./InterfaceInvitationJoueurDonjonADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "./InterfaceLancementDonjonImminentADV", "../../../Souritheque-client/src/interface/Couleur", "../_monde/_mobile/MobileADV", "../gameplay/InterfaceCompetenceADV", "./InterfaceNotificationInvitationDonjonADV"], function (require, exports, I_Conteneur_1, ClipAnim_1, I_ImagePixi_1, Look_1, OutilsArmeADV_1, I_Bouton_1, I_Texte_1, Trad801_1, TFMAdventure_1, ProtoADV_1, InterfaceInvitationJoueurDonjonADV_1, I_Image_1, InterfaceLancementDonjonImminentADV_1, Couleur_1, MobileADV_1, InterfaceCompetenceADV_1, InterfaceNotificationInvitationDonjonADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceLancementDonjonADV = (function (_super) {
        __extends(InterfaceLancementDonjonADV, _super);
        function InterfaceLancementDonjonADV() {
            var _this = _super.call(this, "ligne") || this;
            _this.slotsJoueurs = new Array(InterfaceLancementDonjonADV.NOMBRE_SLOTS_JOUEURS);
            _this.modeFenetre(Trad801_1.default.trad("$DonjonDemarrer"), function () {
                InterfaceLancementDonjonADV.masquer(true);
            });
            _this.boutonFermer.style.background = "url('" + TFMAdventure_1.default.recupImageDistance("interface/bouton-min.png") + "') no-repeat center center";
            _this.boutonFermer.style.backgroundSize = "contain";
            _this.centrerAuto(0.5, 0.4);
            _this.afficherFondCadre();
            var conteneurDonjonEtDifficulte = new I_Conteneur_1.I_Conteneur("ligne");
            conteneurDonjonEtDifficulte.justifierEnfants("space-between");
            conteneurDonjonEtDifficulte.alignementEnfants("center");
            conteneurDonjonEtDifficulte.style.paddingLeft = "16px";
            conteneurDonjonEtDifficulte.style.paddingRight = "16px";
            conteneurDonjonEtDifficulte.style.backgroundSize = "cover, " + InterfaceLancementDonjonADV.LARGEUR_CADRE_BANNIERE + "px " + InterfaceLancementDonjonADV.HAUTEUR_CADRE_BANNIERE + "px";
            conteneurDonjonEtDifficulte.style.backgroundPosition = "center center";
            conteneurDonjonEtDifficulte.style.backgroundRepeat = "no-repeat";
            conteneurDonjonEtDifficulte.defLargeurMin(InterfaceLancementDonjonADV.LARGEUR_BANNIERE);
            conteneurDonjonEtDifficulte.defHauteurMin(InterfaceLancementDonjonADV.HAUTEUR_BANNIERE);
            _this.libelleNomDonjonEtDifficulte = new I_Texte_1.I_Texte();
            _this.boutonChangerDonjon = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonChanger")).defClique(InterfaceLancementDonjonADV.demanderInterfaceSelectionDonjon);
            conteneurDonjonEtDifficulte.ajouterElement(_this.libelleNomDonjonEtDifficulte);
            _this.conteneurDonjonEtDifficulte = conteneurDonjonEtDifficulte;
            var conteneurJoueurs = new I_Conteneur_1.I_Conteneur("ligne");
            conteneurJoueurs.etirerContenu();
            for (var i = 0; i < 4; i++) {
                var slotJoueur = new SlotJoueur();
                slotJoueur.style.flexBasis = "0";
                conteneurJoueurs.ajouterElement(slotJoueur);
                _this.slotsJoueurs[i] = slotJoueur;
            }
            var conteneurTrouverJoueursEtLancerDonjon = new I_Conteneur_1.I_Conteneur("ligne");
            _this.boutonTrouverJoueurs = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonTrouverJoueurs"));
            _this.boutonTrouverJoueurs.defClique(InterfaceLancementDonjonADV.demarrerRechercheJoueurs);
            _this.boutonDemarrerDonjon = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonDemarrer"));
            _this.boutonDemarrerDonjon.defClique(InterfaceLancementDonjonADV.demarrerDonjon);
            conteneurTrouverJoueursEtLancerDonjon.etirerContenu();
            conteneurTrouverJoueursEtLancerDonjon.ajouterElement(_this.boutonTrouverJoueurs, _this.boutonDemarrerDonjon);
            conteneurTrouverJoueursEtLancerDonjon.justifierEnfants("space-around");
            var boutonQuitter = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonQuitterGroupe"));
            boutonQuitter.defClique(InterfaceLancementDonjonADV.quitterGroupe);
            _this.selectionnerDonjonEtDifficulte(null, 1);
            var conteneur = new I_Conteneur_1.I_Conteneur("colonne");
            conteneur.ajouterElement(conteneurDonjonEtDifficulte, conteneurJoueurs, conteneurJoueurs, conteneurTrouverJoueursEtLancerDonjon, boutonQuitter);
            _this.ajouterElement(conteneur);
            return _this;
        }
        InterfaceLancementDonjonADV.afficher = function (MSG, CONTINUER) {
            if (CONTINUER === void 0) { CONTINUER = true; }
            if (!InterfaceLancementDonjonADV.instance) {
                InterfaceLancementDonjonADV.instance = new InterfaceLancementDonjonADV();
            }
            InterfaceLancementDonjonADV.masquer(false);
            InterfaceLancementDonjonADV.instance.initialisation(MSG, CONTINUER);
            TFMAdventure_1.default.ajouterInterface(InterfaceLancementDonjonADV.instance.elementHTML);
        };
        InterfaceLancementDonjonADV.estAffiche = function () {
            return Boolean(InterfaceLancementDonjonADV.instance && InterfaceLancementDonjonADV.instance.elementHTML.parentNode);
        };
        InterfaceLancementDonjonADV.masquer = function (OUI) {
            if (InterfaceLancementDonjonADV.instance) {
                InterfaceLancementDonjonADV.estMasque = OUI;
                InterfaceLancementDonjonADV.instance.elementHTML.style.visibility = OUI ? "hidden" : "visible";
                InterfaceCompetenceADV_1.InterfaceCompetenceADV.donjonMasque(OUI);
            }
        };
        InterfaceLancementDonjonADV.afficherPopupSauvegarde = function (ETAPE) {
            var fenetre = new I_Conteneur_1.I_Conteneur();
            fenetre.modeFenetre(Trad801_1.default.trad("$DonjonTitrePopupSauvegarde"), function () {
                fenetre.elementHTML.remove();
            });
            fenetre.defLargeur(500);
            fenetre.centrerAuto();
            var texte = new I_Texte_1.I_Texte(Trad801_1.default.trad(ETAPE == 3 ? "$DonjonTextePopupRaid" : "$DonjonTextePopupSauvegarde", ETAPE));
            fenetre.ajouterElement(texte);
            var bouton = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonVisualiserSauvegarde"), function (EVT) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeInfoSauvegardeDonjon(MobileADV_1.MobileADV.joueurPrincipal.nom));
            });
            fenetre.ajouterElement(bouton);
            fenetre.nouvelleLigne(function (LIGNE) {
                var boutonRecommencer = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonRecommencerZero"), function (EVT) {
                    fenetre.elementHTML.remove();
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.reponseSauvegardeDonjon(false));
                });
                boutonRecommencer.style.flex = "1";
                LIGNE.ajouterElement(boutonRecommencer);
                var boutonContinuer = new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$DonjonContinuer"), function (EVT) {
                    fenetre.elementHTML.remove();
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.reponseSauvegardeDonjon(true));
                });
                LIGNE.ajouterElement(boutonContinuer);
                boutonContinuer.style.flex = "1";
                LIGNE.etirerContenu();
            });
            TFMAdventure_1.default.ajouterInterface(fenetre);
        };
        InterfaceLancementDonjonADV.demanderInterfaceSelectionDonjon = function () {
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeInterfaceSelectionDonjon());
            InterfaceLancementDonjonADV.fermer();
        };
        InterfaceLancementDonjonADV.ouvrirInterfaceInvitationJoueur = function () {
            InterfaceInvitationJoueurDonjonADV_1.InterfaceInvitationJoueurDonjonADV.afficher();
        };
        InterfaceLancementDonjonADV.afficherNotificationInvitationJoueur = function (INITIATEUR, INVITE) {
            TFMAdventure_1.default.instance.messageChat(Trad801_1.default.trad("$DonjonAnnonceInvitationJoueur", INITIATEUR, INVITE), "-", null);
        };
        InterfaceLancementDonjonADV.afficherNotificationReponseInvitationJoueur = function (JOUEUR, CODE_REPONSE) {
            TFMAdventure_1.default.instance.messageChat(Trad801_1.default.trad(InterfaceLancementDonjonADV.clesTradsNotificationReponseInvitation[CODE_REPONSE], JOUEUR), "-", null);
        };
        InterfaceLancementDonjonADV.afficherNotificationDepartJoueur = function (JOUEUR, EST_JOUEUR_PRINCIPAL) {
            TFMAdventure_1.default.instance.messageChat(Trad801_1.default.trad("$DonjonAnnonceDepartGroupe", JOUEUR), "-", null);
            if (EST_JOUEUR_PRINCIPAL) {
                InterfaceLancementDonjonADV.fermer();
                InterfaceLancementDonjonImminentADV_1.InterfaceLancementDonjonImminentADV.fermer();
                InterfaceNotificationInvitationDonjonADV_1.InterfaceNotificationInvitationDonjonADV.fermer();
            }
        };
        InterfaceLancementDonjonADV.quitterGroupe = function () {
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.quitterGroupeDonjon());
        };
        InterfaceLancementDonjonADV.demarrerRechercheJoueurs = function () {
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.demarrerRechercheGroupeDonjon());
        };
        InterfaceLancementDonjonADV.demarrerDonjon = function () {
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeDemarrerDonjon());
        };
        InterfaceLancementDonjonADV.fermer = function () {
            if (InterfaceLancementDonjonADV.instance) {
                InterfaceLancementDonjonADV.instance.elementHTML.remove();
            }
        };
        InterfaceLancementDonjonADV.prototype.initialisation = function (MSG, CONTINUER) {
            if (CONTINUER === void 0) { CONTINUER = true; }
            var lectureSeule = MSG.lBool();
            var equipeComplete = MSG.lBool();
            var infoDonjon = InfoDonjon.deserialisation(MSG);
            var codeDifficulte = MSG.l8();
            if (!CONTINUER) {
                codeDifficulte = 0;
            }
            this.selectionnerDonjonEtDifficulte(infoDonjon, codeDifficulte + 1);
            this.boutonChangerDonjon.desactiver(lectureSeule);
            var nombreJoueurs = MSG.l8();
            var infosJoueurs = new Array(InterfaceLancementDonjonADV.NOMBRE_SLOTS_JOUEURS);
            for (var i = 0; i < nombreJoueurs; i++) {
                infosJoueurs[i] = InfoJoueur.creerDepuisMessage(MSG);
            }
            for (var i = 0; i < InterfaceLancementDonjonADV.NOMBRE_SLOTS_JOUEURS; i++) {
                this.slotsJoueurs[i].defContenu(infosJoueurs[i], !lectureSeule);
            }
            if (equipeComplete && nombreJoueurs < InterfaceLancementDonjonADV.NOMBRE_SLOTS_JOUEURS) {
                this.boutonDemarrerDonjon.desactiver(true);
            }
            else {
                this.boutonDemarrerDonjon.desactiver(lectureSeule);
            }
            this.boutonTrouverJoueurs.desactiver(lectureSeule || nombreJoueurs >= InterfaceLancementDonjonADV.NOMBRE_SLOTS_JOUEURS);
        };
        InterfaceLancementDonjonADV.prototype.selectionnerDonjonEtDifficulte = function (INFO_DONJON, DIFFICULTE) {
            if (!INFO_DONJON) {
                return;
            }
            this.conteneurDonjonEtDifficulte.style.backgroundImage = "url('" + InterfaceLancementDonjonADV.URL_CADRE_BANNIERE + "'), url('" + InterfaceLancementDonjonADV.recupBanniereDonjon(INFO_DONJON) + "')";
            this.libelleNomDonjonEtDifficulte.defTexte(Trad801_1.default.trad("$DonjonEtape") + " : " + DIFFICULTE);
        };
        InterfaceLancementDonjonADV.recupNomDonjon = function (INFO_DONJON) {
            return Trad801_1.default.trad("$Donjon_" + INFO_DONJON.nom);
        };
        InterfaceLancementDonjonADV.recupBanniereDonjon = function (INFO_DONJON) {
            return I_Image_1.I_Image.BASE_IMAGE + "tfmadv/interface/donjon/banniere/" + INFO_DONJON.nom + ".jpg";
        };
        InterfaceLancementDonjonADV.recupNomDifficulte = function (DIFFICULTE) {
            return Trad801_1.default.trad("$DifficulteDonjon" + DIFFICULTE);
        };
        InterfaceLancementDonjonADV.estMasque = false;
        InterfaceLancementDonjonADV.NOMBRE_SLOTS_JOUEURS = 4;
        InterfaceLancementDonjonADV.clesTradsNotificationReponseInvitation = {
            0: "$DonjonAnnonceAcceptationInvitation",
            1: "$DonjonAnnonceRefusInvitation",
            2: "$DonjonAnnonceExpirationInvitation"
        };
        InterfaceLancementDonjonADV.URL_CADRE_BANNIERE = I_Image_1.I_Image.BASE_IMAGE + "tfmadv/interface/donjon/banniere/cadre-banniere.png";
        InterfaceLancementDonjonADV.LARGEUR_BANNIERE = 756;
        InterfaceLancementDonjonADV.HAUTEUR_BANNIERE = 59;
        InterfaceLancementDonjonADV.LARGEUR_CADRE_BANNIERE = 784;
        InterfaceLancementDonjonADV.HAUTEUR_CADRE_BANNIERE = 48;
        return InterfaceLancementDonjonADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.InterfaceLancementDonjonADV = InterfaceLancementDonjonADV;
    var InfoDonjon = (function () {
        function InfoDonjon(NOM) {
            this.nom = NOM;
        }
        InfoDonjon.deserialisation = function (MSG) {
            var nom = MSG.lChaine();
            return new InfoDonjon(nom);
        };
        return InfoDonjon;
    }());
    var SlotJoueur = (function (_super) {
        __extends(SlotJoueur, _super);
        function SlotJoueur() {
            var _this = _super.call(this, "colonne") || this;
            _this.contenu = null;
            _this.infoJoueur = null;
            _this.style.textAlign = "center";
            _this.afficherFondUni("#000000" + "4C", "0.5em");
            _this.defContenu(null, false);
            return _this;
        }
        SlotJoueur.prototype.defContenu = function (INFO, INVITATION_POSSIBLE) {
            if (INFO) {
                this.defContenuNonVide(INFO);
            }
            else {
                this.defContenuVide(INVITATION_POSSIBLE);
            }
        };
        SlotJoueur.prototype.defContenuNonVide = function (INFO_JOUEUR) {
            var conteneur = new I_Conteneur_1.I_Conteneur("colonne");
            var libelleNomJoueur = new I_Texte_1.I_Texte(INFO_JOUEUR.nom);
            libelleNomJoueur.defCouleur(Couleur_1.Couleur._ORANGE);
            var imageJoueur = new I_ImagePixi_1.I_ImagePixi(SlotJoueur.TAILLE_IMAGE_JOUEUR, 128);
            imageJoueur.ajouterBoucle(function () {
                if (imageJoueur.scene.children.length) {
                    var clip = imageJoueur.scene.getChildAt(0);
                    if (clip instanceof ClipAnim_1.ClipAnim) {
                        clip.boucle(Date.now());
                    }
                }
            });
            imageJoueur.scene.addChildAt(INFO_JOUEUR.clip, 0);
            INFO_JOUEUR.clip.position.set(SlotJoueur.TAILLE_IMAGE_JOUEUR / 2, SlotJoueur.TAILLE_IMAGE_JOUEUR * 0.85);
            conteneur.ajouterElement(libelleNomJoueur, imageJoueur);
            var cleTradStatutJoueur = SlotJoueur.CLES_TRADS_STATUTS_JOUEURS[INFO_JOUEUR.codeStatut];
            if (cleTradStatutJoueur) {
                var libelleStatutJoueur = new I_Texte_1.I_Texte(Trad801_1.default.trad(cleTradStatutJoueur));
                libelleStatutJoueur.defCouleur("#6B4A3A");
                conteneur.ajouterElement(libelleStatutJoueur);
            }
            this.remplacerContenu(conteneur);
            this.infoJoueur = INFO_JOUEUR;
        };
        SlotJoueur.prototype.defContenuVide = function (INVITATION_POSSIBLE) {
            this.vider();
            if (INVITATION_POSSIBLE) {
                var imagePlus = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/donjon_add_player.png"));
                imagePlus.rendreCliquable(InterfaceLancementDonjonADV.ouvrirInterfaceInvitationJoueur);
                this.ajouterElementCentre(imagePlus);
            }
            this.infoJoueur = null;
        };
        SlotJoueur.prototype.remplacerContenu = function (NOUVEAU_CONTENU) {
            this.vider();
            this.ajouterElement(NOUVEAU_CONTENU);
            this.contenu = NOUVEAU_CONTENU;
        };
        SlotJoueur.TAILLE_IMAGE_JOUEUR = 128;
        SlotJoueur.CLES_TRADS_STATUTS_JOUEURS = {
            0: "$DonjonStatutJoueurCreateur",
            1: "$DonjonStatutJoueurIntegre",
            2: "$DonjonStatutJoueurInvite"
        };
        return SlotJoueur;
    }(I_Conteneur_1.I_Conteneur));
    var InfoJoueur = (function () {
        function InfoJoueur(NOM, CODE_STATUT, CLIP) {
            this.nom = NOM;
            this.codeStatut = CODE_STATUT;
            this.clip = CLIP;
        }
        InfoJoueur.creerDepuisMessage = function (MSG) {
            var nom = MSG.lChaine();
            var codeStatut = MSG.l8();
            var clip = new ClipAnim_1.ClipAnim(MSG);
            clip.defLook(new Look_1.Look(MSG));
            clip.jouerAnimation("statique");
            var arme1 = OutilsArmeADV_1.OutilsArmeADV.recupArme(MSG, null);
            if (arme1 && arme1.apparence) {
                clip.ajouterElementLook(arme1.apparence);
            }
            var arme2 = OutilsArmeADV_1.OutilsArmeADV.recupArme(MSG, null);
            if (arme2 && arme2.apparence) {
                clip.ajouterElementLook(arme2.apparence);
            }
            return new InfoJoueur(nom, codeStatut, clip);
        };
        return InfoJoueur;
    }());
});
//# sourceMappingURL=InterfaceLancementDonjonADV.js.map