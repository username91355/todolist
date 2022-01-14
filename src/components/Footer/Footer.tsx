import React from 'react';
import styles from "./Footer.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTelegram} from '@fortawesome/free-brands-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
            <div className={styles.footer_wrapper}>
                <div className={styles.footer_container}>
                    <h3 className={styles.footer_name}>Created by Balyaev Dmitriy</h3>
                    <div className={styles.footer_boxs}>
                        <a className={styles.footer_box} href={'https://t.me/username09313'}>
                            <FontAwesomeIcon icon={faTelegram} size={"2x"}/>
                        </a>
                        <a className={styles.footer_box} href={' https://wa.me/79139643588'}>
                            <FontAwesomeIcon icon={faWhatsapp} size={"2x"}/>
                        </a>
                        <a className={styles.footer_box} href={'https://github.com/username91355'}>
                            <FontAwesomeIcon icon={faGithub} size={"2x"}/>
                        </a>
                        <a className={styles.footer_box} href={'https://www.linkedin.com/in/dmitriy-balyaev-b651b0229/'}>
                            <FontAwesomeIcon icon={faLinkedin} size={"2x"}/>
                        </a>
                    </div>
                    <div className={styles.footer_copyright}>
                        <span dangerouslySetInnerHTML={{"__html": "&copy;"}}/>
                        <span>All rights reserved 2021-2022</span>
                    </div>
                </div>
            </div>
    );
};

export default Footer;