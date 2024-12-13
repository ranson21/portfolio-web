import * as React from 'react';
import '@components/RocketShip/style.scss';

export function RocketShip() {
  return (
    <React.Fragment>
      <div className="rocket">
        <div className="fuel">
          <div className="fuel-bottom"></div>
          <div className="fuel-shell">
            <div className="shadow"></div>
          </div>
          <div className="booster-shadow">
            <div className="booster">
              <div className="booster-line"></div>
            </div>
          </div>
        </div>
        <div className="ship">
          <div className="ship_container">
            <div className="nose">
              <div className="fill"></div>
            </div>
            <div className="body">
              <div className="attachment top"></div>
              <div className="attachment middle"></div>
              <div className="attachment bottom"></div>
              <div className="tail"></div>
            </div>
            <div className="fuels">
              <div className="fuel-shell large">
                <div className="shadow"></div>
              </div>
              <div className="fuel-shell left">
                <div className="shadow"></div>
              </div>
              <div className="fuel-shell right">
                <div className="shadow"></div>
              </div>
            </div>
          </div>
          <div className="ship-fire">
            <div className="fire"></div>
            <div className="fire left"></div>
            <div className="fire right"></div>
          </div>
          <div className="rocket-fire">
            <div className="fire"></div>
            <div className="fire left"></div>
            <div className="fire right"></div>
          </div>
          <div className="smoke light">
            <div className="smoke--15 left_1"></div>
            <div className="smoke--20 left_-14 top_12"></div>
            <div className="smoke--15 left_-11 top_12"></div>
            <div className="smoke--25 left_-12 top_9"></div>
            <div className="smoke--22 left_-8 top_10"></div>
            <div className="smoke--25 left_-14 top_10"></div>
            <div className="smoke--40 left_-8 top_25"></div>
            <div className="smoke--53 left_-12 top_20"></div>
            <div className="smoke--60 left_-30 top_40"></div>
            <div className="smoke--100 left_-15 top_40"></div>
            <div className="smoke--100 left_-50 top_80"></div>
            <div className="smoke--140 left_-20 top_80"></div>
            <div className="smoke--205 left_-60 top_100"></div>
          </div>
          <div className="smoke dark">
            <div className="smoke-space"></div>
            <div className="smoke--25 left_0 top_9"></div>
            <div className="smoke--22 left_0 top_10"></div>
            <div className="smoke--25 left_0 top_10"></div>
            <div className="smoke--40 left_-2 top_25"></div>
            <div className="smoke--53 left_-12 top_20"></div>
            <div className="smoke--60 left_-30 top_40"></div>
            <div className="smoke--100 left_-15 top_40"></div>
            <div className="smoke--100 left_-50 top_80"></div>
            <div className="smoke--140 left_-20 top_80"></div>
            <div className="smoke--205 left_-60 top_100"></div>
          </div>
        </div>
      </div>
      <ul className="star">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </React.Fragment>
  );
}
