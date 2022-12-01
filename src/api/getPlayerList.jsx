export const getPlayerList=()=> {
    return fetch('https://api.npoint.io/20c1afef1661881ddc9c')
      .then(data => data.json())
}
  
