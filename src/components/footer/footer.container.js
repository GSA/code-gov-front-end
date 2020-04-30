/* global PUBLIC_PATH */
import { connect } from 'react-redux'
import { getConfigValue, isHomepage } from 'utils/other'
import Footer from './footer.component'

export const mapStateToProps = ({ router }) => ({
    color: 'white',
    links: getConfigValue('content.footer.links'),
    logos: getConfigValue('content.footer.logos'),
    socials: getConfigValue('content.footer.socials')
})

export default connect(mapStateToProps)(Footer)
