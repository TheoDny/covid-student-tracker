import { Component } from "react"
import Alert from "react-bootstrap/Alert"
import "./auth.css"

class LoginForm extends Component {
	state = {
		password: "",
		email: "",
		message: "nothing",
		showAlert: false,
	}

	handleLogin(event) {
		event.preventDefault()
		this.props.onLogin(this.state).then((message) => {
			if (message !== "nothing") {
				this.setState({ message })
				this.setState({ showAlert: true })
			}
		})
	}

	handleChangePassword(event) {
		this.setState({ password: event.target.value })
	}

	handleChangeEmail(event) {
		this.setState({ email: event.target.value })
	}

	render() {
		return (
			<div className="grid align__item">
				<div className="container_auth">
					<h2>Login</h2>

					<form onSubmit={(event) => this.handleLogin(event)} className="form">
						<div className="form__field">
							<input
								type="email"
								placeholder="info@mailaddress.com"
								required="required"
								onChange={(event) => this.handleChangeEmail(event)}
							/>
						</div>

						<div className="form__field">
							<input
								type="password"
								placeholder="••••••••••••"
								required="required"
								onChange={(event) => this.handleChangePassword(event)}
							/>
						</div>

						<div className="form__field">
							<input type="submit" value="Se connecter" />
						</div>
					</form>
				</div>
				<Alert
					id="alert_danger"
					className={this.state.showAlert ? "display" : ""}
					variant="danger"
				>
					{this.state.message}
				</Alert>
			</div>
		)
	}
}

export default LoginForm
