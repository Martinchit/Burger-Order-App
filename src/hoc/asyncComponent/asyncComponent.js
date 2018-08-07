import React from 'react';

const asyncComponent = (importCompnent) => {
    return class extends React.Component {
        state = {
            component: null
        }
        componentDidMount = () => {
            importCompnent().then(cmp => {
                this.setState({component: cmp.default})
            })
        }
        render() {
            const C = this.state.component;
            return C? <C {...this.props}/>: null
        }
    }
}

export default asyncComponent