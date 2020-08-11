import React, { Component } from 'react'

export default class HomeMetrics extends Component {
  render() {
    return (
      <div className="grid-row">
        <section id="metrics" className="metrics usa-section">
          {this.props.metrics && this.props.metrics.map(item => ( 
            <h2 className="text-primary">{item.title}</h2>
            

            <div className="metrics-actions grid-row 
            tablet:border-bottom-2px tablet:border-top-2px tablet:padding-top-205 padding-top-3 tablet:padding-bottom-205 padding-bottom-0"
            >  

            </div> 
            
            
            <div>
              <h2 className="text-primary">{item.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
          ))}
      
      
        
      </section>
    </div>
    )
  }
}
