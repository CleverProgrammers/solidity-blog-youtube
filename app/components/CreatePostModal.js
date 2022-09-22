import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAppContext } from '../context/context'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const { createBlog } = useAppContext()

  const handleSubmit = async () => {
    if (!tag || !title || !blogContent) {
      setError('Please fill in both fields')
      return
    }

    await createBlog(title, tag, blogContent)

    setTag('')
    setTitle('')
    setBlogContent('')

    router.push('/')
  }

  return (
    <div className='mint-modal-wrapper'>
      <span className='error'>{error}</span>
      <div className='modal-title'>Add a new Post</div>
      <div className='modal-field'>
        <div className='modal-property'>Title</div>
        <input
          type='text'
          className='modal-input'
          value={title}
          onChange={event => {
            setTitle(event.target.value)
            setError('')
          }}
        />
      </div>
      <div className='modal-field'>
        <div className='modal-property'>Tag</div>
        <input
          type='text'
          className='modal-input'
          value={tag}
          onChange={event => {
            setTag(event.target.value)
            setError('')
          }}
        />
      </div>
      <div className='modal-field'>
        <div className='modal-property'>Post Content</div>
        <textarea
          type='text'
          rows='16'
          cols='40'
          className='modal-input'
          value={blogContent}
          onChange={event => {
            setBlogContent(event.target.value)
            setError('')
          }}
        />
        <button className='modal-submit' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default CreatePost
