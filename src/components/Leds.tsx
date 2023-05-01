import React, { useState } from "react";
const ReactTooltip = require("react-tooltip").default;

interface LedsProps { }

const Leds: React.FC<LedsProps> = () => {
    const [activeLed, setActiveLed] = useState<"light" | "cooling">();

    return (
        <div className="leds">
            <div
                data-tip="Işık Açık"
                onMouseOver={() => setActiveLed("light")}
                onMouseOut={() => setActiveLed(undefined)}
            >
                <ReactTooltip globalEventOff="click" place="bottom" effect="solid" delayHide={100} />
                <div
                    className={`leds_green ${activeLed === "light" ? "active" : ""}`}
                />
            </div>
            <div
                data-tip="Soğutma Aktif"
                onMouseOver={() => setActiveLed("cooling")}
                onMouseOut={() => setActiveLed(undefined)}
            >
                <ReactTooltip globalEventOff="click" place="bottom" effect="solid" delayHide={100} />
                <div
                    className={`leds_blue ${activeLed === "cooling" ? "active" : ""}`}
                />
            </div>
        </div>
    );
};

export default Leds;
