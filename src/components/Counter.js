import React from 'react';

export default class Counter extends React.Component {
    state = {
        value: ''
    }

    async componentDidMount() {
        const counter = this.props.contract;
        const initialValue = await counter.methods.value().call();
        this.setState({ value: initialValue })

        // Listening to the Increased event and updating the state with the latest value
        counter.events.Increased()
            .on('data', (event) => {
                const value = event.returnValues.newValue;
                this.setState(
                    { value }
                )
            })
    }

    increaseCounter() {
        const counter = this.props.contract;
        this.setState({ increasing: true, error: null })
        return counter.methods.increase().send()
            .on('receipt', async () => {
                this.setState({ increasing: false })
            })
            .on('error', (error) => {
                this.setState({ error, increasing: false })
            })
    }

    render() {
        const { value, increasing, error } = this.state;
        if (!value) return 'Loading...';
        return (
            <div>
                <div>

                    Counter value: {value.toString()}
                </div>
                <button
                    disabled={!!increasing}
                    onClick={() => this.increaseCounter()}
                >
                    Increase Counter
                </button>
                <div>{increasing && 'Awaiting Transaction'}</div>
                <div>{error && error.message}</div>
            </div>
        )
    }
}