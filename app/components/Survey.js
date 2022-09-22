const Survey = ({ src }) => (
  <article className='survey mb-10'>
    <div className='survey-image'>
      <img src={src} />
    </div>
    <div className='survey-title'>Tell us your thoughts about DEV!</div>
    <div className='survey-description'>→ Take the DEV Satisfaction Survey</div>
  </article>
)

export default Survey
