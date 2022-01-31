import { Component } from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import "./tabPupil.css"
import Pupil from "./pupil/Pupil"
import ModalFormNewPupil from "../modal/ModalFormNewPupil"
import ModalPupilListUpdateMultiple from "../modal/ModalPupilsListUpdateMultiple"
import axios from "axios"

const API_ROOT = process.env.API_ROOT || require("../../const").API_ROOT

class TabPupil extends Component {
	todayTime = new Date().getTime()
	state = {
		modalFormPupilShow: false,
		modalFormPupilsListShow: false,
		pupils: [],
	}

	componentDidMount() {
		this.receivePupils()
	}

	/**
	 * axios request to receive a Pupil's list
	 * then set state of "pupils"
	 */
	receivePupils() {
		axios
			.get(API_ROOT + "/api/pupils", {
				headers: { Authorization: `Bearer ${this.props.accessToken}` },
			})
			.then((res) => {
				this.setState({ pupils: res.data })
			})
			.catch((error) => console.error(error))
	}

	/**
	 * axios request to delete a pupil with his posituon in the list "state.pupils"
	 * then delete it in the list with setState
	 *
	 * @param {number} number
	 */
	deleteOnePupil(number) {
		axios
			.post(API_ROOT + "/api/pupils/deleteone", this.state.pupils[number], {
				headers: { Authorization: `Bearer ${this.props.accessToken}` },
			})
			.then((res) => {
				let newPupils = this.state.pupils
					.slice(0, number)
					.concat(this.state.pupils.slice(number + 1))
				this.setState({ pupils: newPupils })
			})
			.catch((error) => console.error(error))
	}

	/**
	 *	axios request to add a pupil in db
	 *	then add it to the list "state.pupils" with setState
	 *
	 * @param { {surname: string,name: string,positive: boolean,positiveDate: string,contact: boolean,contactDate: string} } pupil
	 */
	handleSubmitNewPupil(pupil) {
		axios
			.post(API_ROOT + "/api/pupils/add", pupil, {
				headers: { Authorization: `Bearer ${this.props.accessToken}` },
			})
			.then((res) => {
				let newPupils = this.state.pupils.slice()
				newPupils.push(res.data)
				this.setState({ pupils: newPupils })
			})
	}

	/**
	 *	axios request to update a pupil in db
	 *	then change the list "state.pupils" with setState
	 *
	 * @param { {surname: string,name: string,positive: boolean,positiveDate: string,contact: boolean,contactDate: string} } pupil
	 * @param { number } number
	 */
	handleUpdatePupil(number, pupil) {
		pupil._id = this.state.pupils[number]._id
		axios
			.post(API_ROOT + "/api/pupils/updateone", pupil, {
				headers: { Authorization: `Bearer ${this.props.accessToken}` },
			})
			.then((res) => {
				// res => pupil before modif
				let newPupils = this.state.pupils.slice()
				let i = newPupils.findIndex((p) => p._id === pupil._id)
				newPupils[i] = pupil
			})
	}

	/**
	 *	replace the pupils in pupilsToUpdate in this.state.pupils with the _id
	 *
	 * @param {any[]} pupilsToUpdate
	 */
	replacePupilsInState(pupilsToUpdate) {
		let newPupils = [...this.state.pupils]
		let len = this.state.pupils.length
		pupilsToUpdate.forEach((pupilUp) => {
			let i = 0
			while (i < len) {
				if (this.state.pupils[i]._id === pupilUp._id) {
					newPupils[i] = pupilUp
				}
			}
		})

		this.setState({ pupils: newPupils })
	}

	/**
	 *	axios request to update a pupil in db
	 *	then change the list "state.pupils" with setState
	 *
	 * @param { Array } pupils

	 */
	handleUpdatePupilsList(updatePupils) {
		axios
			.post(API_ROOT + "/api/pupils/updatemany", updatePupils, {
				headers: { Authorization: `Bearer ${this.props.accessToken}` },
			})
			.then((res) => {
				this.findByIdAndUpdate(res.body)
			})
	}

	/*
	not sure to be implemented
	unsetContact(number) {
		let newPupils = this.state.pupils.slice()
		newPupils[number].contact = false
		newPupils[number].contactDays = ""
		newPupils[number].contactDate = ""
		this.setState({ pupils: newPupils })
	}

	unsetPositive(number) {
		let newPupils = this.state.pupils.slice()
		newPupils[number].positive = false
		newPupils[number].positiveDays = ""
		newPupils[number].positiveDate = ""
		this.setState({ pupils: newPupils })
	}
	*/

	render() {
		return (
			<>
				<div id="tabPupil">
					<div id="tab">
						<Table className="table-dark table-bordered">
							<thead>
								<tr>
									<th className="number" colSpan="1"></th>
									<th className="surname" colSpan="1">
										Prenom
									</th>
									<th className="name" colSpan="1">
										Nom
									</th>
									<th className="positive" colSpan="3">
										Positif
									</th>
									<th className="contact" colSpan="3">
										Cas Contact
									</th>
								</tr>
							</thead>
							<tbody>
								{this.state.pupils.map((p, i) => (
									<Pupil
										key={i}
										todayTime={this.todayTime}
										number={i + 1}
										surname={p.surname}
										name={p.name}
										positive={p.positive}
										positiveDate={p.positiveDate}
										contact={p.contact}
										contactDate={p.contactDate}
										deletePupil={() => this.deleteOnePupil.bind(this)(i)}
										handleUpdatePupil={this.handleUpdatePupil.bind(this)}
										//	unsetContact={this.unsetContact.bind(this)}
										//	unsetPositive={this.unsetPositive.bind(this)}
									/>
								))}
							</tbody>
						</Table>
					</div>
					<ModalFormNewPupil
						show={this.state.modalFormPupilShow}
						onHide={() => this.setState({ modalFormPupilShow: false })}
						handleSubmitNewPupil={this.handleSubmitNewPupil.bind(this)}
					/>
					<div id="divButModal" className="mb-3">
						<Button
							className="mx-3"
							id="modalModifList"
							onClick={() => {
								this.setState({ modalFormPupilsListShow: true })
							}}
						>
							Cas détecté
						</Button>
						<Button
							className="mx-3"
							id="modalAddPupil"
							onClick={() => {
								this.setState({ modalFormPupilShow: true })
							}}
						>
							Ajoutez un élève
						</Button>
					</div>
				</div>
				{this.state.modalFormPupilsListShow && (
					<ModalPupilListUpdateMultiple
						show={this.state.modalFormPupilsListShow}
						onHide={() => this.setState({ modalFormPupilsListShow: false })}
						handleUpdatePupilsList={this.handleUpdatePupilsList.bind(this)}
						pupils={this.state.pupils}
					/>
				)}
			</>
		)
	}
}
export default TabPupil
