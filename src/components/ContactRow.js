import React, { Component } from "react"
const api_key = process.env.REACT_APP_API_KEY;



class ContactRow extends Component {

    state = {
        totalDeals: null,
        totalTags: null,
        totalValue: null
    }

    componentDidMount() {
        this.calculateTotalValue()
        this.calculateTotalDeals()
        this.calcualteTotalTags()
    }
    calculateTotalValue = () => {
        const { contact } = this.props;
        let totalValue = 0;
        contact.scoreValues.forEach(value => totalValue += parseInt(value))
        this.setState({ totalValue: totalValue })
    }
    calculateTotalDeals = () => {
        const { contact } = this.props;
        fetch(
            `https://cors-anywhere.herokuapp.com/https://lamppoststudios.api-us1.com/api/3/contacts/${contact.id}/contactDeals`,
            {
                headers: {
                    "Api-Token": api_key,
                    "x-requested-with": "xhr"
                }
            }
        )
            .then(rsp => rsp.json())
            .then(tagData => {
                const numTotalDeals = tagData.contactDeals.length
                this.setState({ totalDeals: numTotalDeals })
            })
            .catch(err => console.log(err));

    }

    calcualteTotalTags = () => {
        const { contact } = this.props;
        fetch(
            `https://cors-anywhere.herokuapp.com/https://lamppoststudios.api-us1.com/api/3/contacts/${contact.id}/contactTags`,
            {
                headers: {
                    "Api-Token": api_key,
                    "x-requested-with": "xhr"
                }
            }
        )
            .then(rsp => rsp.json())
            .then(tagData => {

                const numTotalTags = tagData.contactTags.length
                this.setState({ totalTags: numTotalTags })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { contact } = this.props;
        const { totalDeals, totalTags, totalValue } = this.state;
        return (
            <>
                <tr >
                    <td>{contact.firstName + " " + contact.lastName} </td>
                    <td>{totalValue}</td>
                    <td>Location</td>
                    <td>{totalDeals}</td>
                    <td>{totalTags}</td>
                </tr>
            </>
        )
    }
}

export default ContactRow