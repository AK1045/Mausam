import './Weather_icons.css';

// SunShower.jsx
export const SunShower = () => (
    <div className="icon sun-shower">
        <div className="cloud"></div>
        <div className="sun">
            <div className="rays"></div>
        </div>
        <div className="rain"></div>
    </div>
);

// ThunderStorm.jsx
export const ThunderStorm = () => (
    <div className="icon thunder-storm">
        <div className="cloud"></div>
        <div className="lightning">
            <div className="bolt"></div>
            <div className="bolt"></div>
        </div>
    </div>
);

// Cloudy.jsx
export const Cloudy = () => (
    <div className="icon cloudy">
        <div className="cloud"></div>
        <div className="cloud"></div>
    </div>
);

// Flurries.jsx
export const Flurries = () => (
    <div className="icon flurries">
        <div className="cloud"></div>
        <div className="snow">
            <div className="flake"></div>
            <div className="flake"></div>
        </div>
    </div>
);

// Sunny.jsx
export const Sunny = () => (
    <div className="icon sunny">
        <div className="sun">
            <div className="rays"></div>
        </div>
    </div>
);

// Rainy.jsx
export const Rainy = () => (
    <div className="icon rainy">
        <div className="cloud"></div>
        <div className="rain"></div>
    </div>
);

// Weather_icons.jsx

export const Icons = () => (
    <>
        <SunShower />
        <ThunderStorm />
        <Cloudy />
        <Flurries />
        <Sunny />
        <Rainy />
    </>
);
