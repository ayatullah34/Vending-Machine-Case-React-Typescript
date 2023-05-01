import React, { useState } from "react";
import { CollectMoneyProps } from "../interfaces/ICollectedMoney";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const CollectMoney: React.FC<CollectMoneyProps> = ({ totalCollected, reset }) => {
    const { t } = useTranslation();
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleCollectMoneyClick = () => {
        if (totalCollected > 0) {
            toast.success(t("money_collected"), {
                autoClose: 2000,
            });
            reset()
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPasswordValid(event.target.value === "1234");
    };

    return (
        <div className="cash-container_div_collect-money">
            <div className='total'>{t('collected_money') + ': $' + totalCollected}</div>
            <div className="input-wrapper">
                <input
                    type="password"
                    placeholder={t("enter_password") as string | undefined}
                    onChange={handlePasswordChange}
                    className={(isPasswordValid && totalCollected > 0) ? "valid" : ""}
                />
                <button
                    className={`btn-collect-money ${(isPasswordValid && totalCollected > 0) ? "" : "disabled"}`}
                    onClick={handleCollectMoneyClick}
                    disabled={!isPasswordValid}
                >
                    {t("withdraw_cash")}
                </button>
            </div>
        </div>
    );
}

export default CollectMoney;
