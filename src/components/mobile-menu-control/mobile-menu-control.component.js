/* global PUBLIC_PATH */

import React, { Component, Fragment } from 'react'
import MobileMenu from 'components/mobile-menu'

export default function MobileMenuControl ({ color, displayMobileMenu, toggleMobileMenu }) {
  let className = 'show-w-lte-800'
  if (color === 'dark') {
    className += ' dark'
  }
  return (
    <Fragment>
      <mobile-menu-button class={className} onClick={toggleMobileMenu} open={displayMobileMenu}/>
      <MobileMenu open={displayMobileMenu}/>
    </Fragment>
  )
}