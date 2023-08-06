import React, { useEffect, useState } from 'react';
import styles from './BlockLatestBlocks.module.scss';
import { BlocksIcon } from '../../application/AppIcons';
import { Link } from 'react-router-dom';
import { getLatestBlocks } from './getLatestBlocks';


const BlockLatestBlocks = () => {

    // Variables react
    const [ derniersBlocks, setDerniersBlocks ] = useState();           // Ici les 'n' derniers blocks [height, nbtx, proposerAddress]
    const [ msgErreurGetDerniersBlocks, setMsgErreurGetDerniersBlocks ] = useState();

    // Récupération d'infos, au chargement du component
    useEffect(() => {
        getLatestBlocks(10).then((res) => {
            if(res['erreur']) {
                setMsgErreurGetDerniersBlocks(res['erreur']);
                setDerniersBlocks([]);
            }
            else {
                setDerniersBlocks(res);
                setMsgErreurGetDerniersBlocks('');
            }
        });
    }, [])

    // Affichage
    return (
        <>
            <h2><strong><BlocksIcon /></strong><span><strong>Latest Blocks</strong></span></h2>
            <table className={styles.tblListOfBlocks}>
                <thead>
                    <tr>
                        <th>Height</th>
                        <th>Nb&nbsp;Tx</th>
                        <th>Validator</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {derniersBlocks ? derniersBlocks.map((valeur, clef) => {
                        return (
                            <tr key={clef}>
                                <td><Link to={'/blocks/' + valeur[0]}>{valeur[0]}</Link></td>
                                <td>{valeur[1]}</td>
                                <td><Link to={'/validators/' + valeur[3]}>{valeur[4]}</Link></td>
                                <td>{valeur[5]}</td>
                            </tr> 
                    )}) : <tr><td colSpan="4">Loading data from blockchain ...</td></tr> }
                </tbody>
            </table>
            <div className={styles.comments}>
                <u>Nb Tx</u> = number of transactions made in a block<br />
                <u>Validator</u> = proposer (tendermint)
            </div>
            <div className="erreur">{msgErreurGetDerniersBlocks}</div>
        </>
    );
};

export default BlockLatestBlocks;