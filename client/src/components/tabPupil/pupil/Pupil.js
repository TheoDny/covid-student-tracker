import React, { Component } from "react"
import ModalModifPupil from "../../modal/ModalModifPupil"
import "./Pupil.css"

class Pupil extends Component {
	state = { modalModifPupilShow: false }

	// == get number of days after contact or positve == //
	positiveDays = this.props.positive
		? Math.round(
				(this.props.todayTime - new Date(this.props.positiveDate).getTime()) /
					(1000 * 3600 * 24)
		  )
		: ""
	contactDays = this.props.contact
		? Math.round(
				(this.props.todayTime - new Date(this.props.contactDate).getTime()) /
					(1000 * 3600 * 24)
		  )
		: ""
	// ====================== //

	/*
	clickUnsetContact(event) {
		event.stopPropagation()
		this.props.unsetContact(this.props.number)
	}

	clickUnsetPositive(event) {
		event.stopPropagation()
		this.props.unsetPositive(this.props.number)
	}
	*/

	render() {
		let posi
		let posiD
		if (this.props.positive === true) {
			posi = (
				<td
					className="positive danger"
					//onClick={this.clickUnsetPositive.bind(this)}
					// not sure to be implemented
				>
					Oui
				</td>
			)
			posiD = <td className="positivedays">{this.positiveDays} jours</td>
		} else {
			posi = <td className="positive">Non</td>
			posiD = <td className="positivedays"></td>
		}

		let cont
		let contD
		if (this.props.contact === true) {
			cont = (
				<td
					// onClick={this.clickUnsetContact.bind(this)}
					// not sure to be implemented
					className="contact warning"
				>
					Oui
				</td>
			)
			contD = <td className="contactdays">{this.contactDays} jours</td>
		} else {
			cont = <td className="contact">Non</td>
			contD = <td className="contactdays"></td>
		}

		return (
			<>
				<tr onClick={() => this.setState({ modalModifPupilShow: true })}>
					<td className="number">{this.props.number + 1}</td>
					<td className="surname">{this.props.surname}</td>
					<td className="name">{this.props.name}</td>

					{posi}
					<td className="positivedate">{this.props.positiveDate}</td>
					{posiD}

					{cont}
					<td className="contactdate">{this.props.contactDate}</td>
					{contD}
				</tr>
				<ModalModifPupil
					number={this.props.number}
					surname={this.props.surname}
					name={this.props.name}
					positive={this.props.positive}
					positiveDate={this.props.positiveDate}
					contact={this.props.contact}
					contactDate={this.props.contactDate}
					show={this.state.modalModifPupilShow}
					onHide={() => this.setState({ modalModifPupilShow: false })}
					deletePupil={this.props.deletePupil}
					handleUpdatePupil={this.props.handleUpdatePupil}
				/>
			</>
		)
	}
}
export default Pupil
