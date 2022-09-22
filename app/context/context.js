import { createContext, useState, useEffect, useContext } from 'react'
import { blogInstance, factoryInstance } from '../utils/instances'
import Web3 from 'web3'

export const appContext = createContext()

let ethereum = null

if (typeof window !== 'undefined') {
  ethereum = window.ethereum
}

export const AppProvider = ({ children }) => {
  const [contractInstance, setContractInstance] = useState(null)
  const [web3Instance, setWeb3Instance] = useState(null)
  const [currentWalletAddress, setCurrentWalletAddress] = useState(null)
  const [blogAddresses, setBlogAddresses] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!ethereum) return

    const createWeb3Client = (async () => {
      const web3 = new Web3(window.ethereum)
      setWeb3Instance(web3)

      const accounts = await web3.eth.getAccounts()
      setCurrentWalletAddress(accounts[0])

      const contract = await factoryInstance(web3)
      setContractInstance(contract)

      getUploadedPostAddresses(contract)
    })()
  }, [ethereum])

  useEffect(() => {
    getPostContent()
  }, [blogAddresses])

  const getUploadedPostAddresses = async (contract = contractInstance) => {
    try {
      const addresses = await contract.methods.getUploadedPosts().call()

      setBlogAddresses(addresses)
    } catch (error) {
      console.error(error)
    }
  }

  const getPostContent = async () => {
    const fetchedPosts = await Promise.all(
      blogAddresses.map(async address => {
        const post = blogInstance(web3Instance, address)

        return post.methods.getPostDetails().call()
      }),
    )

    const formattedPosts = fetchedPosts.map((post, index) => ({
      index: index,
      author: post[0],
      title: post[1],
      tag: post[2],
      timestamp: post[3],
      postText: post[4],
      likes: post[5],
      likers: post[6],
    }))

    setPosts(formattedPosts.reverse())
  }

  const createBlog = async (title, hash, text) => {
    if (!currentWalletAddress) return

    try {
      await contractInstance.methods
        .createBlogPost(title, hash, Date.now().toString(), text)
        .send({
          from: currentWalletAddress,
        })

      getUploadedPostAddresses()
    } catch (error) {
      console.error(error)
    }
  }

  const likePost = async postIndex => {
    if (!currentWalletAddress) return

    try {
      await blogInstance(web3Instance, blogAddresses[postIndex])
        .methods.likePost()
        .send({ from: currentWalletAddress })

      getPostContent()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <appContext.Provider
      value={{ createBlog, posts, likePost, currentWalletAddress }}
    >
      {children}
    </appContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(appContext)
}
