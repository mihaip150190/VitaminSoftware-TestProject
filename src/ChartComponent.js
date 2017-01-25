import React from 'react';
import {LineChart} from 'react-easy-chart';
import Select from 'react-select';
import { DateRange  } from 'react-date-range';
import Checkbox from 'rc-checkbox';

var Chart = React.createClass({

	statics: {
		baseUrl: 'https://www.quandl.com/api/v3',
		database: 'EOD',
		apiKey: '&api_key=4mrJxCSei_L-Q_U6MzyZ',
	},

	getInitialState: () => {
		return {
			selectedCompany: null,
			data: [],
			applyDateRange: false,
			dateRange: null,
		};
	},

	getOptions: (input) => {
	  return fetch(`${Chart.baseUrl}/datasets.json?database_code=${Chart.database}&query=${input}&per_page=100&page=1${Chart.apiKey}`)
		    .then((response) => {
		      return response.json();
		    }).then((json) => {
		      return { 
		      		options: json.datasets.map((dataset) => {
		      			return { value: dataset.dataset_code, label: dataset.name}; 
		      		})
		      	};
		    });
	},

	loadData: function(){
		if(!this.state.selectedCompany){
			this.setState({
				data: []
			});
			return;
		}

		var dateFilters = this.state.dateRange && this.state.applyDateRange ?
			`&start_date=${this.state.dateRange.startDate.format('YYYY-MM-DD')}&end_date=${this.state.dateRange.endDate.format('YYYY-MM-DD')}` : '';

		fetch(`${Chart.baseUrl}/datasets/${Chart.database}/${this.state.selectedCompany}.json?column_index=1${dateFilters}${Chart.apiKey}`)
		    .then((response) => {
		      if (!response.ok) {
            	throw Error(response);
        	  }	
		      return response.json();
		    })
		    .then((json) => {
		      if(json && json.dataset && json.dataset.data){
		      	var data = json.dataset.data;
				this.setState({
					data: data.map((point) => {
						return { x: point[0], y:point[1] };
					})
				});		      			
		      }
		    })
		    .catch((err) => {
		    	console.log(err);
		    	this.setState({
					data: []
				});	
		    });
	},

	loadCustomerData: function(val) {
		this.setState({
			selectedCompany: val ? val.value : null
		}, () => this.loadData());
	},

	handleDateRangeChange: function(range){
		this.setState({
			dateRange: range
		}, () => {
			if(this.state.applyDateRange)
				this.loadData();
		});	
	},

	toggleApplyDateRange: function(e){
		this.setState({
			applyDateRange: e.target.checked	
		}, () => {
			this.loadData();
		});	
	},

	render: function() {
		return (
			<div className="container">
				<h3>Load Companies from Quandl</h3>
				<p>
          			<label>
            		<Checkbox
              			onChange={this.toggleApplyDateRange}
            		/>
            		&nbsp; Apply date range
          			</label>
          			&nbsp;&nbsp;
        		</p>
				<Select.Async name="form-field-name" loadOptions={this.getOptions} autoload={false} onChange={this.loadCustomerData} value={this.state.selectedCompany}/> 
					<DateRange 
                    onChange={this.handleDateRangeChange}
                    startDate={null}
                    endDate={null}/>
                <LineChart
    				xType={'time'}
    				datePattern={'%Y-%m-%d'}
    				axes
    				interpolate={'cardinal'}
    				width={1200}
    				height={680}
    				data={[this.state.data]}/>
			</div>
		);
	}
});


export default Chart;