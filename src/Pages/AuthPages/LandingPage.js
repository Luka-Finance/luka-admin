import React, {useEffect} from 'react'

function LandingPage() {
  useEffect(() => {
    window.location.replace('/sign-in')
  }, [])
  return (
    <div></div>
  )
}

export default LandingPage