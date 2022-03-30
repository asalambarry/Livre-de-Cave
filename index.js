"use strict";

/**
 * Stock Object
 * 
 * @param {*} anneeProduction 
 * @param {*} nomDomaine 
 * @param {*} nbBouteilles 
 */
function Stock(anneeProduction, nomDomaine, nbBouteilles) {

    this.anneeProduction = anneeProduction;
    this.nomDomaine = nomDomaine;
    this.nbBouteilles = nbBouteilles;

    this.setAnneeProduction = anneeProduction => {
        this.anneeProduction = anneeProduction;
    }

    this.getAnneeProduction = () => {
        return this.anneeProduction;
    }

    this.setNomDomaine = nomDomaine => {
        this.nomDomaine = nomDomaine;
    }

    this.getNomDomaine = () => {
        return this.nomDomaine;
    }

    this.setNbBouteilles = nbBouteilles => {
        this.nbBouteilles = nbBouteilles;
    }

    this.getNbBouteilles = () => {
        return this.nbBouteilles;
    }

    this.toString = () => {
        return `[anneeProduction: ${this.anneeProduction}, nomDomaine: ${this.nomDomaine}, nbBouteilles: ${this.nbBouteilles}]`;
    }

}

/**
 * Cave Object
 */
function Cave() {

    this.stock = [];

    this.ajouterStock = (stock) => {
        this.stock.push(stock);
    }

    this.diminuerNBBouteille = nomDomaine => {
        const stockIndex = this.stock.findIndex((value, index, obj) => value.nomDomaine === nomDomaine);
        if(stockIndex > -1) {
            this.stock[stockIndex].nbBouteilles += -1;
            if(this.stock[stockIndex].nbBouteilles === 0) {
                delete this.stock[stockIndex];
                this.stock.splice(stockIndex, 1);
            }
        }
    }

    this.nbTotalBouteille = () => {
        return this.stock.reduce((total, stock) => total + Number(stock.nbBouteilles), 0);
    }
}

const cave = new Cave();

/**
 * Enregistrer le stock
 * 
 * @returns 
 */
function saveStock() {
    const anneeProduction = document.querySelector('#anneeProduction').value;
    const nomDomaine = document.querySelector('#nomDomaine').value;
    const nbBouteilles = document.querySelector('#nbBouteilles').value;
    if( ! anneeProduction || ! nomDomaine || ! nbBouteilles) {
        window.alert('Veuillez remplir tous les champs');
    }
    else {
        cave.ajouterStock(new Stock(Number(anneeProduction), nomDomaine, Number(nbBouteilles)));
        updateAffichage();
    }
    return false;
}

/**
 * Diminuer le stock
 * 
 * @returns 
 */
function diminuerBouteilles() {
    const nomDomaine = document.querySelector('#nomDomaineR').value;
    if( ! nomDomaine) {
        window.alert('Fournissez le nom de domaine');
    }
    else {
        cave.diminuerNBBouteille(nomDomaine);
        updateAffichage();
    }
    return false;
}

/**
 * Mettre a jour l'affichage HTML
 */
const updateAffichage = () => {
    document.querySelector('#cave').innerHTML = cave.stock.join('<br/>');
    document.querySelector('#totalBouteilles').innerHTML = cave.nbTotalBouteille();
}

window.addEventListener('load', function(e) {
    updateAffichage()
}, false);
