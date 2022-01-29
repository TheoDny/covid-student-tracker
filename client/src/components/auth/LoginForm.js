import { Component } from "react"
import "./auth.css"

class LoginForm extends Component {
	state = {
		password: "",
		email: "",
	}

	handleLogin(event) {
		event.preventDefault()
		this.props.onLogin(this.state)
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
			</div>
		)
	}
}

export default LoginForm
