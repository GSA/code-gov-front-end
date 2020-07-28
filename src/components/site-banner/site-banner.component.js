import React from 'react'

export default function SiteBanner({ backgroundImage, title }) {
  return (
    <div className="bg-primary usa-section">
      <div className="grid-container">
        <div className="grid-row">
          <div className="tablet:grid-col">
            <h1 className="tablet:font-heading-3xl text-white text-center text-uppercase">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
