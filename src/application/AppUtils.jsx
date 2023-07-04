
// =======================================
// Fonction "isValidTransactionHashFormat"
// =======================================
/**
 * Indique si la valeur passée est oui ou non au format d'un "transaction hash"
 * @param stringToTest Value to test (string)
 */
export const isValidTransactionHashFormat = (stringToTest) => {

    // Teste si la valeur passée ne contient que des caractères hexadécimaux, et fait bien 64 caractères au total
    if(stringToTest.match(/^[0-9a-fA-F]+$/i) && stringToTest.length === 64)
        return true;
    else
        return false;

}


// ====================================
// Fonction "isValidTerraAddressFormat"
// ====================================

/**
 * Indique si la valeur passée est oui ou non au format d'une adresse Terra Classic
 * @param stringToTest Value to test (string)
 * @param terraAddressHeader Adresse header (ex : "terra1" for accounts, "terravaloper1" for validators, etc)
 */
export const isValidTerraAddressFormat = (stringToTest, terraAddressHeader) => {

    // Différents formats possibles :
    //  - adresse au format "terra1" (44 caractères au total)               <--- adresse de compte "standard"
    //  - adresse au format "terrapub1" (47 caractères au total)
    //  - adresse au format "terravaloper1" (51 caractères au total)        <--- adresse d'un validateur
    //  - adresse au format "terravaloperpub1" (54 caractères au total)
    //  - adresse au format "terravalcons1" (51 caractères au total)

    // Les adresses Terra Classic sont donc au format terra[xxx]1[yyy]
    //  - avec 'xxx', une entête spécifique (0 à plusieurs caractères)
    //  - et 'yyy', 38 caractères obligatoires

    var regex = new RegExp('^' + terraAddressHeader, 'g');      // On va rechercher tout ce qui commence par terra[...]1[...]

    if(stringToTest.match(regex) && stringToTest.length === (terraAddressHeader.length + 38))
        return true;

    return false;

}


// ===================================
// Fonction "isValidBlockNumberFormat"
// ===================================
/**
 * Indique si la valeur passée est oui ou non au format d'un numéro de block Terra Classic
 * @param stringToTest Value to test (string)
 */
export const isValidBlockNumberFormat = (stringToTest) => {

    // Teste si la valeur passée ne contient que des chiffres (en filtrant les chaînes de 64 caractères, correspondant aux "transactions hash")
    if(stringToTest.match(/^[0-9]+$/i) && stringToTest.length !== 64)
        return true;
    else
        return false;

}


