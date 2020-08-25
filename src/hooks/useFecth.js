import { useState, useEffect } from "react"


function useFecth({fecthRequest, shouldExecute, props = false}) {

  const [executing, setExecuting] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(null)

  if (shouldExecute) {
    setExecuting(true)
  }

  const executeRequest = async () => {
    try {
      const res = !props ? await fecthRequest() : await fecthRequest(props)
      setExecuting(false)
      
      if (res.error) {
        setHasError(true)
        setErrors(res.error)
        setLoading(false)
        setResult(null)
        setExecuting(false)
        return;
      }
      setHasError(false)
      setErrors(null)
      setLoading(false)
      setResult(res)
      setExecuting(false)
    } catch (error) {
      setLoading(false)
      setErrors(error)
      setHasError(true)
      setExecuting(false)
    }
  }

  useEffect(() => {
    if (executing) {
      executeRequest()
    } // eslint-disable-next-line
  }, [executing])

  return { executing, hasError, result, loading, errors }
}

export default useFecth