import {useCarbonFootprint} from 'react-carbon-footprint';

const CarbonFootprintDisplay = () => {
  const [gCO2   , bytesTransferred] = useCarbonFootprint(); 
    return (
        <div style = {{
            position: 'fixed',bottom: 10, right: 10, 
            backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px', 
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', fontSize: '14px', 
            fontFamily: 'Arial, sans-serif', color: '#333',
            zIndex: 1000
        }}>
            <h3> Network Carbon Footprint</h3>
            <p> Bytes Transferred: {bytesTransferred} bytes</p>
            <p> CO2 Emissions: {gCO2.toFixed(2)} grams CO2eq</p>
            <p style={{fontSize: '12px', color: '#666'}}> 
                (Estimates based on average data center efficiency and energy mix) </p>
        </div>
    );
}

export default CarbonFootprintDisplay;
