import React, { useEffect, useState } from 'react';
import { HomeIcon } from '../../application/AppIcons';
import styles from './PageHome.module.scss';
import BlockSearch from './BlockSearch';
import BlockOverview from './BlockOverview';
import BlockLatestBlocksV2 from './BlockLatestBlocksV2';
import BlockValidatorsV2 from './BlockValidatorsV2';
import BlockTotalSupplies from './BlockTotalSupplies';
import BlockAccounts from './BlockAccounts';
import { appName } from '../../application/AppParams';
import BlockBurn from './BlockBurn';
import { loadCommonAppDatas } from './PageHome.loader';

const PageHome = () => {

    // Variables react
    const [datetimeDernierUpdate, setDatetimeDernierUpdate] = useState('...');
    const [totalSupplies, setTotalSupplies] = useState();
    const [latestBlockHeightAndDatetime, setLatestBlockHeightAndDatetime] = useState();

    useEffect(() => {
        // Changement du "title" de la page web
        document.title = 'Home - ' + appName;

        // Mémorisation de la date/heure de chargement de cette page
        const maDate = Date.now();
        setDatetimeDernierUpdate(new Date(maDate).toLocaleString());

        // Chargement des données communes
        loadCommonAppDatas().then((res) => {
            setTotalSupplies(res['totalSupplies']);
            setLatestBlockHeightAndDatetime(res['latestBlockHeightAndDatetime']);
        })

    }, [])


    // Et affichage de la page, au final
    return (
        <>
            <h1><HomeIcon /><span><strong>Home</strong> (dashboard)</span></h1>
            <p className="datetimeupdate">→ Last data update : {datetimeDernierUpdate}</p>
            <br />
            {(latestBlockHeightAndDatetime?.erreur) ? <><div className="errorBlock">{latestBlockHeightAndDatetime.erreur}</div><br /></> : null}
            <div className={styles.blocksHomepage}>
                <BlockSearch />
                <BlockBurn />
                <BlockOverview totalSupplies={totalSupplies} latestBlockHeightAndDatetime={latestBlockHeightAndDatetime} />
                <BlockLatestBlocksV2 latestBlockHeightAndDatetime={latestBlockHeightAndDatetime} />
                <BlockAccounts />
                <BlockValidatorsV2 />
                <BlockTotalSupplies totalSupplies={totalSupplies} />
            </div>
        </>
    );
};

export default PageHome;