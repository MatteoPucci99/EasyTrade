import React, { useEffect, useRef } from 'react';

const NavBarWidget = () => {
  // Utilizza useRef per ottenere un riferimento all'elemento div
  const widgetContainerRef = useRef(null);

  useEffect(() => {
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';

   
    const config = {
      symbols: [
        { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
        { proName: 'FOREXCOM:NSXUSD', title: 'US 100' },
        { proName: 'FX_IDC:EURUSD', title: 'EUR a USD' },
        { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
        { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
      ],
      showSymbolLogo: true,
      colorTheme: 'light',
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'it',
    };

    
    script.text = `new TradingView.widget(${JSON.stringify(config)});`;

   
    if (widgetContainerRef.current) {
      widgetContainerRef.current.appendChild(script);
    }

  
    return () => {
      
      if (widgetContainerRef.current) {
        widgetContainerRef.current.removeChild(script);
      }
    };
  }, []); 

  return (
    <div className="tradingview-widget-container" ref={widgetContainerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="white-text">Segui tutti i mercati su TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default NavBarWidget;
