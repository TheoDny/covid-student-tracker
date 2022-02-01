import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import ToggleButton from "react-bootstrap/ToggleButton"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import { Component } from "react"
import { confirm } from "react-bootstrap-confirmation"
import "./modalDark.css"
import "./modalPupilsListUpdateMultiple.css"

class ModalPupilsListUpdateMultiple extends Component {
	date = new Date().toLocaleDateString("en-CA")
	state = {
		c_p: this.getDefaultC_p(),
	}
	lenghtList = 0
	radios = [
		{ name: "Positif", value: "positive" },
		{ name: "Contact", value: "contact" },
		{ name: "Rien", value: "nothing" },
	]

	getDefaultC_p() {
		let len = this.props.pupils.length
		let c_p = []
		for (let i = 0; i < len; i++) {
			let p = this.props.pupils[i]
			if (!(p.contact || p.positive)) {
				c_p.push({ _id: p._id, state: "contact" })
			}
		}
		return c_p
	}

	handleChangeRadios(i, value) {
		let newC_p = [...this.state.c_p]
		newC_p[i].state = value
		this.setState({ c_p: newC_p })
	}

	/**
	 * Submit fucntion to update Pupils list
	 *
	 * @param {Event} event
	 */
	updatePupils(event) {
		event.preventDefault()
		let atLeastOnePositive = false
		let allUpdate = []
		this.state.c_p.forEach((c_p) => {
			if (c_p.state === "contact") {
				allUpdate.push({
					_id: c_p._id,
					positive: false,
					positiveDate: "",
					contact: true,
					contactDate: this.date,
				})
			} else if (c_p.state === "positive") {
				atLeastOnePositive = true
				allUpdate.push({
					_id: c_p._id,
					positive: true,
					positiveDate: this.date,
					contact: false,
					contactDateDate: "",
				})
			}
		})
		if (atLeastOnePositive) {
			this.props.handleUpdatePupilsList(allUpdate)
			this.props.onHide()
			this.setState({ c_p: this.getDefaultC_p() })
		} else {
			this.confirmWithoutPositive(allUpdate)
		}
	}

	async confirmWithoutPositive(allUpdate) {
		if (
			await confirm(
				"Aucun élève de la liste n'est cocher Positif, êtes vous sûre ?"
			)
		) {
			this.props.handleUpdatePupilsList(allUpdate)
			this.setState({ c_p: this.getDefaultC_p() })
			this.props.onHide()
		}
	}

	render() {
		return (
			<>
				<Modal
					show={this.props.show}
					onHide={() => {
						this.props.onHide()
						this.setState(this.getDefaultC_p())
					}}
					size="lg"
					centered
					className="modalModif"
					id="modifPupilList"
				>
					<Form
						onSubmit={this.updatePupils.bind(this)}
						className="text-white bg-dark"
					>
						<Modal.Header closeButton className="pt-2 pb-1">
							<Modal.Title>Modifier la classe</Modal.Title>
							<Form.Control
								defaultValue={this.date}
								onChange={(event) => (this.date = event.target.value(event))}
								required="required"
								type="date"
							/>
						</Modal.Header>
						<Modal.Body className="pt-1 pb-2 container">
							{this.props.pupils
								.filter((p) => !(p.contact || p.positive))
								.map((pupil, i) => (
									<Form.Group
										className="py-3 row border-bottom "
										controlId={"pupil" + i}
										key={i}
									>
										<Form.Label className="col">{`${pupil.surname} ${pupil.name}`}</Form.Label>
										<ToggleButtonGroup
											type="radio"
											name={"radio" + i}
											className="mb-2 group-radio"
											onChange={(v, e) => {
												this.handleChangeRadios(i, v)
											}}
											value={this.state.c_p[i].state}
										>
											{this.radios.map((radio, j) => (
												<ToggleButton
													key={j}
													id={`radio-${i}-${j}`}
													type="radio"
													variant="outline-secondary"
													value={radio.value}
													className={"mx-2 " + radio.value}
												>
													{radio.name}
												</ToggleButton>
											))}
										</ToggleButtonGroup>
									</Form.Group>
								))}
						</Modal.Body>
						<Modal.Footer className="py-1 d-flex justify-content-between">
							<Button
								variant="secondary"
								onClick={() => {
									this.props.onHide()
									this.setState(this.getDefaultC_p())
								}}
							>
								Close
							</Button>
							<Button type="submit">Sauvegarder</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</>
		)
	}
}

export default ModalPupilsListUpdateMultiple
