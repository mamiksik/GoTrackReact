import {Component, Children} from "react"
import {Linking} from "react-native";

export default class AuthProvider extends Component {

	constructor(props) {
		super(props);
		console.log("AuthProvider");
		this.authUrl = "http://martin.local/GoClimb/www/auth/cs/admin/login?back=http%3A%2F%2Flocalhost%2FGoClimb%2Fwww%2Fadmin%2Fcs%2F%3FloginToken%3D__TOKEN__"
	}

	componentDidMount() {
		Linking.openURL(this.authUrl);
		console.log("Mounted");
	}

	static propTypes = {
		// theme: PropTypes.object.isRequired,
	};
	// you must specify what you’re adding to the context
	static childContextTypes = {
		// theme: PropTypes.object.isRequired,
	};


	getChildContext() {
		return {
			// mySharedValue: {foo: 'bar'}
		};
	}

	render() {
		return Children.only(this.props.children);
	}

}
