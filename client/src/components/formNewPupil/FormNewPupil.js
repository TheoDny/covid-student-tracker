import { Component } from "react"

class NewPersonForm extends Component {
	state = {
		name: "",
		surname: "",
		positive: false,
		positiveDate: "",
		contact: false,
		contactDate: "",
	}

	handleSubmitNewPupil(event) {
		event.preventDefault()
		this.props.handleSubmitNewPupil(this.state)
	}

	handleChangeName(event) {
		this.setState({ name: event.target.value })
	}

	handleChangeSurname(event) {
		this.setState({ surname: event.target.value })
	}

	handleChangePositive(event) {
		this.setState({ positive: event.target.checked, positiveDate: "" })
	}

	handleChangePositiveDate(event) {
		this.setState({ positiveDate: event.target.value })
	}

	handleChangeContact(event) {
		this.setState({ contact: event.target.checked, contactDate: "" })
	}

	handleChangeContactDate(event) {
		this.setState({ contactDate: event.target.value })
	}

	render() {
		return (
			<form onSubmit={(event) => this.handleSubmitNewPupil(event)}>
				<label>
					Nom :
					<input
						value={this.state.name}
						onChange={(event) => this.handleChangeName(event)}
						type="text"
						required="required"
					/>
				</label>
				<br />
				<label>
					Prenom :
					<input
						value={this.state.surname}
						onChange={(event) => this.handleChangeSurname(event)}
						type="text"
						required="required"
					/>
				</label>
				<br />
				<label>
					Positif :
					<input
						value={this.state.positive}
						onClick={(event) => this.handleChangePositive(event)}
						type="checkbox"
					/>
				</label>
				<br />
				<label>
					Date du test positif :
					<input
						value={this.state.positiveDate}
						onChange={(event) => this.handleChangePositiveDate(event)}
						type="date"
						required={this.state.positive ? "required" : ""}
						disabled={!this.state.positive}
					/>
				</label>
				<br />
				<label>
					Cas contact :
					<input
						value={this.state.contact}
						onClick={(event) => this.handleChangeContact(event)}
						type="checkbox"
					/>
				</label>
				<br />
				<label>
					Date du contact :
					<input
						value={this.state.contactDate}
						onChange={(event) => this.handleChangeContactDate(event)}
						type="date"
						required={this.state.contact ? "required" : ""}
						disabled={!this.state.contact}
					/>
				</label>
				<br />
				<button type="submit">Ajouter</button>
			</form>
		)
	}
}

export default NewPersonForm
