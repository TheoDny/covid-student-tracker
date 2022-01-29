import { Component } from "react"
import "./header.css"
class Header extends Component {
	render() {
		return (
			<header>
				<nav className="navbar justify-content-between navbar-dark bg-dark">
					<div>
						<ul></ul>
					</div>
					<div>
						<ul className="my-0 navbar-nav ">
							<li className="nav-item">
								{this.props.isAuth && (
									<button
										onClick={() => {
											this.props.handleLogout()
										}}
										className="btn btn-outline-info "
									>
										Déconnection
									</button>
								)}
							</li>
						</ul>
					</div>
				</nav>
			</header>
		)
	}
}

export default Header
