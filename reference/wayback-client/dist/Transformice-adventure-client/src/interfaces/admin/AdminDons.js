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
define(["require", "exports", "../../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../../Souritheque-client/src/interface/souruis/elements/I_Bouton", "../../_tfmAdventure/TFMAdventure", "../../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../../Souritheque-client/src/interface/Couleur", "../../../../Souritheque-client/src/interface/souruis/elements/I_Element", "../../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../../Souritheque-client/src/outils/Trad801"], function (require, exports, I_Conteneur_1, I_Bouton_1, TFMAdventure_1, I_Texte_1, Couleur_1, I_Element_1, I_Image_1, Trad801_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdminDons = (function (_super) {
        __extends(AdminDons, _super);
        function AdminDons() {
            var _this = _super.call(this) || this;
            _this.modeFenetre("Administration", AdminDons.fermer);
            _this.defLargeur(600);
            _this.defHauteurMax("80%");
            _this.etirerDansParent(50, 50, 50, undefined);
            _this.conteneur = new I_Conteneur_1.I_Conteneur();
            _this.conteneur.activerAscenseur();
            _this.ajouterElement(_this.conteneur);
            _this.ajouterElement(new I_Bouton_1.I_Bouton("Fermer", function () {
                AdminDons.fermer();
            }));
            return _this;
        }
        AdminDons.afficher = function (MSG) {
            if (!AdminDons.instance) {
                AdminDons.instance = new AdminDons();
            }
            AdminDons.instance.initialisation(MSG);
            TFMAdventure_1.default.ajouterInterface(AdminDons.instance.elementHTML);
        };
        AdminDons.estAffiche = function () {
            return AdminDons.instance && AdminDons.instance.elementHTML.parentNode != null;
        };
        AdminDons.fermer = function () {
            if (AdminDons.instance) {
                AdminDons.instance.elementHTML.remove();
            }
        };
        AdminDons.prototype.initialisation = function (MSG) {
            this.conteneur.vider();
            var categorieEnCours = -1;
            var nb = MSG.l16();
            for (var i = 0; i < nb; i++) {
                var categorie = MSG.l16();
                var nomCategorie = MSG.lChaine();
                var codeDon = MSG.l16();
                var nomDon = MSG.lChaine();
                var deprecie = MSG.lBool();
                var faible = MSG.lBool();
                var fxManquant = MSG.lBool();
                if (categorieEnCours != categorie) {
                    categorieEnCours = categorie;
                    var titreCategorie = this.conteneur.nouvelleLigne();
                    titreCategorie.afficherFondUni("#000000" + "80");
                    titreCategorie.ajouterElement(new I_Texte_1.I_Texte(categorie + " - " + nomCategorie).defCouleur(Couleur_1.Couleur._ORANGE));
                }
                var conteneurDon = this.conteneur.nouvelleLigne();
                conteneurDon.defHauteurMin("110px");
                conteneurDon.ajouterElement(this.recupIconeDon(codeDon, categorie, deprecie, faible));
                var conteneurDesc = conteneurDon.nouvelleColonne();
                var texteNom = Trad801_1.default.trad("$don." + codeDon + ".nom");
                var texteDesc = Trad801_1.default.trad("$don." + codeDon + ".description");
                conteneurDesc.ajouterElement(new I_Texte_1.I_Texte((faible ? "❄️ " : "") + (fxManquant ? "🔥 " : "") + texteNom + " (" + codeDon + ")").defCouleur(texteNom.charAt(0) == "$" ? "#FF0000" : (faible ? "#00DEE6" : "#7FCD57")));
                conteneurDesc.ajouterElement(new I_Texte_1.I_Texte(texteDesc).defCouleur(texteDesc.charAt(0) == "$" ? "#FF0000" : "#b49688"));
            }
        };
        AdminDons.prototype.recupIconeDon = function (CODE, CATEGORIE, DEPRECIE, FAIBLE) {
            var icone = new I_Element_1.I_Element();
            icone.style.margin = "15px";
            icone.style.position = "relative";
            icone.defLargeurMin("90px");
            var image = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/dons/" + CODE + ".jpg"));
            image.style.position = "absolute";
            image.style.width = "80px";
            image.style.height = "80px";
            var cadre = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/dons/cadres/" + CATEGORIE + ".png"));
            cadre.style.position = "absolute";
            cadre.style.width = "110px";
            cadre.style.height = "110px";
            cadre.style.left = "-10px";
            cadre.style.top = "-12px";
            icone.appendChild(image);
            icone.appendChild(cadre);
            if (DEPRECIE) {
                cadre.style.filter = "grayscale(100%) brightness(50%)";
                image.style.filter = "grayscale(100%) brightness(50%)";
                var imageCroix = document.createElement("canvas");
                imageCroix.style.position = "absolute";
                imageCroix.style.left = "-10px";
                imageCroix.style.top = "-12px";
                imageCroix.width = 110;
                imageCroix.height = 110;
                var ctx = imageCroix.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = "#FF0000";
                ctx.lineWidth = 10;
                ctx.moveTo(0, 0);
                ctx.lineTo(110, 110);
                ctx.moveTo(110, 0);
                ctx.lineTo(0, 110);
                ctx.stroke();
                icone.appendChild(imageCroix);
            }
            return icone;
        };
        return AdminDons;
    }(I_Conteneur_1.I_Conteneur));
    exports.AdminDons = AdminDons;
});
//# sourceMappingURL=AdminDons.js.map