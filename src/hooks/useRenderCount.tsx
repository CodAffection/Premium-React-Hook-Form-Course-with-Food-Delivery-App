export const useRenderCount = () => {
  let count = 0

  return () => {
    count++
    return <div>Render count : {count/2}</div>
  }
}
