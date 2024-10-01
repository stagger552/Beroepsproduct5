import React, { useEffect } from 'react';

const Compass = () => {
  useEffect(() => {
    const compassCircle = document.querySelector(".compass-circle");
    const myPoint = document.querySelector(".my-point");
    const startBtn = document.querySelector(".start-btn");
    const isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);

    function init() {
      startBtn.addEventListener("click", startCompass);
      navigator.geolocation.getCurrentPosition(locationHandler);

      if (!isIOS) {
        window.addEventListener("deviceorientationabsolute", handler, true);
      }
    }

    function startCompass() {
      if (isIOS) {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", handler, true);
            } else {
              alert("Permission has to be allowed!");
            }
          })
          .catch(() => alert("Not supported"));
      }
    }

    function handler(e) {
      const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;

      // ±15 degree logic for myPoint visibility
      if (pointDegree < Math.abs(compass) && pointDegree + 15 > Math.abs(compass) ||
          pointDegree > Math.abs(compass + 15) || pointDegree < Math.abs(compass)) {
        myPoint.style.opacity = 0;
      } else if (pointDegree) {
        myPoint.style.opacity = 1;
      }
    }

    let pointDegree;

    function locationHandler(position) {
      const { latitude, longitude } = position.coords;
      pointDegree = calcDegreeToPoint(latitude, longitude);
      if (pointDegree < 0) {
        pointDegree += 360;
      }
    }

    function calcDegreeToPoint(latitude, longitude) {
      // Example geolocation (Qibla)
      const point = {
        lat: 21.422487,
        lng: 39.826206,
      };

      const phiK = (point.lat * Math.PI) / 180.0;
      const lambdaK = (point.lng * Math.PI) / 180.0;
      const phi = (latitude * Math.PI) / 180.0;
      const lambda = (longitude * Math.PI) / 180.0;
      const psi =
        (180.0 / Math.PI) *
        Math.atan2(
          Math.sin(lambdaK - lambda),
          Math.cos(phi) * Math.tan(phiK) -
            Math.sin(phi) * Math.cos(lambdaK - lambda)
        );
      return Math.round(psi);
    }

    init();

    return () => {
      window.removeEventListener("deviceorientationabsolute", handler, true);
      window.removeEventListener("deviceorientation", handler, true);
    };
  }, []);

  return (
    <div >
      <div className="compass">
        <div className="arrow"></div>
        <div className="compass-circle"></div>
        <div className="my-point"></div>
      </div>
      <button className="start-btn">Start compass</button>

      <style jsx>{`
        .compass {
          position: relative;
          width: 80%;
          height: 100%;
          min-height: 300px;
          min-width: 200px;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          margin: auto;
        }

        .compass > .arrow {
          position: absolute;
          width: 0;
          height: 0;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          border-style: solid;
          border-width: 30px 20px 0 20px;
          border-color: red transparent transparent transparent;
          z-index: 1;
        }

        .compass > .compass-circle,
        .compass > .my-point {
          position: absolute;
          width: 90%;
          height: 90%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease-out;
          background: url(https://purepng.com/public/uploads/large/purepng.com-compasscompassinstrumentnavigationcardinal-directionspointsdiagram-1701527842316onq7x.png)
            center no-repeat;
          background-size: contain;
        }

        .compass > .my-point {
          opacity: 0;
          width: 20%;
          height: 20%;
          background: rgb(8, 223, 69);
          border-radius: 50%;
          transition: opacity 0.5s ease-out;
        }

        .start-btn {
          margin-top: 20px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
};

export default Compass;
