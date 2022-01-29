import { Component } from "react"
import "./auth.css"

class SignUpForm extends Component {
	state = {
		password: "",
		email: "",
		passwordRepeat: "",
	}

	handleSignUp(event) {
		event.preventDefault()
		this.props.onSignUp({
			password: this.state.password,
			email: this.state.email,
		})
	}

	handleChangeEmail(event) {
		this.setState({ email: event.target.value })
	}

	handleChangePassword(event) {
		this.setState({ password: event.target.value })
	}

	handleChangePasswordRepeat(event) {
		this.setState({ passwordRepeat: event.target.value })
	}

	render() {
		return (
			<div className="grid align__item">
				<div className="container_auth">
					<h2>Sign Up</h2>

					<form onSubmit={(event) => this.handleSignUp(event)} className="form">
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
							<input
								type="password"
								placeholder="••••••••••••"
								required="required"
								onChange={(event) => this.handleChangePasswordRepeat(event)}
							/>
						</div>

						<div className="form__field">
							<input
								type="submit"
								value="Sign Up"
								required="required"
								disabled={!(this.state.password === this.state.passwordRepeat)}
							/>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default SignUpForm
