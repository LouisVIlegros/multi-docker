import React, {Component} from 'react'
import axios from 'axios'

class Fib extends Component {
    state = {
        seenIndexes : [],
        values : {},
        index : ''
    }

    componentDidMount() {
        this.fetchValues()
        this.fetchIndexes()
    }

    async fetchValues () {
        const values = await axios.get('/api/values/current')
        this.setState({values : values.data})
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all')
        this.setState({
            seenIndexes : seenIndexes.data
        })
    }

    renderIndexes () {
        return this.state.seenIndexes.map(({number})=> number).join(', ')
    }

    renderValues () {
        const entries = []
        Object.keys(this.state.values).map(
            // eslint-disable-next-line 
            key => {
                entries.push(
                    <div key={key}>
                        For index {key} I Calculated {this.state.values[key]}
                    </div>
                )
            }
        )
        return entries
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/api/values', {
            index : this.state.index
        })
        this.setState({
            index : ''
        })
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter Your index : 
                    </label>
                    <input 
                        value={this.state.index}
                        onChange={e => this.setState({index : e.target.value})}
                    />
                    <button>Submint</button>
                </form>

                <h3>Indexes I have Seen : </h3>
                {
                    this.renderIndexes()
                }

                <h3>Calculated Values : </h3>
                {
                    this.renderValues()
                }
            </div>
        )
    }
}

export default Fib