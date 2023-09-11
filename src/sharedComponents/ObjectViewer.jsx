import React from 'react';
import styles from './ObjectViewer.module.scss';

const ObjectViewer = ({objetAvisualiser, recursif = false, className}) => {




    return (
        <div className={recursif ? className : className + ' ' + styles.miseEnForme}>
            {Array.isArray(objetAvisualiser) ?
                <>
                    <div>[</div>
                    {objetAvisualiser.map((element, index) => {
                        return <div key={index} className={styles.decalage}>
                            <ObjectViewer objetAvisualiser={element} recursif="yes" />
                            {index < (objetAvisualiser.length - 1) ? <span>,</span> : null}
                        </div>
                    })}
                    <div>]</div>
                </>
            :
            (typeof objetAvisualiser === 'object' && objetAvisualiser !== null) ?
                <>
                    <div>&#123;</div>
                    {Object.entries(objetAvisualiser).map((element, index) => {
                        return <div key={index} className={styles.decalage}>
                            {Object.prototype.toString.call(element[1]) === "[object Date]" ? <span>{element[0]} : "{new Date(element[1]).toISOString()}"</span> : null}
                            {typeof element[1] === 'string' ? <span>{element[0]} : "{element[1].replaceAll("\"", "\\\"")}"</span> : null}
                            {element[1] === null ? <span>{element[0]} : null</span> : null}
                            {(typeof element[1] === 'object') && (element[1] !== null) && (Object.prototype.toString.call(element[1]) !== '[object Date]') ? <ObjectViewer objetAvisualiser={element[1]} recursif="yes" /> : null}
                            {index < (Object.entries(objetAvisualiser).length - 1) ? <span>,</span> : null}
                        </div>
                    })}
                    <div>&#125;</div>
                </>
            : null}
            
        </div>
    );
};

export default ObjectViewer;