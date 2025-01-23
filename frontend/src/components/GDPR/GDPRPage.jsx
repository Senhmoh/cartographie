import React from 'react';

function GDPRPage() {
    return (
        <div className="gdpr-container">
            <h1 className="gdpr-title">Données à caractère personnel</h1>
            <div className="gdpr-underline"></div>
            <section className="gdpr-section">
                <h2 className="gdpr-subtitle">Charte d’utilisation</h2>
                <p>
                    Par données personnelles, on entend l’ensemble des données qui permettent d’identifier
                    la personne inscrite sur le site www.cartographie.be, signataire de la présente charte.
                </p>
            </section>
            <section className="gdpr-section">
                <h2 className="gdpr-subtitle">Responsable de la collecte des données</h2>
                <p>
                    Le responsable de la collecte des données à caractère personnel du signataire est
                    <strong> Construcity.brussels</strong>, dont le siège social est situé Chaussée de Vilvorde 66 à 1120 Bruxelles
                    et le siège d’activité secrétariat avenue François Malherbe 42 à 1070 Bruxelles.
                </p>
            </section>
            <section className="gdpr-section">
                <h2 className="gdpr-subtitle">Finalité</h2>
                <p>
                    La collecte de données à caractère personnel n’est légale que dans une finalité particulière.
                    À cet effet, <strong>Construcity.brussels</strong> traite les données du signataire à des fins d'authentification.
                </p>
            </section>
            <section className="gdpr-section">
                <h2 className="gdpr-subtitle">Destinataire des données</h2>
                <p>
                    Construcity.brussels peut être amené à transférer les données du signataire aux organismes autorisés
                    qui collaborent à l’exécution de ses missions telles que décrites dans ses statuts.
                </p>
            </section>
            <section className="gdpr-section">
                <h2 className="gdpr-subtitle">Consentement</h2>
                <p>
                    En signant la charte, le signataire donne son consentement pour la collecte et l’utilisation de ses
                    données conformément à la charte.
                </p>
            </section>
            <section className="gdpr-section">
                <h2 className="gdpr-subtitle">Accès aux données</h2>
                <p>
                    Conformément à la législation, le signataire peut faire corriger ou supprimer ses données personnelles
                    traitées par Construcity.brussels à tout moment.
                </p>
                <p>
                    Toutes questions ou plaintes concernant le traitement des données personnelles peuvent être envoyées à :
                </p>
                <address>
                    Construcity.brussels<br />
                    Avenue François Malherbe 42<br />
                    1070 Bruxelles<br />
                    <a href="mailto:privacy@construcity.brussels">privacy@construcity.brussels</a>
                </address>
            </section>
        </div>
    );
}

export default GDPRPage;
