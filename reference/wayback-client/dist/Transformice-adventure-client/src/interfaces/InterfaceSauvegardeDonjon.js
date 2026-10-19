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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/interface/souruis/elements/I_Image", "./types/EquipementADV", "../_enums/SlotEquipementADV", "../../../Souritheque-client/src/outils/Trad801", "../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../_tfmAdventure/TFMAdventure"], function (require, exports, I_Conteneur_1, I_Texte_1, I_Image_1, EquipementADV_1, SlotEquipementADV_1, Trad801_1, I_Bouton_1, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceSauvegardeDonjon = (function (_super) {
        __extends(InterfaceSauvegardeDonjon, _super);
        function InterfaceSauvegardeDonjon() {
            var _this = _super.call(this) || this;
            _this.etirerContenu();
            _this.conteneurPrincipal = new I_Conteneur_1.I_Conteneur("colonne");
            _this.conteneurPrincipal.activerAscenseur();
            _this.ajouterElement(_this.conteneurPrincipal);
            _this.texteEtape = new I_Texte_1.I_Texte();
            _this.conteneurCompetences = new I_Conteneur_1.I_Conteneur("ligne");
            _this.conteneurCompetences.multiligne();
            _this.conteneurEquipement = new I_Conteneur_1.I_Conteneur("ligne");
            _this.conteneurEquipement.multiligne();
            _this.conteneurDons = new I_Conteneur_1.I_Conteneur("ligne");
            _this.conteneurDons.multiligne();
            _this.conteneurPrincipal.ajouterElement(_this.texteEtape, new I_Texte_1.I_Texte(Trad801_1.default.trad("$DonjonCompetences")), _this.conteneurCompetences, new I_Texte_1.I_Texte(Trad801_1.default.trad("$DonjonEquipements")), _this.conteneurEquipement, new I_Texte_1.I_Texte(Trad801_1.default.trad("$DonjonDons")), _this.conteneurDons);
            return _this;
        }
        InterfaceSauvegardeDonjon.afficher = function (MSG) {
            var iface = new InterfaceSauvegardeDonjon();
            iface.modeFenetre("", function () {
                iface.elementHTML.remove();
            });
            iface.centrerAuto();
            iface.defLargeur(800);
            iface.defHauteurMax(600);
            iface.majInterface(MSG);
            iface.ajouterElement(new I_Bouton_1.I_Bouton(Trad801_1.default.trad("$bouton.ok"), function (EVT) {
                iface.elementHTML.remove();
            }));
            TFMAdventure_1.default.ajouterInterface(iface);
        };
        InterfaceSauvegardeDonjon.recupConteneurSauvegardeDonjon = function (MSG) {
            var iface = new InterfaceSauvegardeDonjon();
            iface.majInterface(MSG);
            return iface;
        };
        InterfaceSauvegardeDonjon.prototype.majInterface = function (MSG) {
            var etape = MSG.l8();
            if (etape == 0) {
                return;
            }
            this.texteEtape.defTexte(Trad801_1.default.trad("$DonjonEtape", etape) + " : " + etape);
            this.conteneurCompetences.vider();
            for (var i = 0; i < 3; i++) {
                var idCompetence = MSG.l32s();
                if (idCompetence > 0) {
                    var iconeComp = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("comp/" + idCompetence + ".png"));
                    iconeComp.defLargeur(60);
                    iconeComp.defHauteur(60);
                    this.conteneurCompetences.ajouterElement(iconeComp);
                }
            }
            this.conteneurEquipement.vider();
            var nombreEquipements = MSG.l16();
            for (var i = 0; i < nombreEquipements; i++) {
                var slot = SlotEquipementADV_1.default[SlotEquipementADV_1.default[MSG.l16()]];
                var equipement = EquipementADV_1.default.deserialiser(MSG);
                var bouton = equipement.recupSpriteHTML(slot);
                this.conteneurEquipement.ajouterElement(bouton);
            }
            this.conteneurDons.vider();
            var nombreDons = MSG.l16();
            for (var i = 0; i < nombreDons; i++) {
                var identifiant = MSG.l32s();
                var categorie = MSG.l32s();
                var conteneurIconeDon = new I_Conteneur_1.I_Conteneur();
                conteneurIconeDon.defLargeur(100).defHauteur(100);
                conteneurIconeDon.alignementEnfants("center").justifierEnfants("center");
                var imageCadre = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/dons/cadres/" + categorie + ".png"));
                imageCadre.style.position = "relative";
                imageCadre.style.margin = "0px";
                imageCadre.style.top = "50px";
                imageCadre.style.zIndex = "1";
                var iconeDon = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/dons/" + identifiant + ".jpg"));
                iconeDon.style.position = "relative";
                iconeDon.style.margin = "0px";
                iconeDon.style.top = "-48px";
                iconeDon.style.left = "-5px";
                conteneurIconeDon.ajouterElement(imageCadre);
                conteneurIconeDon.ajouterElement(iconeDon);
                conteneurIconeDon.style.margin = "0 0.6em 0 0";
                this.conteneurDons.ajouterElement(conteneurIconeDon);
            }
        };
        return InterfaceSauvegardeDonjon;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceSauvegardeDonjon;
});
//# sourceMappingURL=InterfaceSauvegardeDonjon.js.map