import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Component } from "react"
import "./modalDark.css"

class ModalFormNewPupil extends Component {
	state = {
		surname: "",
		name: "",
		positive: false,
		positiveDate: "",
		contact: false,
		contactDate: "",
	}

	setDefaultState() {
		this.setState({
			surname: "",
			name: "",
			positive: false,
			positiveDate: "",
			contact: false,
			contactDate: "",
		})
	}

	/**
	 * Submit fucntion to create a new Pupil
	 *
	 * @param {Event} event
	 */
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
			<>
				<Modal
					show={this.props.show}
					onHide={() => {
						this.props.onHide()
						this.setDefaultState()
					}}
					size="lg"
					centered
					className="modalModif"
				>
					<Form
						onSubmit={(event) => this.handleSubmitNewPupil(event)}
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
							<Button type="submit">Ajouter</Button>
							<Button
								variant="secondary"
								onClick={() => {
									this.props.onHide()
									this.setDefaultState()
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

export default ModalFormNewPupil
