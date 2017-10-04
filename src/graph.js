import { Line } from 'vue-chartjs'

export default Line.extend({
	data(){
		return {
			$this: this
		}
	},
	mounted(){
		this.renderChart(
    	{	// DATA
    		labels: Array.from(Array(12)).map((e,i)=>800 + (i*88+(Math.round(Math.random()*4)-2))),
    		// labels: Array.from(Array(12)).map((e,i)=>800 + (i*88)),
    		// labels: Array.from(Array(12)).map((e,i)=>800 + (i*100)),
    		datasets: [
    		{
    			backgroundColor: '#f87979',
    			data: Array.from(Array(12)).map((e,i)=>1500 - (i*90+(Math.round(Math.random()*40)-20))),
    			spanGaps: true,
    		}
    		]
    	},
		{	// OPTION
			elements: {
				line: {
					fill: false,
					borderWidth: 3,
				},
			},	
			scales: {
				xAxes: [{
					offset: true,
					display: false,
					position: 'bottom',
					scaleLabel: {
						display: true,
						fontStyle: 'bold',
						min: 700,
					},
					ticks: {
						callback: function(value, index, values) {
							return value
						},
						autoSkip: false,
                        maxTicksLimit: 10,
                        stepSize: 100,
                        min: 700,
                        max: 4000
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'tpr',
                        fontStyle: 'bold'
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return parseFloat(value).toFixed(2);
                        },
                        autoSkip: true,
                         maxTicksLimit: 10,
                         stepSize: 100
                    }
                }]
            }		
        });
	},
	created ()
	{
		let $this = this;
		Chart.plugins.register({
			beforeDraw: (chart) => {
				let chartArea = chart.chartArea; 
				console.log(chart);
				let chartAreaWidth = chartArea.right - chartArea.left; // counts the width of chart (x scale)
				let labelsMin = Math.min(...chart.config.data.labels);
				let labelsMax = Math.max(...chart.config.data.labels);
				let xScaleRange = labelsMax - labelsMin;
				// console.log([labelsMin,labelsMax,xScaleRange]);
				let delta = xScaleRange / 200;
				let start = Math.ceil(labelsMin/100)*100;

				let contLine = chart.ctx;
				let posixx = [];
				for(let i=0; i<Math.ceil(delta); i++)
				{
					let xPoint = (start + (200*(i))) - labelsMin;
					let posX = Math.round(((xPoint / xScaleRange) * chartAreaWidth) + chartArea.left);
					
					posixx.push(xPoint + labelsMin);

					contLine.beginPath();
					contLine.lineWidth = 1;
					// contLine.strokeStyle="green";
					contLine.moveTo(posX, 50);
					contLine.lineTo(posX, chartArea.bottom);
					contLine.stroke();

					contLine.font = "12px Arial";
					contLine.textAlign = "center";
					contLine.fillText(xPoint + labelsMin,posX,chartArea.bottom + 0);
				}
				// console.log(posixx);
			}
		});
	}
});