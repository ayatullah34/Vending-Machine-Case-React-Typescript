import React from "react";
import { useTranslation } from "react-i18next";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="header">
            <img
                src={`${process.env.PUBLIC_URL}/assets/vending-machine.svg`}
                alt="logo"
                className="header__logo"
            />
            <h1 className="header__title">{title}</h1>
            <div className="header__language">
                <button
                    className={`header__language-btn ${i18n.language === "tr" ? "selected" : ""}`}
                    onClick={() => changeLanguage("tr")}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/flag-tr.svg`}
                        alt="Türkçe"
                    />
                </button>
                <button
                    className={`header__language-btn ${i18n.language === "en" ? "selected" : ""}`}
                    onClick={() => changeLanguage("en")}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/flag-us.svg`}
                        alt="English"
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;
