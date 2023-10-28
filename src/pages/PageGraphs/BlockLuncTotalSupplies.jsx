import React, { useEffect, useState } from 'react';
import gridplace from './BlockLuncTotalSupplies.module.scss';
import styles from './BlockCharts.module.scss';
import Chart from 'react-apexcharts';

import StyledBox from '../../sharedComponents/StyledBox';
import { getLuncTotalSupplies } from './getLuncTotalSupplies';
import { metEnFormeGrandNombre2 } from '../../application/AppUtils';
import { AppContext } from '../../application/AppContext';


const BlockLuncTotalSupplies = () => {

    // Variables react
    const [isLoading, setIsLoading] = useState(true);
    const [msgErreur, setMsgErreur] = useState();

    const [timeunit, setTimeunit] = useState();
    const [tblLuncTotalSupplies, setTblLuncTotalSupplies] = useState([]);
    const [tblDatetimeTotalSupplies, setTblDatetimeTotalSupplies] = useState([]);
    const [lastValue, setLastValue] = useState('...');

    const { theme } = AppContext();


    // Fonction de sélection d'unité de temps
    const handleClickOnTimeUnits = (val) => {
        setTimeunit(val);
        loadDataWithThisTimeunit(val);
    }

    // Fonction de filtrage des valeurs
    const loadDataWithThisTimeunit = (valFiltre) => {
        setIsLoading(true);
        setTblLuncTotalSupplies([]);
        setTblDatetimeTotalSupplies([]);
        setLastValue('...');

        getLuncTotalSupplies(valFiltre).then((res) => {
            if(res['erreur']) {
                setIsLoading(false);
                setMsgErreur(res['erreur']);
            }
            else {
                setTblLuncTotalSupplies(res['LuncSupplies']);
                setTblDatetimeTotalSupplies(res['datetime']);
                setLastValue(res['last']);
                setIsLoading(false);
                setMsgErreur("");
            }
        })
    }

    // Chargement des données
    useEffect(() => {
        handleClickOnTimeUnits('D1');
        // eslint-disable-next-line
    }, [])

    // Et affichage
    return (
        <StyledBox title="LUNC total supply" color="blue" className={gridplace.totalSuppliesBlock}>
            <div className={styles.entete}>
                <div className={styles.libelle}>Last : <strong>{metEnFormeGrandNombre2(lastValue, 4)}</strong></div>
                <div className={styles.tblTimeunits}>
                    <button className={timeunit === 'H1' ? styles.selectedFilter : ""} onClick={() => handleClickOnTimeUnits('H1')}><strong>1h</strong></button>
                    <button className={timeunit === 'H4' ? styles.selectedFilter : ""} onClick={() => handleClickOnTimeUnits('H4')}><strong>4h</strong></button>
                    <button className={timeunit === 'D1' ? styles.selectedFilter : ""} onClick={() => handleClickOnTimeUnits('D1')}><strong>D</strong></button>
                    <button className={timeunit === 'W1' ? styles.selectedFilter : ""} onClick={() => handleClickOnTimeUnits('W1')}><strong>W</strong></button>
                    {/* <button className={timeunit === 'M1' ? styles.selectedFilter : ""} onClick={() => handleClickOnTimeUnits('M1')}><strong>M1</strong></button> */}
                </div>
            </div>
            {msgErreur ?
                <div className="erreur">{msgErreur}</div>
            :
                <div className={styles.charts}>
                    <div className={styles.chart}>
                        <Chart
                            series={[{
                                name: "LUNC total supply",
                                type: "area",
                                data: tblLuncTotalSupplies
                            }]}
                            width={"100%"}
                            height={"100%"}
                            options={{
                                noData: {
                                    text: isLoading ? 'Loading "LUNC history" from API, please wait ...' : 'No data, sorry',
                                    align: 'center',
                                    verticalAlign: 'middle',
                                    offsetX: 0,
                                    offsetY: 0,
                                    style: {
                                        color: undefined,
                                        fontSize: '0.9rem',
                                        fontFamily: undefined
                                    }
                                },
                                stroke: {
                                    width: 3,
                                    curve: 'smooth'
                                },
                                fill: {
                                    opacity: 0.2
                                },
                                labels: tblDatetimeTotalSupplies,
                                chart: {
                                    toolbar: {
                                        show: false
                                    },
                                    zoom: {
                                        enabled: false
                                    },
                                    foreColor: 'var(--primary-text-color)'      // Couleur des valeurs en abscisse/ordonnée
                                },
                                yaxis: {
                                    title: {
                                        text: 'LUNC',
                                    }
                                },
                                xaxis: {
                                    title: {
                                        text: 'Datetime (UTC)',
                                    },
                                },
                                tooltip: {
                                    theme: theme === "light" ? 'light' : 'dark'
                                }
                            }}
                        />
                    </div>
                </div>
            }
        </StyledBox>
    );
};

export default BlockLuncTotalSupplies;