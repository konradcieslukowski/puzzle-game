export default function fetchPuzzleData() {
  return fetch("/_PZ01.json").then(
    response => {
      if (response.ok) {
        return response.json().then(
          data => {
            return data}
        ).catch(error => {
          console.log(error)
        })
      }
      throw new Error('Connection failed')
    }
  ).catch(
  )
}

