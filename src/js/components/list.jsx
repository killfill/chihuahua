var React = require('react'),
    mui = require('material-ui')

module.exports = React.createClass({

    propTypes: {
        items: React.PropTypes.array.isRequired,
        onTouchTap: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            items: [],
            onTouchTap: function(){}
        }
    },

    render: function() {

        var content = this.props.items.map(function(item, idx) {

            var image
            if (item.image) {
                image = (<div className='icon'>
                            <mui.Paper zDepth={0} circle={true} style={{overflow: 'hidden', height: '31px'}}>
                            <img src={item.image} />
                        </mui.Paper>
                    </div>
                )
            }

            var icons = item.icons.map(function(i, idx) {
                return <mui.Icon key={idx} icon={i.icon} alt={i.alt} title={i.alt} />
            })

            return (<li className='mui-list-item' onTouchTap={this.props.onTouchTap.bind(null, item)} key={idx}>
                {image}
                <div className="content">
                    <div className='title' dangerouslySetInnerHTML={{__html: item.title}}></div>
                    <div className='date'>{item.date}</div>
                    <span className='description' dangerouslySetInnerHTML={{__html: item.description}}></span>
                    <span className='bages'>{icons}</span>
                </div>
            </li>)

        }.bind(this))

        return <ul className='mui-list'>{content}</ul>
    }
})