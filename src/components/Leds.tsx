import React, { useState } from "react";
import Tooltip from "../utilities/Tooltip";
import { useTranslation } from "react-i18next";

interface LedsProps { coolingActive: Boolean }

const Leds: React.FC<LedsProps> = ({ coolingActive }) => {
    const { t } = useTranslation();

    return (
        <div className="leds">
            <Tooltip content={t('lighting_active')} position="right">
                <div className="leds_green" />
            </Tooltip>
            <Tooltip content={coolingActive ? t('cooling_on') : t('cooling_off')} position="left">
                <div className={`leds_blue ${coolingActive ? "" : "disabled"} `} />
            </Tooltip>
        </div>
    );
};

export default Leds;
