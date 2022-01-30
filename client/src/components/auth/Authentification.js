import { Component } from "react"
import { Link } from "react-router-dom"
import "./auth.css"
class Authentification extends Component {
	render() {
		return (
			<div className="grid align__item">
				<div className="container_auth">
					<div className="containButt">
						{/* no need for that
						<div className="butt" >
							<Link to="/auth/signup">Créer un compte</Link>
						</div>
						*/}
						<div className="butt">
							<Link to="/auth/login">Se connecter</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Authentification
