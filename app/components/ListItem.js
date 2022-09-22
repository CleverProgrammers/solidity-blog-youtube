const ListItem = ({ title, description }) => (
  <div className='trend-item'>
    <div className='trend-item-head'>
      <span className='trend-item-explain'>{title}</span>
    </div>

    <div className='trend-item-footer'>
      <span className='trend-item-footer-text'>{description}</span>
    </div>
  </div>
)

export default ListItem
