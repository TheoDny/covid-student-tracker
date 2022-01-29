import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { confirm } from "react-bootstrap-confirmation"
import { Component } from "react"
import "./modalDark.css"

class ModalModifPupil extends Component {
	state = {
		surname: this.props.surname,
		name: this.props.name,
		positive: this.props.positive,
		positiveDate: this.props.positiveDate || "",
		contact: this.props.contact,
		contactDate: this.props.contactDate || "",
	}

	refreshState() {
		this.setState({
			surname: this.props.surname,
			name: this.props.name,
			positive: this.props.positive,
			positiveDate: this.props.positiveDate || "",
			contact: this.props.contact,
			contactDate: this.props.contactDate || "",
		})
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

	/**
	 * ask confirm delete with a modal
	 */
	async confirmDelete() {
		if (await confirm("êtes vous sûre de vouloir supprimer l'élève ?")) {
			this.props.deletePupil()
			this.props.onHide()
		}
	}

	/**
	 * Submit fucntion to update Pupil info
	 *
	 * @param {Event} event
	 */
	updatePupil(event) {
		event.preventDefault()
		this.props.handleUpdatePupil(this.props.number, this.state)
		this.props.onHide()
	}

	render() {
		return (
			<>
				<Modal
					show={this.props.show}
					onHide={() => {
						this.props.onHide()
						this.refreshState()
					}}
					size="lg"
					centered
					className="modalModif"
				>
					<Form
						onSubmit={this.updatePupil.bind(this)}
						className="text-white bg-dark "
					>
						<Modal.Header closeButton className="pt-2 pb-1">
							<Modal.Title>Modifier un élève</Modal.Title>
						</Modal.Header>
						<Modal.Body className="pt-1 pb-2">
							<Form.Group>
								<Form.Label className="mb-0 mt-1 form-label">Prénom</Form.Label>
								<Form.Control
									type="text"
									placeholder={this.props.surname}
									onChange={(event) => this.handleChangeSurname(event)}
									defaultValue={this.state.surname}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mb-0 mt-1">Nom</Form.Label>
								<Form.Control
									type="text"
									placeholder={this.props.surname}
									onChange={(event) => this.handleChangeName(event)}
									defaultValue={this.state.name}
								/>
							</Form.Group>
							<Form.Group className="py-3">
								<Form.Check
									className="my-0"
									type="checkbox"
									label="Cas Contact"
									onClick={(event) => this.handleChangeContact(event)}
									defaultChecked={this.state.contact}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									value={this.state.contactDate}
									onChange={(event) => this.handleChangeContactDate(event)}
									required={this.state.contact ? "required" : ""}
									type="date"
								/>
							</Form.Group>
							<Form.Group className="py-3">
								<Form.Check
									className="my-0"
									type="checkbox"
									label="Positif"
									onClick={(event) => this.handleChangePositive(event)}
									defaultChecked={this.state.positive}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									value={this.state.positiveDate}
									onChange={(event) => this.handleChangePositiveDate(event)}
									required={this.state.positive ? "required" : ""}
									type="date"
								/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer className="py-1">
							<Button
								className="btn-danger"
								onClick={this.confirmDelete.bind(this)}
							>
								Supprimer
							</Button>
							<Button type="submit">Sauvegarder</Button>
							<Button
								variant="secondary"
								onClick={() => {
									this.props.onHide()
									this.refreshState()
								}}
							>
								Close
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</>
		)
	}
}

export default ModalModifPupil
