define(["require", "exports", "../_monde/MondeADV", "../_monde/_mobile/MobileADV", "./TFMAdventure", "../interfaces/editeur/EditeurADV", "../../../Souritheque-client/src/outils/reseau/ChaineOctet", "../../../Souritheque-client/src/outils/reseau/ProtoM801", "../../../Souritheque-client/src/outils/reseau/Msg801", "../_monde/_mobile/AplatADV", "../interfaces/editeur/InterfaceOptionMonde", "../../../Souritheque-client/src/outils/affichage/animation/Look", "../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "./ClavierADV", "../gameplay/armes/OutilsArmeADV", "../interfaces/InterfaceJoueurADV", "../_monde/_mobile/AplatMobileADV", "../interfaces/InterfaceRecompenseRencontre", "../interfaces/InterfaceEcurie", "../interfaces/InterfaceLancementDonjonADV", "../interfaces/InterfaceEchecInvitationJoueurDonjonADV", "../interfaces/InterfaceNotificationInvitationDonjonADV", "../interfaces/InterfaceSelectionDonjonADV", "../../../Souritheque-client/src/outils/Trad801", "../interfaces/InterfaceNotificationDissolutionGroupeDonjonADV", "../interfaces/admin/VieuxAdminEquipement", "../interfaces/InterfaceStatutRechercheJoueursDonjonADV", "../interfaces/InterfaceLancementDonjonImminentADV", "../interfaces/InterfaceNotificationArretLancementDonjonADV", "../interfaces/InterfaceMetierADV", "../interfaces/types/EquipementADV", "../interfaces/InterfaceRecompense", "../interfaces/InterfaceSortieDonjonADV", "../interfaces/InterfaceTalents", "../interfaces/NotificationADV", "../_monde/_mobile/types/MobileMarmiteADV", "../interfaces/InterfaceCarteMondeADV", "../interfaces/admin/AdminDons", "../interfaces/InterfaceChargementADV", "../interfaces/InterfaceSauvegardeDonjon", "../interfaces/InterfaceQueteADV", "../_monde/BulleChatADV", "../interfaces/InterfaceDialogueADV", "../gameplay/InterfaceCompetenceADV", "../interfaces/BarreXPADV", "../interfaces/InterfaceKickstarterDV"], function (require, exports, MondeADV_1, MobileADV_1, TFMAdventure_1, EditeurADV_1, ChaineOctet_1, ProtoM801_1, Msg801_1, AplatADV_1, InterfaceOptionMonde_1, Look_1, ClipAnim_1, ClavierADV_1, OutilsArmeADV_1, InterfaceJoueurADV_1, AplatMobileADV_1, InterfaceRecompenseRencontre_1, InterfaceEcurie_1, InterfaceLancementDonjonADV_1, InterfaceEchecInvitationJoueurDonjonADV_1, InterfaceNotificationInvitationDonjonADV_1, InterfaceSelectionDonjonADV_1, Trad801_1, InterfaceNotificationDissolutionGroupeDonjonADV_1, VieuxAdminEquipement_1, InterfaceStatutRechercheJoueursDonjonADV_1, InterfaceLancementDonjonImminentADV_1, InterfaceNotificationArretLancementDonjonADV_1, InterfaceMetierADV_1, EquipementADV_1, InterfaceRecompense_1, InterfaceSortieDonjonADV_1, InterfaceTalents_1, NotificationADV_1, MobileMarmiteADV_1, InterfaceCarteMondeADV_1, AdminDons_1, InterfaceChargementADV_1, InterfaceSauvegardeDonjon_1, InterfaceQueteADV_1, BulleChatADV_1, InterfaceDialogueADV_1, InterfaceCompetenceADV_1, BarreXPADV_1, InterfaceKickstarterDV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Point = PIXI.Point;
    var ProtoADV = (function () {
        function ProtoADV() {
        }
        ProtoADV.initialisation = function () {
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INITIALISATION, function (MSG) {
                var moduleChargement = new InterfaceChargementADV_1.ModuleChargementImageClipAnimADV();
                var donnees = new ChaineOctet_1.default(MSG.lTableauOctetsCompresse());
                for (var i = 0, nb = donnees.l8(); i < nb; i++) {
                    TFMAdventure_1.default.indexAnimation[donnees.l8()] = donnees.lChaine();
                }
                for (var i = 0, nb = donnees.l16(); i < nb; i++) {
                    var identifiant = donnees.l16();
                    var codeCache = donnees.lChaine();
                    var anim = new ClipAnim_1.ClipAnim(donnees);
                    var infoFX = {
                        identifiant: identifiant,
                        clip: anim,
                        orientable: donnees.lBool(),
                        etirable: donnees.lBool(),
                        decalageEtirement: 0,
                        largeur: 0,
                    };
                    if (infoFX.etirable) {
                        infoFX.decalageEtirement = donnees.l16s();
                        infoFX.largeur = donnees.l16();
                    }
                    TFMAdventure_1.default.indexFX[identifiant] = infoFX;
                    if (codeCache) {
                        ClipAnim_1.ClipAnim.ajouterCache(codeCache, anim);
                    }
                }
                for (var i = 0, nb = donnees.l16(); i < nb; i++) {
                    var identifiant = donnees.l16();
                    var codeCache = donnees.lChaine();
                    var anim = new ClipAnim_1.ClipAnim(donnees);
                    TFMAdventure_1.default.indexMonstre[identifiant] = anim;
                    if (codeCache) {
                        ClipAnim_1.ClipAnim.ajouterCache(codeCache, anim);
                    }
                    if (identifiant == 2 && false) {
                        moduleChargement.ajouterAnim(anim);
                    }
                }
                for (var i = 0, nb = donnees.l16(); i < nb; i++) {
                    TFMAdventure_1.default.indexSon[donnees.l16()] = donnees.lChaine();
                }
                for (var i = 0, nb = donnees.l16(); i < nb; i++) {
                    TFMAdventure_1.default.indexVetement[donnees.l16()] = new Look_1.ElementLook(donnees);
                }
                InterfaceChargementADV_1.InterfaceChargementADV.ajouterModule(moduleChargement);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DEBUG_POS_SERVEUR, function (MSG) {
                MondeADV_1.MondeADV.instance.debugPosServeur(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_NOUVEAU_MOBILE, function (MSG) {
                MondeADV_1.MondeADV.instance.nouveauMobile(MSG.lBool(), MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_LISTE_MOBILE, function (MSG) {
                var nb = MSG.l16();
                for (var i = 0; i < nb; i++) {
                    MondeADV_1.MondeADV.instance.nouveauMobile(MSG.lBool(), MSG);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_CARAC_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.majCaracteristique(MSG);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MONDE, function (MSG) {
                MondeADV_1.MondeADV.instance.chargementMonde(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_CORRECTION_POSITION_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.positionServeur.set(MSG.lFloat(), MSG.lFloat());
                    if (MSG.lBool()) {
                        mobile.positionVirtuelle.set(mobile.positionServeur.x, mobile.positionServeur.y);
                        mobile.mondeEnCours.trierMobile(mobile);
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SYNCHRO_DEPLACEMENT_ANGLE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.positionServeur.set(MSG.lFloat(), MSG.lFloat());
                    var angle = MSG.l8();
                    if (angle == 255) {
                        mobile.arreterDeplacement();
                    }
                    else {
                        mobile.deplacementVers(angle * 0.02617993);
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SYNCHRO_DEPLACEMENT, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.positionServeur.set(MSG.lFloat(), MSG.lFloat());
                    mobile.deplacementVersPosition(MSG.lFloat(), MSG.lFloat());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MORT_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.declenchementMort(MSG.lBool());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ANIM_ATTAQUE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.versLaDroite(MSG.lBool());
                    mobile.animationAttaque(MSG.l8(), MSG.l8s());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ANIM_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    var creature = mobile.creature.jouerAnimation(TFMAdventure_1.default.indexAnimation[MSG.l8()], MSG.l8(), true);
                    creature.defDureeAnimationEnCours(MSG.l16());
                    var animSuivante = MSG.l8();
                    if (animSuivante) {
                        creature.animationSuivante(TFMAdventure_1.default.indexAnimation[animSuivante], MSG.l8());
                        creature.defDureeAnimationEnCours(MSG.l16());
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_CHIFFRE, function (MSG) {
                var cible = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (cible) {
                    MondeADV_1.MondeADV.instance.afficherEffetChiffre(cible, MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s()), MSG.l8(), MSG.l16s(), MSG.lBool());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MASQUER_MOBILE, function (MSG) {
                var cible = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (cible) {
                    cible.visible = !MSG.lBool();
                    if (cible.clipOmbre) {
                        cible.clipOmbre.visible = cible.visible;
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_TREMBLEMENT, function (MSG) {
                MondeADV_1.MondeADV.instance.tremblement(MSG.l8(), MSG.l16(), 0, 0, MSG.lBool() ? new Point(MSG.lFloat(), MSG.lFloat()) : null);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_SANTE, function (MSG) {
                var cible = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (cible) {
                    cible.clipNom.majSante(MSG.l16(), MSG.l16(), MSG.l16(), MSG.l8(), cible.estVisible);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SUPPR_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    MondeADV_1.MondeADV.instance.supprimerMobile(mobile);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_NOUVEL_APLAT, function (MSG) {
                var aplat = new AplatADV_1.AplatADV();
                aplat.deserialisation(MSG);
                MondeADV_1.MondeADV.instance.ajouterAplat(aplat, true);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SUPPR_APLAT, function (MSG) {
                MondeADV_1.MondeADV.instance.supprimerAplat(MSG.l32s());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_TEINTURE, function (MSG) {
                var element = MondeADV_1.MondeADV.instance.recupElement(MSG.l32s());
                if (element) {
                    element.infoCommune.teinture = MSG.l32s();
                    element.infoCommune.alpha = MSG.l8() / 0xFF;
                    if (element instanceof MobileADV_1.MobileADV) {
                        if (element.creature) {
                            element.creature.tint = element.infoCommune.teinture;
                            element.creature.alpha = element.infoCommune.alpha;
                        }
                        if (element.listeMobileInterne) {
                            for (var _i = 0, _a = element.listeMobileInterne; _i < _a.length; _i++) {
                                var interne = _a[_i];
                                interne.tint = element.infoCommune.teinture;
                            }
                        }
                    }
                    else {
                        element.tint = element.infoCommune.teinture;
                        element.alpha = element.infoCommune.alpha;
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_CHARGE_OBJET, function (MSG) {
                var idArme = MSG.l16();
                if (MobileADV_1.MobileADV.joueurPrincipal.mainDroite && MobileADV_1.MobileADV.joueurPrincipal.mainDroite.identifiant == idArme) {
                    MobileADV_1.MobileADV.joueurPrincipal.mainDroite.majCharge(MSG.l8(), MSG.l8());
                }
                else if (MobileADV_1.MobileADV.joueurPrincipal.mainGauche && MobileADV_1.MobileADV.joueurPrincipal.mainGauche.identifiant == idArme) {
                    MobileADV_1.MobileADV.joueurPrincipal.mainGauche.majCharge(MSG.l8(), MSG.l8());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_PROJECTION, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.projection(MSG.l16s(), MSG.l16s(), MSG.l16s(), MSG.l16s(), MSG.l16(), MSG.l16(), MSG.l16(), MSG.l16(), MSG.lBool(), MSG.lBool(), MSG.l8());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MODE_PARADE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.modeParade(MSG.lBool(), MSG.lBool());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_FIN_ATTAQUE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.finAnimationAttaque(MSG.l8(), MSG.l8s(), MSG.l8(), MSG.lBool());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_LOOK, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.defLook(new Look_1.Look(MSG));
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_ANIM, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.defCreature(new ClipAnim_1.ClipAnim(MSG), true);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MODE_COMBAT, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.modeCombat(MSG.lBool());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_COMP, function (MSG) {
                TFMAdventure_1.default.instance.clipDeck.majComp(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_LISTE_COMP, function (MSG) {
                TFMAdventure_1.default.instance.clipDeck.majListeComp(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_FX_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.majFX(MSG);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ECLAIR_LUMIERE, function (MSG) {
                MondeADV_1.MondeADV.instance.ajouterEclairLumiere(MSG.l16s(), MSG.l16s(), MSG.l16s(), MSG.l32s(), MSG.l8());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_BLOQUER_DEPLACEMENT, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile && mobile.estJoueurPrincipal) {
                    ClavierADV_1.default.instance.bloquerDeplacement(MSG.lBool());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INFO_MONDE, function (MSG) {
                MondeADV_1.MondeADV.instance.initialisationOptionMonde(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DIRECTION_DROITE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.versLaDroite(MSG.lBool());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_EQUIPEMENT_ARME, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    var arme = OutilsArmeADV_1.OutilsArmeADV.recupArme(MSG, mobile);
                    var mainDroite = MSG.lBool();
                    if (arme != null) {
                        mobile.equiperArme(arme, mainDroite);
                    }
                    else {
                        mobile.desequiperArme(mainDroite);
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_EFFET_SPECIAL, function (MSG) {
                MondeADV_1.MondeADV.instance.moteurEffet.afficherEffet(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_FX_UNIQUE_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.afficherFX(MSG.l16(), MSG.l16s(), MSG.l16s(), MSG.l16s() / 100, MSG.l16s() / 100, MSG.l16(), MSG.l8());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AJOUTER_APERCU_EFFET, function (MSG) {
                MondeADV_1.MondeADV.instance.ajouterApercuZoneEffet(MSG.l16(), MSG.l8(), MSG.l16s(), MSG.l16s(), MSG.l16(), MSG.l16());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SUPPR_APERCU_EFFET, function (MSG) {
                MondeADV_1.MondeADV.instance.supprimerApercuZoneEffet(MSG.l16());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_FX_MONDE, function (MSG) {
                MondeADV_1.MondeADV.instance.ajouterFX(MSG.l16(), MSG.l16s(), MSG.l16s(), MSG.l32s(), MSG.l8(), MSG.l16());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SON_MONDE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.jouerSon(TFMAdventure_1.default.indexSon[MSG.l16()], MSG.l8() / 100);
                }
                else {
                    MondeADV_1.MondeADV.instance.jouerSon(MSG.l16(), MSG.l8() / 100, MSG.lFloat(), MSG.lFloat());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_VITESSE_DEPLACEMENT, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.modificateurVitesseBase = MSG.l16() / 1000.0;
                    mobile.modificateurVitesse = MSG.l16() / 1000.0;
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_FX_MONDE_SOL, function (MSG) {
                MondeADV_1.MondeADV.instance.ajouterFXSol(MSG.l16(), MSG.lFloat(), MSG.lFloat(), MSG.lBool() ? MSG.l32s() : 0, MSG.l16(), MSG.l16(), MSG.l32s());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_REMPLACER_ANIM, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_POSTURE_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile && mobile.creature) {
                    var etaitEtourdi = mobile.estEtourdi;
                    var etaitGele = mobile.estGele;
                    mobile.estEtourdi = false;
                    mobile.estGele = false;
                    mobile.creature.listePosture = [];
                    for (var i = 0, nb = MSG.l8(); i < nb; i++) {
                        var code = MSG.lChaine();
                        mobile.creature.listePosture.push(code);
                        if (code == "stun") {
                            mobile.estEtourdi = true;
                        }
                        else if (code == "gel") {
                            mobile.estEtourdi = true;
                            mobile.estGele = true;
                        }
                    }
                    if (!etaitEtourdi && mobile.estEtourdi) {
                        mobile.creature.jouerAnimation("statique", 0, true);
                        if (mobile.mainDroite) {
                            mobile.mainDroite.desactivationInterne();
                        }
                        if (mobile.mainGauche) {
                            mobile.mainGauche.desactivationInterne();
                        }
                        if (mobile.estGele) {
                            if (mobile.creature.animEnCours) {
                                mobile.creature.animEnCours.stop();
                            }
                        }
                    }
                    if (etaitEtourdi && !mobile.estEtourdi) {
                        if (mobile.creature.animEnCours) {
                            mobile.creature.animEnCours.lecture();
                        }
                    }
                    if (!etaitGele && mobile.estGele) {
                        mobile.majFiltre();
                    }
                    else if (etaitGele && !mobile.estGele) {
                        mobile.majFiltre();
                    }
                    mobile.creature.appliquerChangementPosture();
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AURA_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.afficherAura(MSG.l8(), MSG.l16(), MSG.l32s());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_PORTER_MOBILE, function (MSG) {
                var porteur = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (porteur && mobile) {
                    if (MSG.lBool()) {
                        mobile.porteur = porteur;
                        if (!porteur.listeMobilePorte) {
                            porteur.listeMobilePorte = [];
                        }
                        porteur.listeMobilePorte.push(mobile);
                        if (porteur.creature) {
                            porteur.creature.equiperObjet("poids", mobile.creature);
                            porteur.creature.scale.y = 0.85;
                            mobile.creature.position.set(0, 0);
                            mobile.versLaDroite(true);
                        }
                    }
                    else {
                        mobile.porteur = null;
                        if (porteur.listeMobilePorte) {
                            var index = porteur.listeMobilePorte.indexOf(mobile);
                            if (index != -1) {
                                porteur.listeMobilePorte.splice(index, 1);
                            }
                        }
                        if (porteur.creature) {
                            porteur.creature.supprimerObjet(mobile.creature);
                            porteur.creature.scale.y = 0.85;
                            mobile.defCreature(mobile.creature);
                        }
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INTERACTION_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.majInteraction(MSG);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INTERFACE_JOUEUR, function (MSG) {
                InterfaceJoueurADV_1.InterfaceJoueurADV.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AJOUTER_APLAT_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.ajouterAplatMobile(new AplatMobileADV_1.AplatMobileADV(MSG));
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SUPPRIMER_APLAT_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.supprimerAplatMobile(MSG.l16());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AJOUT_COLLISION, function (MSG) {
                var identifiant = MSG.l32s();
                var x1 = MSG.l16s();
                var y1 = MSG.l16s();
                var x2 = MSG.l16s();
                var y2 = MSG.l16s();
                MondeADV_1.MondeADV.instance.ajouterSegmentCollision(x1, y1, x2, y2, identifiant);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_RETRAIT_COLLISION, function (MSG) {
                var identifiant = MSG.l32s();
                MondeADV_1.MondeADV.instance.retirerSegmentCollision(identifiant);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_COFFRE_RECOMPENSES, function (MSG) {
                InterfaceRecompenseRencontre_1.default.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ANIM_ZELDA, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile && mobile.creature) {
                    mobile.creature.jouerAnimation("recompensestart", 1, true).animationSuivante("recompense", 1);
                    var image = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance(MSG.lChaine()));
                    image.anchor.set(0.5, 0.5);
                    mobile.creature.viderEmplacementObjet("objet");
                    mobile.creature.equiperObjet("objet", image);
                    mobile.jouerSon("swoosh");
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_CLIGNOTEMENT_DISPARITION_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    var dureeClignottement = MSG.l32s();
                    mobile.clignottementDisparition(dureeClignottement);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MODIFICATION_COLLISION, function (MSG) {
                var identifiant = MSG.l32s();
                var x1 = MSG.l16s();
                var y1 = MSG.l16s();
                var x2 = MSG.l16s();
                var y2 = MSG.l16s();
                MondeADV_1.MondeADV.instance.modifierSegmentCollision(identifiant, x1, y1, x2, y2);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ECURIE_FAMILIERS, function (MSG) {
                InterfaceEcurie_1.default.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_CHANGEMENT_NOM_FAMILIER, function (MSG) {
                InterfaceEcurie_1.default.changerNom(MSG.l16(), MSG.lChaine());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_MARMITE, function (MSG) {
                var marmite = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (marmite && marmite instanceof MobileMarmiteADV_1.MobileMarmiteADV) {
                    marmite.majMarmite(MSG);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_POPUP_SAUVEGARDE_DONJON, function (MSG) {
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.afficherPopupSauvegarde(MSG.l8());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ETAT_PLANTE_BOTANISTE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_RESET_QUETE, function (MSG) {
                if (InterfaceQueteADV_1.default.instance) {
                    InterfaceQueteADV_1.default.instance.resetAffichage();
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MUSIQUE_COMBAT, function (MSG) {
                MondeADV_1.MondeADV.instance.musiqueCombatRequise = MSG.lBool();
                MondeADV_1.MondeADV.instance.jouerNouvelleMusique(1000);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_POPUP_KICKSTARTER, function (MSG) {
                if (false) {
                    document.body.appendChild(new InterfaceKickstarterDV_1.default(MSG.l8()).elementHTML);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SIGNAL_MARMITE, function (MSG) {
                var marmite = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (marmite && marmite instanceof MobileMarmiteADV_1.MobileMarmiteADV) {
                    marmite.signalement();
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_CHANGEMENT_EQUIPE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.estUnAllie = MSG.lBool();
                    mobile.estUnEnnemi = MSG.lBool();
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_CONSOLE, function (MSG) {
                console.log(MSG.lChaine());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_FX_ECHELLE_APLAT, function (MSG) {
                MondeADV_1.MondeADV.instance.fxEchelleAplat(MSG.l8(), MSG.lFloat(), MSG.lFloat(), MSG.l16(), MSG.l16(), MSG.l32s(), MSG.l8(), MSG.l16());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INTERFACE_LANCEMENT_DONJON, function (MSG) {
                InterfaceStatutRechercheJoueursDonjonADV_1.InterfaceStatutRechercheJoueursDonjonADV.fermer();
                InterfaceLancementDonjonImminentADV_1.InterfaceLancementDonjonImminentADV.fermer();
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_EMOJI, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.afficherEmoji(MSG.l8());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INTERRUPTION_ARME, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                var idArme = MSG.l16();
                if (mobile) {
                    if (mobile.mainGauche && (mobile.mainGauche.identifiant == idArme || idArme == 0)) {
                        mobile.mainGauche.interruptionInterne();
                    }
                    if (mobile.mainDroite && (mobile.mainDroite.identifiant == idArme || idArme == 0)) {
                        mobile.mainDroite.interruptionInterne();
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ACTIVATION_ARME, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                var idArme = MSG.l16();
                if (mobile) {
                    if (mobile.mainGauche && mobile.mainGauche.identifiant == idArme) {
                        mobile.mainGauche.activationInterne();
                    }
                    if (mobile.mainDroite && mobile.mainDroite.identifiant == idArme) {
                        mobile.mainDroite.activationInterne();
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DESACTIVATION_ARME, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                var idArme = MSG.l16();
                if (mobile) {
                    if (mobile.mainGauche && mobile.mainGauche.identifiant == idArme) {
                        mobile.mainGauche.desactivationInterne();
                    }
                    if (mobile.mainDroite && mobile.mainDroite.identifiant == idArme) {
                        mobile.mainDroite.desactivationInterne();
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INCANTATION_ARME, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                var idArme = MSG.l16();
                if (mobile) {
                    if (mobile.mainGauche && mobile.mainGauche.identifiant == idArme) {
                        mobile.mainGauche.incantationInterne();
                    }
                    if (mobile.mainDroite && mobile.mainDroite.identifiant == idArme) {
                        mobile.mainDroite.incantationInterne();
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INVITATION_JOUEUR_DONJON, function (MSG) {
                InterfaceNotificationInvitationDonjonADV_1.InterfaceNotificationInvitationDonjonADV.receptionInvitation(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ECHEC_INVITATION_JOUEUR_DONJON, function (MSG) {
                InterfaceEchecInvitationJoueurDonjonADV_1.InterfaceEchecInvitationJoueurDonjonADV.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ANNONCE_INVITATION_JOUEUR_DONJON, function (MSG) {
                var initiateur = MSG.lChaine();
                var invite = MSG.lChaine();
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.afficherNotificationInvitationJoueur(initiateur, invite);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ANNONCE_REPONSE_INVITATION_JOUEUR_DONJON, function (MSG) {
                var nomJoueur = MSG.lChaine();
                var code = MSG.l8();
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.afficherNotificationReponseInvitationJoueur(nomJoueur, code);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ANNONCE_DEPART_JOUEUR_GROUPE_DONJON, function (MSG) {
                var nomJoueur = MSG.lChaine();
                var estJoueurPrincipal = MSG.lBool();
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.afficherNotificationDepartJoueur(nomJoueur, estJoueurPrincipal);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_EXPIRATION_INVITATION_JOUEUR_GROUPE_DONJON, function (MSG) {
                var initiateur = MSG.lChaine();
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.fermer();
                InterfaceNotificationInvitationDonjonADV_1.InterfaceNotificationInvitationDonjonADV.fermer();
                TFMAdventure_1.default.instance.messageChat(Trad801_1.default.trad("$DonjonExpirationInvitation", initiateur), "-", null);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DISSOLUTION_GROUPE_DONJON, function (MSG) {
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.fermer();
                InterfaceStatutRechercheJoueursDonjonADV_1.InterfaceStatutRechercheJoueursDonjonADV.fermer();
                InterfaceLancementDonjonImminentADV_1.InterfaceLancementDonjonImminentADV.fermer();
                InterfaceNotificationDissolutionGroupeDonjonADV_1.InterfaceNotificationDissolutionGroupeDonjonADV.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INTERFACE_SELECTION_DONJON, function (MSG) {
                InterfaceSelectionDonjonADV_1.InterfaceSelectionDonjonADV.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DIALOGUE, function (MSG) {
                var identifiantDialogue = MSG.l32s();
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                var clip = new ClipAnim_1.ClipAnim(MSG);
                if (MSG.lBool()) {
                    clip.defLook(new Look_1.Look(MSG));
                }
                clip.jouerAnimation("statique");
                var idDialogue = MSG.l16();
                if (mobile) {
                    if (mobile.distanceCarreJoueurPrincipal < InterfaceDialogueADV_1.InterfaceDialogueADV.DISTANCE_AFFICHAGE * InterfaceDialogueADV_1.InterfaceDialogueADV.DISTANCE_AFFICHAGE) {
                        var texte = Trad801_1.default.trad("$dialogue." + idDialogue);
                        InterfaceDialogueADV_1.InterfaceDialogueADV.afficher(identifiantDialogue, mobile, mobile.nom, clip, texte, MSG.lBool());
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_NOTIFICATION_LANCEMENT_RECHERCHE_JOUEURS_DONJON, function (MSG) {
                var nomJoueur = MSG.lChaine();
                TFMAdventure_1.default.instance.messageChat(Trad801_1.default.trad("$DonjonDebutRechercheJoueurs", nomJoueur), "-", null);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INTERFACE_STATUT_RECHERCHE_JOUEURS_DONJON, function (MSG) {
                InterfaceNotificationArretLancementDonjonADV_1.InterfaceNotificationArretLancementDonjonADV.fermer();
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.fermer();
                InterfaceLancementDonjonImminentADV_1.InterfaceLancementDonjonImminentADV.fermer();
                InterfaceStatutRechercheJoueursDonjonADV_1.InterfaceStatutRechercheJoueursDonjonADV.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INTERFACE_LANCEMENT_DONJON_IMMINENT, function (MSG) {
                InterfaceNotificationArretLancementDonjonADV_1.InterfaceNotificationArretLancementDonjonADV.fermer();
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.fermer();
                InterfaceStatutRechercheJoueursDonjonADV_1.InterfaceStatutRechercheJoueursDonjonADV.fermer();
                InterfaceLancementDonjonImminentADV_1.InterfaceLancementDonjonImminentADV.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_NOTIFICATION_ARRET_LANCEMENT_DONJON, function (MSG) {
                InterfaceStatutRechercheJoueursDonjonADV_1.InterfaceStatutRechercheJoueursDonjonADV.fermer();
                InterfaceLancementDonjonImminentADV_1.InterfaceLancementDonjonImminentADV.fermer();
                var nomJoueurCause = null;
                if (MSG.lBool()) {
                    nomJoueurCause = MSG.lChaine();
                }
                var type = MSG.l8();
                InterfaceNotificationArretLancementDonjonADV_1.InterfaceNotificationArretLancementDonjonADV.receptionNotification(nomJoueurCause, type);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DEBUT_DONJON, function (MSG) {
                InterfaceLancementDonjonADV_1.InterfaceLancementDonjonADV.fermer();
                InterfaceStatutRechercheJoueursDonjonADV_1.InterfaceStatutRechercheJoueursDonjonADV.fermer();
                InterfaceLancementDonjonImminentADV_1.InterfaceLancementDonjonImminentADV.fermer();
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_EQUIPEMENTS, function (MSG) {
                var idSlotEquipement = MSG.l8();
                var codeEquipementEnCours = MSG.l16();
                var equipementEnCours = null;
                var nbEquipements = MSG.l8();
                var indexEquipements = {};
                var indexEquipementsNonEquipables = {};
                for (var i = 0; i < nbEquipements; i++) {
                    var equipement = EquipementADV_1.default.deserialiser(MSG);
                    var estEquipable = MSG.lBool();
                    equipement.stats = EquipementADV_1.default.deserialiserStats(MSG);
                    var idArme = equipement.estUneArme ? equipement.typeArme : 0;
                    indexEquipements[idArme] = indexEquipements[idArme] || [];
                    indexEquipements[idArme].push(equipement);
                    if (!estEquipable) {
                        indexEquipementsNonEquipables[equipement.code] = true;
                    }
                    if (equipement.code == codeEquipementEnCours) {
                        equipementEnCours = equipement;
                    }
                }
                InterfaceJoueurADV_1.InterfaceJoueurADV.afficherEquipements(idSlotEquipement, indexEquipements, indexEquipementsNonEquipables, equipementEnCours);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_LIGNE_DEBUG, function (MSG) {
                for (var i = 0, nb = MSG.l32s(); i < nb; i++) {
                    MondeADV_1.MondeADV.instance.afficherLigneDebug(MSG.l32s(), MSG.l16s(), MSG.l16s(), MSG.l16s(), MSG.l16s(), MSG.l32s());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_CERCLE_DEBUG, function (MSG) {
                for (var i = 0, nb = MSG.l32s(); i < nb; i++) {
                    MondeADV_1.MondeADV.instance.afficherCercleDebug(MSG.l32s(), MSG.l16s(), MSG.l16s(), MSG.l16s(), MSG.l32s());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SUPPRIMER_FORME_DEBUG, function (MSG) {
                for (var i = 0, nb = MSG.l32s(); i < nb; i++) {
                    MondeADV_1.MondeADV.instance.supprimerFormeDebug(MSG.l32s());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_INTERFACE_METIER, function (MSG) {
                InterfaceMetierADV_1.default.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_RECOMPENSE, function (MSG) {
                InterfaceRecompense_1.default.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ARBRE_TALENTS, function (MSG) {
                InterfaceTalents_1.default.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_ICONE_VIE, function (MSG) {
                if (MobileADV_1.MobileADV.joueurPrincipal) {
                    MobileADV_1.MobileADV.joueurPrincipal.clipNom.majIconeSante(MSG.lBool(), MSG.l8s());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_NOTIFICATION, function (MSG) {
                NotificationADV_1.default.afficherDepuisServeur(MSG.l16(), MSG.lChaine());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_FERMER_NOTIFICATION, function (MSG) {
                NotificationADV_1.default.fermer(MSG.l16(), false);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_IDENTIFIANT_NOTIFICATION, function (MSG) {
                NotificationADV_1.default.majIdentifiant(MSG.l16(), MSG.l16());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_CHANGER_FAMILIER_EN_COURS, function (MSG) {
                InterfaceEcurie_1.default.changerFamilierEnCours(MSG.l16());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_TELEPORTER_VERS, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.teleporterVers(MSG.lFloat(), MSG.lFloat());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_CARTE_MONDE, function (MSG) {
                InterfaceCarteMondeADV_1.default.afficher();
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_COULEUR_ARME, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.majCouleurArme(MSG.l32s());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_CHANGEMENT_TITRE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    var codeTitre = MSG.l16();
                    if (mobile.estJoueurPrincipal) {
                        InterfaceJoueurADV_1.InterfaceJoueurADV.changementTitre(codeTitre);
                    }
                    else {
                        mobile.clipNom.afficherTitre(codeTitre > 0, codeTitre);
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_EFFET_TOUCHE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.effetTouche();
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_REBOND_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile && mobile.creature) {
                    mobile.creature.scale.y = MSG.l16() / 100;
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INFO_DON, function (MSG) {
                AdminDons_1.AdminDons.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INTERFACE_CHARGEMENT, function (MSG) {
                var module = new InterfaceChargementADV_1.ModuleChargementMondeADV();
                InterfaceChargementADV_1.InterfaceChargementADV.ajouterModule(module);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DONNEE_SECTEUR, function (MSG) {
                MondeADV_1.MondeADV.instance.donneeSecteur(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_QUETE_NOUVEL_OBJECTIF, function (MSG) {
                if (!InterfaceQueteADV_1.default.estAfficher()) {
                    InterfaceQueteADV_1.default.afficher();
                }
                InterfaceQueteADV_1.default.instance.ajouterObjectif(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_QUETE_SUPPRIMER_OBJECTIF, function (MSG) {
                if (!InterfaceQueteADV_1.default.estAfficher()) {
                    InterfaceQueteADV_1.default.afficher();
                }
                InterfaceQueteADV_1.default.instance.supprimerObjectif(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_QUETE_VALIDER_OBJECTIF, function (MSG) {
                if (!InterfaceQueteADV_1.default.estAfficher()) {
                    InterfaceQueteADV_1.default.afficher();
                }
                InterfaceQueteADV_1.default.instance.validerObjectif(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_INTERFACE_SAUVEGARDE_DONJON, function (MSG) {
                InterfaceSauvegardeDonjon_1.default.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_DUREE_CUISSON_MARMITE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile && mobile instanceof MobileMarmiteADV_1.MobileMarmiteADV) {
                    mobile.majDureeCuisson(MSG.l16() * 100, MSG.l16() * 100, MSG.lBool());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_CHANGER_SON_AMBIANCE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.jouerSon(TFMAdventure_1.default.indexSon[MSG.l16()], MSG.l8() / 100, true);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_POPUP_SORTIE_DONJON, function (MSG) {
                InterfaceSortieDonjonADV_1.InterfaceSortieDonjonADV.afficher(MSG.lBool(), MSG.lBool());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_RECUPERATION_COMP, function (MSG) {
                TFMAdventure_1.default.instance.clipDeck.majRecuperation(MSG.l32s(), MSG.l32s());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_REANIMATION, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    mobile.reanimation();
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MESSAGE_MOBILE, function (MSG) {
                var mobile = MondeADV_1.MondeADV.instance.recupMobile(MSG.l32s());
                if (mobile) {
                    BulleChatADV_1.default.afficher(mobile, MSG.lChaine(), false);
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DEF_COLLISION_RENCONTRE, function (MSG) {
                MondeADV_1.MondeADV.instance.defCollisionCercleTemporaire(MSG.lFloat(), MSG.lFloat(), MSG.lFloat());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_AFFICHER_AVERTISSEMENT_TELEPORTATION, function (MSG) {
                var secondes = MSG.l8();
                TFMAdventure_1.default.instance.messageChat(Trad801_1.default.trad("$FermetureZoneCombat", secondes), "-", null);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_CACHE_PICTO, function (MSG) {
                var msg = new ChaineOctet_1.default(MSG.lTableauOctetsCompresse());
                for (var i = 0, nb = msg.l16(); i < nb; i++) {
                    var codeCache = msg.lChaine();
                    var data = msg.lChaineOctet(msg.l32s());
                    if (codeCache) {
                        ClipAnim_1.ClipAnim.ajouterCache(codeCache, new ClipAnim_1.ClipAnim(data.resetPosition()));
                    }
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DONJON_DISPO, function (MSG) {
                InterfaceCompetenceADV_1.InterfaceCompetenceADV.defDonjonDisponibe(MSG.lBool());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_GAIN_XP, function (MSG) {
                BarreXPADV_1.BarreXPADV.afficher(MSG.l32s(), MSG.l32s(), MSG.l32s(), MSG.l16(), MSG.l16());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_OUVERTURE_EDITEUR, function (MSG) {
                if (MSG.lBool()) {
                    EditeurADV_1.EditeurADV.afficher(MSG);
                }
                else {
                    EditeurADV_1.EditeurADV.fermer();
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_LISTE_PICTO_EDITEUR, function (MSG) {
                EditeurADV_1.EditeurADV.instance.chargementListePicto(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_EDITEUR_OPTION_MONDE, function (MSG) {
                InterfaceOptionMonde_1.InterfaceOptionMonde.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_MAJ_LISTE_EQUIPEMENT, function (MSG) {
                VieuxAdminEquipement_1.VieuxAdminEquipement.afficher(MSG);
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_DESSIN, function (MSG) {
                for (var i = 0, nb = MSG.l32s(); i < nb; i++) {
                    EditeurADV_1.EditeurADV.instance.afficherLigneDessin(MSG.l32s(), MSG.l16s(), MSG.l16s(), MSG.l16s(), MSG.l16s(), MSG.l32s());
                }
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SUPPR_DESSIN, function (MSG) {
                EditeurADV_1.EditeurADV.instance.supprLigneDessin(MSG.l32s());
            });
            ProtoM801_1.default.ajouterPaquet(ProtoADV.C_SELECTION_EDITEUR, function (MSG) {
                EditeurADV_1.EditeurADV.instance.selectionServeur(MSG.l32s(), MSG);
            });
        };
        ProtoADV.synchroJoueur = function (POSITION, ANGLE_DEPLACEMENT) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_SYNCHRO_JOUEUR);
            msg.eFloat(POSITION.x).eFloat(POSITION.y);
            msg.e8(ANGLE_DEPLACEMENT);
            return msg;
        };
        ProtoADV.attaque = function (CIBLE, ANIM, ANGLE, ARME) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_ATTAQUE);
            msg.e32(CIBLE);
            msg.e8(ANIM);
            msg.e16(ARME);
            msg.e8(ANGLE);
            return msg;
        };
        ProtoADV.modeParade = function (OUI, DROITE) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_MODE_PARADE);
            msg.eBool(OUI);
            msg.eBool(DROITE);
            return msg;
        };
        ProtoADV.animAttaque = function (DROITE, MAIN, ANIM) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_ANIM_ATTAQUE);
            msg.eBool(DROITE).e8(MAIN).e8(ANIM);
            return msg;
        };
        ProtoADV.activerCompetence = function (IDENTIFIANT, CIBLE, X, Y) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_ACTIVATION_COMP);
            msg.e32(IDENTIFIANT).e32(CIBLE).e16(X).e16(Y);
            return msg;
        };
        ProtoADV.mobileDroite = function (DROITE) {
            return new Msg801_1.default().e16(ProtoADV.S_DIRECTION_DROITE).eBool(DROITE);
        };
        ProtoADV.activationTir = function (MAIN_DROITE, ANGLE) {
            return new Msg801_1.default().e16(ProtoADV.S_ACTIVATION_TIR).eBool(MAIN_DROITE).e32(ANGLE * 1000);
        };
        ProtoADV.interactionMobile = function (CIBLE, CODE) {
            return new Msg801_1.default().e16(ProtoADV.S_INTERACTION_MOBILE).e32(CIBLE).e8(CODE);
        };
        ProtoADV.ouvertureEditeur = function () {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_DEMANDE_OUVERTURE_EDITEUR);
            return msg;
        };
        ProtoADV.nouveauPicto = function (PICTO) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_EDITEUR_NOUVEAU_PICTO);
            PICTO.serialisation(msg);
            return msg;
        };
        ProtoADV.placementPicto = function (CODE, POX, POY, SYMETRIE, LUMIERE, ANGLE) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_EDITEUR_PLACEMENT_PICTO);
            msg.e16(CODE);
            msg.e16(POX).e16(POY);
            msg.eBool(SYMETRIE);
            msg.e8(LUMIERE);
            msg.e8(ANGLE);
            return msg;
        };
        ProtoADV.placementAplat = function (CODE, COUCHE, POX, POY, SYMETRIE, LUMIERE, ANGLE) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_EDITEUR_PLACEMENT_APLAT);
            msg.e16(CODE);
            msg.e8(COUCHE);
            msg.e16(POX).e16(POY);
            msg.eBool(SYMETRIE);
            msg.e8(LUMIERE);
            msg.e8(ANGLE);
            return msg;
        };
        ProtoADV.supprPicto = function (OBJET) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_EDITEUR_SUPPR_PICTO);
            msg.e32(OBJET.identifiantMobile);
            return msg;
        };
        ProtoADV.supprPictoListe = function (IDENTIFIANT) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_EDITEUR_SUPPR_PICTO_LISTE);
            msg.e16(IDENTIFIANT);
            return msg;
        };
        ProtoADV.ouvertureOptionMonde = function () {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_EDITEUR_OPTION_MONDE);
            return msg;
        };
        ProtoADV.majOptionMonde = function (INFO) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_EDITEUR_MAJ_OPTION_MONDE);
            msg.eChaineOctet(INFO);
            return msg;
        };
        ProtoADV.majTeinture = function (IDENTIFIANT, COULEUR, ALPHA) {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_EDITEUR_MAJ_TEINTURE);
            msg.e32(IDENTIFIANT);
            msg.e32(COULEUR);
            msg.e8(ALPHA);
            return msg;
        };
        ProtoADV.spawnMonstre = function (CODE, POX, POY) {
            return new Msg801_1.default().e16(ProtoADV.S_SPAWN_MONSTRE)
                .e16(CODE).e16(POX).e16(POY);
        };
        ProtoADV.demandeAdminEquipement = function () {
            var msg = new Msg801_1.default();
            msg.e16(ProtoADV.S_DEMANDE_ADMIN_EQUIPEMENT);
            return msg;
        };
        ProtoADV.nouvelEquipement = function (MSG) {
            return new Msg801_1.default().e16(ProtoADV.S_NOUVEAU_EQUIPEMENT)
                .eChaineOctet(MSG);
        };
        ProtoADV.supprEquipement = function (CODE) {
            return new Msg801_1.default().e16(ProtoADV.S_SUPPR_EQUIPEMENT)
                .e16(CODE);
        };
        ProtoADV.equiperEquipement = function (LISTE) {
            var msg = new Msg801_1.default().e16(ProtoADV.S_EQUIPER_EQUIPEMENT);
            msg.e8(LISTE.length);
            for (var _i = 0, LISTE_1 = LISTE; _i < LISTE_1.length; _i++) {
                var code = LISTE_1[_i];
                msg.e16(code);
            }
            return msg;
        };
        ProtoADV.rotationPicto = function (CODE, ANGLE) {
            return new Msg801_1.default().e16(ProtoADV.S_ROTATION_PICTO)
                .e32(CODE).e8(ANGLE);
        };
        ProtoADV.incarnerMonstre = function (CODE) {
            return new Msg801_1.default().e16(ProtoADV.S_INCARNER_MONSTRE)
                .e16(CODE);
        };
        ProtoADV.profondeurAplat = function (CODE, CODE_CIBLE, DIRECTION) {
            return new Msg801_1.default().e16(ProtoADV.S_PROFONDEUR_APLAT)
                .e32(CODE).e32(CODE_CIBLE).e8(DIRECTION);
        };
        ProtoADV.dessinEditeur = function (DX, DY, FX, FY, COULEUR) {
            return new Msg801_1.default().e16(ProtoADV.S_DESSIN)
                .e16(DX).e16(DY).e16(FX).e16(FY).e32(COULEUR);
        };
        ProtoADV.supprDessinEditeur = function (IDENTIFIANT) {
            return new Msg801_1.default().e16(ProtoADV.S_SUPPR_DESSIN).e32(IDENTIFIANT);
        };
        ProtoADV.defRencontre = function (CODE, THEME, DIFFICULTE, CENTRE_COLLISION_X, CENTRE_COLLISION_Y, RAYON_COLLISION, CENTRE_TELEPORTATION_X, CENTRE_TELEPORTATION_Y) {
            var msg = new Msg801_1.default().e16(ProtoADV.S_DEF_RENCONTRE);
            msg.e32(CODE);
            msg.eChaine(THEME);
            msg.e16(DIFFICULTE);
            msg.eFloat(CENTRE_COLLISION_X);
            msg.eFloat(CENTRE_COLLISION_Y);
            msg.eFloat(RAYON_COLLISION);
            msg.eFloat(CENTRE_TELEPORTATION_X);
            msg.eFloat(CENTRE_TELEPORTATION_Y);
            return msg;
        };
        ProtoADV.selectionEditeur = function (CODE) {
            return new Msg801_1.default().e16(ProtoADV.S_SELECTION_EDITEUR).e32(CODE);
        };
        ProtoADV.placementMobileInterieur = function (CIBLE, CODE, X, Y, ANGLE) {
            return new Msg801_1.default().e16(ProtoADV.S_PLACEMENT_INTERIEUR).e32(CIBLE).e16(CODE).e16(X).e16(Y).e8(ANGLE);
        };
        ProtoADV.rotationMobileInterieur = function (CIBLE, INDEX, ROTATION) {
            return new Msg801_1.default().e16(ProtoADV.S_ROTATION_INTERIEUR).e32(CIBLE).e8(INDEX).e8(ROTATION);
        };
        ProtoADV.profondeurMobileInterieur = function (CIBLE, INDEX, HAUT) {
            return new Msg801_1.default().e16(ProtoADV.S_PROFONDEUR_INTERIEUR).e32(CIBLE).e8(INDEX).eBool(HAUT);
        };
        ProtoADV.supprimerMobileInterieur = function (CIBLE, INDEX) {
            return new Msg801_1.default().e16(ProtoADV.S_SUPPR_INTERIEUR).e32(CIBLE).e8(INDEX);
        };
        ProtoADV.selectionRecompenseCoffre = function (ID_COFFRE, CODE_DON) {
            return new Msg801_1.default().e16(ProtoADV.S_SELECTION_RECOMPENSE_COFFRE).e32(ID_COFFRE).e32(CODE_DON);
        };
        ProtoADV.demandeAjoutCollision = function (X1, Y1, X2, Y2) {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_AJOUT_COLLISION).e16(Math.round(X1)).e16(Math.round(Y1)).e16(Math.round(X2)).e16(Math.round(Y2));
        };
        ProtoADV.demandeModificationExtremitesCollision = function (INFO_EXTREMITE, NOUVEAU_X, NOUVEAU_Y) {
            var message = new Msg801_1.default().e16(ProtoADV.S_DEMANDE_MODIFICATION_EXTREMITES_COLLISIONS).e16(NOUVEAU_X).e16(NOUVEAU_Y);
            message.e8(INFO_EXTREMITE.infosCollisionsConcernees.length);
            for (var _i = 0, _a = INFO_EXTREMITE.infosCollisionsConcernees; _i < _a.length; _i++) {
                var infoSegment = _a[_i];
                message.e32(infoSegment.segment.identifiant).eBool(infoSegment.depart);
            }
            return message;
        };
        ProtoADV.demandeRetraitCollisions = function (COLLISIONS) {
            var message = new Msg801_1.default().e16(ProtoADV.S_DEMANDE_RETRAIT_COLLISIONS);
            message.e8(COLLISIONS.length);
            for (var _i = 0, COLLISIONS_1 = COLLISIONS; _i < COLLISIONS_1.length; _i++) {
                var collision = COLLISIONS_1[_i];
                message.e32(collision.identifiant);
            }
            return message;
        };
        ProtoADV.majRectanglesLumiere = function (RECTANGLES_LUMIERE) {
            var message = new Msg801_1.default().e16(ProtoADV.S_MAJ_RECTANGLES_LUMIERE);
            message.e32(RECTANGLES_LUMIERE.length);
            for (var _i = 0, RECTANGLES_LUMIERE_1 = RECTANGLES_LUMIERE; _i < RECTANGLES_LUMIERE_1.length; _i++) {
                var rect = RECTANGLES_LUMIERE_1[_i];
                message.e32(rect.x);
                message.e32(rect.y);
                message.e32(rect.largeur);
                message.e32(rect.hauteur);
                message.e32(rect.couleur);
                message.e16(rect.marge);
            }
            return message;
        };
        ProtoADV.spawnerFamilier = function (ID_FAMILIER) {
            return new Msg801_1.default().e16(ProtoADV.S_SPAWN_FAMILIER).e16(ID_FAMILIER);
        };
        ProtoADV.changerNomFamilier = function (ID_FAMILIER, NOM_FAMILIER) {
            return new Msg801_1.default().e16(ProtoADV.S_CHANGEMENT_NOM_FAMILIER).e16(ID_FAMILIER).eChaine(NOM_FAMILIER);
        };
        ProtoADV.activationArme = function (IDENTIFIANT) {
            return new Msg801_1.default().e16(ProtoADV.S_ACTIVATION_ARME).e16(IDENTIFIANT);
        };
        ProtoADV.emoji = function (CODE) {
            return new Msg801_1.default().e16(ProtoADV.S_EMOJI).e8(CODE);
        };
        ProtoADV.interruptionArme = function (IDENTIFIANT) {
            return new Msg801_1.default().e16(ProtoADV.S_INTERRUPTION_ARME).e16(IDENTIFIANT);
        };
        ProtoADV.desactivationArme = function (IDENTIFIANT) {
            return new Msg801_1.default().e16(ProtoADV.S_DESACTIVATION_ARME).e16(IDENTIFIANT);
        };
        ProtoADV.incantationArme = function (IDENTIFIANT) {
            return new Msg801_1.default().e16(ProtoADV.S_INCANTATION_ARME).e16(IDENTIFIANT);
        };
        ProtoADV.demandeInterfaceLancementDonjon = function () {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_INTERFACE_LANCEMENT_DONJON);
        };
        ProtoADV.demandeInterfaceSelectionDonjon = function () {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_INTERFACE_SELECTION_DONJON);
        };
        ProtoADV.selectionnerDonjon = function (NOM, DIFFICULTE) {
            return new Msg801_1.default().e16(ProtoADV.S_SELECTIONNER_DONJON).eChaine(NOM).e8(DIFFICULTE);
        };
        ProtoADV.inviterJoueurGroupeDonjon = function (NOM_JOUEUR) {
            return new Msg801_1.default().e16(ProtoADV.S_INVITER_JOUEUR_GROUPE_DONJON).eChaine(NOM_JOUEUR);
        };
        ProtoADV.reponseInvitationGroupeDonjon = function (NOM_JOUEUR, ACCEPTER) {
            return new Msg801_1.default().e16(ProtoADV.S_REPONSE_INVITATION_GROUPE_DONJON).eChaine(NOM_JOUEUR).eBool(ACCEPTER);
        };
        ProtoADV.quitterGroupeDonjon = function () {
            return new Msg801_1.default().e16(ProtoADV.S_QUITTER_GROUPE_DONJON);
        };
        ProtoADV.demarrerRechercheGroupeDonjon = function () {
            return new Msg801_1.default().e16(ProtoADV.S_DEMARRER_RECHERCHE_GROUPE_DONJON);
        };
        ProtoADV.demandeDemarrerDonjon = function () {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_DEMARRER_DONJON);
        };
        ProtoADV.joueurPretPourDonjon = function () {
            return new Msg801_1.default().e16(ProtoADV.S_JOUEUR_PRET_POUR_DONJON);
        };
        ProtoADV.demandeAffichageEquipements = function (INDEX_SLOT_EQUIPEMENT) {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_AFFICHAGE_EQUIPEMENTS).e8(INDEX_SLOT_EQUIPEMENT);
        };
        ProtoADV.selectionnerEquipement = function (SLOT, EQUIPEMENT) {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_CHANGEMENT_EQUIPEMENT).e8(SLOT).e16(EQUIPEMENT);
        };
        ProtoADV.annulerLancementDonjon = function () {
            return new Msg801_1.default().e16(ProtoADV.S_ANNULER_LANCEMENT_DONJON);
        };
        ProtoADV.activerOptionDebug = function (CODE, OUI) {
            return new Msg801_1.default().e16(ProtoADV.S_OPTION_DEBUG).e8(CODE).eBool(OUI);
        };
        ProtoADV.demandeChangementMetier = function (PRINCIPAL, ID_METIER, ID_COMP) {
            if (PRINCIPAL) {
                return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_CHANGEMENT_METIER).eBool(true).e16(ID_METIER);
            }
            else {
                return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_CHANGEMENT_METIER).eBool(false).e16(ID_METIER).e16(ID_COMP);
            }
        };
        ProtoADV.demandeSortieDonjon = function () {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_SORTIE_DONJON);
        };
        ProtoADV.demandeAffichageInterfaceTalents = function (CODE_TYPE_ARBRES, ARBRE, PALIER) {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_AFFICHAGE_INTERFACE_TALENTS).e8(CODE_TYPE_ARBRES).e16(ARBRE).e8(PALIER);
        };
        ProtoADV.demandeActivationTalent = function (CODE_ARBRE, CODE_PALIER) {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_ACTIVATION_TALENT).e16(CODE_ARBRE).e8(CODE_PALIER);
        };
        ProtoADV.demandeFermetureNotification = function (IDENTIFIANT_NOTIFICATION) {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_FERMETURE_NOTIFICATION).e16(IDENTIFIANT_NOTIFICATION);
        };
        ProtoADV.enregistrerNouvelleNotification = function (IDENTIFIANT_NOTIFICATION, TEXTE_NOTIFICATION) {
            return new Msg801_1.default().e16(ProtoADV.S_ENREGISTRER_NOUVELLE_NOTIFICATION).e16(IDENTIFIANT_NOTIFICATION).eChaine(TEXTE_NOTIFICATION);
        };
        ProtoADV.rappelerFamilier = function () {
            return new Msg801_1.default().e16(ProtoADV.S_RAPPELER_FAMILIER);
        };
        ProtoADV.changerTitre = function (CODE_TITRE) {
            return new Msg801_1.default().e16(ProtoADV.S_CHANGER_TITRE).e16(CODE_TITRE);
        };
        ProtoADV.demandeInfoDons = function () {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_INFO_DON);
        };
        ProtoADV.demandeInfoSauvegardeDonjon = function (NOM_JOUEUR) {
            return new Msg801_1.default().e16(ProtoADV.S_DEMANDE_INFO_SAUVEGARDE_DONJON).eChaine(NOM_JOUEUR);
        };
        ProtoADV.profilJoueur = function (NOM_JOUEUR) {
            return new Msg801_1.default().e16(ProtoADV.S_PROFIL_JOUEUR).eChaine(NOM_JOUEUR);
        };
        ProtoADV.finDialogue = function (IDENTIFIANT) {
            return new Msg801_1.default().e16(ProtoADV.S_FIN_DIALOGUE).e32(IDENTIFIANT);
        };
        ProtoADV.reponseSauvegardeDonjon = function (CONTINUER) {
            return new Msg801_1.default().e16(ProtoADV.S_REPONSE_SAUVEGARDE_DONJON).eBool(CONTINUER);
        };
        ProtoADV.majMaquillage = function (OUI) {
            return new Msg801_1.default().e16(ProtoADV.S_MAQUILLAGE).eBool(OUI);
        };
        ProtoADV.interfaceTalent = function () {
            return new Msg801_1.default().e16(ProtoADV.S_INTERFACE_TALENT);
        };
        ProtoADV.C_DEBUG_POS_SERVEUR = 0x7001;
        ProtoADV.C_INITIALISATION = 0x8000;
        ProtoADV.C_NOUVEAU_MOBILE = 0x8001;
        ProtoADV.C_LISTE_MOBILE = 0x8002;
        ProtoADV.C_MAJ_CARAC_MOBILE = 0x8003;
        ProtoADV.C_MONDE = 0x8004;
        ProtoADV.C_CORRECTION_POSITION_MOBILE = 0x8006;
        ProtoADV.C_SYNCHRO_DEPLACEMENT_ANGLE = 0x8007;
        ProtoADV.C_SYNCHRO_DEPLACEMENT = 0x8008;
        ProtoADV.C_MORT_MOBILE = 0x8009;
        ProtoADV.C_ANIM_ATTAQUE = 0x800A;
        ProtoADV.C_ANIM_MOBILE = 0x800B;
        ProtoADV.C_AFFICHER_CHIFFRE = 0x800E;
        ProtoADV.C_MASQUER_MOBILE = 0x800F;
        ProtoADV.C_TREMBLEMENT = 0x8010;
        ProtoADV.C_MAJ_SANTE = 0x8011;
        ProtoADV.C_MAJ_ENDURANCE = 0x8012;
        ProtoADV.C_SUPPR_MOBILE = 0x8013;
        ProtoADV.C_NOUVEL_APLAT = 0x8014;
        ProtoADV.C_SUPPR_APLAT = 0x8015;
        ProtoADV.C_MAJ_TEINTURE = 0x8017;
        ProtoADV.C_CHARGE_OBJET = 0x8019;
        ProtoADV.C_PROJECTION = 0x801A;
        ProtoADV.C_MODE_PARADE = 0x801B;
        ProtoADV.C_FIN_ATTAQUE = 0x801C;
        ProtoADV.C_MAJ_LOOK = 0x801D;
        ProtoADV.C_MAJ_ANIM = 0x801E;
        ProtoADV.C_MODE_COMBAT = 0x801F;
        ProtoADV.C_MAJ_COMP = 0x8020;
        ProtoADV.C_MAJ_LISTE_COMP = 0x8021;
        ProtoADV.C_MAJ_FX_MOBILE = 0x8022;
        ProtoADV.C_ECLAIR_LUMIERE = 0x8023;
        ProtoADV.C_BLOQUER_DEPLACEMENT = 0x8024;
        ProtoADV.C_INFO_MONDE = 0x8025;
        ProtoADV.C_DIRECTION_DROITE = 0x8026;
        ProtoADV.C_EQUIPEMENT_ARME = 0x8027;
        ProtoADV.C_EFFET_SPECIAL = 0x8028;
        ProtoADV.C_FX_UNIQUE_MOBILE = 0x8029;
        ProtoADV.C_AJOUTER_APERCU_EFFET = 0x802A;
        ProtoADV.C_SUPPR_APERCU_EFFET = 0x802B;
        ProtoADV.C_FX_MONDE = 0x802C;
        ProtoADV.C_SON_MONDE = 0x802D;
        ProtoADV.C_MAJ_VITESSE_DEPLACEMENT = 0x802E;
        ProtoADV.C_FX_MONDE_SOL = 0x802F;
        ProtoADV.C_REMPLACER_ANIM = 0x8030;
        ProtoADV.C_POSTURE_MOBILE = 0x8031;
        ProtoADV.C_AURA_MOBILE = 0x8032;
        ProtoADV.C_PORTER_MOBILE = 0x8033;
        ProtoADV.C_INTERACTION_MOBILE = 0x8034;
        ProtoADV.C_INTERFACE_JOUEUR = 0x8035;
        ProtoADV.C_AJOUTER_APLAT_MOBILE = 0x8036;
        ProtoADV.C_SUPPRIMER_APLAT_MOBILE = 0x8037;
        ProtoADV.C_AJOUT_COLLISION = 0x8038;
        ProtoADV.C_RETRAIT_COLLISION = 0x8039;
        ProtoADV.C_AFFICHER_COFFRE_RECOMPENSES = 0x803A;
        ProtoADV.C_ANIM_ZELDA = 0x803B;
        ProtoADV.C_CLIGNOTEMENT_DISPARITION_MOBILE = 0x803C;
        ProtoADV.C_MODIFICATION_COLLISION = 0x803D;
        ProtoADV.C_ECURIE_FAMILIERS = 0x803E;
        ProtoADV.C_CHANGEMENT_NOM_FAMILIER = 0x803F;
        ProtoADV.C_MAJ_MARMITE = 0x8040;
        ProtoADV.C_EMOJI = 0x8041;
        ProtoADV.C_INTERFACE_LANCEMENT_DONJON = 0x8042;
        ProtoADV.C_INTERRUPTION_ARME = 0x8043;
        ProtoADV.C_ACTIVATION_ARME = 0x8044;
        ProtoADV.C_DESACTIVATION_ARME = 0x8045;
        ProtoADV.C_INCANTATION_ARME = 0x8046;
        ProtoADV.C_INVITATION_JOUEUR_DONJON = 0x8047;
        ProtoADV.C_ECHEC_INVITATION_JOUEUR_DONJON = 0x8048;
        ProtoADV.C_ANNONCE_INVITATION_JOUEUR_DONJON = 0x8049;
        ProtoADV.C_ANNONCE_REPONSE_INVITATION_JOUEUR_DONJON = 0x804A;
        ProtoADV.C_ANNONCE_DEPART_JOUEUR_GROUPE_DONJON = 0x804B;
        ProtoADV.C_EXPIRATION_INVITATION_JOUEUR_GROUPE_DONJON = 0x804C;
        ProtoADV.C_DISSOLUTION_GROUPE_DONJON = 0x804D;
        ProtoADV.C_INTERFACE_SELECTION_DONJON = 0x804E;
        ProtoADV.C_DIALOGUE = 0x804F;
        ProtoADV.C_NOTIFICATION_LANCEMENT_RECHERCHE_JOUEURS_DONJON = 0x8052;
        ProtoADV.C_INTERFACE_STATUT_RECHERCHE_JOUEURS_DONJON = 0x8053;
        ProtoADV.C_INTERFACE_LANCEMENT_DONJON_IMMINENT = 0x8054;
        ProtoADV.C_NOTIFICATION_ARRET_LANCEMENT_DONJON = 0x8055;
        ProtoADV.C_DEBUT_DONJON = 0x8056;
        ProtoADV.C_AFFICHER_EQUIPEMENTS = 0x8057;
        ProtoADV.C_AFFICHER_LIGNE_DEBUG = 0x8058;
        ProtoADV.C_AFFICHER_CERCLE_DEBUG = 0x8059;
        ProtoADV.C_SUPPRIMER_FORME_DEBUG = 0x805A;
        ProtoADV.C_AFFICHER_INTERFACE_METIER = 0x805B;
        ProtoADV.C_MAJ_RECUPERATION_COMP = 0x805C;
        ProtoADV.C_REANIMATION = 0x805D;
        ProtoADV.C_AFFICHER_RECOMPENSE = 0x805E;
        ProtoADV.C_POPUP_SORTIE_DONJON = 0x805F;
        ProtoADV.C_ARBRE_TALENTS = 0x8060;
        ProtoADV.C_ICONE_VIE = 0x8061;
        ProtoADV.C_AFFICHER_NOTIFICATION = 0x8062;
        ProtoADV.C_FERMER_NOTIFICATION = 0x8063;
        ProtoADV.C_MAJ_IDENTIFIANT_NOTIFICATION = 0x8064;
        ProtoADV.C_MAJ_DUREE_CUISSON_MARMITE = 0x8065;
        ProtoADV.C_CHANGER_SON_AMBIANCE = 0x8066;
        ProtoADV.C_CHANGER_FAMILIER_EN_COURS = 0x8067;
        ProtoADV.C_TELEPORTER_VERS = 0x8068;
        ProtoADV.C_AFFICHER_CARTE_MONDE = 0x8069;
        ProtoADV.C_MAJ_COULEUR_ARME = 0x806A;
        ProtoADV.C_CHANGEMENT_TITRE = 0x806B;
        ProtoADV.C_EFFET_TOUCHE = 0x806C;
        ProtoADV.C_REBOND_MOBILE = 0x806D;
        ProtoADV.C_INFO_DON = 0x806E;
        ProtoADV.C_INTERFACE_CHARGEMENT = 0x806F;
        ProtoADV.C_DONNEE_SECTEUR = 0x8070;
        ProtoADV.C_QUETE_NOUVEL_OBJECTIF = 0x8071;
        ProtoADV.C_QUETE_SUPPRIMER_OBJECTIF = 0x8072;
        ProtoADV.C_QUETE_VALIDER_OBJECTIF = 0x8073;
        ProtoADV.C_INTERFACE_SAUVEGARDE_DONJON = 0x8074;
        ProtoADV.C_MESSAGE_MOBILE = 0x8075;
        ProtoADV.C_DEF_COLLISION_RENCONTRE = 0x8076;
        ProtoADV.C_AFFICHER_AVERTISSEMENT_TELEPORTATION = 0x8077;
        ProtoADV.C_CACHE_PICTO = 0x8078;
        ProtoADV.C_DONJON_DISPO = 0x8079;
        ProtoADV.C_GAIN_XP = 0x807A;
        ProtoADV.C_POPUP_SAUVEGARDE_DONJON = 0x807B;
        ProtoADV.C_ETAT_PLANTE_BOTANISTE = 0x807C;
        ProtoADV.C_RESET_QUETE = 0x807D;
        ProtoADV.C_MUSIQUE_COMBAT = 0x807E;
        ProtoADV.C_POPUP_KICKSTARTER = 0x807F;
        ProtoADV.C_SIGNAL_MARMITE = 0x8080;
        ProtoADV.C_CHANGEMENT_EQUIPE = 0x8081;
        ProtoADV.C_AFFICHER_CONSOLE = 0x8082;
        ProtoADV.C_FX_ECHELLE_APLAT = 0x8083;
        ProtoADV.S_SYNCHRO_JOUEUR = 0x9001;
        ProtoADV.S_ATTAQUE = 0x9002;
        ProtoADV.S_MODE_PARADE = 0x9003;
        ProtoADV.S_ANIM_ATTAQUE = 0x9004;
        ProtoADV.S_ACTIVATION_COMP = 0x9005;
        ProtoADV.S_DIRECTION_DROITE = 0x9006;
        ProtoADV.S_ACTIVATION_TIR = 0x9007;
        ProtoADV.S_INTERACTION_MOBILE = 0x9008;
        ProtoADV.S_SELECTION_RECOMPENSE_COFFRE = 0x9009;
        ProtoADV.S_SPAWN_FAMILIER = 0x900A;
        ProtoADV.S_CHANGEMENT_NOM_FAMILIER = 0x900B;
        ProtoADV.S_ACTIVATION_ARME = 0x900C;
        ProtoADV.S_EMOJI = 0x900D;
        ProtoADV.S_INTERRUPTION_ARME = 0x900E;
        ProtoADV.S_DESACTIVATION_ARME = 0x900F;
        ProtoADV.S_INCANTATION_ARME = 0x9010;
        ProtoADV.S_DEMANDE_INTERFACE_LANCEMENT_DONJON = 0x9011;
        ProtoADV.S_DEMANDE_INTERFACE_SELECTION_DONJON = 0x9012;
        ProtoADV.S_SELECTIONNER_DONJON = 0x9013;
        ProtoADV.S_INVITER_JOUEUR_GROUPE_DONJON = 0x9014;
        ProtoADV.S_REPONSE_INVITATION_GROUPE_DONJON = 0x9015;
        ProtoADV.S_QUITTER_GROUPE_DONJON = 0x9016;
        ProtoADV.S_DEMARRER_RECHERCHE_GROUPE_DONJON = 0x9017;
        ProtoADV.S_DEMANDE_DEMARRER_DONJON = 0x9018;
        ProtoADV.S_JOUEUR_PRET_POUR_DONJON = 0x9019;
        ProtoADV.S_DEMANDE_AFFICHAGE_EQUIPEMENTS = 0x901A;
        ProtoADV.S_DEMANDE_CHANGEMENT_EQUIPEMENT = 0x901B;
        ProtoADV.S_ANNULER_LANCEMENT_DONJON = 0x901C;
        ProtoADV.S_OPTION_DEBUG = 0x901D;
        ProtoADV.S_DEMANDE_CHANGEMENT_METIER = 0x901E;
        ProtoADV.S_DEMANDE_SORTIE_DONJON = 0x901F;
        ProtoADV.S_DEMANDE_AFFICHAGE_INTERFACE_TALENTS = 0x9020;
        ProtoADV.S_DEMANDE_ACTIVATION_TALENT = 0x9021;
        ProtoADV.S_DEMANDE_FERMETURE_NOTIFICATION = 0x9022;
        ProtoADV.S_ENREGISTRER_NOUVELLE_NOTIFICATION = 0x9023;
        ProtoADV.S_RAPPELER_FAMILIER = 0x9024;
        ProtoADV.S_CHANGER_TITRE = 0x9025;
        ProtoADV.S_DEMANDE_INFO_DON = 0x9026;
        ProtoADV.S_DEMANDE_INFO_SAUVEGARDE_DONJON = 0x9027;
        ProtoADV.S_PROFIL_JOUEUR = 0x9028;
        ProtoADV.S_FIN_DIALOGUE = 0x9029;
        ProtoADV.S_REPONSE_SAUVEGARDE_DONJON = 0x902A;
        ProtoADV.S_MAQUILLAGE = 0x902B;
        ProtoADV.S_INTERFACE_TALENT = 0x902C;
        ProtoADV.C_OUVERTURE_EDITEUR = 0x8801;
        ProtoADV.C_LISTE_PICTO_EDITEUR = 0x8802;
        ProtoADV.C_EDITEUR_OPTION_MONDE = 0x8803;
        ProtoADV.C_MAJ_LISTE_EQUIPEMENT = 0x8805;
        ProtoADV.C_DESSIN = 0x8806;
        ProtoADV.C_SUPPR_DESSIN = 0x8807;
        ProtoADV.C_SELECTION_EDITEUR = 0x8808;
        ProtoADV.S_DEMANDE_OUVERTURE_EDITEUR = 0x9801;
        ProtoADV.S_EDITEUR_NOUVEAU_PICTO = 0x9802;
        ProtoADV.S_EDITEUR_PLACEMENT_PICTO = 0x9803;
        ProtoADV.S_EDITEUR_PLACEMENT_APLAT = 0x9804;
        ProtoADV.S_EDITEUR_SUPPR_PICTO = 0x9805;
        ProtoADV.S_EDITEUR_SUPPR_PICTO_LISTE = 0x9806;
        ProtoADV.S_EDITEUR_OPTION_MONDE = 0x9807;
        ProtoADV.S_EDITEUR_MAJ_OPTION_MONDE = 0x9808;
        ProtoADV.S_EDITEUR_MAJ_TEINTURE = 0x9809;
        ProtoADV.S_SPAWN_MONSTRE = 0x980D;
        ProtoADV.S_DEMANDE_ADMIN_EQUIPEMENT = 0x980E;
        ProtoADV.S_NOUVEAU_EQUIPEMENT = 0x980F;
        ProtoADV.S_SUPPR_EQUIPEMENT = 0x9810;
        ProtoADV.S_EQUIPER_EQUIPEMENT = 0x9811;
        ProtoADV.S_ROTATION_PICTO = 0x9812;
        ProtoADV.S_INCARNER_MONSTRE = 0x9813;
        ProtoADV.S_PROFONDEUR_APLAT = 0x9814;
        ProtoADV.S_DESSIN = 0x9815;
        ProtoADV.S_SUPPR_DESSIN = 0x9816;
        ProtoADV.S_DEF_RENCONTRE = 0x9817;
        ProtoADV.S_SELECTION_EDITEUR = 0x9818;
        ProtoADV.S_PLACEMENT_INTERIEUR = 0x9819;
        ProtoADV.S_ROTATION_INTERIEUR = 0x981A;
        ProtoADV.S_PROFONDEUR_INTERIEUR = 0x981B;
        ProtoADV.S_SUPPR_INTERIEUR = 0x981C;
        ProtoADV.S_DEMANDE_AJOUT_COLLISION = 0x981D;
        ProtoADV.S_DEMANDE_MODIFICATION_EXTREMITES_COLLISIONS = 0x981E;
        ProtoADV.S_DEMANDE_RETRAIT_COLLISIONS = 0x981F;
        ProtoADV.S_MAJ_RECTANGLES_LUMIERE = 0x9820;
        return ProtoADV;
    }());
    exports.default = ProtoADV;
});
//# sourceMappingURL=ProtoADV.js.map