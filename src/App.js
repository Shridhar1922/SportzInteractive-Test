import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { getPlayerList } from "./api/getPlayerList";
import { Grid } from "@mui/material";
import styled from "styled-components";


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [playerList, setPlayerList] = useState();
  const [teamList, setTeamList] = useState();
  const [searchTerm,setSearchTerm]=useState("")
  useEffect(() => {
    getPlayerList().then((items) => {
      setIsLoaded(true);
      console.log("items....", items);
      setPlayerList(items.playerList);
      console.log("playerList....", items);
      setTeamList(items.teamsList);
      console.log("teamList....", items.teamsList);
    }, (error) => {
      setIsLoaded(true);
      setError(error);
  });
  }, []);

  if (error) {
    return (
        <p>
            {error.message}</p>)}
             else if (!isLoaded) {
              return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>loading...</div>;
          } else {
  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={12}>
         <input type="text" placeholder="Search" onChange={(e)=>{
          setSearchTerm(e.target.value)
         }}></input>
        </Grid>
        {playerList !== undefined && playerList !== null
          ? playerList.filter((val)=>{
            console.log("....",searchTerm)
            if(searchTerm==""){
              return val
            }else if(val.PFName.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
            }else{
              console.log("else running")
              
              {teamList.filter((team) => 
                
                 {
                  if(team.TID == val.TID){
                    console.log("else running ifff",team.OfficialName.toLowerCase())
                   if(team.OfficialName.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val;
                   }else{
                    console.log("else running ifff elseeeeee",team.OfficialName.toLowerCase().includes(searchTerm.toLowerCase()))
                   }
                  }

                  
                
                 }
              )}
            }
          }).map((item) => (
            <Grid item xs={4}>
              <PlayerBox>
                <PlayerImgBox>
                  <PlayerImg
                    src={process.env.PUBLIC_URL +
                      "/player-images/" +
                      item.Id +
                      ".jpg"}
                    className=""
                    alt={item.PFName} />

                  <PlayerName>{item.PFName}</PlayerName>
                  <SkillDesc>{item.SkillDesc}</SkillDesc>
                </PlayerImgBox>
                <PlayerDesc>
                  <PTitle>Team</PTitle>
                  <PValue>
                    {teamList.map((team) => (
                      <>
                        {team.TID == item.TID ? <>{team.OfficialName}</> : ""}
                      </>
                    ))}
                  </PValue>
                </PlayerDesc>
                <PlayerDesc>
                  <PTitle>Value</PTitle>
                  <PValue>$ {item.Value}</PValue>
                </PlayerDesc>

                <PlayerDesc>
                  <PTitle>Upcoming Match</PTitle>
                  <PValue>
                    {item.UpComingMatchesList[0].CCode !== "" &&
                      item.UpComingMatchesList[0].CCode !== null &&
                      item.UpComingMatchesList[0].CCode !== undefined ? (
                      <>
                        {item.UpComingMatchesList[0].CCode}{" "}
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: "16px",
                            display: "inline-block",
                          }}
                        >
                          Vs
                        </span>{" "}
                        {item.UpComingMatchesList[0].VsCCode}
                      </>
                    ) : (
                      "-"
                    )}
                  </PValue>
                </PlayerDesc>
                <PlayerDesc>
                  <PTitle>Upcoming Match Time</PTitle>
                  <PValue>
                    {item.UpComingMatchesList[0].MDate != "" &&
                      item.UpComingMatchesList[0].MDate !== undefined &&
                      item.UpComingMatchesList[0].MDate !== null ? (
                      <>{item.UpComingMatchesList[0].MDate}</>
                    ) : (
                      "-"
                    )}{" "}
                  </PValue>
                </PlayerDesc>
              </PlayerBox>
            </Grid>
          ))
          : null}
      </Grid>
    </div>
  );
                    }
}

const PlayerBox = styled.div`
padding: 0px;
background: #585858;
height: 100%;
display: flex;
flex-direction: column;
justify-content: end;
`;
const PlayerImgBox = styled.div`
  padding: 15px 0px;
`;
const PlayerImg = styled.img`
  width: 110px;
  border-radius: 50%;
  border: 1px solid #000;
`;

const PlayerName = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0px;
`;
const SkillDesc = styled.span`
  background: #f1ec40;
  display: inline-block;
  padding: 2px 10px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 8px;
  margin-bottom: 10px;
`;
const PlayerDesc = styled.div`
  display: flex;
`;
const PTitle = styled.div`
  width: 40%;
  padding: 5px 10px;
  text-align: left;
  background: #4e4d4d;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
`;
const PValue = styled.div`
  width: 60%;
  padding: 5px 10px;
  text-align: left;
  background: #484545;
  color: #fff;
  font-size: 14px;
`;
export default App;
