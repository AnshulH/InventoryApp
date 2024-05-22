import React, { Component, PureComponent } from 'react';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                  name: "apple",
                  category: "fruit"
                },
                {
                  name: "Cucumber",
                  category: "vegetable"
                },
                {
                  name: "Banana",
                  category: "fruit"
                },
                {
                  name: "Celery",
                  category: "vegetable"
                },
                {
                  name: "orange",
                  category: "fruit"
                },
                {
                  name: "sausage",
                  category: "meat"
                },
                {
                  name: "bacon",
                  category: "meat"
                }
            ],
            categories: [],
            names: [],
            selectedIndex: 0,
            selectedName: ""
        }
    }

    componentDidMount() {
        let allCategories = this.state.items.map(item => item.category)
            .filter((value, index, self) => self.indexOf(value) === index);
        let names = this.state.items.filter((item) => {
            if (item.category === allCategories[0])
                return item.name;
        });
        
        this.setState({
            ...this.state,
            categories: allCategories,
            names: names,
            selectedName: names[0].name
        });
    }

    categoryChange = (event) => {
        let newNames = this.state.items.filter((item) => {
            if (item.category === event.target.value)
                return item.name;
        });
        let newName = newNames[0].name;

        this.setState({
            ...this.state,
            names: newNames,
            selectedName: newName
        });
    }

    nameChange = (event) => {
        let newName = event.target.value;

        this.setState({
            ...this.state,
            selectedName: newName
        });
    }

    render() {
        return <div className='category-container'>
            <span className='name-title'>{this.state.selectedName}</span>
            <select class="category-dropdown" onChange={this.categoryChange}>
                {this.state.categories.length > 0 ? this.state.categories.map((item, index) => {
                    if (index === this.state.selectedIndex) {
                        return <option value={item.name} selected="selected" key={index}>{item}</option>;
                    }
                    return <option value={item.name} key={item}>{item}</option>
                }) : null}
            </select>
            <select className="fruits-dropdown" onChange={this.nameChange}>
                {this.state.names.length > 0 ? this.state.names.map((item, index) => {
                    if (index === this.state.selectedIndex) {
                        return <option value={item.name} selected="selected" key={index}>{item.name}</option>;
                    }
                    return <option value={item.name} key={index}>{item.name}</option>
                }) : null}
            </select>
        </div>
    }
}

export default Category;