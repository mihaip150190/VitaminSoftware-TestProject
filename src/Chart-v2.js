import React from 'react';
import {LineChart} from 'react-easy-chart';
import Select from 'react-select';
import { DateRange  } from 'react-date-range';


var Chart = React.createClass({
	getInitialState: () => {
		return {
			data: []
		};
	},

	getOptions: (input) => {
	  return fetch(`https://www.quandl.com/api/v3/datasets.json?database_code=EOD&query=${input}&per_page=100&page=1&api_key=4mrJxCSei_L-Q_U6MzyZ`)
		    .then((response) => {
		      return response.json();
		    }).then((json) => {
		      return { options: json.datasets
		        .filter((dataset) => { return !dataset.premium; })
		      	.map((dataset) => 
		      		{
		      			return { value: dataset.dataset_code, label: dataset.name}; 
		      		}
	      		)};
		    });
	},

	loadCustomerData: function(val) {
		fetch(`https://www.quandl.com/api/v3/datasets/EOD/${val.value}.json?column_index=4&start_date=2014-01-01&end_date=2014-12-31&collapse=monthly&transform=rdiff&api_key=4mrJxCSei_L-Q_U6MzyZ`)
		    .then((response) => {
		      return response.json();
		    }).then((json) => {
		      if(json && json.dataset && json.dataset.data){
		      	var data = json.dataset.data;
				this.setState({
					data: data.map((point) => {
						return { x: point[0], y:point[1] };
					})
				});		      			
		      }
		    });
	},

	handleSelect: function(range){
		console.log(range);
	},

	render: function() {
		return (
			<div>
			<Select.Async name="form-field-name" loadOptions={this.getOptions} autoload={false} onChange={this.loadCustomerData}/> 
			<DateRange 
                    onInit={this.handleSelect}
                    onChange={this.handleSelect}
                    startDate={null}
                    endDate={null}
                />
			 <LineChart
    			xType={'time'}
    			datePattern={'%Y-%m-%d'}
    			axes
    			interpolate={'cardinal'}
    			width={1600}
    			height={800}
    			data={[this.state.data]}/>
			</div>
		);
	}
});


export default Chart;