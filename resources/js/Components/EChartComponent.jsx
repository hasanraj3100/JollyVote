import {useEffect, useRef} from "react";
import * as echarts from "echarts";


const EChartComponent = ({options, style}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);
        chartInstance.setOption(options);
        return () => {
            chartInstance.dispose();
        }
    }, [options]);

    return <div ref={chartRef} style={style || {width:"100%", height:"400px"}}/>
}

export default EChartComponent;
