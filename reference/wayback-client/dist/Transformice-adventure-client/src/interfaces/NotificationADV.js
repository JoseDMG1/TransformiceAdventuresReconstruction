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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../_tfmAdventure/TFMAdventure", "../_tfmAdventure/ProtoADV", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/outils/affichage/animation/AnimMath"], function (require, exports, I_Conteneur_1, TFMAdventure_1, ProtoADV_1, I_Texte_1, Trad801_1, AnimMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotificationADV = (function (_super) {
        __extends(NotificationADV, _super);
        function NotificationADV(TEXTE, IDENTIFIANT) {
            if (IDENTIFIANT === void 0) { IDENTIFIANT = 0; }
            var _this = _super.call(this, "colonne") || this;
            _this.estAffichee = false;
            _this.centrerAuto(0.5, 1, -0.5, 0);
            _this.style.top = "";
            _this.style.bottom = "-50%";
            _this.afficherFondUni("#000000DD")
                .defLargeurMin("8em")
                .defLargeurMax("15em");
            if (IDENTIFIANT == 0) {
                IDENTIFIANT = ++NotificationADV.dernierIdentifiant;
            }
            else if (IDENTIFIANT > NotificationADV.dernierIdentifiant) {
                NotificationADV.dernierIdentifiant = IDENTIFIANT;
            }
            _this.identifiant = IDENTIFIANT;
            _this.texte = TEXTE;
            _this.champTexte = new I_Texte_1.I_Texte(Trad801_1.default.trad(_this.texte)).defAlignement("center");
            _this.ajouterElement(_this.champTexte);
            _this.rendreCliquable(function () { return _this.fermer(); });
            _this.defCSS({
                border: "2px solid #ffd74f",
                boxShadow: "0px 0px 8px #ffd74f"
            });
            return _this;
        }
        NotificationADV.afficher = function (TEXTE, DUREE) {
            var notification = new NotificationADV(TEXTE);
            this.enregistrerNotification(notification);
            this.afficherNotification(notification);
            if (DUREE) {
                setTimeout(function () {
                    notification.fermer(false);
                }, DUREE);
            }
            TFMAdventure_1.default.envoyer(ProtoADV_1.default.enregistrerNouvelleNotification(notification.identifiant, notification.texte));
        };
        NotificationADV.afficherDepuisServeur = function (IDENTIFIANT, TEXTE) {
            var notification = new NotificationADV(TEXTE, IDENTIFIANT);
            this.enregistrerNotification(notification);
            this.afficherNotification(notification);
        };
        NotificationADV.afficherNotification = function (NOTIFICATION) {
            for (var _i = 0, _a = Object.keys(this.indexNotifications); _i < _a.length; _i++) {
                var idNotification = _a[_i];
                this.indexNotifications[idNotification].fermer(true);
            }
            NOTIFICATION.afficher();
        };
        NotificationADV.enregistrerNotification = function (NOTIFICATION) {
            this.indexNotifications[NOTIFICATION.identifiant] = NOTIFICATION;
        };
        NotificationADV.fermer = function (IDENTIFIANT, PREVENIR_SERVEUR) {
            if (PREVENIR_SERVEUR === void 0) { PREVENIR_SERVEUR = true; }
            var notification = this.indexNotifications[IDENTIFIANT];
            if (notification) {
                notification.fermer(PREVENIR_SERVEUR);
                this.supprimerNotification(notification.identifiant);
            }
        };
        NotificationADV.supprimerNotification = function (IDENTIFIANT) {
            delete this.indexNotifications[IDENTIFIANT];
        };
        NotificationADV.majIdentifiant = function (ANCIEN_IDENTIFIANT, IDENTIFIANT) {
            var notification = this.indexNotifications[ANCIEN_IDENTIFIANT];
            if (notification) {
                this.indexNotifications[IDENTIFIANT] = notification;
                notification.identifiant = IDENTIFIANT;
                delete this.indexNotifications[ANCIEN_IDENTIFIANT];
            }
            if (IDENTIFIANT > this.dernierIdentifiant) {
                this.dernierIdentifiant = IDENTIFIANT;
            }
        };
        NotificationADV.prototype.afficher = function () {
            var _this = this;
            if (this.estAffichee) {
                return;
            }
            TFMAdventure_1.default.ajouterInterface(this.elementHTML);
            this.estAffichee = true;
            AnimMath_1.default.animBoucle(1000, function (PROGRESSION) {
                _this.style.bottom = 12 + (PROGRESSION * 3) + "%";
            }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
        };
        NotificationADV.prototype.fermer = function (PREVENIR_SERVEUR) {
            var _this = this;
            if (PREVENIR_SERVEUR === void 0) { PREVENIR_SERVEUR = true; }
            if (!this.estAffichee) {
                return;
            }
            this.estAffichee = false;
            if (PREVENIR_SERVEUR) {
                TFMAdventure_1.default.envoyer(ProtoADV_1.default.demandeFermetureNotification(this.identifiant));
            }
            AnimMath_1.default.animBoucle(1000, function (PROGRESSION) {
                _this.style.opacity = "" + (1 - PROGRESSION);
            }).defFonctionFin(function () {
                _this.elementHTML.remove();
            }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
        };
        NotificationADV.indexNotifications = {};
        NotificationADV.dernierIdentifiant = 0;
        return NotificationADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = NotificationADV;
});
//# sourceMappingURL=NotificationADV.js.map