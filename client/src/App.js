import "./App.css"
import React, { Component } from "react"
import Header from "./components/header/Header"
import TabPupil from "./components/tabPupil/tabPupil"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Authentification from "./components/auth/Authentification"
import LoginForm from "./components/auth/LoginForm"
import SignUpForm from "./components/auth/SignUpForm"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

const API_ROOT = process.env.REACT_APP_API_ROOT || require("./const").API_ROOT
class App extends Component {
	state = {
		isAuth: false,
		accessToken: "",
	}

	getAccessToken() {
		let cookies = document.cookie.split(";")
		if (cookies.some((item) => item.trim().startsWith("token="))) {
			return cookies.find((row) => row.startsWith("token=")).split("=")[1]
		} else {
			return ""
		}
	}

	componentDidMount() {
		let accessToken = this.getAccessToken()

		let isAuth = accessToken ? true : false
		this.setState({ accessToken, isAuth })
	}

	/**
	 *	Send an axios request to be authenticated and receive
	 *	an accessToken that will be put in a cookie and set state.
	 *  Return a string, representing the error or "nothing"
	 *
	 * @param { {email: string, password: string} } user
	 *
	 * @return {string}
	 */
	async handleLogin(user) {
		let token = this.state.accessToken
		let message = "nothing"
		await axios
			.post(API_ROOT + "/api/auth/login", user, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				document.cookie = "token=" + res.data.token + ";max-age=604800;path=/"
				let accessToken = this.getAccessToken()
				this.setState({ accessToken, isAuth: true })
				console.info("login")
			})
			.catch((error) => {
				console.error(error)
				message = `${error.response.statusText} : ${error.response.data.error}`
			})
		return message
	}

	/**
	 * logout user by removing accesstoken in cookie and reset state
	 */
	handleLogout() {
		console.info("logout")
		document.cookie = "token=;path=/;expires=Thu, 01 Jan 2022 00:00:01 GMT"
		this.setState({ isAuth: false, accessToken: "" })
	}

	/**
	 *	Send an axios request to create a new user
	 *
	 * @param { {email: string, password: string} } user
	 */
	handleSignUp(user) {
		axios
			.post(API_ROOT + "/api/auth/signup", user)
			.then((res) => {
				document.cookie = "token=" + res.data.token + ";max-age=604800;path=/"
				let accessToken = this.getAccessToken()
				this.setState({ accessToken, isAuth: true })
				console.info("login")
			})
			.catch((error) => console.error(error))
	}

	render() {
		return (
			<div className="App">
				<Header
					handleLogout={this.handleLogout.bind(this)}
					isAuth={this.state.isAuth}
				/>
				<div id="rooter">
					<BrowserRouter>
						<Routes>
							{/* Route for Auth method */}
							{!this.state.isAuth && (
								<Route path="auth/" element={<Authentification />} />
							)}
							{/* Route for login */}
							{!this.state.isAuth && (
								<Route
									path="auth/login"
									element={<LoginForm onLogin={this.handleLogin.bind(this)} />}
								/>
							)}
							{/* Route for signup */}
							{!this.state.isAuth && (
								<Route
									path="auth/signup"
									element={
										<SignUpForm onSignUp={this.handleLogin.bind(this)} />
									}
								/>
							)}
							{/* Route for the table of pupils */}
							{this.state.isAuth && (
								<Route
									path="table/"
									element={<TabPupil accessToken={this.state.accessToken} />}
								/>
							)}
							{/* Route for unknow and deault path */}
							{this.state.isAuth ? (
								<Route
									path="*"
									element={<TabPupil accessToken={this.state.accessToken} />}
								/>
							) : (
								<Route path="*" element={<Authentification />} />
							)}
						</Routes>
					</BrowserRouter>
				</div>
			</div>
		)
	}
}

export default App
