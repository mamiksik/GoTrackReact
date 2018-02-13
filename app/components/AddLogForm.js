import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

import {Container, Item, Input, Header, Body, Content, Title, Button, Text, Label, Form} from 'native-base';
// import DatePicker from 'react-native-datepicker'
import {Field, reduxForm} from 'redux-form';

import autobind from "autobind-decorator"
import DateTimePicker from 'react-native-modal-datetime-picker';
import Picker from 'react-native-picker';
import {Item as ItemP} from "native-base/src/basic/PickerItem";
import Moment from "react-moment";


const validate = values => {
	const error = {};
	error.email = '';
	error.name = '';
	var ema = values.email;
	var nm = values.name;
	if (values.email === undefined) {
		ema = '';
	}
	if (values.name === undefined) {
		nm = '';
	}
	if (ema.length < 8 && ema !== '') {
		error.email = 'too short';
	}
	if (!ema.includes('@') && ema !== '') {
		error.email = '@ not included';
	}
	if (nm.length > 8) {
		error.name = 'max 8 characters';
	}
	return error;
};

class AddLogForm extends Component<{}> {

	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
			isDateTimePickerVisible: false,
			showStylePicker: false,
			log: {
				dateOfClimbing: null,
				tries: null,
			}
		};
		this.renderInput = this.renderInput.bind(this);
	}

	async componentWillMount() {
		this.setState({isReady: true});
	}

	// renderInput({input, label, type, meta: {touched, error, warning}}) {
	renderInput() {
		// let hasError = false;
		// if (error !== undefined) {
		// 	hasError = true;
		// }
		{/*<Item error={hasError}>*/
		}
		{/*<Input {...input}/>*/
		}
		{/*/!*{hasError ? <Text>{error}</Text> : <Text/>}*!/*/
		}
		{/*</Item>*/
		}
		return (
			<Input/>
		);
	}

	_togglePicker() {
		Picker.toggle();
	}

	@autobind
	renderTriesSelect() {
		let data = [];

		for (var i = 0; i < 20; i++) {
			data.push(i);
		}

		Picker.init({
			pickerData: data,
			selectedValue: [59],
			onPickerConfirm: this._handleChange,
			onPickerCancel: data => {
				console.log(data);
			},
			onPickerSelect: data => {
				console.log(data);
			}
		});

		let text = "Click to select number";

		if (this.state.log.tries) {
			text = this.state.log.tries;
		}


		return (
			<Item>
				<TouchableOpacity onPress={this._togglePicker} style={styles.space}>
					<Text>{text}</Text>
				</TouchableOpacity>
			</Item>
		);
	}

	@autobind
	_handleChange(value) {
		console.log(value);
		this.setState({log: {...this.state.log, tries: value[0]}});
	};

	@autobind
	renderSessionSelect() {
		return (
			<Picker
				mode="dropdown"
				placeholder="Click to select"
				selectedValue={() => {
				}}
				onValueChange={() => {
				}}
			>
				<ItemP label="Wallet" value="key0"/>
				<ItemP label="ATM Card" value="key1"/>
				<ItemP label="Debit Card" value="key2"/>
				<ItemP label="Credit Card" value="key3"/>
				<ItemP label="Net Banking" value="key4"/>
			</Picker>
		);
	}

	@autobind
	_showDateTimePicker() {
		this.setState({isDateTimePickerVisible: true})
	};

	@autobind
	_hideDateTimePicker() {
		this.setState({isDateTimePickerVisible: false})
	};

	@autobind
	_handleDatePicked(date) {
		console.log(date);
		this.setState({log: {...this.state.log, dateOfClimbing: date}});
		this._hideDateTimePicker();
	};

	@autobind
	renderDatePicker() {
		const text = this.state.log.dateOfClimbing ? <Moment element={Text} format="YYYY/MM/DD" >{this.state.log.dateOfClimbing}</Moment> : "Click to select date";
		// const text =<Moment format="YYYY/MM/DD" element={Text}>1976-04-19T12:59-0500</Moment>;
		return (
			<Item>
				<TouchableOpacity onPress={this._showDateTimePicker} style={styles.space}>
					<Text>{text}</Text>
				</TouchableOpacity>

				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
				/>
			</Item>
		);
	}

	render() {
		const {handleSubmit, reset} = this.props;
		return (
			<Container>
				<Content padder>
					<Form>
						{/*<Label>Date of climbing</Label>*/}
						{/*<Field name="climbingDate" component={this.renderDatePicker}/>*/}
						{/*<Item>*/}
						{this.renderDatePicker()}
						{/*</Item>*/}
						{/*<Item>*/}
						{this.renderTriesSelect()}
						{/*</Item>*/}

						<Item>
							{this.renderInput()}
						</Item>

						{/*<Item>*/}
						{/*{this.renderSessionSelect()}*/}
						{/*</Item>*/}

						<Button block primary onPress={reset}>
							<Text>Submit</Text>
						</Button>
					</Form>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	space: {
		marginTop: 15,
	}
});

export default AddLogForm;
// export default reduxForm({
// 	form: 'addLogForm',
// 	validate
// })(AddLogForm)
