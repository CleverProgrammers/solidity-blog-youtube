import { ConnectButton } from '@rainbow-me/rainbowkit'

const ConnectContainer = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <article className='survey mb-10'>
                    <div className='survey-blue'>DEV Community 👩‍💻👨‍💻</div>
                    <div className='survey-highlight'>
                      is a community of 903,276 amazing developers
                    </div>
                    <div className='survey-grey'>
                      We're a place where coders share, stay up-to-date and grow
                      their careers.
                    </div>
                    <button
                      onClick={openConnectModal}
                      className='survey-connect'
                    >
                      Connect Wallet
                    </button>
                    <div className='mb-10'></div>
                  </article>
                )
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type='button'>
                    Wrong network
                  </button>
                )
              }

              return <></>
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectContainer
