import React, {Component} from 'react';
import Idea from '../../components/Idea/Idea';

class Ideas extends Component {
    state = {
        ideas: [
            {
                title: "A Wonderful Medical App Idea",
                description: "Here are a few sentences about that wonderful idea. It truly is magnificient. It's going to change the world.",
                quality: 4,
                themes: [{name: "medical", title: "Medical"}, {name: "app", title: "App"}],
            }
        ],
        themes: [
            {name: "medical", title: "Medical"},
            {name: "app", title: "App"},
            {name: "writing", title: "Writing"},
            {name: "crafts", title: "Crafts"},            
        ]
    }
    render() {
        return (
            <div>
                <h1>Ideas</h1>
                {
                    this.state.ideas.map((idea) => {
                        return <Idea idea={idea} themes={this.state.themes} />
                    })
                }
            </div>
        )
    }
}

export default Ideas;
